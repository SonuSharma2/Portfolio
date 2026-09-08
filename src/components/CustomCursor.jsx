import React, { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering interactive element
      const target = e.target;
      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('.interactive-cursor');

      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Smooth trailing follower with GPU transform
    const updateTrailing = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.25,
        y: prev.y + (position.y - prev.y) * 0.25,
      }));
      animationFrameId = requestAnimationFrame(updateTrailing);
    };

    animationFrameId = requestAnimationFrame(updateTrailing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [position.x, position.y]);

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Precision Core Red Dot */}
      <div
        className="fixed w-2 h-2 rounded-full bg-rose-600 -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out shadow-[0_0_8px_#e11d48]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.6 : 1})`,
        }}
      />

      {/* Trailing Web Filament Target Ring with gentle expansion */}
      <div
        className="fixed rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-250 ease-out pointer-events-none"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: isHovered ? '46px' : '24px',
          height: isHovered ? '46px' : '24px',
          backgroundColor: isHovered ? 'rgba(225, 29, 72, 0.08)' : 'transparent',
          border: isHovered ? '1.5px solid rgba(225, 29, 72, 0.75)' : '1px solid rgba(225, 29, 72, 0.35)',
        }}
      />
    </div>
  );
};
