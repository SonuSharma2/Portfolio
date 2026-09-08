import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const web1 = new URL('../../public/assets/web1-770H2sSx.png', import.meta.url).href;
const spydyStand = new URL('../../public/assets/spydy_stand-BwBM-zCr.png', import.meta.url).href;

export const Projects = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const webRef = useRef(null);
  const spiderRef = useRef(null);

  const projectsList = [
    {
      title: 'Chatboq AI SaaS QA & Automation',
      description:
        'Conducted comprehensive QA testing and developed automated test scripts using Python, Selenium, and Playwright with POM frameworks for a SaaS AI chatbot platform (inbox, tickets, billing, and AI modules) with defect lifecycle tracking in ClickUp.',
      tags: ['Chatboq SaaS', 'Selenium', 'Playwright', 'Python', 'ClickUp', 'API Testing'],
      link: 'https://chatboq.com/',
    },
    {
      title: 'SauceDemo Test Automation',
      description:
        'Automated end-to-end login and checkout workflows using Selenium with Python and Pytest. Architected modular Page Object Model (POM) structure for continuous test execution.',
      tags: ['Selenium', 'Python', 'Pytest', 'POM', 'QA Automation'],
      link: 'https://github.com/SonuSharma2/SauceDemo-Automation',
    },
    {
      title: 'Blockchain Based Voting System',
      description:
        'Developed a decentralized voting platform using the Ethereum blockchain to eliminate tampering and ensure transparency. Successfully stress-tested with 150 real participants.',
      tags: ['Ethereum', 'Solidity', 'Smart Contracts', 'Security Testing'],
      link: 'https://github.com/SonuSharma2',
    },
    {
      title: 'Image Steganography System',
      description:
        'Secure web application built with Python Flask and Pillow utilizing Least Significant Bit (LSB) encoding algorithms to seamlessly embed and decode confidential data within carrier images.',
      tags: ['Python', 'Flask', 'Pillow (PIL)', 'LSB Algorithm', 'Security'],
      link: 'https://github.com/SonuSharma2/ImageSteganography',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
        .fromTo(
          headerRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
        )
        .fromTo(
          '.project-item',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.4)' },
          '-=0.3'
        )
        .fromTo(
          spiderRef.current,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
          '-=0.4'
        );

      gsap.set(webRef.current, { transformOrigin: 'top right' });
      gsap.to(webRef.current, {
        rotation: 8,
        repeat: -1,
        yoyo: true,
        duration: 6,
        ease: 'sine.inOut',
      });

      gsap.to(webRef.current, {
        scale: 1.1,
        opacity: 0.07,
        repeat: -1,
        yoyo: true,
        duration: 4,
        ease: 'sine.inOut',
      });

      gsap.to(spiderRef.current, {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-white text-gray-900 py-16 px-6 md:px-16 lg:px-24 flex flex-col items-center justify-center overflow-hidden border-t border-gray-100"
    >
      {/* Background Web Motif on Top Right */}
      <div className="absolute top-0 right-0 pointer-events-none overflow-hidden z-0">
        <img
          ref={webRef}
          src={web1}
          alt="Background Web"
          className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] object-contain opacity-[0.04] mix-blend-multiply translate-x-1/4 -translate-y-1/4"
        />
      </div>

      {/* Standing Spider-Man Character in Bottom Left */}
      <div ref={spiderRef} className="absolute bottom-0 left-4 md:left-12 z-30 pointer-events-none">
        <img
          src={spydyStand}
          alt="Standing Spider-Man"
          className="w-32 md:w-48 h-auto object-contain drop-shadow-2xl"
        />
      </div>

      {/* Section Header */}
      <div ref={headerRef} className="flex flex-col items-center text-center mb-10 z-10">
        <span className="text-[#a31515] font-bold uppercase text-[10px] md:text-xs tracking-[0.2em] mb-2">
          Featured Works
        </span>
        <h2
          className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic text-gray-900"
          style={{ textShadow: '2px 2px 0px #fca5a5' }}
        >
          PROJECTS.
        </h2>
        <div className="w-12 h-1 bg-[#a31515] mt-2 rounded-full" />
      </div>

      {/* Projects 2-Column Grid */}
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 z-10">
        {projectsList.map((project, idx) => (
          <a
            key={idx}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-item group relative bg-gray-50/90 backdrop-blur-sm border border-gray-200 hover:border-[#a31515] p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden shadow-sm hover:shadow-[0_10px_25px_rgba(163,21,21,0.15)] transform hover:-translate-y-1"
          >
            {/* Top red sliding bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#a31515] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-black uppercase tracking-tight text-gray-900 group-hover:text-[#a31515] transition-colors duration-300">
                  {project.title}
                </h3>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-[#a31515] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>

              <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-medium mb-6">
                {project.description}
              </p>
            </div>

            {/* Tag Pills */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200/60">
              {project.tags.map((tag, tagIdx) => (
                <span
                  key={tagIdx}
                  className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-white border border-gray-200 text-gray-600 group-hover:border-[#a31515]/30 group-hover:text-[#a31515] rounded-md transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
