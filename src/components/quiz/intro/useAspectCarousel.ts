import { useState, useEffect, useCallback } from "react";
import { AspectItem } from "./AspectCard";

export function useAspectCarousel(initialClassrooms: AspectItem[], isPaused: boolean = false) {
  const [aspectsList, setAspectsList] = useState<AspectItem[]>(() =>
    initialClassrooms.map((c, i) => ({ ...c, tempId: i }))
  );
  const [cardSize, setCardSize] = useState(350);

  const handleMove = useCallback((steps: number) => {
    setAspectsList((prev) => {
      const newList = [...prev];
      if (steps > 0) {
        for (let i = steps; i > 0; i--) {
          const item = newList.shift();
          if (!item) return prev;
          newList.push({ ...item, tempId: Math.random() });
        }
      } else {
        for (let i = steps; i < 0; i++) {
          const item = newList.pop();
          if (!item) return prev;
          newList.unshift({ ...item, tempId: Math.random() });
        }
      }
      return newList;
    });
  }, []);

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 350 : 280);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleMove(1);
    }, 3500);

    return () => clearInterval(interval);
  }, [handleMove, isPaused]);

  return {
    aspectsList,
    cardSize,
    handleMove,
  };
}
