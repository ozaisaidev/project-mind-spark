import { AlarmClock, Timer } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";
import { TimerModal } from "./TimerModal";

export function TimerButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [tick, setTick] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function onStart(e: any) {
      setRemaining(e.detail.seconds);
      setTimerActive(true);
      setModalOpen(false);
    }
    function onReset() {
      setTimerActive(false);
      setRemaining(0);
    }
    window.addEventListener('timer:start', onStart as EventListener);
    window.addEventListener('timer:reset', onReset as EventListener);
    return () => {
      window.removeEventListener('timer:start', onStart as EventListener);
      window.removeEventListener('timer:reset', onReset as EventListener);
    }
  }, []);

  useEffect(() => {
    if (timerActive && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining(prev => prev > 0 ? prev - 1 : 0);
        setTick(t => !t);
      }, 1000);
    }
    if (remaining === 0 && timerActive) {
      setTimerActive(false);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerActive, remaining]);

  const format = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
    return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  };

  return (
    <>
      <Button
        variant="outline"
        className="rounded-full w-16 h-16 bg-white/90 hover:bg-white/95 flex items-center justify-center p-0 border-0 shadow-lg"
        onClick={() => setModalOpen(true)}
        disabled={timerActive}
        style={{ transition: "box-shadow .3s" }}
      >
        {timerActive ? (
          <span
            className={`transition-all px-5 py-2 bg-red-500 text-white rounded-full font-mono text-lg font-bold tracking-wider flex items-center justify-center shadow-lg
             ${tick ? "animate-[pulse_0.5s]" : ""}`}
            style={{
              minWidth: 90,
              border: "2px solid #fff",
              boxShadow: "0 0 0 2px #ef4444, 0 0 18px 2px #ef444488"
            }}
            aria-live="polite"
          >
            {format(remaining)}
          </span>
        ) : (
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <circle cx="12" cy="14" r="8" stroke="currentColor" strokeDasharray="2 2" />
            <rect x="11" y="10" width="2" height="6" rx="1" fill="currentColor" />
            <rect x="11" y="5" width="2" height="2" rx="1" fill="currentColor" />
          </svg>
        )}
      </Button>
      <TimerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onTimerStart={seconds => {
          window.dispatchEvent(new CustomEvent('timer:start', { detail: { seconds } }));
        }}
        onTimerReset={() => {
          window.dispatchEvent(new CustomEvent('timer:reset'));
        }}
      />
    </>
  );
}
