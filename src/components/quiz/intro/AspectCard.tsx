import React from "react";
import { Dimension } from "../../../types/quiz";

const SQRT_3200 = Math.sqrt(3200);

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface AspectItem {
  dimension: Dimension;
  code: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  bgIcon: string;
  tempId: number;
}

interface AspectCardProps {
  position: number;
  aspect: AspectItem;
  handleMove: (steps: number) => void;
  setSelectedRoom: (room: Dimension) => void;
  cardSize: number;
}

export const AspectCard: React.FC<AspectCardProps> = ({
  position,
  aspect,
  handleMove,
  setSelectedRoom,
  cardSize,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => {
        if (isCenter) {
          setSelectedRoom(aspect.dimension);
        } else {
          handleMove(position);
        }
      }}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 sm:p-8 transition-all duration-500 ease-in-out flex flex-col justify-between rounded-xl",
        isCenter
          ? "z-10 bg-slate-900 text-white border-slate-900 shadow-2xl scale-100"
          : "z-0 bg-white text-slate-800 border-slate-200 hover:border-indigo-400 hover:shadow-lg scale-90"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(40px 0%, calc(100% - 40px) 0%, 100% 40px, 100% 100%, calc(100% - 40px) 100%, 40px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.65) * position}px)
          translateY(${isCenter ? -35 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px #e2e8f0" : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className={cn("absolute block origin-top-right rotate-45", isCenter ? "bg-slate-800" : "bg-slate-100")}
        style={{
          right: -2,
          top: 38,
          width: SQRT_3200,
          height: 1,
        }}
      />

      <div className="flex flex-col gap-4">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shadow-inner shrink-0", aspect.bgIcon)}>
          {aspect.icon}
        </div>
        <div className="flex flex-col gap-1">
          <h3 className={cn("text-base sm:text-lg font-black leading-tight", isCenter ? "text-white" : "text-slate-900")}>
            {aspect.name}
          </h3>
          <p className={cn("text-xs sm:text-sm leading-relaxed mt-1", isCenter ? "text-slate-300" : "text-slate-500")}>
            {aspect.description}
          </p>
        </div>
      </div>

      <div className={cn("text-xs font-bold flex items-center gap-1 mt-auto pt-3 border-t", isCenter ? "text-indigo-400 border-slate-800" : "text-indigo-600 border-slate-100")}>
        {isCenter ? "Lihat Detail Aspek →" : "Geser ke Tengah"}
      </div>
    </div>
  );
};
