import React, { useEffect, useRef } from 'react';

interface CursorTrailProps {
  cursorX: number;
  cursorY: number;
  shakeAmt: number;
}

interface Point {
  x: number;
  y: number;
  age: number;
  maxAge: number;
}

export function CursorTrail({ cursorX, cursorY, shakeAmt }: CursorTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<Point[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const updateAndRender = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add current point if cursor is active and coordinates are valid
      if (cursorX !== -999 && cursorY !== -999) {
        const lastPoint = pointsRef.current[pointsRef.current.length - 1];
        // Only push if cursor moved to avoid cluttering in one spot
        if (!lastPoint || Math.abs(lastPoint.x - cursorX) > 2 || Math.abs(lastPoint.y - cursorY) > 2) {
          pointsRef.current.push({
            x: cursorX,
            y: cursorY,
            age: 0,
            maxAge: 32, // Length of the trail
          });
        }
      }

      // Increment age and filter out expired points
      pointsRef.current = pointsRef.current
        .map(p => ({ ...p, age: p.age + 1 }))
        .filter(p => p.age < p.maxAge);

      if (pointsRef.current.length > 1) {
        // Draw the main trail
        for (let i = 1; i < pointsRef.current.length; i++) {
          const p1 = pointsRef.current[i - 1];
          const p2 = pointsRef.current[i];
          const ratio = p2.age / p2.maxAge;
          const alpha = 1 - ratio;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          // Color palette shifts smoothly depending on tectonic activity
          let color = '20, 184, 166'; // peaceful emerald/teal #14b8a6
          let glowColor = 'rgba(20, 184, 166, ';
          
          if (shakeAmt > 4) {
            color = '239, 68, 68'; // high tectonic intensity Red #ef4444
            glowColor = 'rgba(239, 68, 68, ';
          } else if (shakeAmt > 1) {
            color = '232, 112, 42'; // moderate activity Orange #e8702a
            glowColor = 'rgba(232, 112, 42, ';
          }

          // Render high density outer glow with canvas shadows
          ctx.shadowBlur = (1 - ratio) * 16;
          ctx.shadowColor = `${glowColor}${alpha})`;

          // Draw neon line
          ctx.strokeStyle = `rgba(${color}, ${alpha * 0.95})`;
          ctx.lineWidth = (1 - ratio) * 7;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }
        
        // Reset canvas shadow state for other drawing safety
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(updateAndRender);
    };

    animId = requestAnimationFrame(updateAndRender);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [cursorX, cursorY, shakeAmt]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[999] mix-blend-screen"
    />
  );
}
