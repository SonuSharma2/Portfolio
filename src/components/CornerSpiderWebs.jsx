import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// High-fidelity procedural transparent SVG Spider Web with delicate filaments & dewdrops
const SpiderWebGraphic = ({ size = 260, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 240 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-full stroke-slate-900 ${className}`}
  >
    {/* Primary Radial Structural Anchor Filaments */}
    <line x1="0" y1="0" x2="240" y2="0" strokeWidth="1.2" stroke="currentColor" strokeDasharray="3 2" />
    <line x1="0" y1="0" x2="230" y2="60" strokeWidth="0.8" stroke="currentColor" />
    <line x1="0" y1="0" x2="200" y2="120" strokeWidth="0.8" stroke="currentColor" />
    <line x1="0" y1="0" x2="155" y2="175" strokeWidth="0.8" stroke="currentColor" />
    <line x1="0" y1="0" x2="100" y2="215" strokeWidth="0.8" stroke="currentColor" />
    <line x1="0" y1="0" x2="45" y2="235" strokeWidth="0.8" stroke="currentColor" />
    <line x1="0" y1="0" x2="0" y2="240" strokeWidth="1.2" stroke="currentColor" strokeDasharray="3 2" />

    {/* Crimson silk accent center beam */}
    <line x1="0" y1="0" x2="170" y2="170" strokeWidth="1" stroke="#E11D48" strokeOpacity="0.55" />

    {/* Concentric Spiral Web Curves (Tension Arcs) */}
    <path d="M45 0 Q 42 16 38 32 Q 32 38 16 42 Q 0 45 0 45" stroke="currentColor" strokeWidth="0.75" />
    <path d="M90 0 Q 84 32 76 64 Q 64 76 32 84 Q 0 90 0 90" stroke="currentColor" strokeWidth="0.75" />
    <path d="M135 0 Q 126 48 114 96 Q 96 114 48 126 Q 0 135 0 135" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 1" />
    <path d="M180 0 Q 168 64 152 128 Q 128 152 64 168 Q 0 180 0 180" stroke="currentColor" strokeWidth="0.75" />
    <path d="M225 0 Q 210 80 190 160 Q 160 190 80 210 Q 0 225 0 225" stroke="currentColor" strokeWidth="0.8" />

    {/* Subtle Dewdrop Light Nodes */}
    <circle cx="76" cy="64" r="2.2" fill="#E11D48" fillOpacity="0.7" />
    <circle cx="114" cy="96" r="2" fill="#0F172A" fillOpacity="0.4" />
    <circle cx="152" cy="128" r="2.5" fill="#E11D48" fillOpacity="0.6" />
    <circle cx="190" cy="160" r="2" fill="#0F172A" fillOpacity="0.3" />
  </svg>
);

export const CornerSpiderWebs = ({
  scrollTrigger = true,
  triggerRef,
  className = '',
}) => {
  const containerRef = useRef(null);
  const leftWebRef = useRef(null);
  const rightWebRef = useRef(null);
  const leftThreadRef = useRef(null);
  const rightThreadRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targetTrigger = triggerRef?.current || containerRef.current;

      // 1. Entrance animation with ScrollTrigger
      const entranceTl = gsap.timeline({
        scrollTrigger: scrollTrigger
          ? {
              trigger: targetTrigger,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          : null,
      });

      // Threads grow down from ceiling
      entranceTl
        .fromTo(
          [leftThreadRef.current, rightThreadRef.current],
          { scaleY: 0, transformOrigin: 'top center' },
          { scaleY: 1, duration: 1.0, ease: 'power3.out', stagger: 0.1 }
        )
        // Webs drop smoothly into place with subtle elastic settling
        .fromTo(
          [leftWebRef.current, rightWebRef.current],
          { y: -120, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.8,
            ease: 'elastic.out(1, 0.5)',
            stagger: 0.15,
          },
          '-=0.6'
        );

      // 2. Extremely slow continuous ambient rotation
      // Left web rotates clockwise slowly (3-4 degrees, 12s period)
      gsap.to(leftWebRef.current, {
        rotation: 4.5,
        transformOrigin: '0% 0%',
        duration: 12.0,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Right web rotates counter-clockwise slowly (-4.5 degrees, 13.5s period)
      gsap.to(rightWebRef.current, {
        rotation: -4.5,
        transformOrigin: '100% 0%',
        duration: 13.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [scrollTrigger, triggerRef]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      {/* ================= LEFT CORNER WEB ================= */}
      <div className="absolute top-0 left-0 w-48 sm:w-64 md:w-72 lg:w-80">
        {/* Thin vertical ceiling silk thread */}
        <div
          ref={leftThreadRef}
          className="absolute top-0 left-0 w-[1px] h-20 sm:h-28 bg-gradient-to-b from-slate-400 via-rose-500/60 to-rose-600 shadow-[0_0_4px_rgba(225,29,72,0.4)] z-10"
        />

        {/* Left Web Object with mix-blend-multiply and low opacity */}
        <div
          ref={leftWebRef}
          className="w-full aspect-square opacity-[0.16] hover:opacity-30 transition-opacity duration-500 mix-blend-multiply"
        >
          <SpiderWebGraphic />
        </div>
      </div>

      {/* ================= RIGHT CORNER WEB ================= */}
      <div className="absolute top-0 right-0 w-48 sm:w-64 md:w-72 lg:w-80 flex flex-col items-end">
        {/* Thin vertical ceiling silk thread */}
        <div
          ref={rightThreadRef}
          className="absolute top-0 right-0 w-[1px] h-20 sm:h-28 bg-gradient-to-b from-slate-400 via-rose-500/60 to-rose-600 shadow-[0_0_4px_rgba(225,29,72,0.4)] z-10"
        />

        {/* Right Web Object (mirrored horizontal) with mix-blend-multiply and low opacity */}
        <div
          ref={rightWebRef}
          className="w-full aspect-square opacity-[0.16] hover:opacity-30 transition-opacity duration-500 mix-blend-multiply"
          style={{ transform: 'scaleX(-1)' }}
        >
          <SpiderWebGraphic />
        </div>
      </div>
    </div>
  );
};
