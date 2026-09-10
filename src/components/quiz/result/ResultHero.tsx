import React from "react";
import { Award } from "lucide-react";
import { Dimension, IntelligenceType, QuizResult as QuizResultType } from "../../../types/quiz";
import { getThemeColors, ThemeColors, formatTypeName } from "./resultThemes";

interface ResultHeroProps {
  result: QuizResultType;
  selectedDominant: Dimension;
  setSelectedDominant: (d: Dimension) => void;
  isMultipleDominant: boolean;
  isUndefinedResult: boolean;
  activeData: Record<string, IntelligenceType>;
  activeTheme: ThemeColors;
  isRiasec: boolean;
  isGayaBelajar: boolean;
}

export const ResultHero: React.FC<ResultHeroProps> = ({
  result,
  selectedDominant,
  setSelectedDominant,
  isMultipleDominant,
  isUndefinedResult,
  activeData,
  activeTheme,
  isRiasec,
  isGayaBelajar,
}) => {
  const badgeLabel = isRiasec
    ? "Kepribadian Dominan"
    : isGayaBelajar
      ? "Gaya Belajar Dominan"
      : "Kecerdasan Dominan";

  const singleTitle = isUndefinedResult
    ? "undefined"
    : isRiasec
      ? `Kepribadian ${activeData[result.dominantTypes[0]]?.name}`
      : isGayaBelajar
        ? `Gaya Belajar ${formatTypeName(activeData[result.dominantTypes[0]]?.name)}`
        : `Kecerdasan ${formatTypeName(activeData[result.dominantTypes[0]]?.name)}`;

  return (
    <div className={`gsap-fade-in relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br ${activeTheme.bg} p-8 sm:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-8 shadow-md`}>
      <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center font-extrabold border shadow-sm ${activeTheme.badgeBg} shrink-0 select-none`}>
        <Award className="w-10 h-10" />
      </div>

      <div className="flex flex-col gap-3 text-center sm:text-left w-full">
        <span className="w-fit mx-auto sm:mx-0 px-3.5 py-1 rounded-full text-[10px] font-black tracking-widest bg-slate-900 text-white uppercase shadow-sm">
          {badgeLabel}
        </span>

        {isMultipleDominant ? (
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {isRiasec ? "Profil Kepribadian RIASEC Anda" : isGayaBelajar ? "Profil Gaya Belajar VAK Anda" : "Profil Kecerdasan Majemuk Anda"}
            </h1>
            <p className="text-sm text-slate-500 -mt-1 leading-relaxed">
              {isRiasec
                ? "Anda memiliki beberapa tipe minat/kepribadian yang menonjol secara seimbang:"
                : isGayaBelajar
                  ? "Anda memiliki beberapa tipe gaya belajar yang menonjol secara seimbang:"
                  : "Anda memiliki beberapa area kecerdasan yang menonjol secara seimbang:"}
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2.5 mt-1">
              {result.dominantTypes.map((type) => {
                const intName = formatTypeName(activeData[type]?.name);
                const badgeColors = getThemeColors(type);
                return (
                  <span
                    key={type}
                    className={`px-4 py-2 rounded-full text-xs font-black tracking-wide border shadow-sm cursor-pointer hover:scale-105 transition-all ${
                      selectedDominant === type
                        ? `${badgeColors.badgeBg} ring-2 ring-slate-800 ring-offset-2`
                        : "bg-white text-slate-600 border-slate-200"
                    }`}
                    onClick={() => setSelectedDominant(type)}
                  >
                    {intName} {selectedDominant === type && "🎯"}
                  </span>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              {singleTitle}
            </h1>
            <p className="text-sm sm:text-base text-slate-500 mt-1">
              {isUndefinedResult ? "undefined" : "Karakteristik berpikir Anda paling menonjol pada aspek ini."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
