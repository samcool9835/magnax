// src/components/animations/ScrollReveal.tsx
import { useRef, useEffect, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin **once** — best place is usually in your main entry file (main.tsx / index.tsx)
// But it's also safe here if this is the only place you use it
gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale' | 'flip';
  delay?: number;
  duration?: number;
  threshold?: number; // 0–1
}

export function ScrollReveal({
  children,
  className = '',
  animation = 'fadeUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Starting animation states
    const startStates: Record<string, gsap.TweenVars> = {
      fadeUp: { opacity: 0, y: 40 },
      fadeIn: { opacity: 0 },
      slideLeft: { opacity: 0, x: -40 },
      slideRight: { opacity: 0, x: 40 },
      scale: { opacity: 0, scale: 0.9 },
      flip: { opacity: 0, rotationY: -30 },
    };

    const fromVars = startStates[animation] || { opacity: 0 };

    // Set initial state
    gsap.set(element, fromVars);

    // ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: `top ${100 - threshold * 100}%`,
        once: true,
      },
    });

    tl.to(element, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotationY: 0,
      duration,
      delay,
      ease: 'expo.out',
    });

    // Cleanup
    return () => {
      tl.kill();
    };
  }, [animation, delay, duration, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}