import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { AlarmClock } from "lucide-react";
import { Slider } from "./ui/slider";

const WHEEL_SENS = 55;

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
  
  const hoursWheel = useRef(0)
  const minutesWheel = useRef(0)
  const secondsWheel = useRef(0)
  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);
  const secondsRef = useRef<HTMLDivElement>(null);

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
            if (window.Notification && Notification.permission === "granted") {
              new Notification("Time's up!", { body: "Your timer finished." });
            }
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
      onClose();
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

  const generatePickerItems = (max: number) => {
    return Array.from({ length: max + 1 }, (_, i) => i);
  };

  const handleWheel = (type: "h"|"m"|"s") => (e: React.WheelEvent) => {
    e.preventDefault();
    if (running || isDone) return;
    let ref, setter, max;
    if (type==="h") ref = hoursWheel, setter = setHours, max=23;
    if (type==="m") ref = minutesWheel, setter = setMinutes, max=59;
    if (type==="s") ref = secondsWheel, setter = setSeconds, max=59;
    ref.current += e.deltaY;
    if (Math.abs(ref.current) >= WHEEL_SENS) {
      const valUp = ref.current < 0;
      setter((prev: number) => {
        if (valUp) return prev < max ? prev + 1 : 0;
        else return prev > 0 ? prev - 1 : max;
      });
      ref.current = 0;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="p-0 bg-white/5 backdrop-blur-2xl shadow-2xl rounded-3xl border-none max-w-xs flex flex-col items-center glass-morphism"
      >
        <DialogTitle className="sr-only">Set Timer</DialogTitle>
        <div className="w-full flex flex-col items-center py-8 px-6">
          <AlarmClock className="w-12 h-12 text-red-500 mb-4" />
          <div className="text-lg font-bold font-mono text-white mb-6">Set Timer</div>
          
          <div className="flex space-x-2 items-center mb-6 relative">
            <div 
              className="w-14 h-14 overflow-hidden rounded-lg bg-zinc-800/70 relative flex items-center justify-center"
              onWheel={handleWheel("h")}
            >
              <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-zinc-800 to-transparent pointer-events-none z-10"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-zinc-800 to-transparent pointer-events-none z-10"></div>
              <div className="text-white font-mono text-2xl">{hours.toString().padStart(2, "0")}</div>
            </div>
            
            <span className="text-white font-mono text-2xl">:</span>
            
            <div 
              className="w-14 h-14 overflow-hidden rounded-lg bg-zinc-800/70 relative flex items-center justify-center"
              onWheel={handleWheel("m")}
            >
              <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-zinc-800 to-transparent pointer-events-none z-10"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-zinc-800 to-transparent pointer-events-none z-10"></div>
              <div className="text-white font-mono text-2xl">{minutes.toString().padStart(2, "0")}</div>
            </div>
            
            <span className="text-white font-mono text-2xl">:</span>
            
            <div 
              className="w-14 h-14 overflow-hidden rounded-lg bg-zinc-800/70 relative flex items-center justify-center"
              onWheel={handleWheel("s")}
            >
              <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-zinc-800 to-transparent pointer-events-none z-10"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-zinc-800 to-transparent pointer-events-none z-10"></div>
              <div className="text-white font-mono text-2xl">{seconds.toString().padStart(2, "0")}</div>
            </div>
          </div>
          
          <div className="text-xs text-zinc-400 mb-4 font-mono italic">
            Scroll to set time
          </div>
          
          <div className="mb-4 font-mono text-lg text-white">
            {running && `${hours.toString().padStart(2,"0")}:${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`}
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
                disabled={running || (hours === 0 && minutes === 0 && seconds === 0)}
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
