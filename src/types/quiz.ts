export type Dimension =
  | "linguistik"
  | "matematis"
  | "spasial"
  | "kinestetik"
  | "musikal"
  | "interpersonal"
  | "intrapersonal"
  | "naturalis"
  | "realistic"
  | "investigative"
  | "artistic"
  | "social"
  | "enterprising"
  | "conventional"
  | "gaya_visual"
  | "gaya_auditori"
  | "gaya_kinestetik";

export interface Question {
  id: number;
  text: string;
  dimension: Dimension;
}

export interface Answer {
  questionId: number;
  score: number; // 1 to 5
}

export interface IntelligenceScore {
  dimension: Dimension;
  name: string;
  score: number;       // Skor mentah
  percentage: number;  // Persentase per dimensi
}

export interface QuizResult {
  id: string;
  dominantTypes: Dimension[]; // Jenis kecerdasan/kepribadian tertinggi
  scores: Record<string, number>; // Persentase per dimensi (using string to handle dynamic types cleanly)
  date: string;
  answers: Answer[];
  testType?: "majemuk" | "riasec" | "gaya-belajar";
  name?: string;
  email?: string;
}

export interface IntelligenceType {
  key: Dimension;
  name: string;
  description: string;
  majors: string[];
  careers: string[];
}
