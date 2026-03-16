// src/pages/Technologies/MobileTechnologies.tsx

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  Smartphone,
  Tablet,
  Zap,
  Palette,
  ArrowRight,
  CheckCircle2,
  Quote,
  Wifi,
  Bell,
  MapPin,
  Camera,
  Sparkles,
  Play,
  // Star,
  Box,
  Cpu,
} from 'lucide-react';

import { getMobileTechnologiesData } from '../../service/api/pages/technologies/technologies';
import type { MobilePageData, FloatingIcon } from '../../types';

import './MobileTechnologies.scss';

gsap.registerPlugin(ScrollTrigger);

export function MobileTechnologies() {
  const [data, setData] = useState<MobilePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // ─── Fetch data once on mount ─────────────────────────────────────────
  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        const pageData = await getMobileTechnologiesData();
        if (mounted) {
          setData(pageData);
          setLoading(false);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to load mobile technologies data');
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  // ─── GSAP Animations ───────────────────────────────────────────────────
  useEffect(() => {
    if (loading || !data) return;

    const ctx = gsap.context(() => {
      // Hero content fade in
      gsap.fromTo(
        '.mo-hero-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      // Floating icons animation
      gsap.to('.mo-float-icon', {
        y: -30,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.2, from: 'random' },
      });

      // Mouse glow effect
      const handleMouseMove = (e: MouseEvent) => {
        if (glowRef.current && heroRef.current) {
          const rect = heroRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          glowRef.current.style.setProperty('--mouse-x', `${x}px`);
          glowRef.current.style.setProperty('--mouse-y', `${y}px`);
        }
      };

      heroRef.current?.addEventListener('mousemove', handleMouseMove);

      // Stats animation
      gsap.fromTo(
        '.mo-stat-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: { trigger: '.mo-stats', start: 'top 85%' },
        }
      );

      // Tech cards entrance
      gsap.fromTo(
        '.mo-tech-card',
        { y: 40, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: { trigger: techRef.current, start: 'top 75%' },
        }
      );

      // Capabilities cards
      gsap.fromTo(
        '.mo-capability-card',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          scrollTrigger: { trigger: '.mo-capabilities', start: 'top 80%' },
        }
      );

      // Projects cards
      gsap.fromTo(
        '.mo-project-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          scrollTrigger: { trigger: '.mo-projects', start: 'top 75%' },
        }
      );

      // Process steps
      gsap.fromTo(
        '.mo-process-step',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: { trigger: '.mo-process', start: 'top 70%' },
        }
      );

      // Testimonials cards
      gsap.fromTo(
        '.mo-testimonial-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: { trigger: '.mo-testimonials', start: 'top 80%' },
        }
      );

      return () => {
        heroRef.current?.removeEventListener('mousemove', handleMouseMove);
      };
    });

    return () => ctx.revert();
  }, [data, loading]);

  // ─── Loading & Error UI ────────────────────────────────────────────────
  if (loading) {
    return <div className="mo-page loading">Loading mobile technologies...</div>;
  }

  if (error) {
    return <div className="mo-page error">Error: {error}</div>;
  }

  if (!data) return null;

  // ─── Icon mappings ─────────────────────────────────────────────────────
  const iconMap = {
    Smartphone,
    Tablet,
    Box,
    Zap,
    Camera,
    Cpu,
  } as const;

  const floatingIcons = data.floatingIcons.map((item: FloatingIcon) => ({
    Icon: iconMap[item.iconName as keyof typeof iconMap] || Smartphone,
    delay: item.delay,
    duration: item.duration,
    pos: item.pos,
  }));

  const capabilityIconMap = {
    Wifi,
    Bell,
    MapPin,
    Camera,
    Zap,
    Palette,
  } as const;

  return (
    <div className="mo-page">
      {/* Hero Section */}
      <section ref={heroRef} className="mo-hero">
        <div className="mo-hero-bg">
          <div className="mo-hero-grid" />
          <div className="mo-hero-glow" ref={glowRef} />
          <div className="mo-hero-orb mo-orb-1" />
          <div className="mo-hero-orb mo-orb-2" />
          <div className="mo-hero-orb mo-orb-3" />
        </div>

        <div className="mo-container">
          <div className="mo-hero-content">
            {/* Floating Elements – now dynamic */}
            <div className="mo-floating-elements">
              {floatingIcons.map(({ Icon, delay, duration, pos }, idx) => (
                <div
                  key={idx}
                  className="mo-float-icon"
                  style={{
                    ...pos,
                    animationDelay: delay,
                    animationDuration: duration,
                  }}
                >
                  <Icon size={24} />
                </div>
              ))}
            </div>

            <div className="mo-hero-badge">
              <span className="mo-hero-dot" />
              <Sparkles size={14} />
              Mobile Development
            </div>

            <h1 className="mo-hero-title">
              Build Apps<br />
              <span className="mo-gradient-text">Users Love</span>
            </h1>

            <p className="mo-hero-description">
              Create exceptional mobile experiences that users love. From native iOS and Android
              to cross-platform solutions, we build apps that perform flawlessly on every device.
            </p>

            <div className="mo-hero-cta">
              <a href="#contact" className="mo-btn mo-btn-primary">
                Build Your App
                <ArrowRight className="mo-btn-icon" />
              </a>
              <a href="#tech" className="mo-btn mo-btn-secondary">
                <Play size={18} />
                Explore Platforms
              </a>
            </div>

            {/* Stats Bar – dynamic */}
            <div className="mo-stats">
              {data.stats.map((stat, idx) => (
                <div key={idx} className="mo-stat-item">
                  <span className="mo-stat-value">{stat.value}</span>
                  <span className="mo-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section – dynamic */}
      <section ref={techRef} id="tech" className="mo-tech-section">
        <div className="mo-container">
          <div className="mo-section-header">
            <span className="mo-section-label">Technology Stack</span>
            <h2 className="mo-section-title">Mobile Platforms</h2>
            <p className="mo-section-subtitle">
              Native and cross-platform technologies for every use case
            </p>
          </div>

          <div className="mo-tech-grid">
            {data.mobileTech.map((tech, index) => (
              <div
                key={index}
                className="mo-tech-card"
                style={{ '--card-index': index } as React.CSSProperties}
              >
                <div className="mo-tech-card-inner">
                  <div className="mo-tech-shine" />
                  <div className="mo-tech-header">
                    <div className="mo-tech-icon-wrapper">
                      <img src={tech.icon} alt={tech.name} />
                    </div>
                    <div className="mo-tech-meta">
                      <span className="mo-tech-category">{tech.category}</span>
                      <h3 className="mo-tech-name">{tech.name}</h3>
                    </div>
                  </div>
                  <p className="mo-tech-description">{tech.description}</p>
                  <div className="mo-tech-features">
                    {tech.features.map((feature, i) => (
                      <span key={i} className="mo-tech-feature">
                        <CheckCircle2 size={14} />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section – dynamic + icon mapping */}
      <section className="mo-capabilities">
        <div className="mo-container">
          <div className="mo-section-header">
            <span className="mo-section-label">What We Do</span>
            <h2 className="mo-section-title">Native Capabilities</h2>
            <p className="mo-section-subtitle">
              Leverage full device potential with native features
            </p>
          </div>

          <div className="mo-capabilities-grid">
            {data.capabilities.map((cap, index) => {
              const CapIcon = capabilityIconMap[cap.icon as keyof typeof capabilityIconMap] || Wifi;
              return (
                <div key={index} className="mo-capability-card">
                  <div className="mo-capability-icon">
                    <CapIcon size={28} />
                  </div>
                  <h3 className="mo-capability-title">{cap.title}</h3>
                  <p className="mo-capability-description">{cap.description}</p>
                  <div className="mo-capability-line" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section – dynamic */}
      {/* <section className="mo-projects">
        <div className="mo-container">
          <div className="mo-section-header">
            <span className="mo-section-label">Case Studies</span>
            <h2 className="mo-section-title">Featured Apps</h2>
            <p className="mo-section-subtitle">
              Mobile applications we've built for our clients
            </p>
          </div>

          <div className="mo-projects-grid">
            {data.projects.map((project, index) => (
              <div key={index} className="mo-project-card">
                <div className="mo-project-image">
                  <img src={project.image} alt={project.name} />
                  <div className="mo-project-overlay" />
                  <span className="mo-project-tech">{project.tech}</span>
                </div>
                <div className="mo-project-content">
                  <span className="mo-project-client">{project.client}</span>
                  <h3 className="mo-project-name">{project.name}</h3>
                  <p className="mo-project-description">{project.description}</p>
                  <div className="mo-project-results">
                    {project.results.map((result, i) => (
                      <span key={i} className="mo-project-result">
                        <Star size={12} />
                        {result}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Process Section – dynamic */}
      <section className="mo-process">
        <div className="mo-container">
          <div className="mo-section-header">
            <span className="mo-section-label">Our Process</span>
            <h2 className="mo-section-title">From Concept to App Store</h2>
            <p className="mo-section-subtitle">
              Four steps to launch your mobile application
            </p>
          </div>

          <div className="mo-process-grid">
            {data.processSteps.map((step, idx) => (
              <div key={idx} className="mo-process-step">
                <div className="mo-process-number">{step.num}</div>
                <h3 className="mo-process-title">{step.title}</h3>
                <p className="mo-process-description">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials – dynamic */}
      <section className="mo-testimonials">
        <div className="mo-container">
          <div className="mo-section-header">
            <span className="mo-section-label">Testimonials</span>
            <h2 className="mo-section-title">Client Reviews</h2>
          </div>

          <div className="mo-testimonials-grid">
            {data.testimonials.map((testimonial, index) => (
              <div key={index} className="mo-testimonial-card">
                <Quote className="mo-testimonial-quote" size={32} />
                <p className="mo-testimonial-text">{testimonial.quote}</p>
                <div className="mo-testimonial-author">
                  <img src={testimonial.image} alt={testimonial.author} />
                  <div>
                    <div className="mo-testimonial-name">{testimonial.author}</div>
                    <div className="mo-testimonial-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mo-cta">
        <div className="mo-container">
          <div className="mo-cta-box">
            <div className="mo-cta-glow" />
            <h2 className="mo-cta-title">Ready to Go Mobile?</h2>
            <p className="mo-cta-description">
              Let's turn your app idea into reality. From concept to launch,
              we'll guide you through every step of mobile development
            </p>
            <div className="mo-cta-buttons">
              <a href="#contact" className="mo-btn mo-btn-primary mo-btn-lg">
                Get Free Consultation
                <ArrowRight className="mo-btn-icon" />
              </a>
              <a href="tel:+918123660270" className="mo-btn mo-btn-outline">
                Call Us: +91 8123660270
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MobileTechnologies;