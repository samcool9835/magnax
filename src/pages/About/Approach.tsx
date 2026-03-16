// src/pages/Approach.tsx

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  ArrowRight,
  Building2,
  // Wallet,
  // HeartPulse,
  Users,
  // Gamepad2,
  // Smartphone,
  CheckCircle2,
  // ExternalLink,
  // Filter,
  Sparkles,
  Briefcase,
  TrendingUp,
  Globe,
  Award,
  Zap,
  Compass,
  DollarSign,
  Target,
  Handshake,
  Leaf,
  Shield,
  Lightbulb,
  RefreshCw,
  Cpu,
  // Layers,
} from 'lucide-react';

import { getApproachData } from '../../service/api';
import type { ApproachPageData, FloatingIcon } from '../../types';

import './Approach.scss';

gsap.registerPlugin(ScrollTrigger);

export function Approach() {
  const [data, setData] = useState<ApproachPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);

  // Fetch data
  useEffect(() => {
    let mounted = true;

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const pageData = await getApproachData();
        if (mounted) {
          setData(pageData);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to load approach data');
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
        '.approach-hero-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      gsap.to('.approach-float-icon', {
        y: -30,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.2, from: 'random' },
      });

      gsap.fromTo(
        '.approach-hero-stat',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.6,
          ease: 'back.out(1.7)',
        }
      );

      gsap.fromTo(
        '.approach-nav-orbit',
        { scale: 0.8, opacity: 0, rotation: -180 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.4,
        }
      );

      gsap.fromTo(
        '.approach-section',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: { trigger: '.approach-main', start: 'top 80%' },
        }
      );
    });

    return () => ctx.revert();
  }, [data, loading]);

  const scrollToSection = (id: string, index: number) => {
    setActiveSection(index);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) return <div className="approach-page loading">Loading approach details...</div>;
  if (error) return <div className="approach-page error">Error: {error}</div>;
  if (!data) return <div className="approach-page">No data available</div>;

  // ─── Floating icons mapping ────────────────────────────────────────────
  const iconMap = {
    Target,
    Compass,
    Zap,
    Award,
    Globe,
    Sparkles,
    Briefcase,
    TrendingUp,
  } as const;

  const floatingIcons = data.floatingIcons?.map?.((item: FloatingIcon) => ({
    Icon: iconMap[item.iconName as keyof typeof iconMap] || Target,
    delay: item.delay,
    duration: item.duration,
    pos: item.pos,
  })) ?? [];

  // ─── Section / Feature icon mapping ────────────────────────────────────
  const sectionIconMap = {
    Compass,
    DollarSign,
    Users,
    Building2,
    Handshake,
    Leaf,
    Lightbulb,
    RefreshCw,
    Cpu,
    Globe,
  } as const;

  const getSectionIcon = (iconName: string) => {
    const IconComponent = sectionIconMap[iconName as keyof typeof sectionIconMap];
    return IconComponent ? <IconComponent size={32} /> : <Compass size={32} />;
  };

  return (
    <div className="approach-page">
      {/* Hero - Unique Circular Navigation Design */}
      <section ref={heroRef} className="approach-hero">
        <div className="approach-hero-bg">
          <div className="approach-hero-grid" />
          <div className="approach-hero-orb approach-orb-1" />
          <div className="approach-hero-orb approach-orb-2" />
          <div className="approach-hero-orb approach-orb-3" />
          <div className="approach-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="approach-particle" />
            ))}
          </div>
        </div>

        <div className="approach-container">
          <div className="approach-hero-wrapper">
            <div className="approach-hero-content">
              <div className="approach-floating-elements">
                {floatingIcons.map(({ Icon, delay, duration, pos }, idx) => (
                  <div
                    key={idx}
                    className="approach-float-icon"
                    style={{ ...pos, animationDelay: delay, animationDuration: duration }}
                  >
                    <Icon size={24} />
                  </div>
                ))}
              </div>

              <div className="approach-hero-badge">
                <span className="approach-hero-dot" />
                <Sparkles size={14} />
                Our Methodology
              </div>

              <h1 className="approach-hero-title">
                Strategic<br />
                <span className="approach-gradient-text">Approach</span>
              </h1>

              <p className="approach-hero-description">
                {data.heroDescription ||
                  'We combine industry best practices with innovative methodologies to ' +
                  'deliver exceptional results. Discover how we partner with clients ' +
                  'to turn vision into reality through structured excellence.'}
              </p>

              <div className="approach-hero-info">
                {data.heroInfo?.map?.((info, idx) => (
                  <div key={idx} className="approach-info-item">
                    <Shield size={18} /> {/* fallback */}
                    <span>{info}</span>
                  </div>
                )) || (
                  <>
                    <div className="approach-info-item"><Shield size={18} /><span>Enterprise Security</span></div>
                    <div className="approach-info-item"><TrendingUp size={18} /><span>Scalable Growth</span></div>
                    <div className="approach-info-item"><Zap size={18} /><span>Rapid Delivery</span></div>
                  </>
                )}
              </div>

              <div className="approach-hero-stats">
                {data.heroStats?.map?.((stat, idx) => (
                  <div key={idx} className="approach-hero-stat">
                    <span className="approach-stat-value">{stat.value}</span>
                    <span className="approach-stat-label">{stat.label}</span>
                  </div>
                )) || <div>No stats available</div>}
              </div>
            </div>

            {/* Circular Navigation Orbit */}
            <div className="approach-nav-orbit-container">
              <div className="approach-nav-orbit">
                <div className="approach-orbit-center">
                  <div className="approach-center-icon">
                    <Target size={40} />
                  </div>
                  <span className="approach-center-text">Explore</span>
                </div>

                {data.sections?.map?.((section, index) => {
                  const angle = (index * 60) - 90;
                  const radius = 140;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;

                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id, index)}
                      className={`approach-orbit-node ${activeSection === index ? 'active' : ''}`}
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                    >
                      <div className="approach-node-icon">
                        {getSectionIcon(section.icon)}
                      </div>
                      <span className="approach-node-label">{section.label}</span>
                      {activeSection === index && <span className="approach-node-pulse" />}
                    </button>
                  );
                }) || <div>No navigation sections available</div>}

                <div className="approach-orbit-ring ring-1" />
                <div className="approach-orbit-ring ring-2" />
                <div className="approach-orbit-ring ring-3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="approach-main">
        {/* Where to Start */}
        <section id="where-to-start" className="approach-section">
          <div className="approach-container">
            <div className="approach-section-header">
              <span className="approach-section-label">Phase 01</span>
              <div className="approach-section-title-wrap">
                {getSectionIcon('Compass')}
                <h2>Where to Start</h2>
              </div>
            </div>
            <div className="approach-start-grid">
              {data.startSteps?.map?.((step, idx) => (
                <div key={idx} className="approach-start-step">
                  <div className="approach-step-glow" />
                  <span className="approach-step-number">{step.num}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                  <div className="approach-step-line" />
                </div>
              )) || <div>No start steps available</div>}
            </div>
          </div>
        </section>

        {/* Pricing Models */}
        <section id="pricing-models" className="approach-section approach-section-alt">
          <div className="approach-container">
            <div className="approach-section-header">
              <span className="approach-section-label">Engagement</span>
              <div className="approach-section-title-wrap">
                {getSectionIcon('DollarSign')}
                <h2>Pricing Models</h2>
              </div>
            </div>
            <div className="approach-pricing-grid">
              {data.pricingModels?.map?.((model, idx) => (
                <div key={idx} className="approach-pricing-card">
                  <div className="approach-pricing-glow" />
                  <div className="approach-pricing-header">
                    <h3>{model.title}</h3>
                  </div>
                  <p>{model.description}</p>
                  <ul>
                    {model.features?.map?.((feature, fidx) => (
                      <li key={fidx}>
                        <CheckCircle2 size={16} />
                        <span>{feature}</span>
                      </li>
                    )) || <li>No features listed</li>}
                  </ul>
                </div>
              )) || <div>No pricing models available</div>}
            </div>
          </div>
        </section>

        {/* Project Management Office */}
        <section id="project-management" className="approach-section">
          <div className="approach-container">
            <div className="approach-section-header">
              <span className="approach-section-label">Delivery</span>
              <div className="approach-section-title-wrap">
                {getSectionIcon('Users')}
                <h2>Project Management Office</h2>
              </div>
            </div>
            <div className="approach-pmo-content">
              <div className="approach-pmo-intro">
                <p>
                  {data.pmoIntro ||
                    'Our PMO ensures every project is delivered on time, within budget, ' +
                    'and to the highest quality standards. We combine agile methodologies ' +
                    'with robust governance frameworks.'}
                </p>
              </div>
              <div className="approach-pmo-features">
                {data.pmoFeatures?.map?.((feature, idx) => (
                  <div key={idx} className="approach-pmo-feature">
                    <div className="approach-pmo-icon">
                      <TrendingUp size={24} /> {/* fallback */}
                    </div>
                    <h4>{feature.title}</h4>
                    <p>{feature.desc}</p>
                  </div>
                )) || <div>No PMO features listed</div>}
              </div>
            </div>
          </div>
        </section>

        {/* Architecture CoE */}
        <section id="architecture" className="approach-section approach-section-alt">
          <div className="approach-container">
            <div className="approach-section-header">
              <span className="approach-section-label">Foundation</span>
              <div className="approach-section-title-wrap">
                {getSectionIcon('Building2')}
                <h2>Architecture Center of Excellence</h2>
              </div>
            </div>
            <div className="approach-arch-content">
              <p className="approach-arch-intro">
                {data.archIntro ||
                  'Our Architecture CoE defines standards, best practices, and reference ' +
                  'architectures that ensure scalable, secure, and maintainable solutions.'}
              </p>
              <div className="approach-arch-areas">
                {data.archAreas?.map?.((area, idx) => (
                  <div key={idx} className="approach-arch-area">
                    <div className="approach-arch-icon">
                      <ArrowRight size={24} /> {/* fallback */}
                    </div>
                    <h4>{area.title}</h4>
                    <p>{area.desc}</p>
                  </div>
                )) || <div>No architecture areas listed</div>}
              </div>
            </div>
          </div>
        </section>

        {/* Technology Partnership */}
        <section id="partnership" className="approach-section">
          <div className="approach-container">
            <div className="approach-section-header">
              <span className="approach-section-label">Collaboration</span>
              <div className="approach-section-title-wrap">
                {getSectionIcon('Handshake')}
                <h2>Technology Partnership</h2>
              </div>
            </div>
            <div className="approach-partnership-content">
              <p>
                {data.partnershipIntro ||
                  'We don\'t just deliver projects; we build lasting partnerships. Our ' +
                  'collaborative approach ensures we understand your business deeply ' +
                  'and evolve with your needs.'}
              </p>
              <div className="approach-partnership-benefits">
                {data.partnershipBenefits?.map?.((benefit, idx) => (
                  <div key={idx} className="approach-benefit">
                    <CheckCircle2 size={20} />
                    <span>{benefit}</span>
                  </div>
                )) || <div>No partnership benefits listed</div>}
              </div>
            </div>
          </div>
        </section>

        {/* Sustainability Policy */}
        <section id="sustainability" className="approach-section approach-section-alt">
          <div className="approach-container">
            <div className="approach-section-header">
              <span className="approach-section-label">Responsibility</span>
              <div className="approach-section-title-wrap">
                {getSectionIcon('Leaf')}
                <h2>Sustainability Policy</h2>
              </div>
            </div>
            <div className="approach-sustain-content">
              <p className="approach-sustain-intro">
                {data.sustainabilityIntro ||
                  'We are committed to sustainable business practices that minimize ' +
                  'environmental impact while maximizing social value.'}
              </p>
              <div className="approach-sustain-pillars">
                {data.sustainabilityPillars?.map?.((pillar, idx) => (
                  <div key={idx} className="approach-sustain-pillar">
                    <div className="approach-pillar-icon">
                      {getSectionIcon(pillar.icon || 'Leaf')}
                    </div>
                    <h4>{pillar.title}</h4>
                    <p>{pillar.desc}</p>
                  </div>
                )) || <div>No sustainability pillars listed</div>}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* CTA */}
      <section className="approach-cta">
        <div className="approach-container">
          <div className="approach-cta-box">
            <div className="approach-cta-glow" />
            <h2 className="approach-cta-title">Ready to Start Your Project?</h2>
            <p className="approach-cta-description">
              {data.ctaDescription || "Let's discuss the best approach for your business needs."}
            </p>
            <a href="/contact" className="approach-btn approach-btn-primary approach-btn-lg">
              Get Started
              <ArrowRight className="approach-btn-icon" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Approach;