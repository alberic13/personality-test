import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { MessageSquare, Calculator, Compass, Activity, Music, Users, User, Leaf, ArrowRight, Timer, ClipboardList, ShieldCheck, BarChart3 } from "lucide-react";
import { Dimension } from "../../types/quiz";
import { intelligences } from "../../data/intelligences";
import gsap from "gsap";

interface QuizIntroProps {
  onStart: () => void;
  onSimulate: () => void;
}

export const QuizIntro: React.FC<QuizIntroProps> = ({
  onStart,
  onSimulate,
}) => {
  const [selectedRoom, setSelectedRoom] = useState<Dimension | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // GSAP enter animations on mount
  useEffect(() => {
    if (!containerRef.current) return;

    // Pop in layout elements
    gsap.from(".gsap-animate", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      clearProps: "all"
    });

    // Stagger animate classroom cards
    gsap.from(".gsap-card", {
      opacity: 0,
      scale: 0.9,
      y: 15,
      duration: 0.6,
      stagger: 0.08,
      ease: "back.out(1.4)",
      clearProps: "all"
    });
  }, []);

  // Modal Pop Animation when selectedRoom opens
  useEffect(() => {
    if (selectedRoom && modalRef.current && overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" }
      );
    }
  }, [selectedRoom]);

  // List of classrooms
  const classrooms = [
    { dimension: "linguistik" as Dimension, code: "", name: "Kecerdasan Bahasa (Linguistik)", description: "Mengasah menulis, sastra, & tata bahasa.", icon: <MessageSquare className="w-5 h-5 text-purple-600" /> },
    { dimension: "matematis" as Dimension, code: "", name: "Kecerdasan Logika & Matematika", description: "Menguji angka, penalaran, & analisis.", icon: <Calculator className="w-5 h-5 text-blue-600" /> },
    { dimension: "spasial" as Dimension, code: "", name: "Kecerdasan Visual & Spasial", description: "Sketsa visual 3D, kreativitas, & ruang.", icon: <Compass className="w-5 h-5 text-amber-650" /> },
    { dimension: "kinestetik" as Dimension, code: "", name: "Kecerdasan Kinestetik & Jasmani", description: "Ketangkasan fisik, koordinasi, & gerak.", icon: <Activity className="w-5 h-5 text-orange-650" /> },
    { dimension: "musikal" as Dimension, code: "", name: "Kecerdasan Musik & Harmoni", description: "Melodi, irama nada, & harmoni instrumen.", icon: <Music className="w-5 h-5 text-pink-650" /> },
    { dimension: "interpersonal" as Dimension, code: "", name: "Kecerdasan Interpersonal (Sosial)", description: "Kolaborasi tim, empati, & komunikasi.", icon: <Users className="w-5 h-5 text-teal-650" /> },
    { dimension: "intrapersonal" as Dimension, code: "", name: "Kecerdasan Intrapersonal (Diri)", description: "Refleksi karakter, mental, & emosi diri.", icon: <User className="w-5 h-5 text-indigo-650" /> },
    { dimension: "naturalis" as Dimension, code: "", name: "Kecerdasan Naturalis (Alam)", description: "Ekosistem alam, ekologi, & flora-fauna.", icon: <Leaf className="w-5 h-5 text-emerald-650" /> },
  ];

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto flex flex-col gap-8 text-slate-900 py-8 select-none">
      
      {/* Hero Section */}
      <div className="text-center flex flex-col gap-4 py-8 gsap-animate">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-none">
          Tes <span className="font-serif italic font-normal text-indigo-600">Kecerdasan Majemuk</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Temukan potensi dominan Anda berdasarkan Teori Kecerdasan Majemuk (Multiple Intelligences) untuk kecocokan jurusan kuliah dan profesi masa depan Anda.
        </p>
      </div>

      {/* Main card */}
      <Card className="relative overflow-hidden gsap-animate border border-slate-200 shadow-md">
        {/* Subtle decorative background gradient */}
        <div className="absolute -right-24 -top-24 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute -left-24 -bottom-24 w-48 h-48 bg-violet-500/5 rounded-full blur-3xl" />

        <CardHeader className="text-center sm:text-left pb-4 border-b border-slate-100">
          <CardTitle className="text-xl sm:text-2xl font-black text-slate-900">Panduan Pengisian Tes</CardTitle>
          <CardDescription className="text-slate-500 text-xs sm:text-sm">
            Harap baca petunjuk berikut sebelum memulai tes agar hasil yang diperoleh akurat.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 pt-6">
          <div className="grid sm:grid-cols-2 gap-4 text-slate-700">
            
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/80">
              <div className="p-2.5 bg-violet-50 text-violet-600 rounded-xl shrink-0">
                <Timer className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Durasi Tes</h4>
                <p className="text-xs text-slate-500 mt-0.5">Tes dibatasi maksimal 15 menit saja.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/80">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                <ClipboardList className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Jumlah Pertanyaan</h4>
                <p className="text-xs text-slate-500 mt-0.5">80 pertanyaan pilihan ganda skala Likert.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/80">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Autentisitas Jawaban</h4>
                <p className="text-xs text-slate-500 mt-0.5">Isilah sejujur mungkin sesuai dengan kepribadian Anda.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/80">
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Skor Penilaian</h4>
                <p className="text-xs text-slate-500 mt-0.5">Rentang skor berkisar antara nilai 1 hingga 5.</p>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-100">
            <Button variant="primary" size="lg" className="w-full sm:w-auto" onClick={onStart}>
              Mulai Ujian Utama
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto border-dashed" 
              onClick={onSimulate}
            >
              Demo Instan (Acak)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 8 Areas Grid */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-extrabold text-slate-900 text-center gsap-animate">
          Aspek <span className="font-serif italic font-normal text-indigo-600">Kecerdasan Majemuk</span>
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {classrooms.map((room) => (
            <div
              key={room.dimension}
              onClick={() => setSelectedRoom(room.dimension)}
              className="gsap-card cursor-pointer group relative overflow-hidden bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-400 hover:shadow-lg transition-all duration-300 flex flex-col gap-4 shadow-sm"
            >
              <div className="flex justify-end items-start">
                <div className="p-2 rounded-xl bg-slate-50 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-650 transition-colors">
                  {room.icon}
                </div>
              </div>
              
              <div className="flex flex-col gap-1">
                <h4 className="font-extrabold text-sm text-slate-800 group-hover:text-indigo-950 transition-colors">
                  {room.name}
                </h4>
                <p className="text-[11px] text-slate-450 leading-relaxed">
                  {room.description}
                </p>
              </div>

              <div className="text-[10px] font-bold text-indigo-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform select-none">
                Lihat Detail &rarr;
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CLASSROOM WHITEBOARD MODAL */}
      {selectedRoom && (
        <div ref={overlayRef} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div ref={modalRef} className="bg-white border border-slate-250 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl flex flex-col gap-5 relative opacity-0 z-50">
            {/* Close button */}
            <button 
              onClick={() => setSelectedRoom(null)} 
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer"
              title="Tutup"
            >
              ✕
            </button>

            {/* School classroom blackboard styled header */}
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-extrabold shadow-inner select-none shrink-0">
                💡
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  Aspek Kecerdasan
                </span>
                <h3 className="text-lg font-black text-slate-900 leading-tight">
                  {intelligences[selectedRoom]?.name}
                </h3>
              </div>
            </div>

            {/* Content whiteboard styled */}
            <div className="flex flex-col gap-4 text-sm text-slate-650">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <h5 className="font-extrabold text-slate-800 text-xs uppercase tracking-wide mb-1.5">Deskripsi:</h5>
                <p className="leading-relaxed text-xs sm:text-sm">{intelligences[selectedRoom]?.description}</p>
              </div>

              <div>
                <h5 className="font-extrabold text-slate-800 text-xs uppercase tracking-wide mb-2">Saran Jurusan Kuliah:</h5>
                <div className="flex flex-wrap gap-1.5">
                  {intelligences[selectedRoom]?.majors.map((major, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-indigo-50/50 text-indigo-750 text-[11px] font-bold border border-indigo-100/50">
                      🎓 {major}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-extrabold text-slate-800 text-xs uppercase tracking-wide mb-2">Profesi & Karir yang Cocok:</h5>
                <div className="flex flex-wrap gap-1.5">
                  {intelligences[selectedRoom]?.careers.map((career, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-800 text-[11px] font-bold border border-slate-200/50">
                      💼 {career}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 border-t border-slate-100 pt-4 flex justify-end">
              <Button variant="primary" className="py-2.5 px-6 font-bold" onClick={() => setSelectedRoom(null)}>
                Tutup
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
