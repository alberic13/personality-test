export type Dimension =
  | "linguistik"
  | "matematis"
  | "spasial"
  | "kinestetik"
  | "musikal"
  | "interpersonal"
  | "intrapersonal"
  | "naturalis";

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
  score: number;       // Skor mentah 10 - 50
  percentage: number;  // Persentase 20% - 100%
}

export interface QuizResult {
  id: string;
  dominantTypes: Dimension[]; // Jenis kecerdasan tertinggi
  scores: Record<Dimension, number>; // Persentase (20% - 100%) per dimensi
  date: string;
  answers: Answer[];
}

export interface IntelligenceType {
  key: Dimension;
  name: string;
  description: string;
  majors: string[];
  careers: string[];
}
