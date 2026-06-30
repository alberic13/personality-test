import { Answer, Dimension, IntelligenceScore, QuizResult } from "../types/quiz";
import { questions } from "../data/questions";

export function calculateQuizResult(answers: Answer[]): QuizResult {
  const dimensions: Dimension[] = [
    "linguistik",
    "matematis",
    "spasial",
    "kinestetik",
    "musikal",
    "interpersonal",
    "intrapersonal",
    "naturalis",
  ];
  
  const scores: Record<Dimension, number> = {
    linguistik: 0,
    matematis: 0,
    spasial: 0,
    kinestetik: 0,
    musikal: 0,
    interpersonal: 0,
    intrapersonal: 0,
    naturalis: 0,
  };

  // 1. Hitung skor mentah per dimensi
  const rawScores: Record<Dimension, number> = {
    linguistik: 0,
    matematis: 0,
    spasial: 0,
    kinestetik: 0,
    musikal: 0,
    interpersonal: 0,
    intrapersonal: 0,
    naturalis: 0,
  };

  dimensions.forEach((dim) => {
    const dimQuestions = questions.filter((q) => q.dimension === dim);
    
    let sum = 0;
    dimQuestions.forEach((q) => {
      const answer = answers.find((a) => a.questionId === q.id);
      sum += answer ? answer.score : 0; // Default ke 0 jika kosong (belum dijawab)
    });
    
    rawScores[dim] = sum;
    // Konversi ke persentase: (skor / 50) * 100
    scores[dim] = Math.round((sum / 50) * 100);
  });

  // 2. Tentukan dominasi kecerdasan (skor mentah tertinggi)
  let maxRawScore = -1;
  dimensions.forEach((dim) => {
    if (rawScores[dim] > maxRawScore) {
      maxRawScore = rawScores[dim];
    }
  });

  const dominantTypes = maxRawScore > 0 
    ? dimensions.filter((dim) => rawScores[dim] === maxRawScore) 
    : [];

  const id = Math.random().toString(36).substring(2, 11);
  const date = new Date().toISOString();

  return {
    id,
    dominantTypes,
    scores,
    date,
    answers,
  };
}

export function getIntelligenceScoresList(result: QuizResult): IntelligenceScore[] {
  const labelMap: Record<Dimension, string> = {
    linguistik: "Kecerdasan Verbal / Linguistik",
    matematis: "Kecerdasan Logis / Matematis",
    spasial: "Kecerdasan Visual / Spasial",
    kinestetik: "Kecerdasan Kinestetik",
    musikal: "Kecerdasan Musikal",
    interpersonal: "Kecerdasan Interpersonal",
    intrapersonal: "Kecerdasan Intrapersonal",
    naturalis: "Kecerdasan Naturalis",
  };

  return (Object.keys(result.scores) as Dimension[]).map((dim) => {
    // Kembalikan skor mentah dari jawaban asli
    const dimQuestions = questions.filter((q) => q.dimension === dim);
    let sum = 0;
    dimQuestions.forEach((q) => {
      const answer = result.answers.find((a) => a.questionId === q.id);
      sum += answer ? answer.score : 0;
    });

    return {
      dimension: dim,
      name: labelMap[dim],
      score: sum,
      percentage: result.scores[dim],
    };
  }).sort((a, b) => b.percentage - a.percentage); // Urutkan dari persentase tertinggi ke terendah
}
