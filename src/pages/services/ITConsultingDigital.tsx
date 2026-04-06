// src/pages/ITConsultingDigital.tsx

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  Lightbulb,
  RefreshCw,
  Users,
  Target,
  Shield,
  ArrowRight,
  Quote,
  BarChart3,
  Cpu,
  Layers,
  Globe,
  Sparkles,
} from 'lucide-react';

import { getITConsultingDigitalData } from '../../service/api';
import type { ITConsultingPageData, FloatingIcon } from '../../types';

import './ITConsultingDigital.scss';

gsap.registerPlugin(ScrollTrigger);

export function ITConsultingDigital() {
  const [data, setData] = useState<ITConsultingPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const consultingClientsRef = useRef<HTMLDivElement>(null);
  const transformationClientsRef = useRef<HTMLDivElement>(null);

  // Fetch data
  useEffect(() => {
    let mounted = true;

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const pageData = await getITConsultingDigitalData();
        if (mounted) {
          setData(pageData);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to load IT consulting data');
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
        '.icd-hero-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      gsap.to('.icd-float-icon', {
        y: -30,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.2, from: 'random' },
      });

      gsap.fromTo(
        '.icd-stat-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: { trigger: '.icd-stats', start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.icd-pillar-item',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          scrollTrigger: { trigger: '.icd-pillars-section', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.icd-feature-card',
        { y: 40, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: { trigger: '.icd-features-grid', start: 'top 75%' },
        }
      );

      gsap.fromTo(
        '.icd-client-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          scrollTrigger: { trigger: consultingClientsRef.current, start: 'top 75%' },
        }
      );

      gsap.fromTo(
        '.icd-transformation-client-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          scrollTrigger: { trigger: transformationClientsRef.current, start: 'top 75%' },
        }
      );

      gsap.fromTo(
        '.icd-testimonial-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: { trigger: '.icd-testimonials', start: 'top 80%' },
        }
      );
    });

    return () => ctx.revert();
  }, [data, loading]);

  if (loading) return <div className="icd-page loading">Loading IT consulting details...</div>;
  if (error) return <div className="icd-page error">Error: {error}</div>;
  if (!data) return <div className="icd-page">No data available</div>;

  // ─── Floating icons mapping ────────────────────────────────────────────
  const iconMap = {
    Lightbulb,
    RefreshCw,
    Users,
    Target,
    Shield,
    BarChart3,
    Cpu,
    Layers,
    Globe,
    Sparkles,
  } as const;

  const floatingIcons = data.floatingIcons?.map?.((item: FloatingIcon) => ({
    Icon: iconMap[item.iconName as keyof typeof iconMap] || Lightbulb,
    delay: item.delay,
    duration: item.duration,
    pos: item.pos,
  })) ?? [];

  // ─── Feature icon helpers ──────────────────────────────────────────────
  const consultingFeatureIconMap = {
    Lightbulb,
    Target,
    Shield,
    BarChart3,
  } as const;

  const transformationFeatureIconMap = {
    RefreshCw,
    Users,
    Cpu,
    Globe,
  } as const;

  const getConsultingFeatureIcon = (iconName: string) => {
    const IconComponent = consultingFeatureIconMap[iconName as keyof typeof consultingFeatureIconMap];
    return IconComponent ? <IconComponent size={28} /> : <Lightbulb size={28} />;
  };

  const getTransformationFeatureIcon = (iconName: string) => {
    const IconComponent = transformationFeatureIconMap[iconName as keyof typeof transformationFeatureIconMap];
    return IconComponent ? <IconComponent size={28} /> : <RefreshCw size={28} />;
  };

  return (
    <div className="icd-page">
      {/* Hero Section */}
      <section ref={heroRef} className="icd-hero">
        <div className="icd-hero-bg">
          <div className="icd-hero-grid" />
          <div className="icd-hero-orb icd-orb-1" />
          <div className="icd-hero-orb icd-orb-2" />
          <div className="icd-hero-orb icd-orb-3" />
          <div className="icd-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="icd-particle" />
            ))}
          </div>
        </div>

        <div className="icd-container">
          <div className="icd-hero-content">
            <div className="icd-floating-elements">
              {floatingIcons.map(({ Icon, delay, duration, pos }, idx) => (
                <div
                  key={idx}
                  className="icd-float-icon"
                  style={{ ...pos, animationDelay: delay, animationDuration: duration }}
                >
                  <Icon size={24} />
                </div>
              ))}
            </div>

            <div className="icd-hero-badge">
              <span className="icd-hero-dot" />
              <Sparkles size={14} />
              Strategic Solutions
            </div>

            <h1 className="icd-hero-title">
              IT Consulting &<br />
              Digital Transformation
            </h1>

            <p className="icd-hero-description">
              {data.heroDescription ||
                'Navigate the complexities of modern technology with expert guidance. ' +
                'We help organizations reimagine their future through strategic IT consulting ' +
                'and comprehensive digital transformation programs.'}
            </p>

            <div className="icd-hero-cta">
              <a href="/contact" className="icd-btn icd-btn-primary">
                Book Consultation
                <ArrowRight className="icd-btn-icon" />
              </a>
            </div>

            <div className="icd-stats">
              {data.stats?.map?.((stat, idx) => (
                <div key={idx} className="icd-stat-item">
                  <span className="icd-stat-value">{stat.value}</span>
                  <span className="icd-stat-label">{stat.label}</span>
                </div>
              )) || <div>No stats available</div>}
            </div>
          </div>
        </div>
      </section>

      {/* Consulting Areas */}
      <section id="consulting" className="icd-pillars-section icd-pillars-consulting">
        <div className="icd-container">
          <div className="icd-section-header">
            <span className="icd-section-label">Consulting Expertise</span>
            <h2 className="icd-section-title">Consulting Areas</h2>
            <p className="icd-section-subtitle">
              Comprehensive IT consulting across all domains
            </p>
          </div>

          <div className="icd-pillars-grid">
            {data.consultingAreas?.map?.((area, index) => (
              <div key={index} className="icd-pillar-item icd-pillar-item-consulting">
                <div className="icd-pillar-shine" />
                <span className="icd-pillar-name">{area.name}</span>
                <span className="icd-pillar-category">{area.category}</span>
              </div>
            )) || <div>No consulting areas listed</div>}
          </div>
        </div>
      </section>

      {/* IT Consulting Section */}
      <section className="icd-service icd-service-consulting">
        <div className="icd-container">
          <div className="icd-section-header">
            <div className="icd-service-badge icd-service-badge-consulting">
              <Lightbulb size={28} />
            </div>
            <h2 className="icd-section-title">IT Consulting</h2>
            <p className="icd-section-subtitle">
              Expert guidance to optimize your technology investments and align IT with business strategy
            </p>
          </div>

          <div className="icd-features-grid">
            {data.consultingFeatures?.map?.((feature, index) => (
              <div key={index} className="icd-feature-card icd-feature-card-consulting">
                <div className="icd-feature-icon icd-feature-icon-consulting">
                  {getConsultingFeatureIcon(feature.icon)}
                </div>
                <h3 className="icd-feature-title">{feature.title}</h3>
                <p className="icd-feature-description">{feature.description}</p>
                <div className="icd-feature-line" />
              </div>
            )) || <div>No consulting features available</div>}
          </div>
        </div>
      </section>

      {/* Transformation Pillars */}
      <section id="transformation" className="icd-pillars-section icd-pillars-transformation">
        <div className="icd-container">
          <div className="icd-section-header">
            <span className="icd-section-label">Transformation Pillars</span>
            <h2 className="icd-section-title">Digital Pillars</h2>
            <p className="icd-section-subtitle">
              Eight pillars of comprehensive digital transformation
            </p>
          </div>

          <div className="icd-pillars-grid">
            {data.transformationPillars?.map?.((pillar, index) => (
              <div key={index} className="icd-pillar-item icd-pillar-item-transformation">
                <div className="icd-pillar-shine" />
                <span className="icd-pillar-name">{pillar.name}</span>
                <span className="icd-pillar-category">{pillar.category}</span>
              </div>
            )) || <div>No transformation pillars listed</div>}
          </div>
        </div>
      </section>

      {/* Digital Transformation Section */}
      <section className="icd-service icd-service-transformation">
        <div className="icd-container">
          <div className="icd-section-header">
            <div className="icd-service-badge icd-service-badge-transformation">
              <RefreshCw size={28} />
            </div>
            <h2 className="icd-section-title">Digital Transformation</h2>
            <p className="icd-section-subtitle">
              Comprehensive business reinvention through technology, culture, and process innovation
            </p>
          </div>

          <div className="icd-features-grid">
            {data.transformationFeatures?.map?.((feature, index) => (
              <div key={index} className="icd-feature-card icd-feature-card-transformation">
                <div className="icd-feature-icon icd-feature-icon-transformation">
                  {getTransformationFeatureIcon(feature.icon)}
                </div>
                <h3 className="icd-feature-title">{feature.title}</h3>
                <p className="icd-feature-description">{feature.description}</p>
                <div className="icd-feature-line" />
              </div>
            )) || <div>No transformation features available</div>}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="icd-process">
        <div className="icd-container">
          <div className="icd-section-header">
            <span className="icd-section-label">Our Approach</span>
            <h2 className="icd-section-title">From Concept to Reality</h2>
            <p className="icd-section-subtitle">
              Four steps to transform your business
            </p>
          </div>

          <div className="icd-process-grid">
            {data.processSteps?.map?.((step, idx) => (
              <div key={idx} className="icd-process-step">
                <div className="icd-process-number">{step.num}</div>
                <h3 className="icd-process-title">{step.title}</h3>
                <p className="icd-process-description">{step.desc}</p>
              </div>
            )) || [
              { num: '01', title: 'Discover', desc: 'Deep dive into your business, technology, and goals' },
              { num: '02', title: 'Strategize', desc: 'Develop tailored roadmap with clear milestones' },
              { num: '03', title: 'Transform', desc: 'Execute with agile methodology and change management' },
              { num: '04', title: 'Optimize', desc: 'Continuous improvement and performance monitoring' },
            ].map((step, idx) => (
              <div key={idx} className="icd-process-step">
                <div className="icd-process-number">{step.num}</div>
                <h3 className="icd-process-title">{step.title}</h3>
                <p className="icd-process-description">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="icd-testimonials">
        <div className="icd-container">
          <div className="icd-section-header">
            <span className="icd-section-label">Testimonials</span>
            <h2 className="icd-section-title">Client Perspectives</h2>
          </div>

          <div className="icd-testimonials-grid">
            {data.testimonials?.map?.((testimonial, index) => (
              <div key={index} className="icd-testimonial-card">
                <Quote className="icd-testimonial-quote" size={32} />
                <p className="icd-testimonial-text">{testimonial.quote}</p>
                <div className="icd-testimonial-author">
                  <img src={testimonial.image} alt={testimonial.author} />
                  <div>
                    <div className="icd-testimonial-name">{testimonial.author}</div>
                    <div className="icd-testimonial-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            )) || <div>No testimonials available</div>}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="icd-cta">
        <div className="icd-container">
          <div className="icd-cta-box">
            <div className="icd-cta-glow" />
            <h2 className="icd-cta-title">Ready to Transform Your Business?</h2>
            <p className="icd-cta-description">
              {data.ctaDescription ||
                "Let's discuss how our consulting and transformation expertise " +
                "can unlock new opportunities for your organization."}
            </p>
            <div className="icd-cta-buttons">
              <a href="/contact" className="icd-btn icd-btn-primary icd-btn-lg">
                Schedule a Consultation
                <ArrowRight className="icd-btn-icon" />
              </a>
              <a href="tel:+918123660270" className="icd-btn icd-btn-outline">
                Call: +91 8123660270
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ITConsultingDigital;