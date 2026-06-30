"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Answer, QuizResult as QuizResultType } from "../types/quiz";
import { questions } from "../data/questions";
import { calculateQuizResult, getIntelligenceScoresList } from "../lib/quiz-engine";
import { LeadModal } from "../components/quiz/LeadModal";
import { QuizIntro } from "../components/quiz/QuizIntro";
import { QuizCard } from "../components/quiz/QuizCard";
import { QuizResult } from "../components/quiz/QuizResult";

export default function Home() {
  const [viewState, setViewState] = useState<"welcome" | "intro" | "quiz" | "result">("intro");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentResult, setCurrentResult] = useState<QuizResultType | null>(null);
  
  // States untuk Pop-up Lead Form (Nama & Email)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [pendingAnswers, setPendingAnswers] = useState<Answer[] | null>(null);

  // States untuk Timer Mundur 15 Menit (900 detik)
  const [timeLeft, setTimeLeft] = useState<number>(900);
  const [isTimeOut, setIsTimeOut] = useState(false);

  // Handler submit otomatis saat waktu habis
  const handleAutoSubmit = useCallback(() => {
    setIsTimeOut(true);
    setPendingAnswers(answers);
    setIsLeadModalOpen(true);
  }, [answers]);

  // Timer Countdown Effect
  useEffect(() => {
    if (viewState !== "quiz") return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
         if (prev <= 1) {
           clearInterval(interval);
           handleAutoSubmit();
           return 0;
         }
         return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [viewState, handleAutoSubmit]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const handleStartQuiz = () => {
    setAnswers([]);
    setCurrentIndex(0);
    setTimeLeft(900); // Reset timer ke 15 menit (900 detik)
    setIsTimeOut(false);
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
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSubmitQuiz = () => {
    if (answers.length < questions.length) return;
    setPendingAnswers(answers);
    setIsTimeOut(false);
    setIsLeadModalOpen(true);
  };

  const handleSimulateQuiz = () => {
    const mockAnswers = questions.map((q) => {
      const randomScore = Math.floor(Math.random() * 5) + 1;
      return { questionId: q.id, score: randomScore };
    });
    setPendingAnswers(mockAnswers);
    setIsTimeOut(false);
    setIsLeadModalOpen(true);
  };

  const handleLeadSubmit = async (name: string, email: string) => {
    if (!pendingAnswers) return;

    setIsSubmittingLead(true);
    const result = calculateQuizResult(pendingAnswers);

    // Hitung raw scores per kategori
    const scoresList = getIntelligenceScoresList(result);
    const scoresMap: Record<string, number> = {};
    scoresList.forEach((s) => {
      scoresMap[s.dimension] = s.score;
    });

    try {
      // Kirim data ke Next.js API
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
        }),
      });
    } catch (error) {
      console.error("Gagal mengirim data lead ke Google Sheets:", error);
    } finally {
      // Tampilkan hasil kuis ke user untuk kelancaran UX
      setCurrentResult(result);
      setIsSubmittingLead(false);
      setIsLeadModalOpen(false);
      setPendingAnswers(null);
      setViewState("result");
    }
  };



  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 relative overflow-x-hidden">
      {/* Ambient Blue Glow & Blur Background */}
      <div className="absolute top-[-10%] left-[-15%] w-[60vw] h-[60vw] bg-blue-300/25 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[-15%] w-[60vw] h-[60vw] bg-sky-300/20 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[35%] left-[20%] w-[50vw] h-[50vw] bg-indigo-300/15 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Header / Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-zinc-100 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-2 font-black text-lg sm:text-xl tracking-tight cursor-pointer select-none"
            onClick={() => setViewState("intro")}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 font-black text-base italic tracking-tighter">
              Z
            </div>
            <span className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-700 bg-clip-text text-transparent">
              Test Personal
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col">

        {viewState === "intro" && (
          <QuizIntro
            onStart={handleStartQuiz}
            onSimulate={handleSimulateQuiz}
          />
        )}

        {viewState === "quiz" && (
          <QuizCard
            questions={questions}
            currentIndex={currentIndex}
            answers={answers}
            onAnswer={handleAnswer}
            onPrev={handlePrev}
            onNext={handleNext}
            onSubmit={handleSubmitQuiz}
            formattedTime={formatTime(timeLeft)}
          />
        )}

        {viewState === "result" && currentResult && (
          <QuizResult
            result={currentResult}
            onRetake={handleStartQuiz}
            onGoHome={() => setViewState("intro")}
          />
        )}
      </main>

      <footer className="w-full py-6 text-center border-t border-slate-150 text-xs sm:text-sm text-slate-400 mt-6 bg-white/30 backdrop-blur-sm transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Test Personal | Zalde.</p>
          <div className="flex items-center gap-4">
            <a 
              href="https://api.whatsapp.com/send?phone=6281381998561" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-slate-600 transition-colors font-semibold"
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
      {/* LeadModal Popup Form */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => {
          setIsLeadModalOpen(false);
          setPendingAnswers(null);
        }}
        onSubmit={handleLeadSubmit}
        isSubmitting={isSubmittingLead}
        isTimeOut={isTimeOut}
      />
    </div>
  );
}
