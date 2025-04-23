
import React, { useRef, useEffect, useState } from "react";

// Utility to calculate the angle from the center to mouse
function getAngle(cx: number, cy: number, mx: number, my: number) {
  const dx = mx - cx;
  const dy = my - cy;
  return Math.atan2(dy, dx);
}

const DOTS_ARROW = [
  // (x, y) coordinates for dot positions (percentage relative to viewbox 100x100)
  [50, 22],
  [50, 32],
  [50, 42],
  [50, 52],
  [50, 62],
  [50, 72], // Arrow shaft (vertical)
  [50, 82], // Arrow tip
  [42, 62],
  [58, 62],
  [46, 42],
  [54, 42],
  [38, 50], // West
  [62, 50], // East
  [50, 90], // S
  [50, 10], // N
];

// Label positions relative to viewbox
const LABELS = [
  { label: "N", x: 49, y: 8, className: "text-red-500" },
  { label: "S", x: 49, y: 97, className: "text-white" },
  { label: "W", x: 8, y: 54, className: "text-white" },
  { label: "E", x: 89, y: 54, className: "text-white" },
];

export function MouseTrackerArrow() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [angle, setAngle] = useState(0);

  // Track mouse relative to the center of the arrow
  useEffect(() => {
    function handleMouse(e: MouseEvent) {
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setAngle(getAngle(cx, cy, e.clientX, e.clientY));
    }
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div
      className="fixed bottom-8 left-1/2  z-50"
      style={{
        transform: "translateX(-50%)",
        pointerEvents: "none",
      }}
    >
      <svg
        ref={svgRef}
        width={120}
        height={120}
        viewBox="0 0 100 100"
        className="drop-shadow-xl"
        style={{
          background: "rgba(18,18,18,0.95)",
          borderRadius: "50%",
          boxShadow: "0 2px 16px 0 rgba(0,0,0,0.38)",
        }}
      >
        {/* Main circle */}
        <circle cx={50} cy={50} r={48} fill="#131313" stroke="#333" strokeWidth="1.5"/>
        {/* Rotating Arrow dots */}
        <g
          style={{
            transition: "transform 0.14s cubic-bezier(.85,0,.2,1)",
            transform: `rotate(${(angle * 180) / Math.PI + 90}deg)`,
            transformOrigin: "50% 50%",
          }}
        >
          {DOTS_ARROW.slice(0, 7).map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 6 ? 3.7 : 3.1} fill="white" />
          ))}
          {/* tips/side wings of the arrow */}
          <circle cx={42} cy={62} r={2.3} fill="white" />
          <circle cx={58} cy={62} r={2.3} fill="white" />
          <circle cx={46} cy={42} r={2} fill="white" />
          <circle cx={54} cy={42} r={2} fill="white" />
        </g>
        {/* Cardinal Dots Outside Arrow */}
        <circle cx={38} cy={50} r={2.1} fill="white" opacity={.8}/>
        <circle cx={62} cy={50} r={2.1} fill="white" opacity={.8}/>
        <circle cx={50} cy={90} r={2.1} fill="white" opacity={.8}/>
        <circle cx={50} cy={10} r={2.1} fill="white" opacity={.8}/>
        {/* Cardinal Labels */}
        {LABELS.map(l => (
          <text
            key={l.label}
            x={l.x}
            y={l.y}
            fontSize="8"
            fontWeight={l.label === "N" ? 700 : 500}
            textAnchor="middle"
            fill={l.className === "text-red-500" ? "#ef4444" : "#fff"}
            style={{ fontFamily: "monospace", letterSpacing: 0.2 }}
          >
            {l.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
