import React from 'react';

export const SpiderMarquee = () => {
  const words1 = [
    'QA ENGINEER & AUTOMATION',
    'SELENIUM & PLAYWRIGHT',
    'REST API TESTING',
    'FULL STACK DEVELOPER',
    'PYTEST & CI/CD PIPELINES',
    'PERFORMANCE TESTING',
  ];

  const words2 = [
    'PAGE OBJECT MODEL',
    'PYTHON & JAVASCRIPT',
    'ZERO REGRESSION DEFECTS',
    'SAAS AI PLATFORM QA',
    'BLOCKCHAIN TESTING',
    'JIRA & CLICKUP STLC',
  ];

  return (
    <div className="relative py-8 bg-[#F8F9FA] overflow-hidden select-none -my-4 z-20">
      {/* Top Banner Tilted Left */}
      <div className="relative -rotate-2 transform scale-105 bg-red-600 border-y-2 border-black shadow-lg py-2.5 overflow-hidden flex items-center">
        <div className="flex animate-marquee whitespace-nowrap gap-8 text-white font-syne font-black text-sm tracking-wider uppercase items-center">
          {[...words1, ...words1, ...words1].map((text, i) => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-4">
                <img src="/assets/image-2-DS0sMyr7.png" alt="Spider Logo" className="w-6 h-6 object-contain inline-block drop-shadow" />
                <span>{text}</span>
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Bottom Banner Tilted Right */}
      <div className="relative rotate-2 -mt-4 transform scale-105 bg-black border-y-2 border-red-600 shadow-xl py-2.5 overflow-hidden flex items-center z-10">
        <div className="flex animate-marquee-reverse whitespace-nowrap gap-8 text-red-500 font-syne font-black text-sm tracking-wider uppercase items-center">
          {[...words2, ...words2, ...words2].map((text, i) => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-4">
                <img src="/assets/image-1-fYP2o7gg.png" alt="Spider Web" className="w-5 h-5 object-contain inline-block invert opacity-80" />
                <span>{text}</span>
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
