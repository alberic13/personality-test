import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ui/Button";
import gsap from "gsap";
import { Mail, User } from "lucide-react";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, email: string) => void;
  isSubmitting: boolean;
  isTimeOut?: boolean;
}

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  isTimeOut = false,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // GSAP animations when modal mounts (opens) (using gsap.from to prevent permanent hidden states)
  useEffect(() => {
    if (!overlayRef.current || !cardRef.current) return;

    // Fade-in overlay
    gsap.from(
      overlayRef.current,
      { opacity: 0, duration: 0.35, ease: "power2.out" }
    );

    // Bounce pop-up modal card
    gsap.from(
      cardRef.current,
      { 
        scale: 0.8, 
        opacity: 0, 
        y: 30, 
        duration: 0.55, 
        ease: "back.out(1.6)", 
        clearProps: "all" 
      }
    );
  }, []);

  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Nama Lengkap wajib diisi.");
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Masukkan alamat email yang valid.");
      return;
    }

    onSubmit(name.trim(), email.trim());
  };

  return (
    <div ref={overlayRef} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div ref={cardRef} className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl flex flex-col gap-5 relative">
        
        {/* Close button */}
        {!isTimeOut && (
          <button 
            onClick={onClose} 
            className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer"
            title="Batal"
          >
            ✕
          </button>
        )}

        <div className="flex flex-col gap-2 text-center">
          {isTimeOut ? (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 text-xs sm:text-sm font-extrabold leading-relaxed mb-2">
              ⏰ Waktu Anda telah habis (15 menit)!
            </div>
          ) : (
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 font-black text-xl italic tracking-tighter mx-auto select-none">
              Z
            </div>
          )}
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {isTimeOut ? "Kumpulkan Hasil Tes" : "Lihat Analisis Kecerdasan Anda"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed px-2">
            {isTimeOut
              ? "Masukkan nama dan email Anda di bawah untuk mengumpulkan hasil pengerjaan kuis Anda ke Google Sheets."
              : "Masukkan nama dan email Anda untuk menyimpan hasil skoring dan membuka detail rekomendasi jurusan & profesi lengkap."}
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 mt-2">
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 text-rose-600 text-xs font-semibold border border-rose-100/50">
              ⚠️ {error}
            </div>
          )}

          {/* Nama Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black text-slate-500 uppercase tracking-wider px-1">
              Nama Lengkap
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <User className="w-4.5 h-4.5" />
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap Anda"
                disabled={isSubmitting}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500/30 focus:border-slate-400 text-sm placeholder:text-slate-400 font-medium"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black text-slate-500 uppercase tracking-wider px-1">
              Alamat Email
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Mail className="w-4.5 h-4.5" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                disabled={isSubmitting}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500/30 focus:border-slate-400 text-sm placeholder:text-slate-400 font-medium"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            {!isTimeOut && (
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="w-full py-3"
              >
                Batal
              </Button>
            )}
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="w-full py-3"
            >
              {isSubmitting ? "Mengirim..." : isTimeOut ? "Kumpulkan Jawaban" : "Kirim & Lihat Hasil"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
