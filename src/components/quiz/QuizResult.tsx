import React, { useState, useEffect, useRef } from "react";
import { QuizResult as QuizResultType, Dimension } from "../../types/quiz";
import { intelligences } from "../../data/intelligences";
import { riasecTypes } from "../../data/riasec";
import { gayaBelajarTypes } from "../../data/gaya_belajar";
import { getIntelligenceScoresList } from "../../lib/quiz-engine";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Award, Briefcase, RefreshCw, Star, AlertCircle, Home, GraduationCap, ChevronRight, Printer } from "lucide-react";
import gsap from "gsap";

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
  const activeData = isRiasec 
    ? riasecTypes 
    : isGayaBelajar 
      ? gayaBelajarTypes 
      : intelligences;

  const scoresList = getIntelligenceScoresList(result);
  const containerRef = useRef<HTMLDivElement>(null);

  const dimensionsOrder: Dimension[] = isRiasec
    ? ["realistic", "investigative", "artistic", "social", "enterprising", "conventional"]
    : isGayaBelajar
      ? ["gaya_visual", "gaya_auditori", "gaya_kinestetik"]
      : [
          "linguistik",
          "matematis",
          "spasial",
          "kinestetik",
          "musikal",
          "interpersonal",
          "intrapersonal",
          "naturalis",
        ];

  const orderedScores = dimensionsOrder.map((dim) => {
    return scoresList.find((s) => s.dimension === dim)!;
  });
  
  // State untuk memilih kecerdasan/kepribadian dominan mana yang sedang ditampilkan detailnya
  const [selectedDominant, setSelectedDominant] = useState<Dimension>(
    result.dominantTypes[0] || (isRiasec ? "realistic" : isGayaBelajar ? "gaya_visual" : "linguistik")
  );

  const isUndefinedResult = result.answers.length <= 1;

  const pData = isUndefinedResult
    ? {
        name: "undefined",
        description: "undefined",
        majors: ["undefined"],
        careers: ["undefined"],
      }
    : activeData[selectedDominant];

  // GSAP enter animations on mount (using gsap.from to avoid permanent hidden states)
  useEffect(() => {
    if (!containerRef.current) return;

    // Fade-in stagger header, cards, and details
    gsap.from(
      containerRef.current.querySelectorAll(".gsap-fade-in"),
      { 
        opacity: 0, 
        y: 30, 
        duration: 0.8, 
        ease: "power3.out", 
        stagger: 0.15, 
        clearProps: "all" 
      }
    );

    // Radar chart polygon scale up (outward elastic growth)
    gsap.from(
      containerRef.current.querySelectorAll(".gsap-radar-polygon"),
      { 
        scale: 0, 
        transformOrigin: "200px 180px",
        duration: 1.2, 
        ease: "elastic.out(1, 0.75)", 
        delay: 0.2, 
        clearProps: "all" 
      }
    );

    // Radar chart circles scale up (elastic pops)
    gsap.from(
      containerRef.current.querySelectorAll(".gsap-radar-vertex"),
      { 
        scale: 0, 
        transformOrigin: "200px 180px",
        duration: 0.8, 
        ease: "back.out(2.5)", 
        stagger: 0.05, 
        delay: 0.4, 
        clearProps: "all" 
      }
    );
  }, []);

  // Set dynamic document title for printing
  useEffect(() => {
    const originalTitle = document.title;
    const testName = isRiasec 
      ? "Kepribadian RIASEC" 
      : isGayaBelajar 
        ? "Gaya Belajar VAK" 
        : "Kecerdasan Majemuk";
    const userName = result.name || "";

    if (userName) {
      document.title = `${testName} | ${userName}`;
    } else {
      document.title = testName;
    }

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

  // Tentukan warna berdasarkan tipe kecerdasan/kepribadian
  const getThemeColors = (type: Dimension) => {
    switch (type) {
      // Majemuk
      case "linguistik":
        return {
          bg: "from-purple-500/8 via-indigo-500/2 to-transparent",
          border: "border-purple-100",
          badgeBg: "bg-purple-50 text-purple-700 border-purple-100",
          gradientText: "from-purple-700 to-indigo-700",
        };
      case "matematis":
        return {
          bg: "from-blue-500/8 via-sky-500/2 to-transparent",
          border: "border-blue-100",
          badgeBg: "bg-blue-50 text-blue-700 border-blue-100",
          gradientText: "from-blue-700 to-sky-700",
        };
      case "spasial":
        return {
          bg: "from-amber-500/8 via-orange-500/2 to-transparent",
          border: "border-amber-100",
          badgeBg: "bg-amber-50 text-amber-800 border-amber-100",
          gradientText: "from-amber-700 to-orange-700",
        };
      case "kinestetik":
        return {
          bg: "from-orange-500/8 via-rose-500/2 to-transparent",
          border: "border-orange-100",
          badgeBg: "bg-orange-50 text-orange-855 border-orange-100",
          gradientText: "from-orange-700 to-rose-700",
        };
      case "musikal":
        return {
          bg: "from-pink-500/8 via-rose-500/2 to-transparent",
          border: "border-pink-100",
          badgeBg: "bg-pink-50 text-pink-700 border-pink-100",
          gradientText: "from-pink-700 to-rose-700",
        };
      case "interpersonal":
        return {
          bg: "from-teal-500/8 via-emerald-500/2 to-transparent",
          border: "border-teal-100",
          badgeBg: "bg-teal-50 text-teal-850 border-teal-100",
          gradientText: "from-teal-700 to-emerald-700",
        };
      case "intrapersonal":
        return {
          bg: "from-indigo-500/8 via-violet-500/2 to-transparent",
          border: "border-indigo-100",
          badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-100",
          gradientText: "from-indigo-700 to-violet-700",
        };
      case "naturalis":
        return {
          bg: "from-emerald-500/8 via-green-500/2 to-transparent",
          border: "border-emerald-100",
          badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-100",
          gradientText: "from-emerald-700 to-green-700",
        };
      // RIASEC
      case "realistic":
        return {
          bg: "from-slate-500/8 via-slate-400/2 to-transparent",
          border: "border-slate-100",
          badgeBg: "bg-slate-100 text-slate-700 border-slate-200",
          gradientText: "from-slate-700 to-slate-800",
        };
      case "investigative":
        return {
          bg: "from-blue-500/8 via-sky-500/2 to-transparent",
          border: "border-blue-100",
          badgeBg: "bg-blue-50 text-blue-700 border-blue-100",
          gradientText: "from-blue-700 to-sky-700",
        };
      case "artistic":
        return {
          bg: "from-pink-500/8 via-rose-500/2 to-transparent",
          border: "border-pink-100",
          badgeBg: "bg-pink-50 text-pink-700 border-pink-100",
          gradientText: "from-pink-700 to-rose-700",
        };
      case "social":
        return {
          bg: "from-rose-500/8 via-red-500/2 to-transparent",
          border: "border-rose-100",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-100",
          gradientText: "from-rose-700 to-red-700",
        };
      case "enterprising":
        return {
          bg: "from-amber-500/8 via-orange-500/2 to-transparent",
          border: "border-amber-100",
          badgeBg: "bg-amber-50 text-amber-800 border-amber-100",
          gradientText: "from-amber-700 to-orange-700",
        };
      case "conventional":
        return {
          bg: "from-emerald-500/8 via-green-500/2 to-transparent",
          border: "border-emerald-100",
          badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-100",
          gradientText: "from-emerald-700 to-green-700",
        };
      // Gaya Belajar
      case "gaya_visual":
        return {
          bg: "from-indigo-500/8 via-indigo-500/2 to-transparent",
          border: "border-indigo-100",
          badgeBg: "bg-indigo-50 text-indigo-750 border-indigo-100",
          gradientText: "from-indigo-700 to-indigo-850",
        };
      case "gaya_auditori":
        return {
          bg: "from-purple-500/8 via-purple-500/2 to-transparent",
          border: "border-purple-100",
          badgeBg: "bg-purple-50 text-purple-750 border-purple-100",
          gradientText: "from-purple-700 to-purple-850",
        };
      case "gaya_kinestetik":
        return {
          bg: "from-orange-500/8 via-orange-500/2 to-transparent",
          border: "border-orange-100",
          badgeBg: "bg-orange-50 text-orange-850 border-orange-100",
          gradientText: "from-orange-700 to-rose-700",
        };
      default:
        return {
          bg: "from-slate-500/8 via-slate-400/2 to-transparent",
          border: "border-slate-100",
          badgeBg: "bg-slate-50 text-slate-700 border-slate-100",
          gradientText: "from-slate-700 to-slate-800",
        };
    }
  };

  const activeTheme = getThemeColors(selectedDominant);
  const isMultipleDominant = result.dominantTypes.length > 1;

  // Koordinat SVG Radar Chart (Center: 200, 180; Max Radius: 120)
  const cx = 200;
  const cy = 180;
  const maxRadius = 110;
  
  const numPoints = orderedScores.length;
  const maxScore = isRiasec ? 35 : isGayaBelajar ? 45 : 50;

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto flex flex-col gap-8 text-slate-900">
      
      {/* Dynamic Header for Printable Report */}
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
      
      {/* Hero Card - Crystalknows Style */}
      <div className={`gsap-fade-in relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br ${activeTheme.bg} p-8 sm:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-8 shadow-md`}>
        <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center font-extrabold border shadow-sm ${activeTheme.badgeBg} shrink-0 select-none`}>
          <Award className="w-10 h-10" />
        </div>
        <div className="flex flex-col gap-3 text-center sm:text-left w-full">
          <span className="w-fit mx-auto sm:mx-0 px-3.5 py-1 rounded-full text-[10px] font-black tracking-widest bg-slate-900 text-white uppercase shadow-sm">
            {isRiasec ? "Kepribadian Dominan" : isGayaBelajar ? "Gaya Belajar Dominan" : "Kecerdasan Dominan"}
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
              {/* Render dominant types as badges */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2.5 mt-1">
                {result.dominantTypes.map((type) => {
                  const intName = activeData[type]?.name
                    .replace("Kecerdasan ", "")
                    .replace(" (Realistik)", "")
                    .replace(" (Investigatif)", "")
                    .replace(" (Artistik)", "")
                    .replace(" (Sosial)", "")
                    .replace(" (Giat / Enterprising)", "")
                    .replace(" (Konvensional)", "")
                    .replace(" (Gaya Belajar Visual)", "")
                    .replace(" (Gaya Belajar Auditori)", "")
                    .replace(" (Gaya Belajar Kinestetik)", "");
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
                {isUndefinedResult 
                  ? "undefined" 
                  : (isRiasec 
                    ? `Kepribadian ${activeData[result.dominantTypes[0]]?.name}` 
                    : isGayaBelajar
                      ? `Gaya Belajar ${activeData[result.dominantTypes[0]]?.name.replace(" (Gaya Belajar Visual)", "").replace(" (Gaya Belajar Auditori)", "").replace(" (Gaya Belajar Kinestetik)", "")}`
                      : `Kecerdasan ${activeData[result.dominantTypes[0]]?.name.replace("Kecerdasan ", "")}`)}
              </h1>
              <p className="text-sm sm:text-base text-slate-500 mt-1">
                {isUndefinedResult ? "undefined" : "Karakteristik berpikir Anda paling menonjol pada aspek ini."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid: Grafik vs Detail */}
      <div className="grid lg:grid-cols-5 gap-8">
        
        {/* Kolom Kiri (2/5): Diagram Radar */}
        <div className="gsap-fade-in lg:col-span-2 flex flex-col h-fit">
          <h3 className="text-slate-950 font-black tracking-wider text-xs uppercase mb-3 px-1">
            DIAGRAM SKORING TES
          </h3>

          <div className="overflow-hidden border border-slate-100 rounded-3xl bg-white p-6 shadow-xl shadow-slate-100/40 min-h-[380px] flex items-center justify-center">
            {/* DIAGRAM RADAR (RADAR CHART SVG) */}
            <div className="w-full flex items-center justify-center select-none">
              <svg viewBox="0 0 400 360" className="w-full max-w-[340px] h-auto overflow-visible">
                <defs>
                  <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.05" />
                  </radialGradient>
                </defs>

                {/* Radar Grid Lines (Web) */}
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
                      className="stroke-slate-150"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* User Score Area (Filled Polygon) */}
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

                {/* Score Vertices (Circles) */}
                {orderedScores.map((scoreItem, i) => {
                  const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
                  const r = (scoreItem.score / maxScore) * maxRadius;
                  const x = cx + r * Math.cos(angle);
                  const y = cy + r * Math.sin(angle);
                  const isDominant = result.dominantTypes.includes(scoreItem.dimension);
                  
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r={isDominant ? "5.5" : "4"}
                      className={`gsap-radar-vertex ${
                        isDominant 
                          ? "fill-blue-650 stroke-white stroke-2 shadow-sm" 
                          : "fill-slate-900 stroke-white stroke-1.5"
                      }`}
                    />
                  );
                })}

                {/* Text Labels */}
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

                  const shortNames: Record<Dimension, string> = {
                    linguistik: "Linguistik",
                    matematis: "Matematis",
                    spasial: "Spasial",
                    kinestetik: "Kinestetik",
                    musikal: "Musikal",
                    interpersonal: "Interpersonal",
                    intrapersonal: "Intrapersonal",
                    naturalis: "Naturalis",
                    realistic: "Realistic",
                    investigative: "Investigative",
                    artistic: "Artistic",
                    social: "Social",
                    enterprising: "Enterprising",
                    conventional: "Conventional",
                    gaya_visual: "Visual",
                    gaya_auditori: "Auditori",
                    gaya_kinestetik: "Kinestetik",
                  };
                  const label = shortNames[scoreItem.dimension];
                  const isDominant = result.dominantTypes.includes(scoreItem.dimension);

                  return (
                    <text
                      key={i}
                      x={x}
                      y={y}
                      dy={dy}
                      textAnchor={anchor}
                      className={`text-[10px] sm:text-xs font-black select-none ${
                        isDominant 
                          ? "fill-slate-950 font-black" 
                          : "fill-slate-450"
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

        {/* Kolom Kanan (3/5): Detail Aspek Dominan (Stacked Sections - Crystalknows Style) */}
        <div className="gsap-fade-in lg:col-span-3 flex flex-col gap-6">
          {/* Pemilih Aspek Dominan (jika ada lebih dari 1) */}
          {isMultipleDominant && (
            <div className="flex flex-col gap-2 bg-white border border-slate-100 rounded-3xl p-5 shadow-md shadow-slate-100/30">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                Navigasi Detail Analisis:
              </span>
              <div className="flex flex-wrap gap-2">
                {result.dominantTypes.map((type) => {
                  const isActive = selectedDominant === type;
                  const intName = activeData[type]?.name
                    .replace("Kecerdasan ", "")
                    .replace(" (Realistik)", "")
                    .replace(" (Investigatif)", "")
                    .replace(" (Artistik)", "")
                    .replace(" (Sosial)", "")
                    .replace(" (Giat / Enterprising)", "")
                    .replace(" (Konvensional)", "")
                    .replace(" (Gaya Belajar Visual)", "")
                    .replace(" (Gaya Belajar Auditori)", "")
                    .replace(" (Gaya Belajar Kinestetik)", "");
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

          {/* STACKED DETAIL SECTIONS (Overview, Majors, Careers) */}
          <Card className="flex flex-col gap-8">
            {/* 1. PENJELASAN */}
            <div className="flex flex-col gap-3 pb-8 border-b border-slate-100">
              <h4 className={`text-lg sm:text-xl font-extrabold flex items-center gap-2 text-slate-900`}>
                <Star className="w-5.5 h-5.5 text-blue-600 fill-blue-600/10" />
                {isRiasec 
                  ? `Penjelasan Tipe ${pData.name}` 
                  : isGayaBelajar
                    ? `Penjelasan ${pData.name}`
                    : `Penjelasan Kecerdasan ${pData.name.replace("Kecerdasan ", "")}`}
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

            {/* Footer Buttons - Crystalknows Style */}
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
      </div>
      {/* Print-only Footer */}
      <div className="hidden print:block text-center mt-12 pt-4 border-t border-slate-200 text-xs text-slate-400">
        © 2026 Test Personal | Zalde.
      </div>
    </div>
  );
};
