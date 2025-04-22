
import { Hourglass } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export function TimerButton() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

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
          className="rounded-full w-16 h-16 bg-white/90 hover:bg-white/95 flex items-center justify-center p-0 border-0"
          onClick={(e) => {
            e.preventDefault();
            const newHours = Math.min(hours + 1, 99);
            setHours(newHours);
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            const newMinutes = Math.min(minutes + 1, 59);
            setMinutes(newMinutes);
          }}
        >
          <div className="flex flex-col items-center gap-1">
            <Hourglass className="w-6 h-6" />
            <div className="text-xs font-mono">
              {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}
            </div>
          </div>
        </Button>
      </div>
    </Link>
  );
}
