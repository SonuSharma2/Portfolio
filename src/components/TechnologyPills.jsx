import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_TECHNOLOGIES = [
  { name: 'React', icon: '⚛️', hoverBg: 'hover:bg-[#087ea4]' },
  { name: 'Node.js', icon: '🟢', hoverBg: 'hover:bg-[#539e43]' },
  { name: 'Express', icon: '⚡', hoverBg: 'hover:bg-[#000000]' },
  { name: 'PostgreSQL', icon: '🐘', hoverBg: 'hover:bg-[#336791]' },
  { name: 'MongoDB', icon: '🍃', hoverBg: 'hover:bg-[#13aa52]' },
  { name: 'Docker', icon: '🐳', hoverBg: 'hover:bg-[#2496ed]' },
];

export const TechnologyPills = ({
  technologies = DEFAULT_TECHNOLOGIES,
  triggerRef,
  className = '',
  scrollTrigger = true,
}) => {
  const containerRef = useRef(null);
  const pillElementsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targetTrigger = triggerRef?.current || containerRef.current;
      const validPills = pillElementsRef.current.filter(Boolean);

      if (validPills.length === 0) return;

      // 1. Entrance Animation
      // - Start at scale: 0.5, opacity: 0, y: 20
      // - Animate to scale: 1, opacity: 1, y: 0
      // - Use stagger: 0.1
      // - Use back.out easing
      gsap.fromTo(
        validPills,
        {
          scale: 0.5,
          opacity: 0,
          y: 20,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: scrollTrigger
            ? {
                trigger: targetTrigger,
                start: 'top 85%',
                toggleActions: 'play none none none',
              }
            : null,
          onComplete: () => {
            // 2. Continuous Animation
            // - Very subtle vertical floating animation (3px to 5px)
            // - yoyo: true, repeat: -1
            // - sine.inOut easing
            // - Staggered randomly
            validPills.forEach((pill) => {
              const randomDuration = 2.5 + Math.random() * 1.5; // 2.5s - 4.0s
              const randomDelay = Math.random() * 0.8;
              const randomOffset = 3 + Math.random() * 2; // 3px - 5px

              gsap.to(pill, {
                y: -randomOffset,
                duration: randomDuration,
                delay: randomDelay,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
              });
            });
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [scrollTrigger, triggerRef]);

  return (
    <div
      ref={containerRef}
      className={`flex flex-wrap gap-3 ${className}`}
    >
      {technologies.map((tech, index) => (
        <div
          key={tech.name}
          ref={(el) => (pillElementsRef.current[index] = el)}
          className={`group relative inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200/90 text-xs font-mono font-semibold text-slate-800 shadow-sm transition-all duration-300 ease-out hover:text-white hover:border-transparent hover:shadow-md hover:-translate-y-0.5 cursor-default ${tech.hoverBg}`}
        >
          <span className="text-sm transition-transform duration-300 group-hover:scale-110">
            {tech.icon}
          </span>
          <span className="tracking-wide">{tech.name}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ))}
    </div>
  );
};
