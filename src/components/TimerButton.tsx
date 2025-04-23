
import { AlarmClock } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";
import { TimerModal } from "./TimerModal";

/** Simple beep on completion */
function playBeep() {
  const oscCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const osc = oscCtx.createOscillator();
  const gain = oscCtx.createGain();
  osc.type = 'sine';
  osc.frequency.value = 960;
  gain.gain.value = 0.16;
  osc.connect(gain);
  gain.connect(oscCtx.destination);
  osc.start();
  setTimeout(() => {
    gain.gain.exponentialRampToValueAtTime(0.00001, oscCtx.currentTime + 0.38);
    osc.stop(oscCtx.currentTime + 0.4);
    setTimeout(() => oscCtx.close(), 340);
  }, 348);
}

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
      window.dispatchEvent(new Event('timer:screenFlash'));
      playBeep();
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
      {!timerActive ? (
        <Button
          variant="outline"
          className="rounded-full w-16 h-16 bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center p-0 border-0 shadow-lg transition-all"
          onClick={() => setModalOpen(true)}
          style={{ position: "relative" }}
        >
          <AlarmClock className="w-8 h-8 text-red-500" />
        </Button>
      ) : (
        <button
          className={`
            rounded-full relative w-24 h-[52px] flex items-center justify-center bg-[#a50e14e6]
            shadow-[0_0_24px_3px_#a50e1444,0_0_24px_3px_#a50e1477] font-mono font-bold
            text-lg text-[#FAFAFA] border-0 cursor-pointer animate-glow select-none
            transition-all
          `}
          style={{
            minWidth: 104,
            borderRadius: "9999px",
            boxShadow: "0 0 24px 3px #a50e1444, 0 0 24px 3px #a50e1477",
            padding: "8px 34px",
            animation: tick ? "pulse 0.8s" : undefined,
            opacity: 1,
            outline: "none"
          }}
          aria-label="Countdown Timer (click to manage)"
          onClick={() => setModalOpen(true)}
        >
          {format(remaining)}
        </button>
      )}
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
