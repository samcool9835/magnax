import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Play } from 'lucide-react';
import './Hero.scss';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Background pattern animation
      tl.fromTo(
        patternRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2 }
      );

      // Subtitle animation
      tl.fromTo(
        subtitleRef.current,
        { letterSpacing: '20px', opacity: 0 },
        { letterSpacing: '4px', opacity: 1, duration: 0.6 },
        '-=0.8'
      );

      // Title word-by-word reveal
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
          {
            clipPath: 'inset(0 0% 0 0)',
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
          },
          '-=0.3'
        );
      }

      // Description
      tl.fromTo(
        descRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.2'
      );

      // CTA buttons
      tl.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.3'
      );

      // Hero image 3D entrance
      tl.fromTo(
        imageRef.current,
        { rotateY: 25, x: 100, opacity: 0 },
        { rotateY: 0, x: 0, opacity: 1, duration: 1, ease: 'expo.out' },
        '-=1'
      );

      // Continuous floating animation for image
      gsap.to(imageRef.current, {
        y: -20,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Background pattern drift
      gsap.to(patternRef.current, {
        x: -30,
        duration: 20,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleWords = 'Transforming Businesses Through Innovative Technology'.split(' ');

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero"
    >
      {/* Background Pattern */}
      <div
        ref={patternRef}
        className="hero-pattern"
        style={{
          backgroundImage: 'url(/images/hero-pattern.jpg)',
        }}
      >
        <div className="hero-pattern-overlay" />
      </div>

      <div className="hero-container">
        <div className="hero-grid">
          {/* Content */}
          <div className="hero-content">
            <span
              ref={subtitleRef}
              className="hero-subtitle"
            >
              // IT SOLUTIONS //
            </span>

            <h1
              ref={titleRef}
              className="hero-title"
            >
              {titleWords.map((word, index) => (
                <span key={index} className="word">
                  {word}
                </span>
              ))}
            </h1>

            <p
              ref={descRef}
              className="hero-description"
            >
              We deliver cutting-edge IT solutions that drive growth, efficiency, 
              and digital transformation for businesses worldwide. Partner with us 
              to unlock your full potential.
            </p>

            <div ref={ctaRef} className="hero-cta">
              <a href="#cta" className="btn-primary">
                Get Started
                <ArrowRight className="btn-icon" />
              </a>
              <a href="#about" className="btn-secondary">
                <Play className="btn-icon" />
                Learn More
              </a>
            </div>

            {/* Stats */}
            {/* <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-number">10+</div>
                <div className="hero-stat-label">Years Experience</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">500+</div>
                <div className="hero-stat-label">Projects Delivered</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">98%</div>
                <div className="hero-stat-label">Client Satisfaction</div>
              </div>
            </div> */}
          </div>

          {/* Hero Image */}
          <div className="hero-image-wrapper">
            <div
              ref={imageRef}
              className="hero-image-container"
            >
              <div className="hero-image-box">
                <img
                  src="/images/hero-main.jpg"
                  alt="Team collaboration"
                  className="hero-image"
                />
                <div className="hero-image-gradient" />
              </div>

              {/* Floating badge */}
              <div className="hero-badge">
                <div className="hero-badge-inner">
                  <div className="hero-badge-icon">
                    <span>★</span>
                  </div>
                  <div>
                    <div className="hero-badge-title">4.9/5</div>
                    <div className="hero-badge-text">Client Rating</div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="hero-decor hero-decor-1" />
              <div className="hero-decor hero-decor-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="hero-bottom-fade" />
    </section>
  );
}