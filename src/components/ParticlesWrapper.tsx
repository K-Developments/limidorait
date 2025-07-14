
"use client";

import Script from 'next/script';

const ParticlesWrapper = () => {
  const initParticles = () => {
    if (typeof window !== 'undefined' && (window as any).particlesJS) {
      (window as any).particlesJS('particles-js', {
        particles: {
          number: {
            value: 60,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: getComputedStyle(document.documentElement).getPropertyValue('--primary'),
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 0.4,
            random: true,
            anim: {
              enable: true,
              speed: 0.5,
              opacity_min: 0.1,
              sync: false
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: getComputedStyle(document.documentElement).getPropertyValue('--primary'),
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
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
              distance: 80,
              duration: 0.4,
            },
          },
        },
        retina_detect: true,
      });
    }
  };

  return (
    <>
      <Script 
        src="/scripts/particles.js" 
        strategy="lazyOnload"
        onLoad={initParticles} 
      />
      <div id="particles-js" className="particles-container"></div>
    </>
  );
};

export default ParticlesWrapper;
