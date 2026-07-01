"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Answer, QuizResult as QuizResultType } from "../types/quiz";
import { questions as multipleIntelligenceQuestions } from "../data/questions";
import { riasecQuestions } from "../data/riasec_questions";
import { calculateQuizResult, getIntelligenceScoresList } from "../lib/quiz-engine";
import { LeadModal } from "../components/quiz/LeadModal";
import { QuizIntro } from "../components/quiz/QuizIntro";
import { QuizCard } from "../components/quiz/QuizCard";
import { QuizResult } from "../components/quiz/QuizResult";
import { Brain, Star } from "lucide-react";
import RotatingText from "../components/ui/RotatingText";
import DecayCard from "../components/ui/DecayCard";

export default function Home() {
  const [testType, setTestType] = useState<"majemuk" | "riasec">("majemuk");
  const [viewState, setViewState] = useState<"select-test" | "intro" | "quiz" | "result">("select-test");
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

  const activeQuestions = testType === "riasec" ? riasecQuestions : multipleIntelligenceQuestions;

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
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSubmitQuiz = () => {
    if (answers.length < activeQuestions.length) return;
    setPendingAnswers(answers);
    setIsTimeOut(false);
    setIsLeadModalOpen(true);
  };

  const handleSimulateQuiz = () => {
    const mockAnswers = activeQuestions.map((q) => {
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
    const result = calculateQuizResult(pendingAnswers, testType);
    result.name = name;
    result.email = email;

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
          testType,
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
    <div className="flex flex-col min-h-screen bg-[#fafafc] bg-grid-dots text-slate-900 transition-colors duration-300 relative overflow-x-hidden">
      {/* Ambient Glowing Blobs & Blur Background */}
      <div className="absolute top-[-10%] left-[-15%] w-[60vw] h-[60vw] bg-violet-400/12 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[-15%] w-[60vw] h-[60vw] bg-indigo-400/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[35%] left-[20%] w-[50vw] h-[50vw] bg-teal-300/8 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Header / Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-zinc-100 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-2 font-black text-lg sm:text-xl tracking-tight cursor-pointer select-none"
            onClick={() => setViewState("select-test")}
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
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col flex-grow">
        {viewState === "select-test" && (
          <div className="max-w-4xl mx-auto py-10 px-4 flex flex-col gap-10 items-center justify-center min-h-[70vh]">
            <div className="text-center flex flex-col gap-4 max-w-2xl">
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight md:leading-none flex flex-wrap items-center justify-center gap-x-3">
                Pilih{" "}
                <RotatingText
                  texts={["Tes Evaluasi Diri", "Kecerdasan Majemuk", "Kepribadian RIASEC", "Arah Karir Anda"]}
                  mainClassName="font-serif italic font-normal text-indigo-600 inline-flex overflow-hidden py-1"
                  staggerFrom={"last"}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-120%", opacity: 0 }}
                  staggerDuration={0.02}
                  splitLevelClassName="overflow-hidden pb-0.5"
                  transition={{ type: "spring", damping: 25, stiffness: 350 }}
                  rotationInterval={2800}
                />
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
                Temukan potensi terbaik Anda menggunakan tes terstandarisasi untuk rekomendasi karir, minat, dan studi masa depan yang akurat.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 w-full max-w-3xl mt-4">
              {/* Test Card 1: Kecerdasan Majemuk */}
              <DecayCard
                width="100%"
                height={400}
                image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"
                onClick={() => {
                  setTestType("majemuk");
                  setViewState("intro");
                }}
                className="group rounded-3xl overflow-hidden border border-slate-100 shadow-[0_15px_35px_-5px_rgba(99,102,241,0.08),0_5px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_-12px_rgba(99,102,241,0.18),0_10px_20px_rgba(99,102,241,0.05)] transition-shadow duration-300"
              >
                <div className="flex flex-col justify-between w-full h-full p-8 bg-white/92 group-hover:bg-white/80 transition-colors duration-300 text-left">
                  <div className="flex flex-col gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-650 flex items-center justify-center font-extrabold shadow-inner group-hover:scale-110 transition-transform">
                      <Brain className="w-7 h-7" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors min-h-[56px] flex items-center">
                        Kecerdasan Majemuk
                      </h2>
                      <p className="text-sm text-slate-500 leading-relaxed min-h-[80px]">
                        Evaluasi 8 bidang kecerdasan (linguistik, logis-matematis, spasial, dll.) berdasarkan Teori Multiple Intelligences Howard Gardner.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-sm font-bold text-indigo-600">
                    <span>Lihat Selengkapnya & Mulai →</span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-750">80 Pertanyaan</span>
                  </div>
                </div>
              </DecayCard>

              {/* Test Card 2: RIASEC Personality */}
              <DecayCard
                width="100%"
                height={400}
                image="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop"
                onClick={() => {
                  setTestType("riasec");
                  setViewState("intro");
                }}
                className="group rounded-3xl overflow-hidden border border-slate-100 shadow-[0_15px_35px_-5px_rgba(139,92,246,0.08),0_5px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_-12px_rgba(139,92,246,0.18),0_10px_20px_rgba(139,92,246,0.05)] transition-shadow duration-300"
              >
                <div className="flex flex-col justify-between w-full h-full p-8 bg-white/92 group-hover:bg-white/80 transition-colors duration-300 text-left">
                  <div className="flex flex-col gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-violet-50 text-violet-650 flex items-center justify-center font-extrabold shadow-inner group-hover:scale-110 transition-transform">
                      <Star className="w-7 h-7" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-violet-650 transition-colors min-h-[56px] flex items-center">
                        Kepribadian & Karir RIASEC
                      </h2>
                      <p className="text-sm text-slate-500 leading-relaxed min-h-[80px]">
                        Temukan kecenderungan minat karir Anda berdasarkan model kepribadian Holland (Realistic, Investigative, Artistic, Social, Enterprising, Conventional).
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-sm font-bold text-violet-600">
                    <span>Lihat Selengkapnya & Mulai →</span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-violet-50 text-violet-750">42 Pertanyaan</span>
                  </div>
                </div>
              </DecayCard>
            </div>
          </div>
        )}

        {viewState === "intro" && (
          <QuizIntro
            onStart={handleStartQuiz}
            onSimulate={handleSimulateQuiz}
            testType={testType}
            onBack={() => setViewState("select-test")}
          />
        )}

        {viewState === "quiz" && (
          <QuizCard
            questions={activeQuestions}
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
            onGoHome={() => setViewState("select-test")}
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
