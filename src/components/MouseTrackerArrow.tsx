
import React, { useEffect, useRef, useState } from "react";

// This dot-arrow is inspired by the one you attached, with a vertical dot "arrow" and side arms.

const DOT_ARROW = [
  { x: 50, y: 17 },
  { x: 50, y: 27 },
  { x: 50, y: 37 },
  { x: 50, y: 47 },
  { x: 50, y: 57 },
  { x: 50, y: 67 }, // "Tip" (center dot)
  { x: 42, y: 37 }, // left arm
  { x: 58, y: 37 }, // right arm
];

function getAngle(centerX: number, centerY: number, mouseX: number, mouseY: number) {
  const dx = mouseX - centerX;
  const dy = mouseY - centerY;
  return Math.atan2(dy, dx);
}

export function MouseTrackerArrow() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    function handleMouse(e: MouseEvent) {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const midX = rect.left + rect.width / 2;
      const midY = rect.top + rect.height / 2;
      setAngle(getAngle(midX, midY, e.clientX, e.clientY));
    }
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div
      className="fixed bottom-8 left-1/2 z-50"
      style={{
        transform: "translateX(-50%)",
        pointerEvents: "none",
        userSelect: "none"
      }}
    >
      <svg
        ref={svgRef}
        width={90}
        height={95}
        viewBox="0 0 90 95"
        style={{
          background: "#191A1B",
          borderRadius: "50%",
          boxShadow: "0 2px 22px 0 #0008, 0 0 0 4px #191A1B",
          transition: "box-shadow 0.19s",
        }}
      >
        {/* Arrow "stem" */}
        <g style={{
          transition: "transform 0.12s cubic-bezier(.9,0,.15,1)",
          transform: `rotate(${(angle * 180) / Math.PI + 90}deg)`,
          transformOrigin: "50% 65%",
        }}>
          {DOT_ARROW.slice(0, 6).map((pt, i) => (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r={5.5 - i * 0.65}
              fill="#fff"
              opacity={0.96}
              style={{
                filter: "drop-shadow(0 0 3.8px #fff8) drop-shadow(0 0 10px #fff8)"
              }}
            />))}
          {/* Arms */}
          <circle cx={DOT_ARROW[6].x} cy={DOT_ARROW[6].y} r={4} fill="#fff" opacity={0.8} />
          <circle cx={DOT_ARROW[7].x} cy={DOT_ARROW[7].y} r={4} fill="#fff" opacity={0.8} />
        </g>
        {/* Center dot */}
        <circle cx="50" cy="67" r="3.6" fill="#fff" opacity={0.98} />
      </svg>
    </div>
  );
}
