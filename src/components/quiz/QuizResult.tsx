import React, { useState, useEffect, useRef } from "react";
import { QuizResult as QuizResultType, Dimension } from "../../types/quiz";
import { intelligences } from "../../data/intelligences";
import { riasecTypes } from "../../data/riasec";
import { gayaBelajarTypes } from "../../data/gaya_belajar";
import { getIntelligenceScoresList } from "../../lib/quiz-engine";
import { AlertCircle } from "lucide-react";
import { Button } from "../ui/Button";
import gsap from "gsap";
import { getDimensionOrder, getThemeColors } from "./result/resultThemes";
import { RadarChart } from "./result/RadarChart";
import { ResultHero } from "./result/ResultHero";
import { ResultDetailCard } from "./result/ResultDetailCard";

interface QuizResultProps {
  result: QuizResultType;
  onRetake: () => void;
  onGoHome: () => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({
  result,
  onRetake,
  onGoHome,
}) => {
  const testType = result.testType || "majemuk";
  const isRiasec = testType === "riasec";
  const isGayaBelajar = testType === "gaya-belajar";
  const activeData = isRiasec ? riasecTypes : isGayaBelajar ? gayaBelajarTypes : intelligences;

  const scoresList = getIntelligenceScoresList(result);
  const containerRef = useRef<HTMLDivElement>(null);

  const dimensionsOrder = getDimensionOrder(testType);
  const orderedScores = dimensionsOrder.map((dim) => scoresList.find((s) => s.dimension === dim)!);

  const [selectedDominant, setSelectedDominant] = useState<Dimension>(
    result.dominantTypes[0] || (isRiasec ? "realistic" : isGayaBelajar ? "gaya_visual" : "linguistik")
  );

  const isUndefinedResult = result.answers.length <= 1;
  const pData = isUndefinedResult
    ? { key: selectedDominant, name: "undefined", description: "undefined", majors: ["undefined"], careers: ["undefined"] }
    : activeData[selectedDominant];

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.from(containerRef.current.querySelectorAll(".gsap-fade-in"), {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15,
      clearProps: "all",
    });

    gsap.from(containerRef.current.querySelectorAll(".gsap-radar-polygon"), {
      scale: 0,
      transformOrigin: "200px 180px",
      duration: 1.2,
      ease: "elastic.out(1, 0.75)",
      delay: 0.2,
      clearProps: "all",
    });

    gsap.from(containerRef.current.querySelectorAll(".gsap-radar-vertex"), {
      scale: 0,
      transformOrigin: "200px 180px",
      duration: 0.8,
      ease: "back.out(2.5)",
      stagger: 0.05,
      delay: 0.4,
      clearProps: "all",
    });
  }, []);

  useEffect(() => {
    const originalTitle = document.title;
    const testName = isRiasec ? "Kepribadian RIASEC" : isGayaBelajar ? "Gaya Belajar VAK" : "Kecerdasan Majemuk";
    document.title = result.name ? `${testName} | ${result.name}` : testName;
    return () => {
      document.title = originalTitle;
    };
  }, [result, isRiasec, isGayaBelajar]);

  if (!pData) {
    return (
      <div className="text-center p-8 text-slate-900">
        <AlertCircle className="mx-auto w-12 h-12 text-rose-500 mb-4" />
        <h2 className="text-xl font-bold">Terjadi Kesalahan</h2>
        <p className="text-slate-500">Data hasil tes tidak ditemukan.</p>
        <Button className="mt-4" onClick={onGoHome}>Kembali</Button>
      </div>
    );
  }

  const activeTheme = getThemeColors(selectedDominant);
  const isMultipleDominant = result.dominantTypes.length > 1;
  const maxScore = isRiasec ? 35 : isGayaBelajar ? 45 : 50;

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto flex flex-col gap-8 text-slate-900">
      {/* Header Report */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-200 gap-2">
        <div>
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
            {isRiasec ? "Laporan Evaluasi Kepribadian" : isGayaBelajar ? "Laporan Gaya Belajar" : "Laporan Evaluasi Kecerdasan"}
          </span>
          <h2 className="text-2xl font-black text-slate-900 leading-tight">
            {isRiasec ? "Tes Kepribadian RIASEC" : isGayaBelajar ? "Tes Gaya Belajar VAK" : "Tes Kecerdasan Majemuk"}
          </h2>
        </div>
        {result.name && (
          <div className="text-left sm:text-right">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Peserta</span>
            <p className="text-base font-bold text-slate-900">{result.name}</p>
          </div>
        )}
      </div>

      <ResultHero
        result={result}
        selectedDominant={selectedDominant}
        setSelectedDominant={setSelectedDominant}
        isMultipleDominant={isMultipleDominant}
        isUndefinedResult={isUndefinedResult}
        activeData={activeData}
        activeTheme={activeTheme}
        isRiasec={isRiasec}
        isGayaBelajar={isGayaBelajar}
      />

      <div className="grid lg:grid-cols-5 gap-8">
        <RadarChart
          orderedScores={orderedScores}
          dominantTypes={result.dominantTypes}
          maxScore={maxScore}
        />

        <ResultDetailCard
          selectedDominant={selectedDominant}
          setSelectedDominant={setSelectedDominant}
          result={result}
          pData={pData}
          activeData={activeData}
          isMultipleDominant={isMultipleDominant}
          isUndefinedResult={isUndefinedResult}
          isRiasec={isRiasec}
          isGayaBelajar={isGayaBelajar}
          onRetake={onRetake}
          onGoHome={onGoHome}
        />
      </div>

      <div className="hidden print:block text-center mt-12 pt-4 border-t border-slate-200 text-xs text-slate-400">
        © 2026 Test Personal | Developed by{" "}
        <a
          href="https://github.com/alberic13"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-slate-600 underline"
        >
          Muchammad Zalde Zahwa Putra
        </a>
      </div>
    </div>
  );
};
