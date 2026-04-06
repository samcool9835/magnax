// src/pages/SoftwareDevelopment.tsx

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  Code2,
  Rocket,
  Users,
  Zap,
  Shield,
  LineChart,
  ArrowRight,
  Quote,
  Sparkles,
  Terminal,
  Box,
  Cpu,
  Globe,
} from 'lucide-react';

import { getSoftwareDevelopmentData } from '../../service/api'; // ← use @/ if alias is set, or keep ../../
import type { SoftwareDevelopmentPageData, FloatingIcon } from '../../types';

import './SoftwareDevelopment.scss';

gsap.registerPlugin(ScrollTrigger);

export function SoftwareDevelopment() {
  const [data, setData] = useState<SoftwareDevelopmentPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);

  // Fetch data
  useEffect(() => {
    let mounted = true;

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const pageData = await getSoftwareDevelopmentData();
        if (mounted) {
          setData(pageData);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to load software development data');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    if (loading || !data) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.sd-hero-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      gsap.to('.sd-float-icon', {
        y: -30,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.2, from: 'random' },
      });

      gsap.fromTo(
        '.sd-stat-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: { trigger: '.sd-stats', start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.sd-tech-item',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: { trigger: '.sd-tech-stack', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.sd-feature-card',
        { y: 40, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: { trigger: '.sd-features-grid', start: 'top 75%' },
        }
      );

      gsap.fromTo(
        '.sd-client-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: { trigger: clientsRef.current, start: 'top 75%' },
        }
      );

      gsap.fromTo(
        '.sd-testimonial-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: { trigger: '.sd-testimonials', start: 'top 80%' },
        }
      );
    });

    return () => ctx.revert();
  }, [data, loading]);

  if (loading) return <div className="sd-page loading">Loading software development details...</div>;
  if (error) return <div className="sd-page error">Error: {error}</div>;
  if (!data) return <div className="sd-page">No data available</div>;

  // ─── Floating icons mapping ────────────────────────────────────────────
  const iconMap = {
    Code2,
    Terminal,
    Box,
    Zap,
    Cpu,
    Globe,
  } as const;

  const floatingIcons = data.floatingIcons?.map?.((item: FloatingIcon) => ({
    Icon: iconMap[item.iconName as keyof typeof iconMap] || Code2,
    delay: item.delay,
    duration: item.duration,
    pos: item.pos,
  })) ?? [];

  // ─── Feature icon maps & helpers ───────────────────────────────────────
  const softwareFeatureIconMap = {
    Code2,
    Shield,
    Zap,
    LineChart,
  } as const;

  const mvpFeatureIconMap = {
    Rocket,
    Users,
    Zap,
    LineChart,
  } as const;

  const getSoftwareFeatureIcon = (iconName: string) => {
    const IconComponent = softwareFeatureIconMap[iconName as keyof typeof softwareFeatureIconMap];
    return IconComponent ? <IconComponent size={28} /> : <Code2 size={28} />;
  };

  const getMvpFeatureIcon = (iconName: string) => {
    const IconComponent = mvpFeatureIconMap[iconName as keyof typeof mvpFeatureIconMap];
    return IconComponent ? <IconComponent size={28} /> : <Rocket size={28} />;
  };

  return (
    <div className="sd-page">
      {/* Hero Section */}
      <section ref={heroRef} className="sd-hero">
        <div className="sd-hero-bg">
          <div className="sd-hero-grid" />
          <div className="sd-hero-orb sd-orb-1" />
          <div className="sd-hero-orb sd-orb-2" />
          <div className="sd-hero-orb sd-orb-3" />
          <div className="sd-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="sd-particle" />
            ))}
          </div>
        </div>

        <div className="sd-container">
          <div className="sd-hero-content">
            <div className="sd-floating-elements">
              {floatingIcons.map(({ Icon, delay, duration, pos }, idx) => (
                <div
                  key={idx}
                  className="sd-float-icon"
                  style={{ ...pos, animationDelay: delay, animationDuration: duration }}
                >
                  <Icon size={24} />
                </div>
              ))}
            </div>

            <div className="sd-hero-badge">
              <span className="sd-hero-dot" />
              <Sparkles size={14} />
              Our Services
            </div>

            <h1 className="sd-hero-title">
              Software Development &<br />
              MVP Solutions
            </h1>

            <p className="sd-hero-description">
              {data.heroDescription ||
                'From concept to market-ready product, we build custom software solutions ' +
                'that drive growth. Whether you need a full-scale enterprise platform ' +
                'or a rapid MVP to validate your idea, our expert team delivers excellence.'}
            </p>

            <div className="sd-hero-cta">
              <a href="/contact" className="sd-btn sd-btn-primary">
                Start Your Project
                <ArrowRight className="sd-btn-icon" />
              </a>
            </div>

            <div className="sd-stats">
              {data.stats?.map?.((stat, idx) => (
                <div key={idx} className="sd-stat-item">
                  <span className="sd-stat-value">{stat.value}</span>
                  <span className="sd-stat-label">{stat.label}</span>
                </div>
              )) || <div>No stats available</div>}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="sd-tech-stack">
        <div className="sd-container">
          <div className="sd-section-header">
            <span className="sd-section-label">Technology Stack</span>
            <h2 className="sd-section-title">Technologies We Master</h2>
            <p className="sd-section-subtitle">
              Modern tools and frameworks for scalable solutions
            </p>
          </div>

          <div className="sd-tech-grid">
            {data.techStack?.map?.((tech, index) => (
              <div key={index} className="sd-tech-item">
                <div className="sd-tech-shine" />
                <span className="sd-tech-name">{tech.name}</span>
                <span className="sd-tech-category">{tech.category}</span>
              </div>
            )) || <div>No technologies listed</div>}
          </div>
        </div>
      </section>

      {/* Custom Software Development Section */}
      <section id="software-development" className="sd-service sd-service-software">
        <div className="sd-container">
          <div className="sd-section-header">
            <h2 className="sd-section-title">Custom Software Development</h2>
            <p className="sd-section-subtitle">
              End-to-end development of scalable, secure, and high-performance software solutions
            </p>
          </div>

          <div className="sd-features-grid">
            {data.softwareFeatures?.map?.((feature, index) => (
              <div key={index} className="sd-feature-card sd-feature-card-software">
                <div className="sd-feature-icon sd-feature-icon-software">
                  {getSoftwareFeatureIcon(feature.icon)}
                </div>
                <h3 className="sd-feature-title">{feature.title}</h3>
                <p className="sd-feature-description">{feature.description}</p>
                <div className="sd-feature-line" />
              </div>
            )) || <div>No custom software features available</div>}
          </div>
        </div>
      </section>

      {/* MVP Development Section */}
      <section id="mvp-development" className="sd-service sd-service-mvp">
        <div className="sd-container">
          <div className="sd-section-header">
            <div className="sd-service-badge sd-service-badge-mvp">
              <Rocket size={28} />
            </div>
            <h2 className="sd-section-title">MVP Development</h2>
            <p className="sd-section-subtitle">
              Rapid validation of your product idea with market-ready minimum viable products
            </p>
          </div>

          <div className="sd-features-grid">
            {data.mvpFeatures?.map?.((feature, index) => (
              <div key={index} className="sd-feature-card sd-feature-card-mvp">
                <div className="sd-feature-icon sd-feature-icon-mvp">
                  {getMvpFeatureIcon(feature.icon)}
                </div>
                <h3 className="sd-feature-title">{feature.title}</h3>
                <p className="sd-feature-description">{feature.description}</p>
                <div className="sd-feature-line" />
              </div>
            )) || <div>No MVP features available</div>}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="sd-testimonials">
        <div className="sd-container">
          <div className="sd-section-header">
            <span className="sd-section-label">Testimonials</span>
            <h2 className="sd-section-title">What Our Clients Say</h2>
          </div>

          <div className="sd-testimonials-grid">
            {data.testimonials?.map?.((testimonial, index) => (
              <div key={index} className="sd-testimonial-card">
                <Quote className="sd-testimonial-quote" size={32} />
                <p className="sd-testimonial-text">{testimonial.quote}</p>
                <div className="sd-testimonial-author">
                  <img src={testimonial.image} alt={testimonial.author} />
                  <div>
                    <div className="sd-testimonial-name">{testimonial.author}</div>
                    <div className="sd-testimonial-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            )) || <div>No testimonials available</div>}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="sd-cta">
        <div className="sd-container">
          <div className="sd-cta-box">
            <div className="sd-cta-glow" />
            <h2 className="sd-cta-title">Ready to Build Your Next Big Thing?</h2>
            <p className="sd-cta-description">
              Let's discuss how we can turn your vision into reality. 
              From MVPs to enterprise solutions, we've got you covered.
            </p>
            <div className="sd-cta-buttons">
              <a href="/contact" className="sd-btn sd-btn-primary sd-btn-lg">
                Schedule a Consultation
                <ArrowRight className="sd-btn-icon" />
              </a>
              <a href="tel:+918123660270" className="sd-btn sd-btn-outline">
                Call Us: +91 8123660270
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SoftwareDevelopment;