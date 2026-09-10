import { Dimension } from "../../../types/quiz";

export interface ThemeColors {
  bg: string;
  border: string;
  badgeBg: string;
  gradientText: string;
}

export const DIMENSION_SHORT_NAMES: Record<Dimension, string> = {
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

export function getDimensionOrder(testType: string): Dimension[] {
  if (testType === "riasec") {
    return ["realistic", "investigative", "artistic", "social", "enterprising", "conventional"];
  }
  if (testType === "gaya-belajar") {
    return ["gaya_visual", "gaya_auditori", "gaya_kinestetik"];
  }
  return [
    "linguistik",
    "matematis",
    "spasial",
    "kinestetik",
    "musikal",
    "interpersonal",
    "intrapersonal",
    "naturalis",
  ];
}

export function formatTypeName(rawName: string = ""): string {
  return rawName
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
}

export function getThemeColors(type: Dimension): ThemeColors {
  switch (type) {
    case "linguistik":
      return { bg: "from-purple-500/8 via-indigo-500/2 to-transparent", border: "border-purple-100", badgeBg: "bg-purple-50 text-purple-700 border-purple-100", gradientText: "from-purple-700 to-indigo-700" };
    case "matematis":
      return { bg: "from-blue-500/8 via-sky-500/2 to-transparent", border: "border-blue-100", badgeBg: "bg-blue-50 text-blue-700 border-blue-100", gradientText: "from-blue-700 to-sky-700" };
    case "spasial":
      return { bg: "from-amber-500/8 via-orange-500/2 to-transparent", border: "border-amber-100", badgeBg: "bg-amber-50 text-amber-800 border-amber-100", gradientText: "from-amber-700 to-orange-700" };
    case "kinestetik":
      return { bg: "from-orange-500/8 via-rose-500/2 to-transparent", border: "border-orange-100", badgeBg: "bg-orange-50 text-orange-855 border-orange-100", gradientText: "from-orange-700 to-rose-700" };
    case "musikal":
      return { bg: "from-pink-500/8 via-rose-500/2 to-transparent", border: "border-pink-100", badgeBg: "bg-pink-50 text-pink-700 border-pink-100", gradientText: "from-pink-700 to-rose-700" };
    case "interpersonal":
      return { bg: "from-teal-500/8 via-emerald-500/2 to-transparent", border: "border-teal-100", badgeBg: "bg-teal-50 text-teal-850 border-teal-100", gradientText: "from-teal-700 to-emerald-700" };
    case "intrapersonal":
      return { bg: "from-indigo-500/8 via-violet-500/2 to-transparent", border: "border-indigo-100", badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-100", gradientText: "from-indigo-700 to-violet-700" };
    case "naturalis":
      return { bg: "from-emerald-500/8 via-green-500/2 to-transparent", border: "border-emerald-100", badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-100", gradientText: "from-emerald-700 to-green-700" };
    case "realistic":
      return { bg: "from-slate-500/8 via-slate-400/2 to-transparent", border: "border-slate-100", badgeBg: "bg-slate-100 text-slate-700 border-slate-200", gradientText: "from-slate-700 to-slate-800" };
    case "investigative":
      return { bg: "from-blue-500/8 via-sky-500/2 to-transparent", border: "border-blue-100", badgeBg: "bg-blue-50 text-blue-700 border-blue-100", gradientText: "from-blue-700 to-sky-700" };
    case "artistic":
      return { bg: "from-pink-500/8 via-rose-500/2 to-transparent", border: "border-pink-100", badgeBg: "bg-pink-50 text-pink-700 border-pink-100", gradientText: "from-pink-700 to-rose-700" };
    case "social":
      return { bg: "from-rose-500/8 via-red-500/2 to-transparent", border: "border-rose-100", badgeBg: "bg-rose-50 text-rose-700 border-rose-100", gradientText: "from-rose-700 to-red-700" };
    case "enterprising":
      return { bg: "from-amber-500/8 via-orange-500/2 to-transparent", border: "border-amber-100", badgeBg: "bg-amber-50 text-amber-800 border-amber-100", gradientText: "from-amber-700 to-orange-700" };
    case "conventional":
      return { bg: "from-emerald-500/8 via-green-500/2 to-transparent", border: "border-emerald-100", badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-100", gradientText: "from-emerald-700 to-green-700" };
    case "gaya_visual":
      return { bg: "from-indigo-500/8 via-indigo-500/2 to-transparent", border: "border-indigo-100", badgeBg: "bg-indigo-50 text-indigo-750 border-indigo-100", gradientText: "from-indigo-700 to-indigo-850" };
    case "gaya_auditori":
      return { bg: "from-purple-500/8 via-purple-500/2 to-transparent", border: "border-purple-100", badgeBg: "bg-purple-50 text-purple-750 border-purple-100", gradientText: "from-purple-700 to-purple-850" };
    case "gaya_kinestetik":
      return { bg: "from-orange-500/8 via-orange-500/2 to-transparent", border: "border-orange-100", badgeBg: "bg-orange-50 text-orange-850 border-orange-100", gradientText: "from-orange-700 to-rose-700" };
    default:
      return { bg: "from-slate-500/8 via-slate-400/2 to-transparent", border: "border-slate-100", badgeBg: "bg-slate-50 text-slate-700 border-slate-100", gradientText: "from-slate-700 to-slate-800" };
  }
}
