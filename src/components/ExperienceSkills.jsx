import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Briefcase, Award, Cpu } from 'lucide-react';
import { CornerWeb } from './SpiderWebBackground';

gsap.registerPlugin(ScrollTrigger);

export const ExperienceSkills = () => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Timeline vertical silk line growth on scroll
      gsap.fromTo(
        '.timeline-silk-line',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
            end: 'bottom 85%',
            scrub: 1,
          },
        }
      );

      // 2. Timeline items staggered slide and fade
      const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
      if (timelineItems) {
        gsap.fromTo(
          timelineItems,
          { opacity: 0, x: -35, filter: 'blur(4px)' },
          {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            stagger: 0.22,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-32 bg-white overflow-hidden border-b border-slate-200"
    >
      <CornerWeb position="top-left" className="opacity-20" />
      <CornerWeb position="bottom-right" className="opacity-20" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-rose-600 uppercase mb-3">
            <Briefcase className="w-4 h-4 text-rose-600" />
            <span>// 03 TRACK RECORD & TIMELINE</span>
          </div>
          <h2 className="font-syne font-extrabold text-4xl sm:text-6xl uppercase tracking-tight text-obsidian">
            EXPERIENCE <span className="text-rose-600">CHRONOLOGY.</span>
          </h2>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Timeline items */}
          <div ref={timelineRef} className="lg:col-span-8 space-y-8 relative">
            
            {/* Vertical Spider Silk Line */}
            <div className="timeline-silk-line absolute top-4 bottom-4 left-4 sm:left-6 w-[2px] bg-gradient-to-b from-rose-600 via-slate-300 to-transparent shadow-[0_0_6px_rgba(225,29,72,0.3)]" />

            {PORTFOLIO_DATA.experience.map((item, idx) => (
              <div
                key={idx}
                className="timeline-item relative pl-12 sm:pl-16 group"
              >
                {/* Node Dot with Ping effect */}
                <div className="absolute left-2 sm:left-4 top-1.5 w-4 h-4 rounded-full bg-white border-2 border-rose-600 shadow-sm flex items-center justify-center -translate-x-1/2 group-hover:scale-125 group-hover:border-obsidian transition-all">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                </div>

                {/* Content Box */}
                <div className="p-6 sm:p-8 rounded-2xl bg-[#F8F9FA] border border-slate-200/90 group-hover:border-rose-300 group-hover:shadow-crimson-glow transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-rose-600 tracking-wider">
                      {item.period}
                    </span>
                    <span className="font-mono text-xs text-slate-500 font-semibold">
                      {item.company}
                    </span>
                  </div>

                  <h3 className="font-syne font-bold text-xl sm:text-2xl text-obsidian mb-3">
                    {item.role}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded bg-white border border-slate-200 text-[11px] font-mono text-slate-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: QA Best Practices & Certifications */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-8 rounded-3xl border border-slate-200 shadow-obsidian-glass space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-rose-600 uppercase">
                <Award className="w-4 h-4 text-rose-600" />
                <span>QA PILLARS & CERTIFICATIONS</span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="font-syne font-bold text-slate-900 text-base">
                    Page Object Model (POM) Design
                  </h4>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed">
                    Modular, reusable test architectures separating page locators from test logic, reducing maintenance debt by 70%.
                  </p>
                </div>

                <div className="space-y-1 pt-3 border-t border-slate-100">
                  <h4 className="font-syne font-bold text-slate-900 text-base">
                    Rigorous Defect Lifecycle
                  </h4>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed">
                    Zero-ambiguity bug reporting in ClickUp & Jira with detailed payloads, console traces, and severity prioritization.
                  </p>
                </div>

                <div className="space-y-1 pt-3 border-t border-slate-100">
                  <h4 className="font-syne font-bold text-slate-900 text-base">
                    Recognitions & Accreditations
                  </h4>
                  <ul className="text-xs text-slate-600 font-mono space-y-1 pt-1">
                    <li className="flex items-center gap-1.5 text-rose-600">
                      <span>✓</span> <span className="text-slate-700">Python (Basic) — HackerRank</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-rose-600">
                      <span>✓</span> <span className="text-slate-700">Git & Version Control Workshop</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-rose-600">
                      <span>✓</span> <span className="text-slate-700">Robotics Workshop on Arduino</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-obsidian text-white flex items-center gap-3">
                <Cpu className="w-8 h-8 text-rose-500 flex-shrink-0 animate-pulse" />
                <div className="text-xs font-mono">
                  <div className="text-rose-400 font-bold">READY TO TEST & AUTOMATE</div>
                  <div className="text-slate-300">Available for QA Engineer, Automation, & Full-Stack Testing roles.</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
