import React, { useEffect, useRef } from 'react';

interface CursorTrailProps {
  cursorX: number;
  cursorY: number;
  shakeAmt: number;
  colorTheme?: 'tectonic' | 'emerald' | 'magma' | 'abyssal' | 'cosmic' | 'aurora' | 'solar' | 'nebula' | 'neon_pink' | 'amber_gold' | 'deep_forest' | 'hyper_blue' | 'mint_fresh' | 'crystal_white' | 'obsidian_black' | 'bronze' | 'lavender' | 'iridescent_rainbow';
  shapeStyle?: 'line' | 'dots' | 'ring' | 'crosshair' | 'triangle' | 'square' | 'star' | 'hexagon' | 'diamond' | 'swirl' | 'pulsing_radar' | 'brackets' | 'gear' | 'atom' | 'flower_of_life' | 'dna' | 'meteor_shower';
}

interface Point {
  x: number;
  y: number;
  age: number;
  maxAge: number;
}

export function CursorTrail({
  cursorX,
  cursorY,
  shakeAmt,
  colorTheme = 'tectonic',
  shapeStyle = 'line',
}: CursorTrailProps) {
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

    const getColorConfig = (age: number, maxAge: number) => {
      let color = '20, 184, 166'; // peaceful emerald/teal #14b8a6
      let glowColor = 'rgba(20, 184, 166, ';

      if (colorTheme === 'emerald') {
        color = '16, 185, 129'; // emerald-500
        glowColor = 'rgba(16, 185, 129, ';
      } else if (colorTheme === 'magma') {
        color = '239, 68, 68'; // red-500
        glowColor = 'rgba(239, 68, 68, ';
      } else if (colorTheme === 'abyssal') {
        color = '6, 182, 212'; // cyan-500
        glowColor = 'rgba(6, 182, 212, ';
      } else if (colorTheme === 'cosmic') {
        color = '168, 85, 247'; // violet-500
        glowColor = 'rgba(168, 85, 247, ';
      } else if (colorTheme === 'aurora') {
        color = '34, 211, 238'; // cyan-400
        glowColor = 'rgba(52, 211, 153, '; // emerald-400
      } else if (colorTheme === 'solar') {
        color = '234, 179, 8'; // yellow-500
        glowColor = 'rgba(234, 179, 8, ';
      } else if (colorTheme === 'nebula') {
        color = '244, 63, 94'; // rose-500
        glowColor = 'rgba(244, 63, 94, ';
      } else if (colorTheme === 'neon_pink') {
        color = '255, 0, 127'; // neon pink
        glowColor = 'rgba(255, 0, 127, ';
      } else if (colorTheme === 'amber_gold') {
        color = '245, 158, 11'; // amber-500
        glowColor = 'rgba(245, 158, 11, ';
      } else if (colorTheme === 'deep_forest') {
        color = '5, 150, 105'; // green-600
        glowColor = 'rgba(5, 150, 105, ';
      } else if (colorTheme === 'hyper_blue') {
        color = '37, 99, 235'; // blue-600
        glowColor = 'rgba(37, 99, 235, ';
      } else if (colorTheme === 'mint_fresh') {
        color = '52, 211, 153'; // emerald-400 / mint
        glowColor = 'rgba(52, 211, 153, ';
      } else if (colorTheme === 'crystal_white') {
        color = '255, 255, 255'; // pure white
        glowColor = 'rgba(255, 255, 255, ';
      } else if (colorTheme === 'obsidian_black') {
        color = '74, 4, 78'; // deep purple black
        glowColor = 'rgba(168, 85, 247, '; // glowing violet
      } else if (colorTheme === 'bronze') {
        color = '180, 83, 9'; // amber-700
        glowColor = 'rgba(217, 119, 6, ';
      } else if (colorTheme === 'lavender') {
        color = '192, 132, 252'; // purple-400
        glowColor = 'rgba(192, 132, 252, ';
      } else if (colorTheme === 'iridescent_rainbow') {
        const time = Date.now() * 0.003 + (age * 0.15);
        const r = Math.floor(Math.sin(time) * 127 + 128);
        const g = Math.floor(Math.sin(time + 2) * 127 + 128);
        const b = Math.floor(Math.sin(time + 4) * 127 + 128);
        color = `${r}, ${g}, ${b}`;
        glowColor = `rgba(${r}, ${g}, ${b}, `;
      } else {
        // tectonic (default)
        if (shakeAmt > 4) {
          color = '239, 68, 68'; // high tectonic intensity Red #ef4444
          glowColor = 'rgba(239, 68, 68, ';
        } else if (shakeAmt > 1) {
          color = '232, 112, 42'; // moderate activity Orange #e8702a
          glowColor = 'rgba(232, 112, 42, ';
        }
      }

      return { color, glowColor };
    };

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

      if (shapeStyle === 'line' && pointsRef.current.length > 1) {
        // Draw the main trail
        for (let i = 1; i < pointsRef.current.length; i++) {
          const p1 = pointsRef.current[i - 1];
          const p2 = pointsRef.current[i];
          const ratio = p2.age / p2.maxAge;
          const alpha = 1 - ratio;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          const colors = getColorConfig(p2.age, p2.maxAge);

          // Render high density outer glow with canvas shadows
          ctx.shadowBlur = (1 - ratio) * 16;
          ctx.shadowColor = `${colors.glowColor}${alpha})`;

          // Draw neon line
          ctx.strokeStyle = `rgba(${colors.color}, ${alpha * 0.95})`;
          ctx.lineWidth = (1 - ratio) * 7;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }
        
        // Reset canvas shadow state for other drawing safety
        ctx.shadowBlur = 0;
      } else if (shapeStyle === 'dots' && pointsRef.current.length > 0) {
        // Draw individual glowing particles/dots
        for (let i = 0; i < pointsRef.current.length; i++) {
          const p = pointsRef.current[i];
          const ratio = p.age / p.maxAge;
          const alpha = 1 - ratio;
          const radius = (1 - ratio) * 6;

          const colors = getColorConfig(p.age, p.maxAge);

          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.shadowBlur = (1 - ratio) * 14;
          ctx.shadowColor = `${colors.glowColor}${alpha})`;
          ctx.fillStyle = `rgba(${colors.color}, ${alpha * 0.95})`;
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      } else if (shapeStyle !== 'line' && shapeStyle !== 'dots' && cursorX !== -999 && cursorY !== -999) {
        // Draw high-tech HUD-style ring, crosshair, triangle, square, star, or custom shapes at current coordinates
        const colors = getColorConfig(0, 32);
        const alpha = 0.85;

        ctx.shadowBlur = 15;
        ctx.shadowColor = `${colors.glowColor}${alpha})`;

        if (shapeStyle === 'ring') {
          // Concentric target ring
          ctx.beginPath();
          ctx.arc(cursorX, cursorY, 14, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${colors.color}, ${alpha})`;
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(cursorX, cursorY, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colors.color}, ${alpha})`;
          ctx.fill();
        } else if (shapeStyle === 'crosshair') {
          // Strategic military/geological HUD crosshair
          ctx.beginPath();
          ctx.arc(cursorX, cursorY, 12, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${colors.color}, ${alpha * 0.75})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Center dot
          ctx.beginPath();
          ctx.arc(cursorX, cursorY, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colors.color}, ${alpha})`;
          ctx.fill();

          // Radial ticks
          const tickLen = 6;
          const gap = 14;
          ctx.strokeStyle = `rgba(${colors.color}, ${alpha})`;
          ctx.lineWidth = 1.5;

          // Top
          ctx.beginPath();
          ctx.moveTo(cursorX, cursorY - gap);
          ctx.lineTo(cursorX, cursorY - gap - tickLen);
          ctx.stroke();

          // Bottom
          ctx.beginPath();
          ctx.moveTo(cursorX, cursorY + gap);
          ctx.lineTo(cursorX, cursorY + gap + tickLen);
          ctx.stroke();

          // Left
          ctx.beginPath();
          ctx.moveTo(cursorX - gap, cursorY);
          ctx.lineTo(cursorX - gap - tickLen, cursorY);
          ctx.stroke();

          // Right
          ctx.beginPath();
          ctx.moveTo(cursorX + gap, cursorY);
          ctx.lineTo(cursorX + gap + tickLen, cursorY);
          ctx.stroke();
        } else if (shapeStyle === 'triangle') {
          const time = Date.now() * 0.003;
          ctx.save();
          ctx.translate(cursorX, cursorY);
          ctx.rotate(time);

          ctx.beginPath();
          ctx.moveTo(0, -12);
          ctx.lineTo(10, 8);
          ctx.lineTo(-10, 8);
          ctx.closePath();

          ctx.strokeStyle = `rgba(${colors.color}, ${alpha})`;
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(0, 0, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colors.color}, ${alpha})`;
          ctx.fill();

          ctx.restore();
        } else if (shapeStyle === 'square') {
          const time = Date.now() * 0.002;
          ctx.save();
          ctx.translate(cursorX, cursorY);
          ctx.rotate(time);

          ctx.strokeStyle = `rgba(${colors.color}, ${alpha})`;
          ctx.lineWidth = 2;
          ctx.strokeRect(-10, -10, 20, 20);

          ctx.beginPath();
          ctx.arc(0, 0, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colors.color}, ${alpha})`;
          ctx.fill();

          ctx.restore();
        } else if (shapeStyle === 'star') {
          const time = Date.now() * 0.0015;
          ctx.save();
          ctx.translate(cursorX, cursorY);
          ctx.rotate(time);

          ctx.strokeStyle = `rgba(${colors.color}, ${alpha})`;
          ctx.lineWidth = 1.5;

          ctx.beginPath();
          for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI) / 4;
            const r = i % 2 === 0 ? 15 : 4;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(0, 0, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colors.color}, ${alpha})`;
          ctx.fill();

          ctx.restore();
        } else if (shapeStyle === 'hexagon') {
          const time = Date.now() * 0.002;
          ctx.save();
          ctx.translate(cursorX, cursorY);
          ctx.rotate(time);

          ctx.strokeStyle = `rgba(${colors.color}, ${alpha})`;
          ctx.lineWidth = 2;

          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const r = 12;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();

          // Inner dot
          ctx.beginPath();
          ctx.arc(0, 0, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colors.color}, ${alpha})`;
          ctx.fill();

          ctx.restore();
        } else if (shapeStyle === 'diamond') {
          const time = Date.now() * 0.002;
          ctx.save();
          ctx.translate(cursorX, cursorY);
          ctx.rotate(time);

          ctx.strokeStyle = `rgba(${colors.color}, ${alpha})`;
          ctx.lineWidth = 1.5;

          ctx.beginPath();
          ctx.moveTo(0, -14);
          ctx.lineTo(10, 0);
          ctx.lineTo(0, 14);
          ctx.lineTo(-10, 0);
          ctx.closePath();
          ctx.stroke();

          // Cross lines inside
          ctx.beginPath();
          ctx.moveTo(-4, 0); ctx.lineTo(4, 0);
          ctx.moveTo(0, -4); ctx.lineTo(0, 4);
          ctx.stroke();

          ctx.restore();
        } else if (shapeStyle === 'swirl') {
          const time = Date.now() * 0.004;
          ctx.save();
          ctx.translate(cursorX, cursorY);
          ctx.rotate(time);

          ctx.strokeStyle = `rgba(${colors.color}, ${alpha})`;
          ctx.lineWidth = 1.5;

          ctx.beginPath();
          for (let theta = 0; theta < Math.PI * 3; theta += 0.1) {
            const r = theta * 1.5;
            const x = Math.cos(theta) * r;
            const y = Math.sin(theta) * r;
            if (theta === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();

          ctx.beginPath();
          for (let theta = 0; theta < Math.PI * 3; theta += 0.1) {
            const r = theta * 1.5;
            const x = Math.cos(theta + Math.PI) * r;
            const y = Math.sin(theta + Math.PI) * r;
            if (theta === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();

          ctx.restore();
        } else if (shapeStyle === 'pulsing_radar') {
          const t = (Date.now() % 1200) / 1200; // 0 to 1 loop
          ctx.strokeStyle = `rgba(${colors.color}, ${alpha * (1 - t)})`;
          ctx.lineWidth = 1.5;

          ctx.beginPath();
          ctx.arc(cursorX, cursorY, t * 24, 0, Math.PI * 2);
          ctx.stroke();

          // static inner circle
          ctx.strokeStyle = `rgba(${colors.color}, ${alpha * 0.4})`;
          ctx.beginPath();
          ctx.arc(cursorX, cursorY, 8, 0, Math.PI * 2);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(cursorX, cursorY, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colors.color}, ${alpha})`;
          ctx.fill();
        } else if (shapeStyle === 'brackets') {
          ctx.save();
          ctx.translate(cursorX, cursorY);

          ctx.strokeStyle = `rgba(${colors.color}, ${alpha})`;
          ctx.lineWidth = 2;
          const d = 10;
          const l = 4;

          // Top-left corner
          ctx.beginPath();
          ctx.moveTo(-d + l, -d);
          ctx.lineTo(-d, -d);
          ctx.lineTo(-d, -d + l);
          ctx.stroke();

          // Top-right corner
          ctx.beginPath();
          ctx.moveTo(d - l, -d);
          ctx.lineTo(d, -d);
          ctx.lineTo(d, -d + l);
          ctx.stroke();

          // Bottom-left corner
          ctx.beginPath();
          ctx.moveTo(-d + l, d);
          ctx.lineTo(-d, d);
          ctx.lineTo(-d, d - l);
          ctx.stroke();

          // Bottom-right corner
          ctx.beginPath();
          ctx.moveTo(d - l, d);
          ctx.lineTo(d, d);
          ctx.lineTo(d, d - l);
          ctx.stroke();

          // tiny dot in center
          ctx.beginPath();
          ctx.arc(0, 0, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colors.color}, ${alpha * 0.8})`;
          ctx.fill();

          ctx.restore();
        } else if (shapeStyle === 'gear') {
          const time = Date.now() * 0.0015;
          ctx.save();
          ctx.translate(cursorX, cursorY);
          ctx.rotate(time);

          ctx.strokeStyle = `rgba(${colors.color}, ${alpha})`;
          ctx.lineWidth = 1.5;

          const numTeeth = 8;
          const rInner = 8;
          const rOuter = 13;

          ctx.beginPath();
          for (let i = 0; i < numTeeth * 2; i++) {
            const angle = (i * Math.PI) / numTeeth;
            const r = i % 2 === 0 ? rOuter : rInner;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();

          // Inner cutout hole
          ctx.beginPath();
          ctx.arc(0, 0, 4, 0, Math.PI * 2);
          ctx.stroke();

          ctx.restore();
        } else if (shapeStyle === 'atom') {
          const time = Date.now() * 0.0025;
          ctx.save();
          ctx.translate(cursorX, cursorY);

          ctx.strokeStyle = `rgba(${colors.color}, ${alpha * 0.8})`;
          ctx.lineWidth = 1.2;

          // Orbit 1
          ctx.save();
          ctx.rotate(time);
          ctx.beginPath();
          ctx.ellipse(0, 0, 16, 5, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();

          // Orbit 2
          ctx.save();
          ctx.rotate(time + Math.PI / 3);
          ctx.beginPath();
          ctx.ellipse(0, 0, 16, 5, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();

          // Orbit 3
          ctx.save();
          ctx.rotate(time - Math.PI / 3);
          ctx.beginPath();
          ctx.ellipse(0, 0, 16, 5, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();

          // Nucleus
          ctx.beginPath();
          ctx.arc(0, 0, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colors.color}, ${alpha})`;
          ctx.fill();

          ctx.restore();
        } else if (shapeStyle === 'flower_of_life') {
          const time = Date.now() * 0.001;
          ctx.save();
          ctx.translate(cursorX, cursorY);
          ctx.rotate(time);

          ctx.strokeStyle = `rgba(${colors.color}, ${alpha * 0.6})`;
          ctx.lineWidth = 1.2;

          // Outer ring
          ctx.beginPath();
          ctx.arc(0, 0, 12, 0, Math.PI * 2);
          ctx.stroke();

          // Inner overlapping rings/petals
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const cx = Math.cos(angle) * 6;
            const cy = Math.sin(angle) * 6;
            ctx.beginPath();
            ctx.arc(cx, cy, 6, 0, Math.PI * 2);
            ctx.stroke();
          }

          ctx.restore();
        } else if (shapeStyle === 'dna') {
          const time = Date.now() * 0.003;
          ctx.save();
          ctx.translate(cursorX, cursorY);
          ctx.rotate(time);

          ctx.strokeStyle = `rgba(${colors.color}, ${alpha * 0.5})`;
          ctx.lineWidth = 1;

          // Draw double helix dots & connections
          for (let i = -14; i <= 14; i += 4) {
            const offset = (i + 14) / 28 * Math.PI * 2;
            const y1 = Math.sin(offset + time) * 8;
            const y2 = Math.sin(offset + time + Math.PI) * 8;

            // connecting line
            ctx.beginPath();
            ctx.moveTo(i, y1);
            ctx.lineTo(i, y2);
            ctx.stroke();

            // node dots
            ctx.beginPath();
            ctx.arc(i, y1, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${colors.color}, ${alpha})`;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(i, y2, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${colors.color}, ${alpha})`;
            ctx.fill();
          }

          ctx.restore();
        } else if (shapeStyle === 'meteor_shower') {
          const time = Date.now();
          ctx.save();
          ctx.translate(cursorX, cursorY);

          ctx.shadowBlur = 0; // turn off shadow for particle performance
          for (let i = 0; i < 6; i++) {
            // Seed based on i
            const seed = i * 432.12;
            const life = ((time + seed) % 600) / 600; // 0 to 1
            const angle = Math.PI / 2 + (i - 2.5) * 0.2; // down with slight fan spread
            const speed = 12 + i * 2;
            const dist = life * speed;
            const px = Math.cos(angle) * dist;
            const py = Math.sin(angle) * dist;
            const radius = (1 - life) * 2;

            ctx.beginPath();
            ctx.arc(px, py, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${colors.color}, ${alpha * (1 - life)})`;
            ctx.fill();
          }

          ctx.restore();
        }
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(updateAndRender);
    };

    animId = requestAnimationFrame(updateAndRender);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [cursorX, cursorY, shakeAmt, colorTheme, shapeStyle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[999] mix-blend-screen"
    />
  );
}
