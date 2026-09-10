import React from "react";
import { Dimension } from "../../../types/quiz";
import { AspectCard, AspectItem } from "./AspectCard";
import { useAspectCarousel } from "./useAspectCarousel";
import { motion } from "motion/react";

interface AspectDeckProps {
  classrooms: AspectItem[];
  selectedRoom: Dimension | null;
  setSelectedRoom: (room: Dimension) => void;
  isRiasec: boolean;
  isGayaBelajar: boolean;
}

export const AspectDeck: React.FC<AspectDeckProps> = ({
  classrooms,
  selectedRoom,
  setSelectedRoom,
  isRiasec,
  isGayaBelajar,
}) => {
  const { aspectsList, cardSize, handleMove } = useAspectCarousel(classrooms, Boolean(selectedRoom));

  const categoryName = isRiasec ? "Kepribadian RIASEC" : isGayaBelajar ? "Gaya Belajar" : "Kecerdasan Majemuk";

  return (
    <div className="flex flex-col gap-6 relative">
      <h3 className="text-xl font-extrabold text-slate-900 text-center">
        Aspek <span className="font-serif italic font-normal text-indigo-600">{categoryName}</span>
      </h3>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          const swipeThreshold = 50;
          if (info.offset.x < -swipeThreshold) {
            handleMove(1);
          } else if (info.offset.x > swipeThreshold) {
            handleMove(-1);
          }
        }}
        className="relative w-full overflow-hidden bg-slate-100/20 rounded-3xl border border-slate-200/50 cursor-grab active:cursor-grabbing"
        style={{ height: 500 }}
      >
        {aspectsList.map((aspect, index) => {
          const position = aspectsList.length % 2
            ? index - (aspectsList.length - 1) / 2
            : index - aspectsList.length / 2;
          return (
            <AspectCard
              key={aspect.tempId}
              aspect={aspect}
              handleMove={handleMove}
              setSelectedRoom={setSelectedRoom}
              position={position}
              cardSize={cardSize}
            />
          );
        })}
      </motion.div>
    </div>
  );
};
