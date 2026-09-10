"use client";

import React, { useRef, useEffect, useState } from "react";
import "./MagicBento.css";
import { BentoItem, DEFAULT_GLOW_COLOR, DEFAULT_PARTICLE_COUNT, DEFAULT_SPOTLIGHT_RADIUS, MOBILE_BREAKPOINT } from "./bento/bentoConstants";
import { ParticleCard } from "./bento/ParticleCard";
import { GlobalSpotlight } from "./bento/GlobalSpotlight";

export type { BentoItem };

export interface MagicBentoProps {
  items: BentoItem[];
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

const MagicBento: React.FC<MagicBentoProps> = ({
  items,
  textAutoHide = false,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = true,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  return (
    <>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <div className="card-grid bento-section" ref={gridRef}>
        {items.map((card, index) => {
          const baseClassName = `magic-bento-card ${card.gridClass || ""} ${
            textAutoHide ? "magic-bento-card--text-autohide" : ""
          } ${enableBorderGlow ? "magic-bento-card--border-glow" : ""}`;

          const cardStyle = {
            backgroundColor: card.color,
            "--glow-color": glowColor,
          } as React.CSSProperties;

          return (
            <ParticleCard
              key={index}
              className={baseClassName}
              style={cardStyle}
              disableAnimations={shouldDisableAnimations || !enableStars}
              particleCount={particleCount}
              glowColor={glowColor}
              enableTilt={enableTilt}
              clickEffect={clickEffect}
              enableMagnetism={enableMagnetism}
            >
              <div className="magic-bento-card__header flex items-center justify-between">
                <div className="magic-bento-card__label font-black tracking-widest text-[9px] uppercase opacity-60">
                  {card.label}
                </div>
                <div className={card.bgIcon}>
                  {card.icon}
                </div>
              </div>
              <div className="magic-bento-card__content mt-4 sm:mt-6">
                <h2 className="magic-bento-card__title font-extrabold text-sm sm:text-base mb-1">
                  {card.title}
                </h2>
                <p className="magic-bento-card__description text-xs sm:text-sm text-slate-350 leading-relaxed font-light">
                  {card.description}
                </p>
              </div>
            </ParticleCard>
          );
        })}
      </div>
    </>
  );
};

export default MagicBento;
