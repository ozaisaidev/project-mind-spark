
import { AlarmClock, Timer } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";
import { TimerModal } from "./TimerModal";

// --- TIMER BUTTON WITH COUNTDOWN-RESPONSIVE RED PILL ---
export function TimerButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Listen to timer start/reset events from TimerModal using a custom event
  useEffect(() => {
    function onStart(e: any) {
      setRemaining(e.detail.seconds);
      setTimerActive(true);
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

  // Countdown logic
  useEffect(() => {
    if (timerActive && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining(prev => prev > 0 ? prev - 1 : 0);
      }, 1000);
    }
    if (remaining === 0 && timerActive) {
      setTimerActive(false);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line
  }, [timerActive, remaining]);

  // Format time as mm:ss or hh:mm:ss
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
            className="animate-pulse px-5 py-2 bg-red-500 text-white rounded-full font-mono text-lg font-bold tracking-wider flex items-center justify-center shadow-lg transition-all"
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
          <AlarmClock className="w-8 h-8 text-red-500" />
        )}
      </Button>
      <TimerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        // Methods to communicate with TimerButton for countdown
        onTimerStart={seconds => {
          // Custom event to tell TimerButton to start with seconds
          window.dispatchEvent(new CustomEvent('timer:start', { detail: { seconds } }));
        }}
        onTimerReset={() => {
          window.dispatchEvent(new CustomEvent('timer:reset'));
        }}
      />
    </>
  );
}
