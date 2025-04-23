
import { AlarmClock } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";
import { TimerModal } from "./TimerModal";

export function TimerButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [tick, setTick] = useState(false);
  const [flash, setFlash] = useState(false);
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
      // Flash the screen for 0.38s
      window.dispatchEvent(new Event('timer:screenFlash'));
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
        className="rounded-full w-16 h-16 bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center p-0 border-0 shadow-lg"
        onClick={() => setModalOpen(true)}
        disabled={timerActive}
        style={{ transition: "box-shadow .3s" }}
      >
        {timerActive ? (
          <span
            className={`
              absolute 
              left-1/2 
              bottom-full 
              mb-2 
              animate-pulse-timer
              z-10
            `}
            aria-live="polite"
            style={{
              transform: "translateX(-50%)",
              minWidth: 104,
              borderRadius: "9999px",
              background: "#a50e14e6",
              color: "#ababab",
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: 20,
              padding: "8px 34px",
              textAlign: "center",
              border: "0px solid #fff",
              boxShadow: "0 0 24px 3px #a50e1444, 0 0 24px 3px #a50e1477",
              animation: tick ? "pulse 0.8s" : undefined,
              transition: "box-shadow .19s, background .27s",
              opacity: 1
            }}
          >
            {format(remaining)}
          </span>
        ) : (
          <AlarmClock className="w-8 h-8 text-red-500" />
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
