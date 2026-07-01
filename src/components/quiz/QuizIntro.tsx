import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { MessageSquare, Calculator, Compass, Activity, Music, Users, User, Leaf, ArrowRight, Timer, ClipboardList, ShieldCheck, BarChart3, ChevronLeft, ChevronRight, Wrench, Search, Palette, Heart, TrendingUp, FileText } from "lucide-react";
import { Dimension } from "../../types/quiz";
import { intelligences } from "../../data/intelligences";
import { riasecTypes } from "../../data/riasec";
import gsap from "gsap";
import TextType from "../ui/TextType";
import MagicBento, { BentoItem } from "../ui/MagicBento";
import { motion } from "motion/react";

const SQRT_3200 = Math.sqrt(3200);

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

interface QuizIntroProps {
  onStart: () => void;
  onSimulate: () => void;
  testType?: "majemuk" | "riasec";
  onBack?: () => void;
}

interface AspectCardProps {
  position: number;
  aspect: {
    dimension: Dimension;
    code: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    bgIcon: string;
    tempId: number;
  };
  handleMove: (steps: number) => void;
  setSelectedRoom: (room: Dimension) => void;
  cardSize: number;
}

const AspectCard: React.FC<AspectCardProps> = ({ 
  position, 
  aspect, 
  handleMove, 
  setSelectedRoom,
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => {
        if (isCenter) {
          setSelectedRoom(aspect.dimension);
        } else {
          handleMove(position);
        }
      }}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 sm:p-8 transition-all duration-500 ease-in-out flex flex-col justify-between rounded-xl",
        isCenter 
          ? "z-10 bg-slate-900 text-white border-slate-900 shadow-2xl scale-100" 
          : "z-0 bg-white text-slate-800 border-slate-200 hover:border-indigo-400 hover:shadow-lg scale-90"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(40px 0%, calc(100% - 40px) 0%, 100% 40px, 100% 100%, calc(100% - 40px) 100%, 40px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.65) * position}px)
          translateY(${isCenter ? -35 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px #e2e8f0" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className={cn("absolute block origin-top-right rotate-45", isCenter ? "bg-slate-800" : "bg-slate-100")}
        style={{
          right: -2,
          top: 38,
          width: SQRT_3200,
          height: 1
        }}
      />
      
      <div className="flex flex-col gap-4">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shadow-inner shrink-0", aspect.bgIcon)}>
          {aspect.icon}
        </div>
        <div className="flex flex-col gap-1">
          <h3 className={cn(
            "text-base sm:text-lg font-black leading-tight",
            isCenter ? "text-white" : "text-slate-900"
          )}>
            {aspect.name}
          </h3>
          <p className={cn(
            "text-xs sm:text-sm leading-relaxed mt-1",
            isCenter ? "text-slate-300" : "text-slate-500"
          )}>
            {aspect.description}
          </p>
        </div>
      </div>

      <div className={cn(
        "text-xs font-bold flex items-center gap-1 mt-auto pt-3 border-t",
        isCenter ? "text-indigo-400 border-slate-800" : "text-indigo-600 border-slate-100"
      )}>
        {isCenter ? "Lihat Detail Aspek →" : "Geser ke Tengah"}
      </div>
    </div>
  );
};

export const QuizIntro: React.FC<QuizIntroProps> = ({
  onStart,
  onSimulate,
  testType = "majemuk",
  onBack,
}) => {
  const [selectedRoom, setSelectedRoom] = useState<Dimension | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const isRiasec = testType === "riasec";

  const bentoItems: BentoItem[] = [
    {
      color: '#ffffff',
      title: 'Durasi Tes',
      description: 'Tes dibatasi maksimal 15 menit saja.',
      label: 'Batas Waktu',
      icon: <Timer className="w-5 h-5 text-violet-600" />,
      bgIcon: 'p-2 bg-violet-50 text-violet-600 rounded-xl shrink-0',
    },
    {
      color: '#ffffff',
      title: 'Jumlah Pertanyaan',
      description: isRiasec ? '42 pertanyaan pilihan ganda skala Likert.' : '80 pertanyaan pilihan ganda skala Likert.',
      label: 'Pertanyaan',
      icon: <ClipboardList className="w-5 h-5 text-blue-600" />,
      bgIcon: 'p-2 bg-blue-50 text-blue-600 rounded-xl shrink-0',
    },
    {
      color: '#ffffff',
      title: 'Skor Penilaian',
      description: 'Rentang skor jawaban berkisar antara nilai 1 hingga 5.',
      label: 'Rentang Nilai',
      icon: <BarChart3 className="w-5 h-5 text-amber-600" />,
      bgIcon: 'p-2 bg-amber-50 text-amber-600 rounded-xl shrink-0',
    },
    {
      color: '#ffffff',
      title: 'Autentisitas Jawaban',
      description: 'Isilah sejujur mungkin sesuai dengan kepribadian Anda untuk mendapatkan rekomendasi jurusan kuliah dan karir yang akurat.',
      label: 'Validitas Hasil',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      bgIcon: 'p-2 bg-emerald-50 text-emerald-600 rounded-xl shrink-0',
      gridClass: 'bento-span-3',
    },
  ];

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

  // Listen for Escape key to close the modal
  useEffect(() => {
    if (!selectedRoom) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedRoom(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedRoom]);

  // List of classrooms (aspekt)
  const classrooms = isRiasec ? [
    { dimension: "realistic" as Dimension, code: "", name: "Realistic (Realistik)", description: "Minat pada aktivitas fisik, praktis, mesin, alat, & tanaman.", icon: <Wrench className="w-5 h-5 text-slate-650" />, bgIcon: "bg-slate-50" },
    { dimension: "investigative" as Dimension, code: "", name: "Investigative (Investigatif)", description: "Minat pada pemecahan masalah ilmiah, analisis, & riset.", icon: <Search className="w-5 h-5 text-blue-650" />, bgIcon: "bg-blue-50" },
    { dimension: "artistic" as Dimension, code: "", name: "Artistic (Artistik)", description: "Minat pada ekspresi kreatif, seni, musik, & orisinalitas.", icon: <Palette className="w-5 h-5 text-pink-650" />, bgIcon: "bg-pink-50" },
    { dimension: "social" as Dimension, code: "", name: "Social (Sosial)", description: "Minat pada membantu, mengajar, & melayani orang lain.", icon: <Heart className="w-5 h-5 text-rose-650" />, bgIcon: "bg-rose-50" },
    { dimension: "enterprising" as Dimension, code: "", name: "Enterprising (Giat)", description: "Minat pada memimpin, memengaruhi, bisnis, & wirausaha.", icon: <TrendingUp className="w-5 h-5 text-amber-650" />, bgIcon: "bg-amber-50" },
    { dimension: "conventional" as Dimension, code: "", name: "Conventional (Konvensional)", description: "Minat pada keteraturan, administrasi, data, & detail.", icon: <FileText className="w-5 h-5 text-emerald-650" />, bgIcon: "bg-emerald-50" }
  ] : [
    { dimension: "linguistik" as Dimension, code: "", name: "Kecerdasan Bahasa (Linguistik)", description: "Mengasah menulis, sastra, & tata bahasa.", icon: <MessageSquare className="w-5 h-5 text-purple-650" />, bgIcon: "bg-purple-50" },
    { dimension: "matematis" as Dimension, code: "", name: "Kecerdasan Logika & Matematika", description: "Menguji angka, penalaran, & analisis.", icon: <Calculator className="w-5 h-5 text-blue-650" />, bgIcon: "bg-blue-50" },
    { dimension: "spasial" as Dimension, code: "", name: "Kecerdasan Visual & Spasial", description: "Sketsa visual 3D, kreativitas, & ruang.", icon: <Compass className="w-5 h-5 text-amber-650" />, bgIcon: "bg-amber-50" },
    { dimension: "kinestetik" as Dimension, code: "", name: "Kecerdasan Kinestetik & Jasmani", description: "Ketangkasan fisik, koordinasi, & gerak.", icon: <Activity className="w-5 h-5 text-orange-650" />, bgIcon: "bg-orange-50" },
    { dimension: "musikal" as Dimension, code: "", name: "Kecerdasan Musik & Harmoni", description: "Melodi, irama nada, & harmoni instrumen.", icon: <Music className="w-5 h-5 text-pink-650" />, bgIcon: "bg-pink-50" },
    { dimension: "interpersonal" as Dimension, code: "", name: "Kecerdasan Interpersonal (Sosial)", description: "Kolaborasi tim, empati, & komunikasi.", icon: <Users className="w-5 h-5 text-teal-650" />, bgIcon: "bg-teal-50" },
    { dimension: "intrapersonal" as Dimension, code: "", name: "Kecerdasan Intrapersonal (Diri)", description: "Refleksi karakter, mental, & emosi diri.", icon: <User className="w-5 h-5 text-indigo-650" />, bgIcon: "bg-indigo-50" },
    { dimension: "naturalis" as Dimension, code: "", name: "Kecerdasan Naturalis (Alam)", description: "Ekosistem alam, ekologi, & flora-fauna.", icon: <Leaf className="w-5 h-5 text-emerald-650" />, bgIcon: "bg-emerald-50" }
  ];

  const initialAspects = classrooms.map((c, i) => ({
    ...c,
    tempId: i
  }));

  const [aspectsList, setAspectsList] = useState(initialAspects);
  const [cardSize, setCardSize] = useState(365);

  const handleMove = (steps: number) => {
    const newList = [...aspectsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setAspectsList(newList);
  };

  useEffect(() => {
    const initial = classrooms.map((c, i) => ({
      ...c,
      tempId: i
    }));
    setAspectsList(initial);
  }, [testType]);

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 350 : 280);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Autoplay aspect cards carousel
  useEffect(() => {
    if (selectedRoom) return; // Pause autoplay when modal details are open

    const interval = setInterval(() => {
      handleMove(1);
    }, 3500);

    return () => clearInterval(interval);
  }, [aspectsList, selectedRoom]);

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
            text={
              isRiasec 
                ? ["Kepribadian RIASEC", "Potensi Karir & Minat", "Rekomendasi Jurusan & Profesi"]
                : ["Kecerdasan Majemuk", "Potensi Minat & Bakat", "Rekomendasi Jurusan & Karir"]
            }
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
          {isRiasec 
            ? "Temukan potensi dominan Anda berdasarkan Tipe Kepribadian & Minat Kerja RIASEC untuk kecocokan jurusan kuliah dan profesi masa depan Anda."
            : "Temukan potensi dominan Anda berdasarkan Teori Kecerdasan Majemuk (Multiple Intelligences) untuk kecocokan jurusan kuliah dan profesi masa depan Anda."}
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

      {/* Areas Stagger Deck */}
      <div className="flex flex-col gap-6 relative">
        <h3 className="text-xl font-extrabold text-slate-900 text-center">
          Aspek <span className="font-serif italic font-normal text-indigo-600">{isRiasec ? "Kepribadian RIASEC" : "Kecerdasan Majemuk"}</span>
        </h3>
        
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(event, info) => {
            const swipeThreshold = 50; // swipe threshold in pixels
            if (info.offset.x < -swipeThreshold) {
              handleMove(1);
            } else if (info.offset.x > swipeThreshold) {
              handleMove(-1);
            }
          }}
          className="relative w-full overflow-hidden bg-slate-100/20 rounded-3xl border border-slate-200/50 cursor-grab active:cursor-grabbing"
          style={{ height: 500 }}
        >
          {aspectsList.map((aspect, index) => {
            const position = aspectsList.length % 2
              ? index - (aspectsList.length - 1) / 2
              : index - aspectsList.length / 2;
            return (
              <AspectCard
                key={aspect.tempId}
                aspect={aspect}
                handleMove={handleMove}
                setSelectedRoom={setSelectedRoom}
                position={position}
                cardSize={cardSize}
              />
            );
          })}
        </motion.div>
      </div>

      {/* CLASSROOM WHITEBOARD MODAL */}
      {selectedRoom && (
        <div 
          ref={overlayRef} 
          onClick={(e) => {
            if (e.target === overlayRef.current) {
              setSelectedRoom(null);
            }
          }}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
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
                  {isRiasec ? "Aspek Kepribadian" : "Aspek Kecerdasan"}
                </span>
                <h3 className="text-lg font-black text-slate-900 leading-tight">
                  {isRiasec ? riasecTypes[selectedRoom]?.name : intelligences[selectedRoom]?.name}
                </h3>
              </div>
            </div>

            {/* Content whiteboard styled */}
            <div className="flex flex-col gap-4 text-sm text-slate-650">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <h5 className="font-extrabold text-slate-800 text-xs uppercase tracking-wide mb-1.5">Deskripsi:</h5>
                <p className="leading-relaxed text-xs sm:text-sm">
                  {isRiasec ? riasecTypes[selectedRoom]?.description : intelligences[selectedRoom]?.description}
                </p>
              </div>

              <div>
                <h5 className="font-extrabold text-slate-800 text-xs uppercase tracking-wide mb-2">Saran Jurusan Kuliah:</h5>
                <div className="flex flex-wrap gap-1.5">
                  {(isRiasec ? riasecTypes[selectedRoom]?.majors : intelligences[selectedRoom]?.majors)?.map((major, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-indigo-50/50 text-indigo-750 text-[11px] font-bold border border-indigo-100/50">
                      🎓 {major}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-extrabold text-slate-800 text-xs uppercase tracking-wide mb-2">Profesi & Karir yang Cocok:</h5>
                <div className="flex flex-wrap gap-1.5">
                  {(isRiasec ? riasecTypes[selectedRoom]?.careers : intelligences[selectedRoom]?.careers)?.map((career, i) => (
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
