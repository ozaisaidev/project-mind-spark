
import React, { useEffect, useRef } from "react";

// Glassy orb that chases the mouse with a trailing lag effect.
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
      // Interpolate toward mouse with slightly more speed (0.19 was 0.14)
      orbX += (mouseX - orbX) * 0.19;
      orbY += (mouseY - orbY) * 0.19;
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
      className="
        fixed top-0 left-0 z-40 pointer-events-none
        w-24 h-24 max-w-xs max-h-xs
        rounded-full
        backdrop-blur-2xl
        bg-white/5
        shadow-[0_4px_32px_3px_rgba(100,100,119,0.08)]
        transition-all
        will-change-transform
      "
      style={{
        mixBlendMode: "lighten",
      }}
    ></div>
  );
}
