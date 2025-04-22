
import { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface HourglassTimerProps {
  hours: number;
  minutes: number;
  onComplete?: () => void;
}

export function HourglassTimer({ hours, minutes, onComplete }: HourglassTimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(hours * 60 * 60 + minutes * 60);
  const [fallenDots, setFallenDots] = useState(0);
  
  const totalDots = 40;
  const topDots = Math.floor(totalDots / 2);
  const bottomDots = totalDots - topDots;
  
  // Calculate how many dots should have fallen based on elapsed time
  const calculateDotsToFall = useCallback(() => {
    const totalTime = hours * 60 * 60 + minutes * 60;
    if (totalTime === 0) return 0;
    
    const elapsedTime = totalTime - remainingTime;
    const dotsToFall = Math.min(Math.floor((elapsedTime / totalTime) * topDots), topDots);
    return dotsToFall;
  }, [hours, minutes, remainingTime]);

  // Start or pause the timer
  const toggleTimer = () => {
    setIsRunning(prev => !prev);
  };

  // Reset the timer
  const resetTimer = () => {
    setIsRunning(false);
    setRemainingTime(hours * 60 * 60 + minutes * 60);
    setFallenDots(0);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime(prev => {
          const newTime = prev - 1;
          return newTime > 0 ? newTime : 0;
        });
        
        setFallenDots(calculateDotsToFall());
      }, 1000);
    } else if (remainingTime === 0 && isRunning) {
      setIsRunning(false);
      if (onComplete) {
        onComplete();
      }
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, remainingTime, calculateDotsToFall, onComplete]);

  // Format time to display
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 bg-zinc-900 p-8 rounded-xl">
      <Button
        className="bg-red-500 hover:bg-red-600 text-white font-bold text-xl px-10 py-6 rounded-xl"
        onClick={toggleTimer}
      >
        {isRunning ? "PAUSE" : remainingTime === 0 ? "RESET" : "START"}
      </Button>
      
      {remainingTime === 0 && !isRunning && (
        <Button 
          variant="outline" 
          className="mt-2" 
          onClick={resetTimer}
        >
          Reset Timer
        </Button>
      )}
      
      <div className="mt-4 text-xl font-mono text-white">
        {formatTime(remainingTime)}
      </div>
      
      <div className="w-64 h-80 relative mt-2">
        {/* Top dots container */}
        <div className="grid grid-cols-9 gap-2">
          {Array.from({ length: topDots }).map((_, index) => (
            <div
              key={`top-${index}`}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-500",
                index < fallenDots ? "opacity-0" : "bg-red-500"
              )}
              style={{
                animation: index < fallenDots ? `fallDot ${0.5 + Math.random()}s ease-in forwards` : 'none',
                animationDelay: `${index * 0.1}s`
              }}
            />
          ))}
        </div>
        
        {/* Bottom dots container */}
        <div className="grid grid-cols-9 gap-2 mt-2">
          {Array.from({ length: bottomDots }).map((_, index) => (
            <div
              key={`bottom-${index}`}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-500",
                index < fallenDots ? "bg-red-500" : "bg-zinc-700"
              )}
              style={{
                animation: index < fallenDots ? `fillDot ${0.5 + Math.random()}s ease-out forwards` : 'none',
                animationDelay: `${index * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
