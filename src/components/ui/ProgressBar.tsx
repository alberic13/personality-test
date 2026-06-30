import React from "react";

interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  showValue?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showValue = false,
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1 text-sm font-medium text-slate-650">
          {label && <span>{label}</span>}
          {showValue && <span>{Math.round(value)}%</span>}
        </div>
      )}
      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full animate-shimmer rounded-full transition-all duration-500 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

interface DualProgressBarProps {
  leftLabel: string;
  rightLabel: string;
  leftValue: number; // 0 to 100
  rightValue: number; // 0 to 100
  className?: string;
}

export const DualProgressBar: React.FC<DualProgressBarProps> = ({
  leftLabel,
  rightLabel,
  leftValue,
  rightValue,
  className = "",
}) => {
  // Dominan warna mana yang aktif
  const leftIsDominant = leftValue >= rightValue;

  return (
    <div className={`w-full flex flex-col gap-2 ${className}`}>
      {/* Label atas */}
      <div className="flex justify-between text-xs sm:text-sm font-semibold">
        <span className={leftIsDominant ? "text-violet-600 dark:text-violet-400 font-bold" : "text-zinc-500 dark:text-zinc-500"}>
          {leftLabel} ({leftValue}%)
        </span>
        <span className={!leftIsDominant ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-zinc-500 dark:text-zinc-500"}>
          ({rightValue}%) {rightLabel}
        </span>
      </div>

      {/* Bar visual */}
      <div className="w-full h-4 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex relative">
        {/* Sisi Kiri (e.g. Extraversion) */}
        <div
          className={`h-full transition-all duration-700 ease-out ${
            leftIsDominant
              ? "bg-gradient-to-r from-violet-500 to-violet-600"
              : "bg-zinc-300 dark:bg-zinc-700"
          }`}
          style={{ width: `${leftValue}%` }}
        />
        {/* Divider tengah yang tipis */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white dark:bg-zinc-950 z-10" />
        {/* Sisi Kanan (e.g. Introversion) */}
        <div
          className={`h-full transition-all duration-700 ease-out ${
            !leftIsDominant
              ? "bg-gradient-to-r from-emerald-500 to-emerald-600"
              : "bg-zinc-300 dark:bg-zinc-700"
          }`}
          style={{ width: `${rightValue}%` }}
        />
      </div>
    </div>
  );
};
