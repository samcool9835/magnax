// src/pages/AgileDevOpsConsulting.tsx

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  Users,
  GitBranch,
  Zap,
  Target,
  Shield,
  ArrowRight,
  Quote,
  Kanban,
  Clock,
  Server,
  Container,
  Workflow,
  Monitor,
  Sparkles,
  Lightbulb,
  RefreshCw,
  BarChart3,
  Cpu,
  Layers,
  Globe,
} from 'lucide-react';

import { getAgileDevOpsConsultingData } from '../../service/api';
import type { AgileDevOpsPageData, FloatingIcon } from '../../types';

import './AgileDevOpsConsulting.scss';

gsap.registerPlugin(ScrollTrigger);

export function AgileDevOpsConsulting() {
  const [data, setData] = useState<AgileDevOpsPageData | null>(null);
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
        const pageData = await getAgileDevOpsConsultingData();
        if (mounted) {
          setData(pageData);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to load Agile & DevOps data');
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
        '.ad-hero-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      gsap.to('.ad-float-icon', {
        y: -30,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.2, from: 'random' },
      });

      gsap.fromTo(
        '.ad-stat-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: { trigger: '.ad-stats', start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.ad-practice-item',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          scrollTrigger: { trigger: '.ad-practices-section', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.ad-feature-card',
        { y: 40, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: { trigger: '.ad-features-grid', start: 'top 75%' },
        }
      );

      gsap.fromTo(
        '.ad-testimonial-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: { trigger: '.ad-testimonials', start: 'top 80%' },
        }
      );
    });

    return () => ctx.revert();
  }, [data, loading]);

  if (loading) return <div className="ad-page loading">Loading Agile & DevOps details...</div>;
  if (error) return <div className="ad-page error">Error: {error}</div>;
  if (!data) return <div className="ad-page">No data available</div>;

  // ─── Floating icons mapping ────────────────────────────────────────────
  const iconMap = {
    Users,
    GitBranch,
    Zap,
    Container,
    Server,
    Workflow,
    Monitor,
    Sparkles,
    Lightbulb,
    RefreshCw,
    Cpu,
    Globe,
    BarChart3,
    Layers,
  } as const;

  const floatingIcons = data.floatingIcons?.map?.((item: FloatingIcon) => ({
    Icon: iconMap[item.iconName as keyof typeof iconMap] || Users,
    delay: item.delay,
    duration: item.duration,
    pos: item.pos,
  })) ?? [];

  // ─── Feature icon helpers ──────────────────────────────────────────────
  const agileFeatureIconMap = {
    Kanban,
    Users,
    Target,
    Clock,
  } as const;

  const devopsFeatureIconMap = {
    Container,
    Server,
    Monitor,
    Shield,
  } as const;

  const getAgileFeatureIcon = (iconName: string) => {
    const IconComponent = agileFeatureIconMap[iconName as keyof typeof agileFeatureIconMap];
    return IconComponent ? <IconComponent size={28} /> : <Kanban size={28} />;
  };

  const getDevopsFeatureIcon = (iconName: string) => {
    const IconComponent = devopsFeatureIconMap[iconName as keyof typeof devopsFeatureIconMap];
    return IconComponent ? <IconComponent size={28} /> : <Container size={28} />;
  };

  return (
    <div className="ad-page">
      {/* Hero Section */}
      <section ref={heroRef} className="ad-hero">
        <div className="ad-hero-bg">
          <div className="ad-hero-grid" />
          <div className="ad-hero-orb ad-orb-1" />
          <div className="ad-hero-orb ad-orb-2" />
          <div className="ad-hero-orb ad-orb-3" />
          <div className="ad-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="ad-particle" />
            ))}
          </div>
        </div>

        <div className="ad-container">
          <div className="ad-hero-content">
            <div className="ad-floating-elements">
              {floatingIcons.map(({ Icon, delay, duration, pos }, idx) => (
                <div
                  key={idx}
                  className="ad-float-icon"
                  style={{ ...pos, animationDelay: delay, animationDuration: duration }}
                >
                  <Icon size={24} />
                </div>
              ))}
            </div>

            <div className="ad-hero-badge">
              <span className="ad-hero-dot" />
              <Sparkles size={14} />
              Modern Delivery
            </div>

            <h1 className="ad-hero-title">
              Agile & DevOps<br />
              Consulting
            </h1>

            <p className="ad-hero-description">
              {data.heroDescription ||
                'Accelerate your software delivery with modern practices. We help organizations ' +
                'adopt agile methodologies and implement DevOps automation to ship faster, ' +
                'safer, and with higher quality.'}
            </p>

            <div className="ad-hero-cta">
              <a href="/contact" className="ad-btn ad-btn-primary">
                Start Transformation
                <ArrowRight className="ad-btn-icon" />
              </a>
            </div>

            <div className="ad-stats">
              {data.stats?.map?.((stat, idx) => (
                <div key={idx} className="ad-stat-item">
                  <span className="ad-stat-value">{stat.value}</span>
                  <span className="ad-stat-label">{stat.label}</span>
                </div>
              )) || <div>No stats available</div>}
            </div>
          </div>
        </div>
      </section>

      {/* Agile Practices */}
      <section id="agile" className="ad-practices-section ad-practices-agile">
        <div className="ad-container">
          <div className="ad-section-header">
            <span className="ad-section-label">Agile Frameworks</span>
            <h2 className="ad-section-title">Agile Practices</h2>
            <p className="ad-section-subtitle">
              Proven methodologies for high-performing teams
            </p>
          </div>

          <div className="ad-practices-grid">
            {data.agilePractices?.map?.((practice, index) => (
              <div key={index} className="ad-practice-item ad-practice-item-agile">
                <div className="ad-practice-shine" />
                <span className="ad-practice-name">{practice.name}</span>
                <span className="ad-practice-category">{practice.category}</span>
              </div>
            )) || <div>No agile practices listed</div>}
          </div>
        </div>
      </section>

      {/* Agile Consulting Section */}
      <section className="ad-service ad-service-agile">
        <div className="ad-container">
          <div className="ad-section-header">
            <div className="ad-service-badge ad-service-badge-agile">
              <Users size={28} />
            </div>
            <h2 className="ad-section-title">Agile Consulting</h2>
            <p className="ad-section-subtitle">
              Build high-performing teams and organizations with proven agile methodologies
            </p>
          </div>

          <div className="ad-features-grid">
            {data.agileFeatures?.map?.((feature, index) => (
              <div key={index} className="ad-feature-card ad-feature-card-agile">
                <div className="ad-feature-icon ad-feature-icon-agile">
                  {getAgileFeatureIcon(feature.icon)}
                </div>
                <h3 className="ad-feature-title">{feature.title}</h3>
                <p className="ad-feature-description">{feature.description}</p>
                <div className="ad-feature-line" />
              </div>
            )) || <div>No agile features available</div>}
          </div>
        </div>
      </section>

      {/* DevOps Tools */}
      <section id="devops" className="ad-practices-section ad-practices-devops">
        <div className="ad-container">
          <div className="ad-section-header">
            <span className="ad-section-label">DevOps Toolchain</span>
            <h2 className="ad-section-title">DevOps Tools</h2>
            <p className="ad-section-subtitle">
              Automation and infrastructure technologies
            </p>
          </div>

          <div className="ad-practices-grid">
            {data.devopsTools?.map?.((tool, index) => (
              <div key={index} className="ad-practice-item ad-practice-item-devops">
                <div className="ad-practice-shine" />
                <span className="ad-practice-name">{tool.name}</span>
                <span className="ad-practice-category">{tool.category}</span>
              </div>
            )) || <div>No DevOps tools listed</div>}
          </div>
        </div>
      </section>

      {/* DevOps Consulting Section */}
      <section className="ad-service ad-service-devops">
        <div className="ad-container">
          <div className="ad-section-header">
            <div className="ad-service-badge ad-service-badge-devops">
              <GitBranch size={28} />
            </div>
            <h2 className="ad-section-title">DevOps Consulting</h2>
            <p className="ad-section-subtitle">
              Automate your delivery pipeline and build reliable, scalable infrastructure
            </p>
          </div>

          <div className="ad-features-grid">
            {data.devopsFeatures?.map?.((feature, index) => (
              <div key={index} className="ad-feature-card ad-feature-card-devops">
                <div className="ad-feature-icon ad-feature-icon-devops">
                  {getDevopsFeatureIcon(feature.icon)}
                </div>
                <h3 className="ad-feature-title">{feature.title}</h3>
                <p className="ad-feature-description">{feature.description}</p>
                <div className="ad-feature-line" />
              </div>
            )) || <div>No DevOps features available</div>}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="ad-testimonials">
        <div className="ad-container">
          <div className="ad-section-header">
            <span className="ad-section-label">Testimonials</span>
            <h2 className="ad-section-title">What Clients Say</h2>
          </div>

          <div className="ad-testimonials-grid">
            {data.testimonials?.map?.((testimonial, index) => (
              <div key={index} className="ad-testimonial-card">
                <Quote className="ad-testimonial-quote" size={32} />
                <p className="ad-testimonial-text">{testimonial.quote}</p>
                <div className="ad-testimonial-author">
                  <img src={testimonial.image} alt={testimonial.author} />
                  <div>
                    <div className="ad-testimonial-name">{testimonial.author}</div>
                    <div className="ad-testimonial-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            )) || <div>No testimonials available</div>}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ad-cta">
        <div className="ad-container">
          <div className="ad-cta-box">
            <div className="ad-cta-glow" />
            <h2 className="ad-cta-title">Ready to Accelerate Delivery?</h2>
            <p className="ad-cta-description">
              {data.ctaDescription ||
                "Let's discuss how agile and DevOps practices can transform " +
                "your software delivery capabilities."}
            </p>
            <div className="ad-cta-buttons">
              <a href="/contact" className="ad-btn ad-btn-primary ad-btn-lg">
                Schedule a Consultation
                <ArrowRight className="ad-btn-icon" />
              </a>
              <a href="tel:+918123660270" className="ad-btn ad-btn-outline">
                Call: +91 8123660270
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AgileDevOpsConsulting;