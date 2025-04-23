
import React, { useEffect, useRef } from "react";

// Minimal glassmorphic orb that closely but softly chases the mouse.
// Smaller, more transparent, no white border.
export function MouseOrb() {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let orbX = mouseX, orbY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    let running = true;
    function animate() {
      // Move a bit faster than before for better tracking (0.21)
      orbX += (mouseX - orbX) * 0.21;
      orbY += (mouseY - orbY) * 0.21;
      if (orb) {
        orb.style.transform = `translate(-50%, -50%) translate(${orbX}px, ${orbY}px)`;
      }
      if (running) requestAnimationFrame(animate);
    }

    document.addEventListener("mousemove", handleMouseMove);
    requestAnimationFrame(animate);

    return () => {
      running = false;
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={orbRef}
      className={
        `
        fixed top-0 left-0 z-40 pointer-events-none select-none
        w-16 h-16
        rounded-full
        backdrop-blur-xl
        bg-white/6
        shadow-[0_8px_40px_8px_rgba(50,50,64,0.08)]
        transition-all animate-fade-in
        will-change-transform
        `
      }
      style={{
        mixBlendMode: "lighten",
        border: "none",        // Ensure NO border
        boxShadow: "0 8px 40px 8px rgba(50,50,64,0.14)", // Soft shadow, less obvious
        background: "linear-gradient(135deg, rgba(70,68,130,0.13) 0%, rgba(80,80,120,0.10) 100%)",
        opacity: 0.88,
      }}
    ></div>
  );
}
