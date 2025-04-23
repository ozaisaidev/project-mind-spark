
import React, { useEffect, useRef, useState } from "react";

// Arrow as in user image: big vertical of dots, wider dot at tip, 
// directions N S E W (N in red), on solid dark circle, neutral "compass" style.

const COMPASS_SIZE = 151;    // match your provided image size closely
const ARROW_COLOR = "#fff";
const COMPASS_BG = "#191A1B";
const COMPASS_BORDER = "#191A1B";
const DOT_RADIUS = 7.5; // slightly larger for visibility
const TIP_RADIUS = 10;
const SIDE_DOT_RADIUS = 5.5;
const DOTS = [
  // y values for the vertical line of the arrow
  { x: 75.5, y: 29 },    // topmost (just below "N")
  { x: 75.5, y: 42 },
  { x: 75.5, y: 55 },
  { x: 75.5, y: 68 },
  { x: 75.5, y: 81 },
  { x: 75.5, y: 94 },
  { x: 75.5, y: 107 },
  { x: 75.5, y: 120 },
  { x: 75.5, y: 133 },
];

// Side dots at the tip (to make the arrowhead/cross)
const SIDE_DOTS = [
  { x: 59, y: 29 },    // left of tip
  { x: 92, y: 29 },    // right of tip
];

// Direction letters and their positions
const labels = [
  { label: "N", x: 75.5, y: 19, fill: "#e53935", fontWeight: 700 },
  { label: "S", x: 75.5, y: 146, fill: "#eadeff", fontWeight: 500 },
  { label: "E", x: 135, y: 85, fill: "#eadeff", fontWeight: 500 },
  { label: "W", x: 15, y: 85, fill: "#eadeff", fontWeight: 500 },
];

// Get angle for pointing arrowhead
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
      className="fixed z-50"
      style={{
        left: "50%",
        bottom: "32px",
        transform: "translateX(-50%)",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <svg
        ref={svgRef}
        width={COMPASS_SIZE}
        height={COMPASS_SIZE}
        viewBox={`0 0 ${COMPASS_SIZE} ${COMPASS_SIZE}`}
        style={{
          display: "block",
          background: COMPASS_BG,
          borderRadius: "50%",
          boxShadow: "0 0 0 0 #0000",
          border: `2px solid ${COMPASS_BORDER}`,
        }}
      >
        {/* Outer circle for compass */}
        <circle
          cx={COMPASS_SIZE / 2}
          cy={COMPASS_SIZE / 2}
          r={COMPASS_SIZE / 2 - 1}
          fill={COMPASS_BG}
          stroke={COMPASS_BG}
          strokeWidth={2}
        />
        {/* Direction Labels */}
        {labels.map(l => (
          <text
            key={l.label}
            x={l.x}
            y={l.y}
            textAnchor="middle"
            fill={l.fill}
            fontWeight={l.fontWeight}
            fontFamily="monospace"
            fontSize={l.label === "N" ? 18 : 15}
            alignmentBaseline="middle"
            style={{ letterSpacing: "2px", userSelect: "none" }}
          >
            {l.label}
          </text>
        ))}
        {/* Dots group, rotated to point arrow where mouse is */}
        <g
          style={{
            transition: "transform 0.16s cubic-bezier(.8,0,.25,1)",
            transform: `rotate(${(angle * 180) / Math.PI + 90}deg)`,
            transformOrigin: "75.5px 81px", // slightly above vertical center, matches the column center
          }}
        >
          {/* Vertical line dots */}
          {DOTS.map((pt, i) => (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r={i === 0 ? TIP_RADIUS : DOT_RADIUS}
              fill={ARROW_COLOR}
              opacity={1}
              style={{
                filter: "drop-shadow(0 0 3px #fff) drop-shadow(0 0 8px #fff8)"
              }}
            />
          ))}
          {/* Two side dots at tip */}
          {SIDE_DOTS.map((pt, i) => (
            <circle
              key={"side" + i}
              cx={pt.x}
              cy={pt.y}
              r={SIDE_DOT_RADIUS}
              fill={ARROW_COLOR}
              opacity={1}
              style={{
                filter: "drop-shadow(0 0 2.4px #fff)"
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
