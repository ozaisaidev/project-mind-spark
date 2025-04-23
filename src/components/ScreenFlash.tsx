
import { useEffect, useState } from "react";

export function ScreenFlash() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    function trigger() {
      setActive(true);
      setTimeout(() => setActive(false), 380);
    }
    window.addEventListener('timer:screenFlash', trigger);
    return () => {
      window.removeEventListener('timer:screenFlash', trigger);
    }
  }, []);

  return active ? (
    <div className="fixed z-[9999] inset-0 bg-[#ea384c] pointer-events-none animate-fade-in">
      {/* visually just a red overlay */}
    </div>
  ) : null;
}
