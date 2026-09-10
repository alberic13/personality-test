import React from "react";
import { Brain, Star } from "lucide-react";
import RotatingText from "../ui/RotatingText";
import DecayCard from "../ui/DecayCard";
import { TestType } from "../../hooks/useQuizFlow";

interface TestSelectorProps {
  onSelectTest: (type: TestType) => void;
}

export const TestSelector: React.FC<TestSelectorProps> = ({ onSelectTest }) => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 flex flex-col gap-10 items-center justify-center min-h-[70vh]">
      <div className="text-center flex flex-col gap-4 max-w-2xl">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight md:leading-none text-center">
          Pilih{" "}
          <RotatingText
            texts={["Tes Evaluasi Diri", "Kecerdasan Majemuk", "Kepribadian RIASEC", "Arah Karir Anda"]}
            mainClassName="font-serif italic font-normal text-indigo-600 inline-flex overflow-hidden py-1 justify-center align-middle"
            staggerFrom="last"
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

      <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl mt-4">
        {/* Test Card 1: Kecerdasan Majemuk */}
        <DecayCard
          width="100%"
          height={400}
          image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"
          onClick={() => onSelectTest("majemuk")}
          className="group rounded-3xl overflow-hidden border border-slate-100/50 shadow-[0_15px_30px_-5px_rgba(99,102,241,0.12),0_5px_15px_-3px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_-12px_rgba(99,102,241,0.25),0_15px_25px_-5px_rgba(99,102,241,0.08)] transition-all duration-300"
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
          onClick={() => onSelectTest("riasec")}
          className="group rounded-3xl overflow-hidden border border-slate-100/50 shadow-[0_15px_30px_-5px_rgba(139,92,246,0.12),0_5px_15px_-3px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_-12px_rgba(139,92,246,0.25),0_15px_25px_-5px_rgba(139,92,246,0.08)] transition-all duration-300"
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

        {/* Test Card 3: Gaya Belajar (VAK) */}
        <DecayCard
          width="100%"
          height={400}
          image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop"
          onClick={() => onSelectTest("gaya-belajar")}
          className="group rounded-3xl overflow-hidden border border-slate-100/50 shadow-[0_15px_30px_-5px_rgba(16,185,129,0.12),0_5px_15px_-3px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_-12px_rgba(16,185,129,0.25),0_15px_25px_-5px_rgba(16,185,129,0.08)] transition-all duration-300"
        >
          <div className="flex flex-col justify-between w-full h-full p-8 bg-white/92 group-hover:bg-white/80 transition-colors duration-300 text-left">
            <div className="flex flex-col gap-5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-650 flex items-center justify-center font-extrabold shadow-inner group-hover:scale-110 transition-transform">
                <Brain className="w-7 h-7" />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-emerald-650 transition-colors min-h-[56px] flex items-center">
                  Gaya Belajar (VAK)
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed min-h-[80px]">
                  Temukan metode belajar terbaik Anda (Visual, Auditori, atau Kinestetik) agar proses penyerapan informasi lebih efektif dan optimal.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-sm font-bold text-emerald-600">
              <span>Lihat Selengkapnya & Mulai →</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-750">27 Pertanyaan</span>
            </div>
          </div>
        </DecayCard>
      </div>
    </div>
  );
};
