import React from "react";
import { Dimension, IntelligenceScore } from "../../../types/quiz";
import { DIMENSION_SHORT_NAMES } from "./resultThemes";

interface RadarChartProps {
  orderedScores: IntelligenceScore[];
  dominantTypes: Dimension[];
  maxScore: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  orderedScores,
  dominantTypes,
  maxScore,
}) => {
  const cx = 200;
  const cy = 180;
  const maxRadius = 110;
  const numPoints = orderedScores.length;

  return (
    <div className="gsap-fade-in lg:col-span-2 flex flex-col h-fit">
      <h3 className="text-slate-950 font-black tracking-wider text-xs uppercase mb-3 px-1">
        DIAGRAM SKORING TES
      </h3>

      <div className="overflow-hidden border border-slate-100 rounded-3xl bg-white p-6 shadow-xl shadow-slate-100/40 min-h-[380px] flex items-center justify-center">
        <div className="w-full flex items-center justify-center select-none">
          <svg viewBox="0 0 400 360" className="w-full max-w-[340px] h-auto overflow-visible">
            <defs>
              <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.05" />
              </radialGradient>
            </defs>

            {/* Radar Grid Lines */}
            {[0.2, 0.4, 0.6, 0.8, 1].map((scale, gridIdx) => {
              const r = maxRadius * scale;
              const pointsStr = orderedScores.map((_, i) => {
                const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
                const x = cx + r * Math.cos(angle);
                const y = cy + r * Math.sin(angle);
                return `${x},${y}`;
              }).join(" ");

              return (
                <polygon
                  key={gridIdx}
                  points={pointsStr}
                  fill="none"
                  className="stroke-slate-100"
                  strokeWidth="1.5"
                />
              );
            })}

            {/* Axis Web lines */}
            {orderedScores.map((_, i) => {
              const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
              const x = cx + maxRadius * Math.cos(angle);
              const y = cy + maxRadius * Math.sin(angle);
              return (
                <line
                  key={i}
                  x1="200"
                  y1="180"
                  x2={x}
                  y2={y}
                  className="stroke-slate-200"
                  strokeWidth="1"
                />
              );
            })}

            {/* User Score Area */}
            <polygon
              points={orderedScores.map((scoreItem, i) => {
                const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
                const r = (scoreItem.score / maxScore) * maxRadius;
                const x = cx + r * Math.cos(angle);
                const y = cy + r * Math.sin(angle);
                return `${x},${y}`;
              }).join(" ")}
              fill="url(#radarGrad)"
              stroke="#2563eb"
              strokeWidth="2.5"
              className="gsap-radar-polygon filter drop-shadow-[0_2px_4px_rgba(37,99,235,0.15)]"
            />

            {/* Score Vertices */}
            {orderedScores.map((scoreItem, i) => {
              const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
              const r = (scoreItem.score / maxScore) * maxRadius;
              const x = cx + r * Math.cos(angle);
              const y = cy + r * Math.sin(angle);
              const isDominant = dominantTypes.includes(scoreItem.dimension);

              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={isDominant ? "5.5" : "4"}
                  className={`gsap-radar-vertex ${
                    isDominant
                      ? "fill-blue-600 stroke-white stroke-2 shadow-sm"
                      : "fill-slate-900 stroke-white stroke-1.5"
                  }`}
                />
              );
            })}

            {/* Labels */}
            {orderedScores.map((scoreItem, i) => {
              const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
              const r = maxRadius + 18;
              const x = cx + r * Math.cos(angle);
              const y = cy + r * Math.sin(angle);

              const cosVal = Math.cos(angle);
              const sinVal = Math.sin(angle);
              let anchor: "middle" | "start" | "end" = "middle";
              if (cosVal > 0.1) anchor = "start";
              if (cosVal < -0.1) anchor = "end";

              let dy = "0.33em";
              if (sinVal > 0.7) dy = "0.8em";
              if (sinVal < -0.7) dy = "-0.2em";

              const label = DIMENSION_SHORT_NAMES[scoreItem.dimension];
              const isDominant = dominantTypes.includes(scoreItem.dimension);

              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  dy={dy}
                  textAnchor={anchor}
                  className={`text-[10px] sm:text-xs font-black select-none ${
                    isDominant ? "fill-slate-950 font-black" : "fill-slate-500"
                  }`}
                >
                  {label} ({scoreItem.score})
                </text>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};
