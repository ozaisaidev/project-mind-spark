
import { AlarmClock } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { TimerModal } from "./TimerModal";

export function TimerButton() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="rounded-full w-16 h-16 bg-white/90 hover:bg-white/95 flex items-center justify-center p-0 border-0 shadow-lg"
        onClick={() => setModalOpen(true)}
      >
        <AlarmClock className="w-8 h-8 text-red-500" />
      </Button>
      <TimerModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
