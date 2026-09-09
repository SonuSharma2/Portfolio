import React, { useEffect, useRef } from 'react';

export const SpiderWebBackground = ({ interactive = true }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);
    let animationFrameId;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Generate web nodes
    const nodeCount = Math.floor((width * height) / 38000);
    const nodes = Array.from({ length: Math.max(24, nodeCount) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      baseRadius: Math.random() * 2 + 1,
    }));

    // Mouse coordinates
    const mouse = { x: -1000, y: -1000, radius: 180 };

    const handleMouseMove = (e) => {
      if (!interactive) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect nodes with spider-silk lines
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        
        // Update positions
        nodeA.x += nodeA.vx;
        nodeA.y += nodeA.vy;

        if (nodeA.x < 0 || nodeA.x > width) nodeA.vx *= -1;
        if (nodeA.y < 0 || nodeA.y > height) nodeA.vy *= -1;

        // Draw connections between nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 160;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12;
            ctx.strokeStyle = `rgba(15, 23, 42, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }

        // Draw line to mouse if close (Spider thread snapping to pointer)
        const dmx = nodeA.x - mouse.x;
        const dmy = nodeA.y - mouse.y;
        const mouseDist = Math.sqrt(dmx * dmx + dmy * dmy);

        if (mouseDist < mouse.radius) {
          const mouseAlpha = (1 - mouseDist / mouse.radius) * 0.35;
          ctx.strokeStyle = `rgba(225, 29, 72, ${mouseAlpha})`; // Crimson red silk
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        // Draw node
        ctx.fillStyle = mouseDist < mouse.radius ? 'rgba(225, 29, 72, 0.6)' : 'rgba(15, 23, 42, 0.15)';
        ctx.beginPath();
        ctx.arc(nodeA.x, nodeA.y, nodeA.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};

// Procedural Corner Web SVG Component
export const CornerWeb = ({ position = 'top-left', className = '' }) => {
  const isTop = position.includes('top');
  const isLeft = position.includes('left');

  return (
    <div
      className={`absolute pointer-events-none select-none z-10 transition-opacity duration-700 ${className} ${
        isTop ? 'top-0' : 'bottom-0'
      } ${isLeft ? 'left-0' : 'right-0'}`}
      style={{
        transform: `${!isTop ? 'scaleY(-1) ' : ''}${!isLeft ? 'scaleX(-1)' : ''}`,
      }}
    >
      <svg
        width="220"
        height="220"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-25 hover:opacity-40 transition-opacity duration-300 stroke-slate-800"
      >
        {/* Radial structural threads */}
        <line x1="0" y1="0" x2="200" y2="0" strokeWidth="1.2" stroke="currentColor" strokeDasharray="3 3" />
        <line x1="0" y1="0" x2="190" y2="50" strokeWidth="0.8" stroke="currentColor" />
        <line x1="0" y1="0" x2="160" y2="100" strokeWidth="0.8" stroke="currentColor" />
        <line x1="0" y1="0" x2="120" y2="150" strokeWidth="0.8" stroke="currentColor" />
        <line x1="0" y1="0" x2="70" y2="185" strokeWidth="0.8" stroke="currentColor" />
        <line x1="0" y1="0" x2="0" y2="200" strokeWidth="1.2" stroke="currentColor" strokeDasharray="3 3" />
        
        {/* Crimson subtle center line */}
        <line x1="0" y1="0" x2="141" y2="141" strokeWidth="1" stroke="#E11D48" strokeOpacity="0.4" />

        {/* Concentric spiral web curves */}
        <path d="M40 0 Q 38 12 35 25 Q 25 35 12 38 Q 0 40 0 40" stroke="currentColor" strokeWidth="0.75" />
        <path d="M80 0 Q 76 25 70 50 Q 50 70 25 76 Q 0 80 0 80" stroke="currentColor" strokeWidth="0.75" />
        <path d="M120 0 Q 114 38 105 75 Q 75 105 38 114 Q 0 120 0 120" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 1" />
        <path d="M160 0 Q 152 50 140 100 Q 100 140 50 152 Q 0 160 0 160" stroke="currentColor" strokeWidth="0.75" />
        <path d="M200 0 Q 190 62 175 125 Q 125 175 62 190 Q 0 200 0 200" stroke="currentColor" strokeWidth="0.75" />
        
        {/* Subtle dewdrop nodes */}
        <circle cx="70" cy="50" r="2" fill="#E11D48" fillOpacity="0.6" />
        <circle cx="105" cy="75" r="2" fill="#0F172A" fillOpacity="0.4" />
        <circle cx="140" cy="100" r="2" fill="#E11D48" fillOpacity="0.6" />
      </svg>
    </div>
  );
};
