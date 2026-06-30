import React, { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";

interface SchoolGateProps {
  onEnter: () => void;
}

export const SchoolGate: React.FC<SchoolGateProps> = ({ onEnter }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Floating clouds animation (subtle motion behind the texts)
    gsap.to(".gsap-cloud-1", { x: 30, repeat: -1, yoyo: true, duration: 6, ease: "sine.inOut" });
    gsap.to(".gsap-cloud-2", { x: -30, repeat: -1, yoyo: true, duration: 7, ease: "sine.inOut" });

    // Initial fade in for landing elements
    gsap.from(".gsap-gate-initial", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      clearProps: "all"
    });
  }, []);

  // Scroll logic for fullscreen camera zoom-in
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const maxScroll = docHeight - winHeight;
      if (maxScroll <= 0) return;

      const progress = Math.min(scrollY / maxScroll, 1);

      // 1. Welcome text fades out and rises
      gsap.to(".gsap-scroll-text", {
        opacity: 1 - progress * 2.2,
        y: -progress * 80,
        overwrite: "auto",
        duration: 0.1
      });

      // 2. School image zoom-in (fullscreen cover scale)
      const scaleVal = 1 + progress * 9.5; // Scales from 1x to 10.5x for massive zoom
      gsap.to(".school-illustration", {
        scale: scaleVal,
        overwrite: "auto",
        duration: 0.1
      });

      // 3. Floating clouds fade out
      gsap.to(".gsap-cloud-item", {
        opacity: 1 - progress * 2,
        overwrite: "auto",
        duration: 0.1
      });

      // 4. Dark overlay fades in at the end of scroll (progress > 0.65)
      if (progress > 0.65) {
        const overlayOpacity = (progress - 0.65) / 0.3; // Scale to 0-1
        gsap.to(".gsap-dark-overlay", {
          opacity: Math.min(overlayOpacity, 1),
          overwrite: "auto",
          duration: 0.1
        });
      } else {
        gsap.to(".gsap-dark-overlay", {
          opacity: 0,
          overwrite: "auto",
          duration: 0.1
        });
      }

      // 5. Trigger page enter when scroll reaches bottom threshold
      if (progress >= 0.97) {
        window.removeEventListener("scroll", handleScroll);
        // Reset scroll position to top instantly before transition
        window.scrollTo({ top: 0, behavior: "auto" });
        onEnter();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onEnter]);

  return (
    <div ref={containerRef} className="relative w-full h-[220vh] bg-slate-950">
      
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between py-12 px-4 select-none z-10">
        
        {/* Fullscreen School Flat Illustration Background */}
        <img 
          src="/school-building.png" 
          alt="School Exterior"
          className="school-illustration absolute inset-0 w-full h-full object-cover origin-[50%_60%] z-0"
        />

        {/* Ambient Dark Gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/20 to-slate-950/80 z-5 pointer-events-none" />

        {/* Floating clouds inside fullscreen view */}
        <div className="gsap-cloud-item gsap-cloud-1 absolute top-10 left-12 w-20 h-10 bg-white/40 rounded-full blur-[2px] z-5 pointer-events-none" />
        <div className="gsap-cloud-item gsap-cloud-2 absolute top-20 right-20 w-24 h-12 bg-white/35 rounded-full blur-[2px] z-5 pointer-events-none" />

        {/* Welcome Header */}
        <div className="gsap-scroll-text gsap-gate-initial flex flex-col gap-4 text-center z-10 max-w-xl mx-auto mt-10">

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-md leading-tight">
            Selamat Datang di <br />
            <span className="font-serif italic font-normal text-sky-200 block mt-2 drop-shadow-lg">Akademi Potensi Diri</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 font-medium max-w-sm mx-auto leading-relaxed drop-shadow-md">
            Temukan minat & bakat terpendam Anda dengan kuis kecerdasan majemuk interaktif.
          </p>
        </div>

        {/* Scrolling Hint */}
        <div className="gsap-gate-initial flex flex-col items-center gap-2 text-center text-slate-350 font-bold text-[10px] sm:text-xs tracking-widest z-10 pb-6 animate-bounce">
          <ArrowDown className="w-5 h-5 text-white" />
          <span className="drop-shadow-sm">SCROLL KE BAWAH UNTUK MASUK SEKOLAH</span>
        </div>

        {/* Seamless dark fade overlay */}
        <div className="gsap-dark-overlay absolute inset-0 bg-slate-950 opacity-0 pointer-events-none z-20 transition-colors duration-100" />
      </div>
    </div>
  );
};
