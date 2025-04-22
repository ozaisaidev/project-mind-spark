
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { AlarmClock } from "lucide-react";

interface TimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTimerStart?: (seconds: number) => void;
  onTimerReset?: () => void;
}

export function TimerModal({ isOpen, onClose, onTimerStart, onTimerReset }: TimerModalProps) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setRunning(false);
      setIsDone(false);
      setRemaining(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, [isOpen]);

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining(prev => {
          if (prev <= 1) {
            setIsDone(true);
            setRunning(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            // Browser notification
            if (window.Notification && Notification.permission === "granted") {
              new Notification("Time's up!", { body: "Your timer finished." });
            }
            // Dispatch reset event to TimerButton
            if (onTimerReset) onTimerReset();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, remaining, onTimerReset]);

  // Request notification permission if not already granted
  useEffect(() => {
    if (isOpen && window.Notification && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, [isOpen]);

  const format = (val: number) => val.toString().padStart(2, "0");

  const start = () => {
    const total =
      parseInt(hours.toString()) * 3600 +
      parseInt(minutes.toString()) * 60 +
      parseInt(seconds.toString());
    if (total > 0) {
      setRemaining(total);
      setRunning(true);
      setIsDone(false);
      if (onTimerStart) onTimerStart(total);
    }
  };

  const reset = () => {
    setRunning(false);
    setIsDone(false);
    setRemaining(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (onTimerReset) onTimerReset();
  };

  // Card content
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="p-0 bg-zinc-950 rounded-3xl shadow-2xl border-none max-w-xs flex flex-col items-center"
      >
        <div className="w-full flex flex-col items-center py-8 px-6">
          <AlarmClock className="w-12 h-12 text-red-500 mb-4" />
          <div className="text-lg font-bold font-mono text-white mb-3">Set Timer</div>
          <div className="flex space-x-2 items-center mb-4">
            <input type="number"
              className="w-12 px-2 py-1 rounded bg-zinc-800 text-white text-center font-mono focus:outline-none"
              min={0} max={23} value={hours}
              onChange={e => setHours(Math.max(0, Math.min(23, Number(e.target.value))))}
              disabled={running || isDone}
            />
            <span className="text-white font-mono">:</span>
            <input type="number"
              className="w-12 px-2 py-1 rounded bg-zinc-800 text-white text-center font-mono focus:outline-none"
              min={0} max={59} value={minutes}
              onChange={e => setMinutes(Math.max(0, Math.min(59, Number(e.target.value))))}
              disabled={running || isDone}
            />
            <span className="text-white font-mono">:</span>
            <input type="number"
              className="w-12 px-2 py-1 rounded bg-zinc-800 text-white text-center font-mono focus:outline-none"
              min={0} max={59} value={seconds}
              onChange={e => setSeconds(Math.max(0, Math.min(59, Number(e.target.value))))}
              disabled={running || isDone}
            />
          </div>
          <div className="mb-4 font-mono text-lg text-white">
            {`${format(Math.floor(remaining / 3600))}:${format(Math.floor((remaining % 3600) / 60))}:${format(remaining % 60)}`}
          </div>
          {isDone ? (
            <div className="w-full flex flex-col items-center">
              <div className="text-red-500 text-md font-bold font-mono mb-2 animate-pulse">
                ⏰ Time's up!
              </div>
              <Button
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold"
                onClick={reset}
              >
                Reset
              </Button>
            </div>
          ) : (
            <div className="flex gap-2 w-full">
              <Button
                className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                disabled={running || remaining > 0}
                onClick={start}
              >
                Start
              </Button>
              <Button
                className="flex-1 bg-zinc-600 text-white"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
