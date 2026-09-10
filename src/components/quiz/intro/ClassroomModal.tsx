import React, { useEffect, useRef } from "react";
import { Dimension } from "../../../types/quiz";
import { intelligences } from "../../../data/intelligences";
import { riasecTypes } from "../../../data/riasec";
import { gayaBelajarTypes } from "../../../data/gaya_belajar";
import { Button } from "../../ui/Button";
import gsap from "gsap";

interface ClassroomModalProps {
  selectedRoom: Dimension | null;
  onClose: () => void;
  isRiasec: boolean;
  isGayaBelajar: boolean;
}

export const ClassroomModal: React.FC<ClassroomModalProps> = ({
  selectedRoom,
  onClose,
  isRiasec,
  isGayaBelajar,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedRoom && modalRef.current && overlayRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" }
      );
    }
  }, [selectedRoom]);

  useEffect(() => {
    if (!selectedRoom) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedRoom, onClose]);

  if (!selectedRoom) return null;

  const currentData = isRiasec
    ? riasecTypes[selectedRoom]
    : isGayaBelajar
      ? gayaBelajarTypes[selectedRoom]
      : intelligences[selectedRoom];

  if (!currentData) return null;

  const aspectCategory = isRiasec ? "Aspek Kepribadian" : isGayaBelajar ? "Gaya Belajar" : "Aspek Kecerdasan";

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) {
          onClose();
        }
      }}
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div ref={modalRef} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl flex flex-col gap-5 relative opacity-0 z-50">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer"
          title="Tutup"
          aria-label="Tutup modal"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-extrabold shadow-inner select-none shrink-0">
            💡
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
              {aspectCategory}
            </span>
            <h3 className="text-lg font-black text-slate-900 leading-tight">
              {currentData.name}
            </h3>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-sm text-slate-600">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <h5 className="font-extrabold text-slate-800 text-xs uppercase tracking-wide mb-1.5">Deskripsi:</h5>
            <p className="leading-relaxed text-xs sm:text-sm">
              {currentData.description}
            </p>
          </div>

          <div>
            <h5 className="font-extrabold text-slate-800 text-xs uppercase tracking-wide mb-2">Saran Jurusan Kuliah:</h5>
            <div className="flex flex-wrap gap-1.5">
              {currentData.majors?.map((major, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full bg-indigo-50/50 text-indigo-700 text-[11px] font-bold border border-indigo-100/50">
                  🎓 {major}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-extrabold text-slate-800 text-xs uppercase tracking-wide mb-2">Profesi & Karir yang Cocok:</h5>
            <div className="flex flex-wrap gap-1.5">
              {currentData.careers?.map((career, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-800 text-[11px] font-bold border border-slate-200/50">
                  💼 {career}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-slate-100 pt-4 flex justify-end">
          <Button variant="primary" className="py-2.5 px-6 font-bold" onClick={onClose}>
            Tutup
          </Button>
        </div>
      </div>
    </div>
  );
};
