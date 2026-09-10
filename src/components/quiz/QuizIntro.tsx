import React, { useEffect, useRef, useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { MessageSquare, Calculator, Compass, Activity, Music, Users, User, Leaf, ArrowRight, ClipboardList, ShieldCheck, BarChart3, Wrench, Search, Palette, Heart, TrendingUp, FileText } from "lucide-react";
import { Dimension } from "../../types/quiz";
import gsap from "gsap";
import TextType from "../ui/TextType";
import MagicBento, { BentoItem } from "../ui/MagicBento";
import { AspectItem } from "./intro/AspectCard";
import { AspectDeck } from "./intro/AspectDeck";
import { ClassroomModal } from "./intro/ClassroomModal";

interface QuizIntroProps {
  onStart: () => void;
  onSimulate: () => void;
  testType?: "majemuk" | "riasec" | "gaya-belajar";
  onBack?: () => void;
}

export const QuizIntro: React.FC<QuizIntroProps> = ({
  onStart,
  onSimulate,
  testType = "majemuk",
  onBack,
}) => {
  const [selectedRoom, setSelectedRoom] = useState<Dimension | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isRiasec = testType === "riasec";
  const isGayaBelajar = testType === "gaya-belajar";

  const bentoItems: BentoItem[] = [
    {
      color: "#ffffff",
      title: "Jumlah Pertanyaan",
      description: isRiasec
        ? "42 pertanyaan pilihan ganda skala Likert."
        : isGayaBelajar
          ? "27 pertanyaan pilihan ganda skala Likert."
          : "80 pertanyaan pilihan ganda skala Likert.",
      label: "Pertanyaan",
      icon: <ClipboardList className="w-5 h-5 text-blue-600" />,
      bgIcon: "p-2 bg-blue-50 text-blue-600 rounded-xl shrink-0",
    },
    {
      color: "#ffffff",
      title: "Skor Penilaian",
      description: "Rentang skor jawaban berkisar antara nilai 1 hingga 5.",
      label: "Rentang Nilai",
      icon: <BarChart3 className="w-5 h-5 text-amber-600" />,
      bgIcon: "p-2 bg-amber-50 text-amber-600 rounded-xl shrink-0",
    },
    {
      color: "#ffffff",
      title: "Autentisitas Jawaban",
      description: isGayaBelajar
        ? "Isilah sejujur mungkin sesuai dengan preferensi belajar Anda untuk mendapatkan rekomendasi jurusan kuliah dan karir yang akurat."
        : "Isilah sejujur mungkin sesuai dengan kepribadian Anda untuk mendapatkan rekomendasi jurusan kuliah dan karir yang akurat.",
      label: "Validitas Hasil",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      bgIcon: "p-2 bg-emerald-50 text-emerald-600 rounded-xl shrink-0",
      gridClass: "bento-span-2",
    },
  ];

  const classrooms: AspectItem[] = useMemo(() => {
    if (isRiasec) {
      return [
        { dimension: "realistic", code: "", name: "Realistic (Realistik)", description: "Minat pada aktivitas fisik, praktis, mesin, alat, & tanaman.", icon: <Wrench className="w-5 h-5 text-slate-655" />, bgIcon: "bg-slate-50", tempId: 0 },
        { dimension: "investigative", code: "", name: "Investigative (Investigatif)", description: "Minat pada pemecahan masalah ilmiah, analisis, & riset.", icon: <Search className="w-5 h-5 text-blue-655" />, bgIcon: "bg-blue-50", tempId: 1 },
        { dimension: "artistic", code: "", name: "Artistic (Artistik)", description: "Minat pada ekspresi kreatif, seni, musik, & orisinalitas.", icon: <Palette className="w-5 h-5 text-pink-655" />, bgIcon: "bg-pink-50", tempId: 2 },
        { dimension: "social", code: "", name: "Social (Sosial)", description: "Minat pada membantu, mengajar, & melayani orang lain.", icon: <Heart className="w-5 h-5 text-rose-655" />, bgIcon: "bg-rose-50", tempId: 3 },
        { dimension: "enterprising", code: "", name: "Enterprising (Giat)", description: "Minat pada memimpin, memengaruhi, bisnis, & wirausaha.", icon: <TrendingUp className="w-5 h-5 text-amber-655" />, bgIcon: "bg-amber-50", tempId: 4 },
        { dimension: "conventional", code: "", name: "Conventional (Konvensional)", description: "Minat pada keteraturan, administrasi, data, & detail.", icon: <FileText className="w-5 h-5 text-emerald-655" />, bgIcon: "bg-emerald-50", tempId: 5 },
      ];
    }
    if (isGayaBelajar) {
      return [
        { dimension: "gaya_visual", code: "", name: "Visual (Gaya Belajar Visual)", description: "Belajar dengan melihat gambar, diagram, poster, dan teks tertulis.", icon: <Palette className="w-5 h-5 text-indigo-650" />, bgIcon: "bg-indigo-50", tempId: 0 },
        { dimension: "gaya_auditori", code: "", name: "Auditori (Gaya Belajar Auditori)", description: "Belajar dengan mendengarkan penjelasan lisan, diskusi, dan rekaman audio.", icon: <MessageSquare className="w-5 h-5 text-purple-650" />, bgIcon: "bg-purple-50", tempId: 1 },
        { dimension: "gaya_kinestetik", code: "", name: "Kinestetik (Gaya Belajar Kinestetik)", description: "Belajar dengan mempraktikkan langsung, olahraga, kriya tangan, dan aktivitas fisik.", icon: <Activity className="w-5 h-5 text-orange-650" />, bgIcon: "bg-orange-50", tempId: 2 },
      ];
    }
    return [
      { dimension: "linguistik", code: "", name: "Kecerdasan Bahasa (Linguistik)", description: "Mengasah menulis, sastra, & tata bahasa.", icon: <MessageSquare className="w-5 h-5 text-purple-655" />, bgIcon: "bg-purple-50", tempId: 0 },
      { dimension: "matematis", code: "", name: "Kecerdasan Logika & Matematika", description: "Menguji angka, penalaran, & analisis.", icon: <Calculator className="w-5 h-5 text-blue-655" />, bgIcon: "bg-blue-50", tempId: 1 },
      { dimension: "spasial", code: "", name: "Kecerdasan Visual & Spasial", description: "Sketsa visual 3D, kreativitas, & ruang.", icon: <Compass className="w-5 h-5 text-amber-655" />, bgIcon: "bg-amber-50", tempId: 2 },
      { dimension: "kinestetik", code: "", name: "Kecerdasan Kinestetik & Jasmani", description: "Ketangkasan fisik, koordinasi, & gerak.", icon: <Activity className="w-5 h-5 text-orange-655" />, bgIcon: "bg-orange-50", tempId: 3 },
      { dimension: "musikal", code: "", name: "Kecerdasan Musik & Harmoni", description: "Melodi, irama nada, & harmoni instrumen.", icon: <Music className="w-5 h-5 text-pink-655" />, bgIcon: "bg-pink-50", tempId: 4 },
      { dimension: "interpersonal", code: "", name: "Kecerdasan Interpersonal (Sosial)", description: "Kolaborasi tim, empati, & komunikasi.", icon: <Users className="w-5 h-5 text-teal-655" />, bgIcon: "bg-teal-50", tempId: 5 },
      { dimension: "intrapersonal", code: "", name: "Kecerdasan Intrapersonal (Diri)", description: "Refleksi karakter, mental, & emosi diri.", icon: <User className="w-5 h-5 text-indigo-655" />, bgIcon: "bg-indigo-50", tempId: 6 },
      { dimension: "naturalis", code: "", name: "Kecerdasan Naturalis (Alam)", description: "Ekosistem alam, ekologi, & flora-fauna.", icon: <Leaf className="w-5 h-5 text-emerald-655" />, bgIcon: "bg-emerald-50", tempId: 7 },
    ];
  }, [isRiasec, isGayaBelajar]);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.from(".gsap-animate", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      clearProps: "all",
    });
  }, []);

  const typingTexts = isRiasec
    ? ["Kepribadian RIASEC", "Potensi Karir & Minat", "Rekomendasi Jurusan & Profesi"]
    : isGayaBelajar
      ? ["Gaya Belajar VAK", "Metode Belajar Efektif", "Rekomendasi Jurusan & Karir"]
      : ["Kecerdasan Majemuk", "Potensi Minat & Bakat", "Rekomendasi Jurusan & Karir"];

  const introDesc = isRiasec
    ? "Temukan potensi dominan Anda berdasarkan Tipe Kepribadian & Minat Kerja RIASEC untuk kecocokan jurusan kuliah dan profesi masa depan Anda."
    : isGayaBelajar
      ? "Temukan preferensi belajar terbaik Anda (Visual, Auditori, atau Kinestetik) untuk membantu Anda menyerap ilmu dengan lebih cepat dan menyenangkan."
      : "Temukan potensi dominan Anda berdasarkan Teori Kecerdasan Majemuk (Multiple Intelligences) untuk kecocokan jurusan kuliah dan profesi masa depan Anda.";

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto flex flex-col gap-10 text-slate-900 py-6 select-none relative z-10">
      {onBack && (
        <div className="w-full flex justify-start gsap-animate">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-bold text-slate-400 hover:text-indigo-650 transition-colors cursor-pointer group"
          >
            <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span> Kembali ke Pilihan Tes
          </button>
        </div>
      )}

      {/* Hero Section */}
      <div className="text-center flex flex-col gap-4 py-4 gsap-animate">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-none">
          Tes{" "}
          <TextType
            text={typingTexts}
            as="span"
            className="font-serif italic font-normal text-indigo-600 inline-block"
            typingSpeed={80}
            deletingSpeed={40}
            pauseDuration={2500}
            showCursor={true}
            cursorCharacter="|"
            cursorClassName="text-indigo-500 font-light ml-1"
          />
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {introDesc}
        </p>
      </div>

      {/* Main Guide Card */}
      <Card className="relative overflow-hidden gsap-animate border border-slate-200 shadow-md">
        <div className="absolute -right-24 -top-24 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute -left-24 -bottom-24 w-48 h-48 bg-violet-500/5 rounded-full blur-3xl" />

        <CardHeader className="text-center sm:text-left pb-4 border-b border-slate-100">
          <CardTitle className="text-xl sm:text-2xl font-black text-slate-900">Panduan Pengisian Tes</CardTitle>
          <CardDescription className="text-slate-500 text-xs sm:text-sm">
            Harap baca petunjuk berikut sebelum memulai tes agar hasil yang diperoleh akurat.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 pt-6">
          <MagicBento items={bentoItems} glowColor="99, 102, 241" spotlightRadius={250} />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-100">
            <Button variant="primary" size="lg" className="w-full sm:w-auto" onClick={onStart}>
              Mulai Ujian Utama
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            {process.env.NODE_ENV === "development" && (
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-dashed"
                onClick={onSimulate}
              >
                Demo Instan (Acak)
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Swipeable Aspect Deck */}
      <AspectDeck
        key={testType}
        classrooms={classrooms}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        isRiasec={isRiasec}
        isGayaBelajar={isGayaBelajar}
      />

      {/* Classroom Modal */}
      <ClassroomModal
        selectedRoom={selectedRoom}
        onClose={() => setSelectedRoom(null)}
        isRiasec={isRiasec}
        isGayaBelajar={isGayaBelajar}
      />
    </div>
  );
};
