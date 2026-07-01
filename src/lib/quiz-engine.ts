import { Answer, Dimension, IntelligenceScore, QuizResult } from "../types/quiz";
import { questions as multipleIntelligenceQuestions } from "../data/questions";
import { riasecQuestions } from "../data/riasec_questions";

export function calculateQuizResult(answers: Answer[], testType: "majemuk" | "riasec" = "majemuk"): QuizResult {
  const isRiasec = testType === "riasec";
  const dimensions: Dimension[] = isRiasec
    ? ["realistic", "investigative", "artistic", "social", "enterprising", "conventional"]
    : ["linguistik", "matematis", "spasial", "kinestetik", "musikal", "interpersonal", "intrapersonal", "naturalis"];
  
  const activeQuestions = isRiasec ? riasecQuestions : multipleIntelligenceQuestions;
  const maxScorePerDim = isRiasec ? 35 : 50; // 7 Qs * 5 vs 10 Qs * 5

  const scores: Record<string, number> = {};
  const rawScores: Record<string, number> = {};

  dimensions.forEach((dim) => {
    scores[dim] = 0;
    rawScores[dim] = 0;
  });

  // 1. Hitung skor mentah per dimensi
  dimensions.forEach((dim) => {
    const dimQuestions = activeQuestions.filter((q) => q.dimension === dim);
    
    let sum = 0;
    dimQuestions.forEach((q) => {
      const answer = answers.find((a) => a.questionId === q.id);
      sum += answer ? answer.score : 0; // Default ke 0 jika kosong
    });
    
    rawScores[dim] = sum;
    // Konversi ke persentase: (skor / maxScorePerDim) * 100
    scores[dim] = Math.round((sum / maxScorePerDim) * 100);
  });

  // 2. Tentukan dominasi kecerdasan/kepribadian (skor mentah tertinggi)
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
    testType,
  };
}

export function getIntelligenceScoresList(result: QuizResult): IntelligenceScore[] {
  const testType = result.testType || "majemuk";
  const isRiasec = testType === "riasec";
  const activeQuestions = isRiasec ? riasecQuestions : multipleIntelligenceQuestions;

  const labelMap: Record<Dimension, string> = {
    // Majemuk
    linguistik: "Kecerdasan Verbal / Linguistik",
    matematis: "Kecerdasan Logis / Matematis",
    spasial: "Kecerdasan Visual / Spasial",
    kinestetik: "Kecerdasan Kinestetik",
    musikal: "Kecerdasan Musikal",
    interpersonal: "Kecerdasan Interpersonal",
    intrapersonal: "Kecerdasan Intrapersonal",
    naturalis: "Kecerdasan Naturalis",
    // RIASEC
    realistic: "Realistic (Realistik)",
    investigative: "Investigative (Investigatif)",
    artistic: "Artistic (Artistik)",
    social: "Social (Sosial)",
    enterprising: "Enterprising (Giat)",
    conventional: "Conventional (Konvensional)",
  };

  const dimensions = isRiasec
    ? ["realistic" as Dimension, "investigative" as Dimension, "artistic" as Dimension, "social" as Dimension, "enterprising" as Dimension, "conventional" as Dimension]
    : ["linguistik" as Dimension, "matematis" as Dimension, "spasial" as Dimension, "kinestetik" as Dimension, "musikal" as Dimension, "interpersonal" as Dimension, "intrapersonal" as Dimension, "naturalis" as Dimension];

  return dimensions.map((dim) => {
    // Kembalikan skor mentah dari jawaban asli
    const dimQuestions = activeQuestions.filter((q) => q.dimension === dim);
    let sum = 0;
    dimQuestions.forEach((q) => {
      const answer = result.answers.find((a) => a.questionId === q.id);
      sum += answer ? answer.score : 0;
    });

    return {
      dimension: dim,
      name: labelMap[dim],
      score: sum,
      percentage: result.scores[dim] || 0,
    };
  }).sort((a, b) => b.percentage - a.percentage); // Urutkan dari persentase tertinggi ke terendah
}
