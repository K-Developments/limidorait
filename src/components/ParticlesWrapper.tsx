
"use client";

import Script from 'next/script';
import { useEffect, useState } from 'react';

const ParticlesWrapper = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#70A4A4'); // Default color matches accent

  const hslToHex = (h: number, s: number, l: number): string => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const style = getComputedStyle(document.documentElement);
      // Use --accent color for particles
      const accentVar = style.getPropertyValue('--accent').trim(); 
      if (accentVar) {
        const [h, s, l] = accentVar.split(' ').map(val => parseFloat(val.replace('%', '')));
        if (!isNaN(h) && !isNaN(s) && !isNaN(l)) {
          setPrimaryColor(hslToHex(h, s, l));
        }
      }
    }
  }, []);

  const initParticles = () => {
    if (typeof window !== 'undefined' && (window as any).particlesJS && primaryColor) {
      (window as any).particlesJS('particles-js', {
        particles: {
          number: {
            value: 80, // Reduced number
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: primaryColor,
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 0.6, // Slightly more visible
            random: true,
            anim: {
              enable: true,
              speed: 0.8,
              opacity_min: 0.1,
              sync: false
            },
          },
          size: {
            value: 2.5, // Slightly smaller
            random: true,
            anim: {
              enable: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 120, // Reduced distance
            color: primaryColor,
            opacity: 0.2, // More subtle
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.5, // Slightly faster
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
          },
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'repulse',
            },
            onclick: {
              enable: false,
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 100, // smaller repulse distance
              duration: 0.4,
            },
          },
        },
        retina_detect: true,
      });
    }
  };

  useEffect(() => {
    if (isScriptLoaded && primaryColor) {
      initParticles();
    }
  }, [isScriptLoaded, primaryColor]);


  return (
    <>
      <Script 
        src="/scripts/particles.js" 
        strategy="lazyOnload"
        onLoad={() => setIsScriptLoaded(true)} 
      />
      <div id="particles-js" className="particles-container"></div>
    </>
  );
};

export default ParticlesWrapper;
