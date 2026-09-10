import { useState } from "react";
import { Answer, QuizResult as QuizResultType } from "../types/quiz";
import { questions as multipleIntelligenceQuestions } from "../data/questions";
import { riasecQuestions } from "../data/riasec_questions";
import { gayaBelajarQuestions } from "../data/gaya_belajar_questions";
import { calculateQuizResult, getIntelligenceScoresList } from "../lib/quiz-engine";

export type TestType = "majemuk" | "riasec" | "gaya-belajar";
export type ViewState = "select-test" | "intro" | "quiz" | "result";

export function useQuizFlow() {
  const [testType, setTestType] = useState<TestType>("majemuk");
  const [viewState, setViewState] = useState<ViewState>("select-test");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentResult, setCurrentResult] = useState<QuizResultType | null>(null);

  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [pendingAnswers, setPendingAnswers] = useState<Answer[] | null>(null);

  const activeQuestions =
    testType === "riasec"
      ? riasecQuestions
      : testType === "gaya-belajar"
        ? gayaBelajarQuestions
        : multipleIntelligenceQuestions;

  const handleSelectTest = (type: TestType) => {
    setTestType(type);
    setViewState("intro");
  };

  const handleStartQuiz = () => {
    setAnswers([]);
    setCurrentIndex(0);
    setViewState("quiz");
  };

  const handleAnswer = (questionId: number, score: number) => {
    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.questionId !== questionId);
      return [...filtered, { questionId, score }];
    });
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSubmitQuiz = () => {
    if (answers.length < activeQuestions.length) return;
    setPendingAnswers(answers);
    setIsLeadModalOpen(true);
  };

  const handleSimulateQuiz = () => {
    const mockAnswers = activeQuestions.map((q) => {
      const randomScore = Math.floor(Math.random() * 5) + 1;
      return { questionId: q.id, score: randomScore };
    });
    setPendingAnswers(mockAnswers);
    setIsLeadModalOpen(true);
  };

  const handleLeadSubmit = async (name: string, email: string) => {
    if (!pendingAnswers) return;

    setIsSubmittingLead(true);
    const result = calculateQuizResult(pendingAnswers, testType);
    result.name = name;
    result.email = email;

    const scoresList = getIntelligenceScoresList(result);
    const scoresMap: Record<string, number> = {};
    scoresList.forEach((s) => {
      scoresMap[s.dimension] = s.score;
    });

    try {
      await fetch("/api/submit-to-sheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          scores: scoresMap,
          dominant: result.dominantTypes,
          date: result.date,
          testType,
        }),
      });
    } catch (error) {
      console.error("Gagal mengirim data lead ke Google Sheets:", error);
    } finally {
      setCurrentResult(result);
      setIsSubmittingLead(false);
      setIsLeadModalOpen(false);
      setPendingAnswers(null);
      setViewState("result");
    }
  };

  const handleCloseLeadModal = () => {
    setIsLeadModalOpen(false);
    setPendingAnswers(null);
  };

  const handleGoHome = () => {
    setViewState("select-test");
  };

  return {
    testType,
    viewState,
    currentIndex,
    answers,
    currentResult,
    activeQuestions,
    isLeadModalOpen,
    isSubmittingLead,
    handleSelectTest,
    handleStartQuiz,
    handleAnswer,
    handlePrev,
    handleNext,
    handleSubmitQuiz,
    handleSimulateQuiz,
    handleLeadSubmit,
    handleCloseLeadModal,
    handleGoHome,
  };
}
