
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export function TimerButton() {
  const [hours, setHours] = useState(15);
  const [minutes, setMinutes] = useState(7);

  const incrementHours = () => {
    setHours((prev) => Math.min(prev + 1, 99));
  };

  const decrementHours = () => {
    setHours((prev) => Math.max(prev - 1, 0));
  };

  const incrementMinutes = () => {
    setMinutes((prev) => Math.min(prev + 1, 59));
  };

  const decrementMinutes = () => {
    setMinutes((prev) => Math.max(prev - 1, 0));
  };

  return (
    <Link to="/timer" state={{ hours, minutes }}>
      <div className="fixed top-4 right-4 z-10">
        <Button 
          variant="outline" 
          className="rounded-full w-16 h-16 bg-white/90 hover:bg-white/95 flex flex-col p-0 border-0"
        >
          <div className="flex items-center">
            <button onClick={incrementHours} className="p-1">
              <ChevronUp className="h-3 w-3" />
            </button>
            <span className="text-base font-mono">{hours}°</span>
          </div>
          <div className="flex items-center">
            <button onClick={decrementMinutes} className="p-1">
              <ChevronDown className="h-3 w-3" />
            </button>
            <span className="text-base font-mono">{minutes}°</span>
          </div>
        </Button>
      </div>
    </Link>
  );
}
