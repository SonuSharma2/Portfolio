import React, { useState, useEffect } from 'react';

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['About', 'Skills', 'Projects', 'Contact'];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled || mobileMenuOpen
          ? 'bg-black/95 backdrop-blur-md border-red-900/50 py-3 shadow-[0_4px_30px_rgba(220,38,38,0.15)]'
          : 'bg-white/80 backdrop-blur-md border-black/5 py-4 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand identity */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`text-2xl font-black tracking-tighter italic uppercase group flex items-center cursor-pointer transition-colors ${
            scrolled || mobileMenuOpen ? 'text-white' : 'text-gray-900'
          }`}
        >
          <span className="text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">
            S
          </span>
          <span className="group-hover:text-red-500 transition-colors duration-300">
            ONU SHARMA.
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`relative text-xs md:text-sm font-bold uppercase tracking-[0.15em] transition-colors duration-300 group ${
                scrolled || mobileMenuOpen
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-800 hover:text-red-600'
              }`}
            >
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-red-600 transition-all duration-300 ease-out group-hover:w-full shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden transition-colors p-1 focus:outline-none ${
            scrolled || mobileMenuOpen ? 'text-gray-300 hover:text-red-500' : 'text-gray-900 hover:text-red-600'
          }`}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-red-900/30 px-6 py-6 flex flex-col gap-4 backdrop-blur-xl">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold tracking-[0.2em] text-gray-300 hover:text-red-500 uppercase py-2 border-b border-gray-800 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};
