import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HangingProfileImage = ({
  src,
  alt = 'Profile Avatar',
  name = 'Sonu Sharma',
  role = 'QA Engineer & Test Automation Specialist',
  className = '',
  scrollTrigger = true,
}) => {
  const hangingContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance animation: drop from y: -800 into position with elastic.out
      const entranceTween = gsap.fromTo(
        hangingContainerRef.current,
        {
          y: -800,
          opacity: 0,
          rotation: -10,
        },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 2.2,
          ease: 'elastic.out(1, 0.45)',
          scrollTrigger: scrollTrigger
            ? {
                trigger: hangingContainerRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
              }
            : null,
          onComplete: () => {
            // 2. Continuous ambient swinging around transformOrigin: "top center"
            gsap.to(hangingContainerRef.current, {
              rotation: 2.5, // 2-3 degrees
              transformOrigin: 'top center',
              duration: 3.6,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            });
          },
        }
      );

      // Fallback swing trigger if scrollTrigger is not used
      if (!scrollTrigger) {
        entranceTween.eventCallback('onComplete', () => {
          gsap.to(hangingContainerRef.current, {
            rotation: 2.5,
            transformOrigin: 'top center',
            duration: 3.6,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }
    }, hangingContainerRef);

    return () => ctx.revert();
  }, [scrollTrigger]);

  return (
    <div
      ref={hangingContainerRef}
      className={`relative flex flex-col items-center select-none ${className}`}
      style={{ transformOrigin: 'top center' }}
    >
      {/* Ceiling Anchor Point */}
      <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-rose-500 shadow-md z-30" />

      {/* Long thin vertical thread from the top (Responsive length: longer on desktop) */}
      <div className="w-[1.5px] h-32 sm:h-44 md:h-56 lg:h-72 bg-gradient-to-b from-rose-500/80 via-slate-400 to-rose-600 shadow-[0_0_8px_rgba(225,29,72,0.5)] z-20" />

      {/* Thread Connection Knot / Node */}
      <div className="w-4 h-4 rounded-full bg-white border-2 border-rose-600 shadow-md flex items-center justify-center -mt-1 mb-1 z-30">
        <div className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
      </div>

      {/* Circular Profile Frame Container with animated breathing glow */}
      <div className="relative group p-3">
        {/* Animated subtle box-shadow / breathing crimson aura */}
        <div className="absolute inset-2 rounded-full bg-rose-500/25 blur-2xl animate-pulse-slow pointer-events-none group-hover:bg-rose-500/40 group-hover:blur-3xl transition-all duration-700" />

        {/* Outer Accent Ring with thick border */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full p-2 bg-gradient-to-b from-rose-600 via-slate-800 to-slate-950 border-[5px] border-rose-600/90 shadow-[0_15px_45px_rgba(225,29,72,0.25)] transition-transform duration-500 group-hover:scale-[1.02]">
          
          {/* Inner Image Container */}
          <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-4 border-white shadow-inner relative">
            {/* Grayscale by default, smooth transition to full color on hover */}
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover grayscale contrast-125 brightness-95 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
            />

            {/* Hover details overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 text-white text-center pointer-events-none">
              <span className="font-syne font-bold text-base tracking-wider uppercase drop-shadow-md">
                {name}
              </span>
              <span className="font-mono text-[11px] text-rose-300 drop-shadow-sm mt-0.5">
                {role}
              </span>
            </div>
          </div>

          {/* Decorative Corner Anchor Accent Badge */}
          <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-slate-950 border-2 border-rose-500 flex items-center justify-center text-white shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          </div>
        </div>
      </div>
    </div>
  );
};
