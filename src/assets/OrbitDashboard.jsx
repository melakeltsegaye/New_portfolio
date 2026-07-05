import React, { useEffect, useState } from "react";
import { Satellite } from "lucide-react";

const nodes = [
  { name: "MER-01", status: "nominal", signal: 98, ring: 1, angle: 20 },
  { name: "MER-04", status: "nominal", signal: 91, ring: 1, angle: 160 },
  { name: "MER-07", status: "degraded", signal: 62, ring: 2, angle: 70 },
  { name: "MER-09", status: "nominal", signal: 95, ring: 2, angle: 210 },
  { name: "MER-12", status: "nominal", signal: 88, ring: 2, angle: 300 },
  { name: "MER-15", status: "lost", signal: 0, ring: 3, angle: 40 },
  { name: "MER-18", status: "nominal", signal: 93, ring: 3, angle: 140 },
  { name: "MER-21", status: "nominal", signal: 97, ring: 3, angle: 250 },
];

const statusColor = {
  nominal: "hsl(164 94% 43%)",
  degraded: "hsl(45 93% 58%)",
  lost: "hsl(0 63% 45%)",
};

function OrbitRings() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (t) => {
      setRotation(((t - start) / 1000) * 6); // slow drift, degrees/sec
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const size = 460;
  const cx = size / 2;
  const cy = size / 2;
  const ringRadii = { 1: 90, 2: 145, 3: 200 };

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(262 83% 58%)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="hsl(262 83% 58%)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={cx} cy={cy} r={120} fill="url(#coreGlow)" />

        {Object.values(ringRadii).map((r, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="hsl(240 20% 15%)"
            strokeWidth="1"
            strokeDasharray="2 6"
          />
        ))}

        <circle cx={cx} cy={cy} r={22} fill="hsl(240 52% 6%)" stroke="hsl(262 83% 58%)" strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r={5} fill="hsl(262 83% 58%)" />

        {nodes.map((n) => {
          const r = ringRadii[n.ring];
          const rad = ((n.angle + rotation * (n.ring === 1 ? 1 : n.ring === 2 ? -0.6 : 0.35)) * Math.PI) / 180;
          const x = cx + r * Math.cos(rad);
          const y = cy + r * Math.sin(rad);
          return (
            <g key={n.name} style={{ transition: "opacity 0.3s" }}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke={statusColor[n.status]} strokeOpacity="0.15" strokeWidth="1" />
              <circle cx={x} cy={y} r={n.status === "lost" ? 4 : 6} fill={statusColor[n.status]} opacity={n.status === "lost" ? 0.4 : 1} />
              {n.status === "nominal" && (
                <circle cx={x} cy={y} r={6} fill="none" stroke={statusColor[n.status]} strokeWidth="1">
                  <animate attributeName="r" values="6;14;6" dur="2.4s" repeatCount="indefinite" begin={`${n.angle / 60}s`} />
                  <animate attributeName="opacity" values="0.6;0;0.6" dur="2.4s" repeatCount="indefinite" begin={`${n.angle / 60}s`} />
                </circle>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function OrbitOnly() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-6"
      style={{ background: "transparent", color: "hsl(210 40% 96%)", fontFamily: "'Inter', sans-serif" }}
    >
      <div className="flex flex-col items-center gap-4">
        <OrbitRings />
       
      </div>
    </div>
  );
}
