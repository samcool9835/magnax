// src/pages/APIDevelopment.tsx

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  Globe,
  Code,
  Zap,
  Shield,
  ArrowRight,
  Quote,
  Monitor,
  Sparkles,
  Webhook,
  Database,
  Server,
  FileJson,
  Terminal,
} from 'lucide-react';

import { getAPIDevelopmentData } from '../../service/api';
import type { APIPageData, FloatingIcon } from '../../types';

import './APIDevelopment.scss';

gsap.registerPlugin(ScrollTrigger);

export function APIDevelopment() {
  const [data, setData] = useState<APIPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);

  // Fetch data
  useEffect(() => {
    let mounted = true;

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const pageData = await getAPIDevelopmentData();
        if (mounted) {
          setData(pageData);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to load API development data');
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
        '.api-hero-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      gsap.to('.api-float-icon', {
        y: -30,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.2, from: 'random' },
      });

      gsap.fromTo(
        '.api-stat-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: { trigger: '.api-stats', start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.api-tech-item',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          scrollTrigger: { trigger: '.api-tech-section', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.api-feature-card',
        { y: 40, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: { trigger: '.api-features-grid', start: 'top 75%' },
        }
      );

      gsap.fromTo(
        '.api-testimonial-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: { trigger: '.api-testimonials', start: 'top 80%' },
        }
      );
    });

    return () => ctx.revert();
  }, [data, loading]);

  if (loading) return <div className="api-page loading">Loading API development details...</div>;
  if (error) return <div className="api-page error">Error: {error}</div>;
  if (!data) return <div className="api-page">No data available</div>;

  // ─── Floating icons mapping ────────────────────────────────────────────
  const iconMap = {
    Code,
    Webhook,
    Database,
    Server,
    Globe,
    Terminal,
    Monitor,
  } as const;

  const floatingIcons = data.floatingIcons?.map?.((item: FloatingIcon) => ({
    Icon: iconMap[item.iconName as keyof typeof iconMap] || Code,
    delay: item.delay,
    duration: item.duration,
    pos: item.pos,
  })) ?? [];

  // ─── Feature icon helpers ──────────────────────────────────────────────
  const apiFeatureIconMap = {
    Code,
    FileJson,
    Shield,
    Zap,
  } as const;

  const getAPIFeatureIcon = (iconName: string) => {
    const IconComponent = apiFeatureIconMap[iconName as keyof typeof apiFeatureIconMap];
    return IconComponent ? <IconComponent size={28} /> : <Code size={28} />;
  };

  return (
    <div className="api-page">
      {/* Hero Section */}
      <section ref={heroRef} className="api-hero">
        <div className="api-hero-bg">
          <div className="api-network">
            <div className="api-endpoint api-endpoint-1">GET</div>
            <div className="api-endpoint api-endpoint-2">POST</div>
            <div className="api-endpoint api-endpoint-3">PUT</div>
            <div className="api-endpoint api-endpoint-4">DELETE</div>
            <div className="api-flow api-flow-1" />
            <div className="api-flow api-flow-2" />
            <div className="api-flow api-flow-3" />
            <div className="api-flow api-flow-4" />
          </div>
          <div className="api-hero-orb api-orb-1" />
          <div className="api-hero-orb api-orb-2" />
          <div className="api-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="api-particle" />
            ))}
          </div>
        </div>

        <div className="api-container">
          <div className="api-hero-content">
            <div className="api-floating-elements">
              {floatingIcons.map(({ Icon, delay, duration, pos }, idx) => (
                <div
                  key={idx}
                  className="api-float-icon"
                  style={{ ...pos, animationDelay: delay, animationDuration: duration }}
                >
                  <Icon size={24} />
                </div>
              ))}
            </div>

            <div className="api-hero-badge">
              <span className="api-hero-dot" />
              <Sparkles size={14} />
              API Solutions
            </div>

            <h1 className="api-hero-title">
              API Development &<br />
              <span className="api-gradient-text">Integration</span>
            </h1>

            <p className="api-hero-description">
              {data.heroDescription ||
                'Build robust, scalable, and secure APIs that power seamless digital experiences ' +
                'and connect your ecosystem with the world.'}
            </p>

            <div className="api-hero-cta">
              <a href="/contact" className="api-btn api-btn-primary">
                Build Your API
                <ArrowRight className="api-btn-icon" />
              </a>
            </div>

            <div className="api-stats">
              {data.stats?.map?.((stat, idx) => (
                <div key={idx} className="api-stat-item">
                  <span className="api-stat-value">{stat.value}</span>
                  <span className="api-stat-label">{stat.label}</span>
                </div>
              )) || <div>No stats available</div>}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="api-tech-section">
        <div className="api-container">
          <div className="api-section-header">
            <span className="api-section-label">API Toolkit</span>
            <h2 className="api-section-title">API Technologies</h2>
            <p className="api-section-subtitle">
              Modern tools for building world-class APIs
            </p>
          </div>

          <div className="api-tech-grid">
            {data.techStack?.map?.((tech, index) => (
              <div key={index} className="api-tech-item">
                <div className="api-tech-shine" />
                <span className="api-tech-name">{tech.name}</span>
                <span className="api-tech-category">{tech.category}</span>
              </div>
            )) || <div>No technologies listed</div>}
          </div>
        </div>
      </section>

      {/* API Development Section */}
      <section className="api-service">
        <div className="api-container">
          <div className="api-section-header">
            <div className="api-service-badge">
              <Webhook size={28} />
            </div>
            <h2 className="api-section-title">API Development</h2>
            <p className="api-section-subtitle">
              End-to-end API design, development, and deployment for modern applications
            </p>
          </div>

          <div className="api-features-grid">
            {data.apiFeatures?.map?.((feature, index) => (
              <div key={index} className="api-feature-card">
                <div className="api-feature-icon">
                  {getAPIFeatureIcon(feature.icon)}
                </div>
                <h3 className="api-feature-title">{feature.title}</h3>
                <p className="api-feature-description">{feature.description}</p>
                <div className="api-feature-line" />
              </div>
            )) || <div>No API features available</div>}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="api-testimonials">
        <div className="api-container">
          <div className="api-section-header">
            <span className="api-section-label">Testimonials</span>
            <h2 className="api-section-title">Client Success Stories</h2>
          </div>

          <div className="api-testimonials-grid">
            {data.testimonials?.map?.((testimonial, index) => (
              <div key={index} className="api-testimonial-card">
                <Quote className="api-testimonial-quote" size={32} />
                <p className="api-testimonial-text">{testimonial.quote}</p>
                <div className="api-testimonial-author">
                  <img src={testimonial.image} alt={testimonial.author} />
                  <div>
                    <div className="api-testimonial-name">{testimonial.author}</div>
                    <div className="api-testimonial-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            )) || <div>No testimonials available</div>}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="api-cta">
        <div className="api-container">
          <div className="api-cta-box">
            <div className="api-cta-glow" />
            <h2 className="api-cta-title">Ready to Connect Your World?</h2>
            <p className="api-cta-description">
              {data.ctaDescription ||
                "Let's build APIs that power your digital transformation and unlock new possibilities."}
            </p>
            <div className="api-cta-buttons">
              <a href="/contact" className="api-btn api-btn-primary api-btn-lg">
                Schedule a  Consultation
                <ArrowRight className="api-btn-icon" />
              </a>
              <a href="tel:+918123660270" className="api-btn api-btn-outline">
                Call: +91 8123660270
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default APIDevelopment;