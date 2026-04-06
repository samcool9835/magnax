// src/pages/Technologies/BackendTechnologies.tsx

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  Server,
  Database,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle2,
  Quote,
  Cpu,
  Globe,
  Lock,
  Cloud,
  Terminal,
  Activity,
  GitBranch,
  Sparkles,
  Play,
  // Star,
} from 'lucide-react';

import { getBackendTechnologiesData } from '../../service/api/pages/technologies/technologies'; // ← use alias @/ if configured
import type { BackendPageData, FloatingIcon } from '../../types'; // ← use alias @/ if configured

import './BackendTechnologies.scss';

gsap.registerPlugin(ScrollTrigger);

export function BackendTechnologies() {
  const [data, setData] = useState<BackendPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Fetch data
  useEffect(() => {
    let mounted = true;

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const pageData = await getBackendTechnologiesData();
        if (mounted) {
          setData(pageData);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to load backend technologies');
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

  // GSAP animations (only run when data is ready)
  useEffect(() => {
    if (loading || !data) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.be-hero-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      gsap.to('.be-float-icon', {
        y: -30,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.2, from: 'random' },
      });

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

      gsap.fromTo(
        '.be-stat-item',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, scrollTrigger: { trigger: '.be-stats', start: 'top 85%' } }
      );

      gsap.fromTo(
        '.be-tech-card',
        { y: 40, opacity: 0, rotateX: 15 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger: techRef.current, start: 'top 75%' } }
      );

      gsap.fromTo(
        '.be-capability-card',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.08, scrollTrigger: { trigger: '.be-capabilities', start: 'top 80%' } }
      );

      gsap.fromTo(
        '.be-project-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, scrollTrigger: { trigger: '.be-projects', start: 'top 75%' } }
      );

      gsap.fromTo(
        '.be-arch-item',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.15, scrollTrigger: { trigger: '.be-architecture', start: 'top 70%' } }
      );

      gsap.fromTo(
        '.be-arch-diagram',
        { x: 50, opacity: 0, rotateY: -10 },
        { x: 0, opacity: 1, rotateY: 0, duration: 0.8, scrollTrigger: { trigger: '.be-arch-visual', start: 'top 70%' } }
      );

      gsap.fromTo(
        '.be-testimonial-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, scrollTrigger: { trigger: '.be-testimonials', start: 'top 80%' } }
      );

      return () => {
        heroRef.current?.removeEventListener('mousemove', handleMouseMove);
      };
    });

    return () => ctx.revert();
  }, [data, loading]);

  // ─── Loading & Error States ────────────────────────────────────────────
  if (loading) {
    return <div className="be-page loading">Loading backend technologies...</div>;
  }

  if (error) {
    return <div className="be-page error">Error: {error}</div>;
  }

  if (!data) {
    return <div className="be-page">No data available</div>;
  }

  // ─── Safe icon mapping ─────────────────────────────────────────────────
  const iconMap = {
    Cloud,
    Terminal,
    Database,
    GitBranch,
    Activity,
    Cpu,
    Server,
    Lock,
  } as const;

  const floatingIcons = data.floatingIcons?.map?.((item: FloatingIcon) => ({
    Icon: iconMap[item.iconName as keyof typeof iconMap] || Cloud, // fallback
    delay: item.delay,
    duration: item.duration,
    pos: item.pos,
  })) ?? [];

  const capabilityIconMap = {
    Server,
    Database,
    Shield,
    Zap,
    Globe,
    Lock,
  } as const;

  return (
    <div className="be-page">
      {/* Hero Section */}
      <section ref={heroRef} className="be-hero">
        <div className="be-hero-bg">
          <div className="be-hero-grid" />
          <div className="be-hero-glow" ref={glowRef} />
          <div className="be-hero-orb be-orb-1" />
          <div className="be-hero-orb be-orb-2" />
          <div className="be-hero-orb be-orb-3" />
        </div>

        <div className="be-container">
          <div className="be-hero-content">
            <div className="be-floating-elements">
              {floatingIcons.map(({ Icon, delay, duration, pos }, idx) => (
                <div
                  key={idx}
                  className="be-float-icon"
                  style={{ ...pos, animationDelay: delay, animationDuration: duration }}
                >
                  <Icon size={24} />
                </div>
              ))}
            </div>

            <div className="be-hero-badge">
              <span className="be-hero-dot" />
              <Sparkles size={14} />
              Backend Development
            </div>

            <h1 className="be-hero-title">
              Powering Systems<br />
              <span className="be-gradient-text">That Scale</span>
            </h1>

            <p className="be-hero-description">
              Build powerful, scalable server-side solutions with our expert backend development.
              From .NET to Python, we architect systems that handle millions of requests
              with reliability and performance.
            </p>

            <div className="be-hero-cta">
              <a href="/contact" className="be-btn be-btn-primary">
                Discuss Your Architecture
                <ArrowRight className="be-btn-icon" />
              </a>
              <a href="#tech" className="be-btn be-btn-secondary">
                <Play size={18} />
                Explore Technologies
              </a>
            </div>

            <div className="be-stats">
              {data.stats?.map?.((stat, idx) => (
                <div key={idx} className="be-stat-item">
                  <span className="be-stat-value">{stat.value}</span>
                  <span className="be-stat-label">{stat.label}</span>
                </div>
              )) || <div>No stats available</div>}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section ref={techRef} id="tech" className="be-tech-section">
        <div className="be-container">
          <div className="be-section-header">
            <span className="be-section-label">Technology Stack</span>
            <h2 className="be-section-title">Backend Technologies</h2>
            <p className="be-section-subtitle">
              Robust frameworks and languages powering enterprise applications
            </p>
          </div>

          <div className="be-tech-grid">
            {data.backendTech?.map?.((tech, index) => (
              <div
                key={index}
                className="be-tech-card"
                style={{ '--card-index': index } as React.CSSProperties}
              >
                <div className="be-tech-card-inner">
                  <div className="be-tech-shine" />
                  <div className="be-tech-header">
                    <div className="be-tech-icon-wrapper">
                      <img src={tech.icon} alt={tech.name} />
                    </div>
                    <div className="be-tech-meta">
                      <span className="be-tech-category">{tech.category}</span>
                      <h3 className="be-tech-name">{tech.name}</h3>
                    </div>
                  </div>
                  <p className="be-tech-description">{tech.description}</p>
                  <div className="be-tech-features">
                    {tech.features?.map?.((feature, i) => (
                      <span key={i} className="be-tech-feature">
                        <CheckCircle2 size={14} />
                        {feature}
                      </span>
                    )) || <span>No features listed</span>}
                  </div>
                </div>
              </div>
            )) || <div>No technologies available</div>}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="be-capabilities">
        <div className="be-container">
          <div className="be-section-header">
            <span className="be-section-label">What We Build</span>
            <h2 className="be-section-title">Our Capabilities</h2>
            <p className="be-section-subtitle">
              Comprehensive backend solutions for enterprise-scale applications
            </p>
          </div>

          <div className="be-capabilities-grid">
            {data.capabilities?.map?.((cap, index) => {
              const CapIcon = capabilityIconMap[cap.icon as keyof typeof capabilityIconMap] || Server;
              return (
                <div key={index} className="be-capability-card">
                  <div className="be-capability-icon">
                    <CapIcon size={28} />
                  </div>
                  <h3 className="be-capability-title">{cap.title}</h3>
                  <p className="be-capability-description">{cap.description}</p>
                  <div className="be-capability-line" />
                </div>
              );
            }) || <div>No capabilities listed</div>}
          </div>
        </div>
      </section>

      {/* Projects Section – fixed crash here */}
      {/* <section className="be-projects">
        <div className="be-container">
          <div className="be-section-header">
            <span className="be-section-label">Case Studies</span>
            <h2 className="be-section-title">Featured Projects</h2>
            <p className="be-section-subtitle">
              Real-world backend systems we've architected and deployed
            </p>
          </div>

          <div className="be-projects-grid">
            {data.projects?.map?.((project, index) => (
              <div key={index} className="be-project-card">
                <div className="be-project-image">
                  <img src={project.image ?? '/images/placeholder.jpg'} alt={project.name ?? 'Project'} />
                  <div className="be-project-overlay" />
                  <span className="be-project-tech">{project.tech ?? 'N/A'}</span>
                </div>
                <div className="be-project-content">
                  <span className="be-project-client">{project.client ?? 'Unknown Client'}</span>
                  <h3 className="be-project-name">{project.name ?? 'Unnamed Project'}</h3>
                  <p className="be-project-description">{project.description ?? 'No description available'}</p>
                  <div className="be-project-results">
                    {Array.isArray(project.results) && project.results.length > 0 ? (
                      project.results.map((result, i) => (
                        <span key={i} className="be-project-result">
                          <Star size={12} />
                          {result}
                        </span>
                      ))
                    ) : (
                      <span className="no-results">No key results listed</span>
                    )}
                  </div>
                </div>
              </div>
            )) || <div className="no-projects">No projects available</div>}
          </div>
        </div>
      </section> */}

      {/* Architecture Section – static for now, can be made dynamic later */}
      <section className="be-architecture">
        <div className="be-container">
          <div className="be-arch-grid">
            <div className="be-arch-content">
              <span className="be-section-label">System Design</span>
              <h2 className="be-section-title">Scalable Architecture</h2>

              <div className="be-arch-list">
                {[
                  { num: '01', title: 'Microservices', desc: 'Distributed systems with independent, deployable services and service mesh' },
                  { num: '02', title: 'Event-Driven', desc: 'Async processing with message queues, event sourcing, and CQRS patterns' },
                  { num: '03', title: 'Serverless', desc: 'Cost-effective scaling with FaaS, managed services, and auto-scaling' },
                  { num: '04', title: 'API Gateway', desc: 'Unified entry point with rate limiting, caching, and request routing' },
                ].map((item, idx) => (
                  <div key={idx} className="be-arch-item">
                    <div className="be-arch-number">{item.num}</div>
                    <div className="be-arch-text">
                      <strong>{item.title}</strong>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="be-arch-visual">
              <div className="be-arch-diagram">
                {/* Your existing static diagram */}
                <div className="be-arch-layer be-arch-client">
                  <span>Clients</span>
                  <div className="be-arch-nodes">
                    <span>Web</span>
                    <span>Mobile</span>
                    <span>IoT</span>
                  </div>
                </div>
                <div className="be-arch-arrow">↓</div>
                <div className="be-arch-layer be-arch-gateway">
                  <span>API Gateway</span>
                  <div className="be-arch-nodes">
                    <span>Auth</span>
                    <span>Rate Limit</span>
                  </div>
                </div>
                <div className="be-arch-arrow">↓</div>
                <div className="be-arch-layer be-arch-services">
                  <span>Microservices</span>
                  <div className="be-arch-nodes">
                    <span>Orders</span>
                    <span>Payments</span>
                    <span>Inventory</span>
                    <span>Users</span>
                  </div>
                </div>
                <div className="be-arch-arrow">↓</div>
                <div className="be-arch-layer be-arch-data">
                  <span>Data Layer</span>
                  <div className="be-arch-nodes">
                    <span>PostgreSQL</span>
                    <span>Redis</span>
                    <span>MongoDB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="be-testimonials">
        <div className="be-container">
          <div className="be-section-header">
            <span className="be-section-label">Testimonials</span>
            <h2 className="be-section-title">Client Feedback</h2>
          </div>

          <div className="be-testimonials-grid">
            {data.testimonials?.map?.((testimonial, index) => (
              <div key={index} className="be-testimonial-card">
                <Quote className="be-testimonial-quote" size={32} />
                <p className="be-testimonial-text">{testimonial.quote}</p>
                <div className="be-testimonial-author">
                  <img src={testimonial.image} alt={testimonial.author} />
                  <div>
                    <div className="be-testimonial-name">{testimonial.author}</div>
                    <div className="be-testimonial-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            )) || <div>No testimonials available</div>}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="be-cta">
        <div className="be-container">
          <div className="be-cta-box">
            <div className="be-cta-glow" />
            <h2 className="be-cta-title">Ready to Architect Your Backend?</h2>
            <p className="be-cta-description">
              Let's build a scalable, secure backend that powers your applications
              and grows with your business
            </p>
            <div className="be-cta-buttons">
              <a href="/contact" className="be-btn be-btn-primary be-btn-lg">
                Start Your Project
                <ArrowRight className="be-btn-icon" />
              </a>
              <a href="tel:+918123660270" className="be-btn be-btn-outline">
                Call Us: +91 8123660270
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BackendTechnologies;