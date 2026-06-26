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
}

export function RevealLayer({
  image,
  cursorX,
  cursorY,
  spotlightRadius,
}: RevealLayerProps) {
  const isCursorActive = cursorX !== -999 && cursorY !== -999;

  const maskStyle: CSSProperties = isCursorActive
    ? {
        backgroundImage: `url(${image})`,
        WebkitMaskImage: `radial-gradient(circle ${spotlightRadius}px at ${cursorX}px ${cursorY}px, rgba(0,0,0,1) 0, rgba(0,0,0,1) 40%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.12) 88%, rgba(0,0,0,0) 100%)`,
        maskImage: `radial-gradient(circle ${spotlightRadius}px at ${cursorX}px ${cursorY}px, rgba(0,0,0,1) 0, rgba(0,0,0,1) 40%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.12) 88%, rgba(0,0,0,0) 100%)`,
        WebkitMaskSize: '100% 100%',
        maskSize: '100% 100%',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
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

