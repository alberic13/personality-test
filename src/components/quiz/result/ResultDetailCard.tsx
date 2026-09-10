import React from "react";
import { Dimension, IntelligenceType, QuizResult as QuizResultType } from "../../../types/quiz";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { Star, GraduationCap, Briefcase, RefreshCw, Printer, Home, ChevronRight } from "lucide-react";
import { getThemeColors, formatTypeName } from "./resultThemes";

interface ResultDetailCardProps {
  selectedDominant: Dimension;
  setSelectedDominant: (d: Dimension) => void;
  result: QuizResultType;
  pData: IntelligenceType;
  activeData: Record<string, IntelligenceType>;
  isMultipleDominant: boolean;
  isUndefinedResult: boolean;
  isRiasec: boolean;
  isGayaBelajar: boolean;
  onRetake: () => void;
  onGoHome: () => void;
}

export const ResultDetailCard: React.FC<ResultDetailCardProps> = ({
  selectedDominant,
  setSelectedDominant,
  result,
  pData,
  activeData,
  isMultipleDominant,
  isUndefinedResult,
  isRiasec,
  isGayaBelajar,
  onRetake,
  onGoHome,
}) => {
  const explanationTitle = isRiasec
    ? `Penjelasan Tipe ${pData.name}`
    : isGayaBelajar
      ? `Penjelasan ${pData.name}`
      : `Penjelasan Kecerdasan ${pData.name.replace("Kecerdasan ", "")}`;

  return (
    <div className="gsap-fade-in lg:col-span-3 flex flex-col gap-6">
      {isMultipleDominant && (
        <div className="flex flex-col gap-2 bg-white border border-slate-100 rounded-3xl p-5 shadow-md shadow-slate-100/30">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
            Navigasi Detail Analisis:
          </span>
          <div className="flex flex-wrap gap-2">
            {result.dominantTypes.map((type) => {
              const isActive = selectedDominant === type;
              const intName = formatTypeName(activeData[type]?.name);
              const tabTheme = getThemeColors(type);
              return (
                <button
                  key={type}
                  onClick={() => setSelectedDominant(type)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                    isActive
                      ? `${tabTheme.badgeBg} border-current/20 shadow-sm ring-1 ring-offset-1 ring-slate-200`
                      : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {intName}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <Card className="flex flex-col gap-8">
        {/* 1. PENJELASAN */}
        <div className="flex flex-col gap-3 pb-8 border-b border-slate-100">
          <h4 className="text-lg sm:text-xl font-extrabold flex items-center gap-2 text-slate-900">
            <Star className="w-5.5 h-5.5 text-blue-600 fill-blue-600/10" />
            {explanationTitle}
          </h4>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            {pData.description}
          </p>
        </div>

        {/* 2. JURUSAN KULIAH */}
        <div className="flex flex-col gap-3 pb-8 border-b border-slate-100">
          <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-indigo-650" />
            Rekomendasi Jurusan Kuliah
          </h4>
          <p className="text-xs sm:text-sm text-slate-500">Pilihan program studi akademis yang sangat sesuai untuk mengembangkan bakat alami Anda:</p>
          {isUndefinedResult ? (
            <span className="text-slate-500 font-semibold text-sm">undefined</span>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3 mt-2">
              {pData.majors.map((major, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 text-sm font-bold text-slate-800">
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                  <span>{major}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. PROFESI & KARIR */}
        <div className="flex flex-col gap-3">
          <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5.5 h-5.5 text-emerald-650" />
            Profesi & Karir yang Cocok
          </h4>
          <p className="text-xs sm:text-sm text-slate-500">Karier di mana Anda dapat berprestasi dan mengoptimalkan keahlian alami Anda:</p>
          {isUndefinedResult ? (
            <span className="text-slate-500 font-semibold text-sm">undefined</span>
          ) : (
            <div className="flex flex-wrap gap-2 mt-2">
              {pData.careers.map((career, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-slate-100 text-slate-800 border border-slate-200/50 hover:bg-slate-200/60 transition-colors"
                >
                  {career}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-150 pt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3.5 mt-6 print:hidden">
          <Button variant="primary" onClick={onRetake} className="w-full sm:w-auto flex items-center">
            <RefreshCw className="mr-2 w-4.5 h-4.5 animate-spin-hover" />
            Ulangi Tes
          </Button>
          <Button variant="outline" onClick={() => window.print()} className="w-full sm:w-auto flex items-center">
            <Printer className="mr-2 w-4.5 h-4.5" />
            Cetak / Simpan PDF
          </Button>
          <Button variant="outline" onClick={onGoHome} className="w-full sm:w-auto flex items-center">
            <Home className="mr-2 w-4.5 h-4.5" />
            Kembali ke Beranda
          </Button>
        </div>
      </Card>
    </div>
  );
};
