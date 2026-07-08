/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CSSProperties } from 'react';

interface RevealLayerProps {
  image: string;
  cursorX: number;
  cursorY: number;
  spotlightRadius: number;
  parallaxX?: number;
  parallaxY?: number;
  tiltX?: number;
  tiltY?: number;
  spotlightStyle?: 'heatmap' | 'laser';
}

export function RevealLayer({
  image,
  cursorX,
  cursorY,
  spotlightRadius,
  parallaxX = 0,
  parallaxY = 0,
  tiltX = 0,
  tiltY = 0,
  spotlightStyle = 'heatmap',
}: RevealLayerProps) {
  const isCursorActive = cursorX !== -999 && cursorY !== -999;

  // Create an organic breathing pulse using layered sine waves
  const time = typeof window !== 'undefined' ? Date.now() : 0;
  const pulseFactor = time ? Math.sin(time / 1100) * 18 + Math.sin(time / 450) * 4 : 0;
  const activeRadius = Math.max(100, spotlightRadius + pulseFactor);

  // Subtle edge flickering for an ambient light flare effect
  const edgeFactor = time ? Math.sin(time / 800) * 2 : 0;
  const stop1 = 40 + edgeFactor;
  const stop2 = 60 + edgeFactor;
  const stop3 = 75 + edgeFactor;
  const stop4 = 88 + edgeFactor;

  // Decide gradient type based on the selected spotlightStyle
  const maskGradient = spotlightStyle === 'laser'
    ? `radial-gradient(circle ${activeRadius}px at ${cursorX - parallaxX}px ${cursorY - parallaxY}px, rgba(0,0,0,1) 0, rgba(0,0,0,1) 94%, rgba(0,0,0,0.8) 96%, rgba(0,0,0,0) 100%)`
    : `radial-gradient(circle ${activeRadius}px at ${cursorX - parallaxX}px ${cursorY - parallaxY}px, rgba(0,0,0,1) 0, rgba(0,0,0,1) ${stop1}%, rgba(0,0,0,0.75) ${stop2}%, rgba(0,0,0,0.4) ${stop3}%, rgba(0,0,0,0.12) ${stop4}%, rgba(0,0,0,0) 100%)`;

  const maskStyle: CSSProperties = isCursorActive
    ? {
        backgroundImage: `url(${image})`,
        WebkitMaskImage: maskGradient,
        maskImage: maskGradient,
        WebkitMaskSize: '100% 100%',
        maskSize: '100% 100%',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate(${parallaxX}px, ${parallaxY}px) scale(1.05)`,
      }
    : {
        backgroundImage: `url(${image})`,
        opacity: 0,
      };

  return (
    <div
      className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none transition-opacity duration-300"
      style={maskStyle}
    />
  );
}

