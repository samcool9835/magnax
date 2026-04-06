// src/pages/WebMobileDevelopment.tsx

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  Globe,
  Smartphone,
  Code,
  Palette,
  Zap,
  Shield,
  ArrowRight,
  Quote,
  Monitor,
  Tablet,
  Layers,
  Wifi,
  Sparkles,
} from 'lucide-react';

import { getWebMobileDevelopmentData } from '../../service/api';
import type { WebMobilePageData, FloatingIcon } from '../../types';

import './WebMobileDevelopment.scss';

gsap.registerPlugin(ScrollTrigger);

export function WebMobileDevelopment() {
  const [data, setData] = useState<WebMobilePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const webClientsRef = useRef<HTMLDivElement>(null);
  const mobileClientsRef = useRef<HTMLDivElement>(null);

  // Fetch data
  useEffect(() => {
    let mounted = true;

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const pageData = await getWebMobileDevelopmentData();
        if (mounted) {
          setData(pageData);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to load web & mobile data');
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
        '.wm-hero-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      gsap.to('.wm-float-icon', {
        y: -30,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.2, from: 'random' },
      });

      gsap.fromTo(
        '.wm-stat-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: { trigger: '.wm-stats', start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.wm-tech-item',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          scrollTrigger: { trigger: '.wm-tech-section', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.wm-feature-card',
        { y: 40, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: { trigger: '.wm-features-grid', start: 'top 75%' },
        }
      );

      gsap.fromTo(
        '.wm-client-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          scrollTrigger: { trigger: webClientsRef.current, start: 'top 75%' },
        }
      );

      gsap.fromTo(
        '.wm-mobile-client-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          scrollTrigger: { trigger: mobileClientsRef.current, start: 'top 75%' },
        }
      );

      gsap.fromTo(
        '.wm-testimonial-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: { trigger: '.wm-testimonials', start: 'top 80%' },
        }
      );
    });

    return () => ctx.revert();
  }, [data, loading]);

  if (loading) return <div className="wm-page loading">Loading web & mobile details...</div>;
  if (error) return <div className="wm-page error">Error: {error}</div>;
  if (!data) return <div className="wm-page">No data available</div>;

  // ─── Floating icons mapping ────────────────────────────────────────────
  const iconMap = {
    Globe,
    Smartphone,
    Code,
    Palette,
    Zap,
    Shield,
    Monitor,
    Tablet,
    Layers,
    Wifi,
    Sparkles,
  } as const;

  const floatingIcons = data.floatingIcons?.map?.((item: FloatingIcon) => ({
    Icon: iconMap[item.iconName as keyof typeof iconMap] || Globe,
    delay: item.delay,
    duration: item.duration,
    pos: item.pos,
  })) ?? [];

  // ─── Feature icon helpers (safe mapping) ───────────────────────────────
  const webFeatureIconMap = {
    Monitor,
    Zap,
    Shield,
    Palette,
  } as const;

  const mobileFeatureIconMap = {
    Smartphone,
    Tablet,
    Wifi,
    Layers,
  } as const;

  const getWebFeatureIcon = (iconName: string) => {
    const IconComponent = webFeatureIconMap[iconName as keyof typeof webFeatureIconMap];
    return IconComponent ? <IconComponent size={28} /> : <Globe size={28} />;
  };

  const getMobileFeatureIcon = (iconName: string) => {
    const IconComponent = mobileFeatureIconMap[iconName as keyof typeof mobileFeatureIconMap];
    return IconComponent ? <IconComponent size={28} /> : <Smartphone size={28} />;
  };

  return (
    <div className="wm-page">
      {/* Hero Section */}
      <section ref={heroRef} className="wm-hero">
        <div className="wm-hero-bg">
          <div className="wm-hero-grid" />
          <div className="wm-hero-orb wm-orb-1" />
          <div className="wm-hero-orb wm-orb-2" />
          <div className="wm-hero-orb wm-orb-3" />
          <div className="wm-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="wm-particle" />
            ))}
          </div>
        </div>

        <div className="wm-container">
          <div className="wm-hero-content">
            <div className="wm-floating-elements">
              {floatingIcons.map(({ Icon, delay, duration, pos }, idx) => (
                <div
                  key={idx}
                  className="wm-float-icon"
                  style={{ ...pos, animationDelay: delay, animationDuration: duration }}
                >
                  <Icon size={24} />
                </div>
              ))}
            </div>

            <div className="wm-hero-badge">
              <span className="wm-hero-dot" />
              <Sparkles size={14} />
              Digital Solutions
            </div>

            <h1 className="wm-hero-title">
              Web & Mobile<br />
              Development
            </h1>

            <p className="wm-hero-description">
              {data.heroDescription ||
                'Create stunning digital experiences that engage users across every device. ' +
                'From responsive websites to native mobile apps, we build solutions that ' +
                'drive results and delight your customers.'}
            </p>

            <div className="wm-hero-cta">
              <a href="/contact" className="wm-btn wm-btn-primary">
                Start Your Project
                <ArrowRight className="wm-btn-icon" />
              </a>
            </div>

            <div className="wm-stats">
              {data.stats?.map?.((stat, idx) => (
                <div key={idx} className="wm-stat-item">
                  <span className="wm-stat-value">{stat.value}</span>
                  <span className="wm-stat-label">{stat.label}</span>
                </div>
              )) || <div>No stats available</div>}
            </div>
          </div>
        </div>
      </section>

      {/* Web Tech Stack */}
      <section id= "web-development" className="wm-tech-section wm-tech-web">
        <div className="wm-container">
          <div className="wm-section-header">
            <span className="wm-section-label">Web Technologies</span>
            <h2 className="wm-section-title">Web Stack</h2>
            <p className="wm-section-subtitle">
              Modern frameworks for scalable web applications
            </p>
          </div>

          <div className="wm-tech-grid">
            {data.webTechStack?.map?.((tech, index) => (
              <div key={index} className="wm-tech-item wm-tech-item-web">
                <div className="wm-tech-shine" />
                <span className="wm-tech-name">{tech.name}</span>
                <span className="wm-tech-category">{tech.category}</span>
              </div>
            )) || <div>No web technologies listed</div>}
          </div>
        </div>
      </section>

      {/* Web Development Section */}
      <section className="wm-service wm-service-web">
        <div className="wm-container">
          <div className="wm-section-header">
            <div className="wm-service-badge wm-service-badge-web">
              <Globe size={28} />
            </div>
            <h2 className="wm-section-title">Web Development</h2>
            <p className="wm-section-subtitle">
              Modern, responsive, and high-performance websites built with cutting-edge technologies
            </p>
          </div>

          <div className="wm-features-grid">
            {data.webFeatures?.map?.((feature, index) => (
              <div key={index} className="wm-feature-card wm-feature-card-web">
                <div className="wm-feature-icon wm-feature-icon-web">
                  {getWebFeatureIcon(feature.icon)}
                </div>
                <h3 className="wm-feature-title">{feature.title}</h3>
                <p className="wm-feature-description">{feature.description}</p>
                <div className="wm-feature-line" />
              </div>
            )) || <div>No web features available</div>}
          </div>
        </div>
      </section>

      {/* Mobile Tech Stack */}
      <section id="mobile-development" className="wm-tech-section wm-tech-mobile">
        <div className="wm-container">
          <div className="wm-section-header">
            <span className="wm-section-label">Mobile Technologies</span>
            <h2 className="wm-section-title">Mobile Stack</h2>
            <p className="wm-section-subtitle">
              Native and cross-platform mobile solutions
            </p>
          </div>

          <div className="wm-tech-grid">
            {data.mobileTechStack?.map?.((tech, index) => (
              <div key={index} className="wm-tech-item wm-tech-item-mobile">
                <div className="wm-tech-shine" />
                <span className="wm-tech-name">{tech.name}</span>
                <span className="wm-tech-category">{tech.category}</span>
              </div>
            )) || <div>No mobile technologies listed</div>}
          </div>
        </div>
      </section>

      {/* Mobile Development Section */}
      <section className="wm-service wm-service-mobile">
        <div className="wm-container">
          <div className="wm-section-header">
            <div className="wm-service-badge wm-service-badge-mobile">
              <Smartphone size={28} />
            </div>
            <h2 className="wm-section-title">Mobile Development</h2>
            <p className="wm-section-subtitle">
              Native and cross-platform mobile apps that deliver exceptional user experiences
            </p>
          </div>

          <div className="wm-features-grid">
            {data.mobileFeatures?.map?.((feature, index) => (
              <div key={index} className="wm-feature-card wm-feature-card-mobile">
                <div className="wm-feature-icon wm-feature-icon-mobile">
                  {getMobileFeatureIcon(feature.icon)}
                </div>
                <h3 className="wm-feature-title">{feature.title}</h3>
                <p className="wm-feature-description">{feature.description}</p>
                <div className="wm-feature-line" />
              </div>
            )) || <div>No mobile features available</div>}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="wm-testimonials">
        <div className="wm-container">
          <div className="wm-section-header">
            <span className="wm-section-label">Testimonials</span>
            <h2 className="wm-section-title">Client Success Stories</h2>
          </div>

          <div className="wm-testimonials-grid">
            {data.testimonials?.map?.((testimonial, index) => (
              <div key={index} className="wm-testimonial-card">
                <Quote className="wm-testimonial-quote" size={32} />
                <p className="wm-testimonial-text">{testimonial.quote}</p>
                <div className="wm-testimonial-author">
                  <img src={testimonial.image} alt={testimonial.author} />
                  <div>
                    <div className="wm-testimonial-name">{testimonial.author}</div>
                    <div className="wm-testimonial-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            )) || <div>No testimonials available</div>}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="wm-cta">
        <div className="wm-container">
          <div className="wm-cta-box">
            <div className="wm-cta-glow" />
            <h2 className="wm-cta-title">Ready to Go Digital?</h2>
            <p className="wm-cta-description">
              Whether you need a stunning website or a powerful mobile app, 
              we'll bring your vision to life with cutting-edge technology.
            </p>
            <div className="wm-cta-buttons">
              <a href="/contact" className="wm-btn wm-btn-primary wm-btn-lg">
                    Schedule a  Consultation
                <ArrowRight className="wm-btn-icon" />
              </a>
              <a href="tel:+918123660270" className="wm-btn wm-btn-outline">
                Call: +91 8123660270
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WebMobileDevelopment;