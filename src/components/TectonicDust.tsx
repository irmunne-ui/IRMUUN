import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  baseOpacity: number;
  pulseSpeed: number;
  pulsePhase: number;
  color: string;
}

interface TectonicDustProps {
  parallaxX?: number;
  parallaxY?: number;
}

export function TectonicDust({ parallaxX = 0, parallaxY = 0 }: TectonicDustProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
        canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
        initParticles();
      }
    };

    const initParticles = () => {
      const particleCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 25000));
      const particles: Particle[] = [];

      const colors = [
        'rgba(232, 112, 42, 0.45)', // Accent orange/amber dust
        'rgba(245, 158, 11, 0.3)',  // Warm gold mineral
        'rgba(161, 161, 170, 0.25)', // Slate grey stone dust
        'rgba(255, 255, 255, 0.15)', // Tiny white micro-dust
      ];

      for (let i = 0; i < particleCount; i++) {
        const baseOpacity = Math.random() * 0.4 + 0.1;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.2 + 0.8,
          speedX: (Math.random() - 0.5) * 0.12,
          speedY: -Math.random() * 0.18 - 0.05, // Drifting slowly upwards
          opacity: baseOpacity,
          baseOpacity,
          pulseSpeed: 0.005 + Math.random() * 0.01,
          pulsePhase: Math.random() * Math.PI * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      particlesRef.current = particles;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        // Apply smooth drift speed
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around borders
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }

        // Breathing opacity pulse
        p.pulsePhase += p.pulseSpeed;
        p.opacity = p.baseOpacity * (0.6 + 0.4 * Math.sin(p.pulsePhase));

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = p.size * 2;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      ctx.shadowBlur = 0; // Reset shadowBlur for performance
      ctx.globalAlpha = 1.0;

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none mix-blend-screen transition-transform duration-300 ease-out"
      style={{
        transform: `translate(${parallaxX}px, ${parallaxY}px)`,
      }}
    />
  );
}
