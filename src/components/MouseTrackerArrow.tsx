
import React, { useEffect, useRef, useState } from "react";

// Arrow based on user image, stylized and 0.75x smaller
const COMPASS_SIZE = 115; // 0.75x of 151
const ARROW_COLOR = "#fff";
const COMPASS_BG = "linear-gradient(135deg, #201837 0%, #26294A 100%)";
const COMPASS_BORDER = "#191A1B";

// Arrow: a line with a tip, a shadowed dot at the center, simpler than before.
const CENTER = COMPASS_SIZE / 2;
const TIP_LEN = 42;
const SHAFT_LEN = 31;
const ARROW_SHAFT_W = 5;
const ARROW_TIP_R = 9;
const SHADOW_COLOR = "#0005";

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
      // INSTANT angle with no animation
      setAngle(getAngle(midX, midY, e.clientX, e.clientY));
    }
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Arrow endpoints
  const theta = angle - Math.PI / 2; // "up" is 0deg
  const tipX = CENTER + TIP_LEN * Math.sin(theta);
  const tipY = CENTER - TIP_LEN * Math.cos(theta);
  const shaftX = CENTER + SHAFT_LEN * Math.sin(theta);
  const shaftY = CENTER - SHAFT_LEN * Math.cos(theta);

  return (
    <div
      className="fixed z-50"
      style={{
        left: "50%",
        bottom: "23px",
        transform: "translateX(-50%)",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <svg
        ref={svgRef}
        width={COMPASS_SIZE}
        height={COMPASS_SIZE}
        style={{
          display: "block",
          background: "none",
          borderRadius: "50%",
          boxShadow: "0 4px 40px 0 #000a",
        }}
      >
        {/* Gradient Bg */}
        <defs>
          <radialGradient id="compass-bg" cx="50%" cy="55%" r="93%">
            <stop offset="0%" stopColor="#28264D" />
            <stop offset="100%" stopColor="#211534" />
          </radialGradient>
        </defs>
        <circle
          cx={CENTER}
          cy={CENTER}
          r={CENTER - 2}
          fill="url(#compass-bg)"
          stroke={COMPASS_BORDER}
          strokeWidth={4}
        />

        {/* Main Arrow */}
        <g>
          {/* Shaft */}
          <line
            x1={CENTER}
            y1={CENTER}
            x2={shaftX}
            y2={shaftY}
            stroke={ARROW_COLOR}
            strokeWidth={ARROW_SHAFT_W}
            strokeLinecap="round"
            opacity={0.89}
            style={{ filter: "drop-shadow(0 2px 6px #eee7)" }}
          />
          {/* Tip */}
          <circle
            cx={tipX}
            cy={tipY}
            r={ARROW_TIP_R}
            fill={ARROW_COLOR}
            style={{
              filter: "drop-shadow(0 0 10px #fffd) drop-shadow(0 0 16px #fff4)",
            }}
            opacity={0.92}
          />
          {/* Center dot with shadow */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={10}
            fill="#fff"
            opacity={0.77}
            style={{ filter: "drop-shadow(0 0 10px #fff2) drop-shadow(0 2px 8px #fff1)" }}
          />
        </g>
      </svg>
    </div>
  );
}
