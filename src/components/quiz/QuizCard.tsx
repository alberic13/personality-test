import React, { useEffect, useRef } from "react";
import { Question, Answer } from "../../types/quiz";
import { Card, CardContent, CardFooter } from "../ui/Card";
import { Button } from "../ui/Button";
import { ProgressBar } from "../ui/ProgressBar";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import gsap from "gsap";

interface QuizCardProps {
  questions: Question[];
  currentIndex: number;
  answers: Answer[];
  onAnswer: (questionId: number, score: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  formattedTime: string;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  questions,
  currentIndex,
  answers,
  onAnswer,
  onPrev,
  onNext,
  onSubmit,
  formattedTime,
}) => {
  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers.find((a) => a.questionId === currentQuestion.id);

  const totalQuestions = questions.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const questionRef = useRef<HTMLHeadingElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  // Trigger GSAP animations when question index updates (using gsap.from to avoid permanent hidden states)
  useEffect(() => {
    if (questionRef.current) {
      gsap.from(
        questionRef.current,
        { opacity: 0, x: 40, duration: 0.5, ease: "power2.out", clearProps: "all" }
      );
    }
    if (optionsRef.current) {
      gsap.from(
        optionsRef.current.querySelectorAll(".gsap-option"),
        { 
          opacity: 0, 
          scale: 0.3, 
          duration: 0.4, 
          ease: "back.out(2)", 
          stagger: 0.06, 
          delay: 0.05,
          clearProps: "all" 
        }
      );
    }
  }, [currentIndex]);

  // Opsi skala Likert 5-titik
  const likertOptions = [
    { score: 1, label: "Sangat Tidak Setuju", color: "bg-rose-500 hover:bg-rose-600", borderColor: "border-rose-300", activeColor: "ring-rose-500 bg-rose-500 text-white", size: "w-12 h-12 sm:w-16 sm:h-16" },
    { score: 2, label: "Tidak Setuju", color: "bg-orange-400 hover:bg-orange-500", borderColor: "border-orange-200", activeColor: "ring-orange-400 bg-orange-400 text-white", size: "w-10 h-10 sm:w-12 sm:h-12" },
    { score: 3, label: "Netral", color: "bg-slate-400 hover:bg-slate-500", borderColor: "border-slate-300", activeColor: "ring-slate-400 bg-slate-400 text-white", size: "w-9 h-9 sm:w-10 sm:h-10" },
    { score: 4, label: "Setuju", color: "bg-blue-450 hover:bg-blue-550", borderColor: "border-blue-200", activeColor: "ring-blue-500 bg-blue-500 text-white", size: "w-10 h-10 sm:w-12 sm:h-12" },
    { score: 5, label: "Sangat Setuju", color: "bg-blue-600 hover:bg-blue-700", borderColor: "border-blue-300", activeColor: "ring-blue-600 bg-blue-600 text-white", size: "w-12 h-12 sm:w-16 sm:h-16" },
  ];

  const handleSelectOption = (score: number) => {
    onAnswer(currentQuestion.id, score);

    // Auto-advance dengan sedikit delay agar animasi terpilih terlihat
    if (currentIndex < totalQuestions - 1) {
      setTimeout(() => {
        onNext();
      }, 350);
    }
  };

  const isLastQuestion = currentIndex === totalQuestions - 1;
  const isAnswered = currentAnswer !== undefined;

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center text-sm font-semibold text-slate-500">
        <span>Pertanyaan {currentIndex + 1} dari {totalQuestions}</span>
        <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-50 text-rose-600 font-extrabold shadow-sm select-none border border-rose-100/50">
          ⏱️ {formattedTime}
        </span>
        <span>Progres: {progressPercent}%</span>
      </div>

      {/* Progress Bar */}
      <ProgressBar value={progressPercent} />

      {/* Main Question Card */}
      <Card className="min-h-[400px] flex flex-col justify-between transition-all duration-300">
        <CardContent className="flex flex-col items-center justify-center text-center px-4 my-8">
          <h2 ref={questionRef} className="text-xl sm:text-3xl font-bold leading-relaxed text-zinc-800 max-w-2xl select-none">
            "{currentQuestion.text}"
          </h2>

          {/* Likert Scale Container */}
          <div className="flex flex-col w-full mt-12 gap-8">
            <div ref={optionsRef} className="flex items-center justify-between w-full max-w-xl mx-auto relative px-4">
              {/* Garis penghubung di belakang bulatan */}
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[3px] bg-zinc-200 -z-10" />

              {likertOptions.map((opt) => {
                const isSelected = currentAnswer?.score === opt.score;
                return (
                  <button
                    key={opt.score}
                    onClick={() => handleSelectOption(opt.score)}
                    className={`gsap-option flex items-center justify-center rounded-full border-2 transition-all duration-300 transform cursor-pointer hover:scale-115 active:scale-95 focus:outline-none ${
                      opt.size
                    } ${
                      isSelected
                        ? `ring-4 ring-offset-4 ring-offset-white ${opt.activeColor} shadow-lg`
                        : `${opt.borderColor} bg-white text-transparent hover:border-zinc-400`
                    }`}
                    title={opt.label}
                  >
                    {isSelected && <Check className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />}
                  </button>
                );
              })}
            </div>

            {/* Label Skala Likert */}
            <div className="flex justify-between w-full max-w-xl mx-auto px-2 text-xs sm:text-sm font-semibold select-none">
              <span className="text-rose-500 text-left max-w-[80px] sm:max-w-none">
                Sangat Tidak Setuju
              </span>
              <span className="text-zinc-400 text-center">Netral</span>
              <span className="text-emerald-600 text-right max-w-[80px] sm:max-w-none">
                Sangat Setuju
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center border-t border-zinc-100 pt-6">
          <Button
            variant="ghost"
            onClick={onPrev}
            disabled={currentIndex === 0}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Sebelumnya
          </Button>

          {isLastQuestion ? (
            <Button
              variant="secondary"
              onClick={onSubmit}
              disabled={!isAnswered}
              className="flex items-center"
            >
              Lihat Hasil
              <Check className="ml-2 w-4 h-4" />
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={onNext}
              disabled={!isAnswered}
              className="flex items-center"
            >
              Selanjutnya
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
