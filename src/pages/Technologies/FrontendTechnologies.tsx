// src/pages/Technologies/FrontendTechnologies.tsx

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  Code2,
  Terminal,
  Box,
  GitBranch,
  Figma,
  Cpu,
  Zap,
  Palette,
  ArrowRight,
  CheckCircle2,
  Quote,
  Monitor,
  Smartphone,
  Globe,
  Layers,
  Sparkles,
  Play,
  // Star,
} from 'lucide-react';

import { getFrontendTechnologiesData } from '../../service/api/pages/technologies/technologies';
import type { FrontendPageData, FloatingIcon } from '../../types/pages';

import './FrontendTechnologies.scss';

gsap.registerPlugin(ScrollTrigger);

export function FrontendTechnologies() {
  const [data, setData] = useState<FrontendPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // ─── Fetch data ────────────────────────────────────────────────────────
  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        const pageData = await getFrontendTechnologiesData();
        if (mounted) {
          setData(pageData);
          setLoading(false);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to load frontend technologies data');
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
        '.fe-hero-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      // Floating icons floating animation
      gsap.to('.fe-float-icon', {
        y: -30,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.2,
          from: 'random',
        },
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
        '.fe-stat-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.fe-stats',
            start: 'top 85%',
          },
        }
      );

      // Tech cards 3D tilt entrance
      gsap.fromTo(
        '.fe-tech-card',
        { y: 40, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: techRef.current,
            start: 'top 75%',
          },
        }
      );

      // Capabilities cards
      gsap.fromTo(
        '.fe-capability-card',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.fe-capabilities',
            start: 'top 80%',
          },
        }
      );

      // Projects cards
      gsap.fromTo(
        '.fe-project-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.fe-projects',
            start: 'top 75%',
          },
        }
      );

      // Why choose us items
      gsap.fromTo(
        '.fe-why-item',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.fe-why',
            start: 'top 70%',
          },
        }
      );

      // Code window animation
      gsap.fromTo(
        '.fe-code-window',
        { x: 50, opacity: 0, rotateY: -10 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.fe-why-visual',
            start: 'top 70%',
          },
        }
      );

      return () => {
        heroRef.current?.removeEventListener('mousemove', handleMouseMove);
      };
    });

    return () => ctx.revert();
  }, [data, loading]);

  // ─── Loading / Error states ────────────────────────────────────────────
  if (loading) {
    return <div className="fe-page loading">Loading frontend technologies...</div>;
  }

  if (error) {
    return <div className="fe-page error">Error: {error}</div>;
  }

  if (!data) {
    return null;
  }

  // ─── Icon mapping for floating icons ───────────────────────────────────
  const iconMap = {
    Code2,
    Terminal,
    Box,
    GitBranch,
    Figma,
    Cpu,
  } as const;

  const floatingIcons = data.floatingIcons.map((item: FloatingIcon) => ({
    Icon: iconMap[item.iconName as keyof typeof iconMap] || Code2,
    delay: item.delay,
    duration: item.duration,
    pos: item.pos,
  }));

  // ─── Icon mapping for capabilities ─────────────────────────────────────
  const capabilityIconMap = {
    Monitor,
    Smartphone,
    Zap,
    Palette,
    Globe,
    Layers,
  } as const;

  return (
    <div className="fe-page">
      {/* Hero Section */}
      <section ref={heroRef} className="fe-hero">
        <div className="fe-hero-bg">
          <div className="fe-hero-grid" />
          <div className="fe-hero-glow" ref={glowRef} />
          <div className="fe-hero-orb fe-orb-1" />
          <div className="fe-hero-orb fe-orb-2" />
          <div className="fe-hero-orb fe-orb-3" />
        </div>

        <div className="fe-container">
          <div className="fe-hero-content">
            {/* Floating Elements */}
            <div className="fe-floating-elements">
              {floatingIcons.map(({ Icon, delay, duration, pos }, idx) => (
                <div
                  key={idx}
                  className="fe-float-icon"
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

            <div className="fe-hero-badge">
              <span className="fe-hero-dot" />
              <Sparkles size={14} />
              Frontend Development
            </div>

            <h1 className="fe-hero-title">
              Build Modern<br />
              <span className="fe-gradient-text">Web Experiences</span>
            </h1>

            <p className="fe-hero-description">
              We craft exceptional user interfaces with cutting-edge frontend technologies.
              From React to Angular, we deliver performant, scalable, and beautiful applications.
            </p>

            <div className="fe-hero-cta">
              <a href="/contact" className="fe-btn fe-btn-primary">
                Start Your Project
                <ArrowRight className="fe-btn-icon" />
              </a>
              <a href="#tech" className="fe-btn fe-btn-secondary">
                <Play size={18} />
                View Technologies
              </a>
            </div>

            {/* Stats Bar */}
            <div className="fe-stats">
              {data.stats.map((stat, idx) => (
                <div key={idx} className="fe-stat-item">
                  <span className="fe-stat-value">{stat.value}</span>
                  <span className="fe-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section ref={techRef} id="tech" className="fe-tech-section">
        <div className="fe-container">
          <div className="fe-section-header">
            <span className="fe-section-label">Technology Stack</span>
            <h2 className="fe-section-title">Frontend Technologies</h2>
            <p className="fe-section-subtitle">
              Modern tools and frameworks we master to build exceptional digital experiences
            </p>
          </div>

          <div className="fe-tech-grid">
            {data.frontendTech.map((tech, index) => (
              <div
                key={index}
                className="fe-tech-card"
                style={{ '--card-index': index } as React.CSSProperties}
              >
                <div className="fe-tech-card-inner">
                  <div className="fe-tech-shine" />
                  <div className="fe-tech-header">
                    <div className="fe-tech-icon-wrapper">
                      <img src={tech.icon} alt={tech.name} />
                    </div>
                    <div className="fe-tech-meta">
                      <span className="fe-tech-category">{tech.category}</span>
                      <h3 className="fe-tech-name">{tech.name}</h3>
                    </div>
                  </div>
                  <p className="fe-tech-description">{tech.description}</p>
                  <div className="fe-tech-features">
                    {tech.features.map((feature, i) => (
                      <span key={i} className="fe-tech-feature">
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

      {/* Capabilities Section */}
      <section className="fe-capabilities">
        <div className="fe-container">
          <div className="fe-section-header">
            <span className="fe-section-label">What We Do</span>
            <h2 className="fe-section-title">Our Capabilities</h2>
            <p className="fe-section-subtitle">
              Comprehensive frontend solutions for every business need
            </p>
          </div>

          <div className="fe-capabilities-grid">
            {data.capabilities.map((cap, index) => {
              const CapIcon = capabilityIconMap[cap.icon as keyof typeof capabilityIconMap] || Monitor;
              return (
                <div key={index} className="fe-capability-card">
                  <div className="fe-capability-icon">
                    <CapIcon size={28} />
                  </div>
                  <h3 className="fe-capability-title">{cap.title}</h3>
                  <p className="fe-capability-description">{cap.description}</p>
                  <div className="fe-capability-line" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {/* <section className="fe-projects">
        <div className="fe-container">
          <div className="fe-section-header">
            <span className="fe-section-label">Case Studies</span>
            <h2 className="fe-section-title">Featured Projects</h2>
            <p className="fe-section-subtitle">
              Real-world applications built with modern frontend technologies
            </p>
          </div>

          <div className="fe-projects-grid">
            {data.projects.map((project, index) => (
              <div key={index} className="fe-project-card">
                <div className="fe-project-image">
                  <img src={project.image} alt={project.name} />
                  <div className="fe-project-overlay" />
                  <span className="fe-project-tech">{project.tech}</span>
                </div>
                <div className="fe-project-content">
                  <span className="fe-project-client">{project.client}</span>
                  <h3 className="fe-project-name">{project.name}</h3>
                  <p className="fe-project-description">{project.description}</p>
                  <div className="fe-project-results">
                    {project.results.map((result, i) => (
                      <span key={i} className="fe-project-result">
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

      {/* Why Choose Us */}
      <section className="fe-why">
        <div className="fe-container">
          <div className="fe-why-grid">
            <div className="fe-why-content">
              <span className="fe-section-label">Why Choose Us</span>
              <h2 className="fe-section-title">The Magnax Advantage</h2>

              <div className="fe-why-list">
                {[
                  { title: 'Modern Stack', desc: 'We stay current with the latest frontend technologies and best practices' },
                  { title: 'Performance First', desc: 'Core Web Vitals optimization for speed, accessibility, and SEO' },
                  { title: 'Component Libraries', desc: 'Custom design systems and reusable component architectures' },
                  { title: 'Testing Coverage', desc: 'Unit, integration, and E2E testing for reliable applications' },
                ].map((item, idx) => (
                  <div key={idx} className="fe-why-item">
                    <div className="fe-why-number">0{idx + 1}</div>
                    <div className="fe-why-text">
                      <strong>{item.title}</strong>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="fe-why-visual">
              <div className="fe-code-window">
                <div className="fe-code-header">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span className="fe-code-title">App.tsx</span>
                </div>
                <pre className="fe-code-content">
                  <code>{`import { Component } from 'react';

export const App = () => {
  return (
    <div className="app">
      <Header />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};`}</code>
                </pre>
                <div className="fe-code-cursor" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="fe-testimonials">
        <div className="fe-container">
          <div className="fe-section-header">
            <span className="fe-section-label">Testimonials</span>
            <h2 className="fe-section-title">Client Feedback</h2>
          </div>

          <div className="fe-testimonials-grid">
            {data.testimonials.map((testimonial, index) => (
              <div key={index} className="fe-testimonial-card">
                <Quote className="fe-testimonial-quote" size={32} />
                <p className="fe-testimonial-text">{testimonial.quote}</p>
                <div className="fe-testimonial-author">
                  <img src={testimonial.image} alt={testimonial.author} />
                  <div>
                    <div className="fe-testimonial-name">{testimonial.author}</div>
                    <div className="fe-testimonial-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="fe-cta">
        <div className="fe-container">
          <div className="fe-cta-box">
            <div className="fe-cta-glow" />
            <h2 className="fe-cta-title">Ready to Build Something Amazing?</h2>
            <p className="fe-cta-description">
              Let's discuss how our frontend expertise can bring your vision to life
            </p>
            <div className="fe-cta-buttons">
              <a href="/contact" className="fe-btn fe-btn-primary fe-btn-lg">
                Get Started
                <ArrowRight className="fe-btn-icon" />
              </a>
              <a href="tel:+918123660270" className="fe-btn fe-btn-outline">
                Call Us: +91 8123660270
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FrontendTechnologies;