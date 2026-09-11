import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import AOS from 'aos';
import 'aos/dist/aos.css';

const image1 = new URL('../../public/assets/image-1-fYP2o7gg.png', import.meta.url).href;
const image2 = new URL('../../public/assets/image-2-DS0sMyr7.png', import.meta.url).href;
const web1 = new URL('../../public/assets/web1-770H2sSx.png', import.meta.url).href;
const spydy = new URL('../../public/assets/spydy-DLbFrGCQ.png', import.meta.url).href;

export const Hero = () => {
  const sectionRef = useRef(null);
  const maskImgRef = useRef(null);
  const subtitleRef = useRef(null);
  const titleRef = useRef(null);
  const buttonsRef = useRef(null);
  const websRef = useRef(null);
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);
  const [hasInteracted, setHasInteracted] = React.useState(false);
  const idleTimeline = useRef(null);
  const idleTimeout = useRef(null);

  const mousePos = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth * 0.52 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight * 0.42 : 400,
    alpha: 0.15,
    size: typeof window !== 'undefined' && window.innerWidth < 768 ? 160 : 200,
  }).current;

  const quickX = useRef(null);
  const quickY = useRef(null);
  const marquee1Tween = useRef(null);
  const marquee2Tween = useRef(null);

  // Start or resume subtle cinematic scanner when idle
  const startIdleAnimation = () => {
    if (idleTimeline.current) idleTimeline.current.kill();

    const centerX = typeof window !== 'undefined' ? window.innerWidth * 0.52 : 500;
    const centerY = typeof window !== 'undefined' ? window.innerHeight * 0.42 : 400;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    idleTimeline.current = gsap.timeline({ repeat: -1, yoyo: true });
    idleTimeline.current
      .to(mousePos, {
        x: centerX + (isMobile ? 30 : 60),
        y: centerY - (isMobile ? 20 : 35),
        size: isMobile ? 180 : 240,
        alpha: 0,
        duration: 3,
        ease: 'sine.inOut',
      })
      .to(mousePos, {
        x: centerX - (isMobile ? 30 : 50),
        y: centerY + (isMobile ? 25 : 40),
        size: isMobile ? 130 : 170,
        alpha: 0.35,
        duration: 3.2,
        ease: 'sine.inOut',
      });
  };

  const stopIdleAnimation = () => {
    if (idleTimeline.current) {
      idleTimeline.current.kill();
      idleTimeline.current = null;
    }
    if (idleTimeout.current) {
      clearTimeout(idleTimeout.current);
    }
  };

  const resetIdleTimer = () => {
    if (idleTimeout.current) clearTimeout(idleTimeout.current);
    idleTimeout.current = setTimeout(() => {
      startIdleAnimation();
    }, 3500);
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-out-expo' });

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'back.out(1.7)' } })
        .fromTo(
          websRef.current.children,
          { opacity: 0, scale: 0.5 },
          { opacity: 0.5, scale: 1, duration: 2, stagger: 0.4, ease: 'power3.out' }
        )
        .fromTo(
          subtitleRef.current,
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2 },
          '-=1.5'
        )
        .fromTo(
          titleRef.current,
          { x: -150, opacity: 0, skewX: -15 },
          { x: 0, opacity: 1, skewX: 0, duration: 1.2 },
          '-=1.0'
        )
        .fromTo(
          buttonsRef.current.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(2)' },
          '-=0.8'
        );

      gsap.to(websRef.current.children, {
        rotation: 360,
        duration: 120,
        repeat: -1,
        ease: 'linear',
      });

      gsap.to(websRef.current.children, {
        scale: 1.1,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      marquee1Tween.current = gsap.to(marquee1Ref.current, {
        x: '-50%',
        repeat: -1,
        duration: 15,
        ease: 'none',
      });

      gsap.set(marquee2Ref.current, { x: '-50%' });
      marquee2Tween.current = gsap.to(marquee2Ref.current, {
        x: '0%',
        repeat: -1,
        duration: 20,
        ease: 'none',
      });

      gsap.to('.marquee-text', {
        y: -4,
        yoyo: true,
        repeat: -1,
        duration: 0.8,
        ease: 'sine.inOut',
        stagger: 0.1,
      });

      // Launch idle scanner slightly after entrance
      setTimeout(() => {
        startIdleAnimation();
      }, 1400);
    });

    return () => {
      ctx.revert();
      stopIdleAnimation();
    };
  }, []);

  useEffect(() => {
    quickX.current = gsap.quickTo(mousePos, 'x', { duration: 0.25, ease: 'power3.out' });
    quickY.current = gsap.quickTo(mousePos, 'y', { duration: 0.25, ease: 'power3.out' });

    const updateMask = () => {
      if (maskImgRef.current) {
        const { x, y, alpha, size } = mousePos;
        const maskStyle = `radial-gradient(circle ${size}px at ${x}px ${y}px, rgba(0,0,0,${alpha}) 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,1) 100%)`;
        maskImgRef.current.style.webkitMaskImage = maskStyle;
        maskImgRef.current.style.maskImage = maskStyle;
      }
    };

    gsap.ticker.add(updateMask);
    return () => gsap.ticker.remove(updateMask);
  }, [mousePos]);

  const handleMouseMove = (e) => {
    stopIdleAnimation();
    setHasInteracted(true);
    quickX.current(e.clientX);
    quickY.current(e.clientY);
    resetIdleTimer();
  };

  const handleMouseEnter = () => {
    stopIdleAnimation();
    setHasInteracted(true);
    const targetSize = window.innerWidth < 768 ? 160 : 230;
    gsap.to(mousePos, {
      alpha: 0,
      size: targetSize,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(mousePos, {
      alpha: 0.8,
      size: 80,
      duration: 0.8,
      ease: 'power3.out',
      overwrite: 'auto',
      onComplete: () => {
        startIdleAnimation();
      },
    });
  };

  // Touch handlers for mobile & tablets
  const handleTouchStart = (e) => {
    stopIdleAnimation();
    setHasInteracted(true);
    if (e.touches && e.touches[0]) {
      const touch = e.touches[0];
      quickX.current(touch.clientX);
      quickY.current(touch.clientY);
      gsap.to(mousePos, {
        alpha: 0,
        size: 170,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const handleTouchMove = (e) => {
    stopIdleAnimation();
    if (e.touches && e.touches[0]) {
      const touch = e.touches[0];
      quickX.current(touch.clientX);
      quickY.current(touch.clientY);
    }
    resetIdleTimer();
  };

  const handleTouchEnd = () => {
    resetIdleTimer();
  };

  const handleMarqueeEnter = () => {
    if (marquee1Tween.current && marquee2Tween.current) {
      gsap.to([marquee1Tween.current, marquee2Tween.current], {
        timeScale: 0.1,
        duration: 0.8,
        ease: 'power2.out',
      });
    }
  };

  const handleMarqueeLeave = () => {
    if (marquee1Tween.current && marquee2Tween.current) {
      gsap.to([marquee1Tween.current, marquee2Tween.current], {
        timeScale: 1,
        duration: 0.8,
        ease: 'power2.out',
      });
    }
  };

  const marqueeSkills = [
    'QA & TEST AUTOMATION',
    'SELENIUM & PLAYWRIGHT',
    'PYTEST & POM ARCHITECTURE',
    'POSTMAN API TESTING',
    'SDLC & STLC METHODOLOGIES',
  ];

  const renderMarqueeItems = (skills) => (
    <React.Fragment>
      {[null, null, null].map((_, loopIdx) => (
        <div key={loopIdx} className="flex items-center h-full shrink-0">
          {skills.map((skill, idx) => (
            <React.Fragment key={`${loopIdx}-${idx}`}>
              <span className="marquee-text mx-3 sm:mx-4 md:mx-6 text-sm md:text-base lg:text-xl font-black uppercase italic tracking-widest whitespace-nowrap shrink-0 drop-shadow-sm">
                {skill}
              </span>
              <img
                src={idx % 2 === 0 ? spydy : web1}
                alt="Separator"
                className="mx-3 sm:mx-4 md:mx-6 h-5 sm:h-6 md:h-8 lg:h-10 w-auto object-contain shrink-0 drop-shadow-md"
              />
            </React.Fragment>
          ))}
        </div>
      ))}
    </React.Fragment>
  );

  return (
    <main className="w-full flex flex-col bg-white overflow-hidden select-none">
      {/* Hero Section with Interactive Spotlight Mask */}
      <section
        ref={sectionRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center cursor-crosshair touch-pan-y"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {/* Bottom Identity Layer (Normal Face with Spidey Suit) */}
        <img
          src={image2}
          alt="Bottom Identity Layer"
          className="absolute inset-0 w-full h-full object-cover object-[center_20%] md:object-center pointer-events-none z-10"
        />

        {/* Top Mask Layer (Full Masked Spider-Man) */}
        <img
          ref={maskImgRef}
          src={image1}
          alt="Top Mask Layer"
          className="absolute inset-0 w-full h-full object-cover object-[center_20%] md:object-center pointer-events-none z-20"
          style={{ WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat' }}
        />

        {/* Background Spider Webs */}
        <div ref={websRef} className="absolute inset-0 pointer-events-none z-[25] overflow-hidden">
          <img
            src={web1}
            alt="Spider Web Top"
            className="absolute top-0 left-0 w-44 h-44 sm:w-64 sm:h-64 md:w-[400px] md:h-[400px] object-contain opacity-40 sm:opacity-50 -translate-x-1/4 -translate-y-1/4 mix-blend-multiply"
          />
          <img
            src={web1}
            alt="Spider Web Bottom"
            className="absolute bottom-0 right-0 w-52 h-52 sm:w-72 sm:h-72 md:w-[500px] md:h-[500px] object-contain opacity-40 sm:opacity-50 translate-x-1/4 translate-y-1/4 mix-blend-multiply"
          />
        </div>

        {/* Floating Mobile Guidance Pill */}
        <div
          className={`md:hidden absolute top-20 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-red-500/50 shadow-[0_4px_16px_rgba(220,38,38,0.4)] pointer-events-none transition-all duration-700 ${
            hasInteracted ? 'opacity-0 -translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0 animate-bounce'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0" />
          <span className="text-[10px] font-bold text-white tracking-widest uppercase whitespace-nowrap">
            Touch &amp; Drag to Unmask
          </span>
        </div>

        {/* Left Side Floating Hero Typography & Buttons */}
        <div className="absolute bottom-8 sm:bottom-12 md:bottom-auto md:top-1/2 md:-translate-y-1/2 left-6 md:left-12 lg:left-24 z-30 flex flex-col gap-2 sm:gap-3 pointer-events-none drop-shadow-md max-w-lg w-full">
          <span
            ref={subtitleRef}
            className="text-[#a31515] font-bold uppercase text-[11px] sm:text-xs md:text-sm tracking-[0.2em] opacity-0"
          >
            Your Friendly Neighborhood Engineer
          </span>

          <h1
            ref={titleRef}
            className="text-gray-900 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none opacity-0 italic uppercase"
            style={{ textShadow: '2px 2px 0px #ef4444, 5px 5px 0px #a31515' }}
          >
            SONU
            <br />
            SHARMA.
          </h1>

          <div ref={buttonsRef} className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 sm:mt-6 pointer-events-auto">
            <a
              href="#projects"
              className="relative overflow-hidden bg-[#a31515] hover:bg-[#7a0f0f] text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(163,21,21,0.4)] cursor-pointer uppercase border border-[#a31515]"
            >
              Explore Projects
            </a>

            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 text-white bg-gray-900 hover:bg-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] uppercase text-xs sm:text-sm group"
            >
              <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
              </svg>
              Sonu_Sharma_CV.pdf
            </a>
          </div>
        </div>
      </section>

      {/* Crossed Dual Marquees Section */}
      <section
        className="relative w-full h-[20vh] md:h-[30vh] bg-white overflow-hidden flex items-center justify-center z-40"
        onMouseEnter={handleMarqueeEnter}
        onMouseLeave={handleMarqueeLeave}
      >
        {/* Top Ribbon Tilted +4deg */}
        <div className="absolute w-[110vw] h-12 md:h-16 lg:h-20 bg-[#a31515] text-white border-y-[3px] border-black rotate-[4deg] -translate-y-4 md:-translate-y-6 shadow-[0_10px_20px_rgba(0,0,0,0.4)] z-20 flex items-center overflow-hidden scale-105">
          <div ref={marquee1Ref} className="flex items-center h-full w-max">
            {renderMarqueeItems(marqueeSkills)}
          </div>
        </div>

        {/* Bottom Ribbon Tilted -4deg */}
        <div className="absolute w-[110vw] h-12 md:h-16 lg:h-20 bg-[#111111] text-[#a31515] border-y-[3px] border-[#a31515] rotate-[-4deg] translate-y-4 md:translate-y-6 shadow-[0_5px_15px_rgba(0,0,0,0.5)] z-10 flex items-center overflow-hidden scale-105">
          <div ref={marquee2Ref} className="flex items-center h-full w-max">
            {renderMarqueeItems(marqueeSkills)}
          </div>
        </div>
      </section>
    </main>
  );
};
