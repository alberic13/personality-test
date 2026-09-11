"use client";

import React from "react";
import { useQuizFlow } from "../hooks/useQuizFlow";
import { TestSelector } from "../components/quiz/TestSelector";
import { QuizIntro } from "../components/quiz/QuizIntro";
import { QuizCard } from "../components/quiz/QuizCard";
import { QuizResult } from "../components/quiz/QuizResult";
import { LeadModal } from "../components/quiz/LeadModal";

export default function Home() {
  const {
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
  } = useQuizFlow();

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafc] bg-grid-dots text-slate-900 transition-colors duration-300 relative overflow-x-hidden">
      {/* Ambient Glowing Blobs & Blur Background */}
      <div className="absolute top-[-10%] left-[-15%] w-[60vw] h-[60vw] bg-violet-400/12 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[-15%] w-[60vw] h-[60vw] bg-indigo-400/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[35%] left-[20%] w-[50vw] h-[50vw] bg-teal-300/8 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Header / Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-zinc-100 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 font-black text-lg sm:text-xl tracking-tight cursor-pointer select-none"
            onClick={handleGoHome}
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
          <TestSelector onSelectTest={handleSelectTest} />
        )}

        {viewState === "intro" && (
          <QuizIntro
            onStart={handleStartQuiz}
            onSimulate={handleSimulateQuiz}
            testType={testType}
            onBack={handleGoHome}
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
          />
        )}

        {viewState === "result" && currentResult && (
          <QuizResult
            result={currentResult}
            onRetake={handleStartQuiz}
            onGoHome={handleGoHome}
          />
        )}
      </main>

      <footer className="w-full py-6 text-center border-t border-slate-200 text-xs sm:text-sm text-slate-400 mt-6 bg-white/30 backdrop-blur-sm transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} Test Personal | Developed by{" "}
            <a
              href="https://github.com/alberic13"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-600 transition-colors underline font-medium"
            >
              Muchammad Zalde Zahwa Putra
            </a>
          </p>
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

      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={handleCloseLeadModal}
        onSubmit={handleLeadSubmit}
        isSubmitting={isSubmittingLead}
      />
    </div>
  );
}
