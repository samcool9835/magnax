// src/pages/Technologies/DatabaseTechnologies.tsx

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  Database,
  Table,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle2,
  Quote,
  Server,
  BarChart3,
  RefreshCw,
  Lock,
  Sparkles,
  Play,
  // Star,
  Terminal,
  HardDrive,
  Cpu,
} from 'lucide-react';

import { getDatabaseTechnologiesData } from '../../service/api/pages/technologies/technologies';
import type { DatabasePageData, FloatingIcon } from '../../types';

import './DatabaseTechnologies.scss';

gsap.registerPlugin(ScrollTrigger);

export function DatabaseTechnologies() {
  const [data, setData] = useState<DatabasePageData | null>(null);
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
        const pageData = await getDatabaseTechnologiesData();
        if (mounted) {
          setData(pageData);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to load database technologies data');
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
        '.db-hero-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      gsap.to('.db-float-icon', {
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
        '.db-stat-item',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, scrollTrigger: { trigger: '.db-stats', start: 'top 85%' } }
      );

      gsap.fromTo(
        '.db-tech-card',
        { y: 40, opacity: 0, rotateX: 15 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger: techRef.current, start: 'top 75%' } }
      );

      gsap.fromTo(
        '.db-capability-card',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.08, scrollTrigger: { trigger: '.db-capabilities', start: 'top 80%' } }
      );

      gsap.fromTo(
        '.db-project-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, scrollTrigger: { trigger: '.db-projects', start: 'top 75%' } }
      );

      gsap.fromTo(
        '.db-arch-item',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.15, scrollTrigger: { trigger: '.db-architecture', start: 'top 70%' } }
      );

      gsap.fromTo(
        '.db-arch-diagram',
        { x: 50, opacity: 0, rotateY: -10 },
        { x: 0, opacity: 1, rotateY: 0, duration: 0.8, scrollTrigger: { trigger: '.db-arch-visual', start: 'top 70%' } }
      );

      gsap.fromTo(
        '.db-testimonial-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, scrollTrigger: { trigger: '.db-testimonials', start: 'top 80%' } }
      );

      return () => {
        heroRef.current?.removeEventListener('mousemove', handleMouseMove);
      };
    });

    return () => ctx.revert();
  }, [data, loading]);

  // Loading / Error states
  if (loading) return <div className="db-page loading">Loading database technologies...</div>;
  if (error) return <div className="db-page error">Error: {error}</div>;
  if (!data) return <div className="db-page">No data available</div>;

  // ─── Icon mappings ─────────────────────────────────────────────────────
  const iconMap = {
    Database,
    Terminal,
    HardDrive,
    Table,
    Server,
    Cpu,
  } as const;

  const floatingIcons = data.floatingIcons?.map?.((item: FloatingIcon) => ({
    Icon: iconMap[item.iconName as keyof typeof iconMap] || Database,
    delay: item.delay,
    duration: item.duration,
    pos: item.pos,
  })) ?? [];

  const capabilityIconMap = {
    Server,
    RefreshCw,
    Shield,
    BarChart3,
    Zap,
    Lock,
  } as const;

  return (
    <div className="db-page">
      {/* Hero Section */}
      <section ref={heroRef} className="db-hero">
        <div className="db-hero-bg">
          <div className="db-hero-grid" />
          <div className="db-hero-glow" ref={glowRef} />
          <div className="db-hero-orb db-orb-1" />
          <div className="db-hero-orb db-orb-2" />
          <div className="db-hero-orb db-orb-3" />
        </div>

        <div className="db-container">
          <div className="db-hero-content">
            <div className="db-floating-elements">
              {floatingIcons.map(({ Icon, delay, duration, pos }, idx) => (
                <div
                  key={idx}
                  className="db-float-icon"
                  style={{ ...pos, animationDelay: delay, animationDuration: duration }}
                >
                  <Icon size={24} />
                </div>
              ))}
            </div>

            <div className="db-hero-badge">
              <span className="db-hero-dot" />
              <Sparkles size={14} />
              Data Management
            </div>

            <h1 className="db-hero-title">
              Database<br />
              <span className="db-gradient-text">Excellence</span>
            </h1>

            <p className="db-hero-description">
              Design, optimize, and manage high-performance database solutions. 
              From relational engines to modern NoSQL platforms, we ensure your data 
              is secure, available, and lightning-fast.
            </p>

            <div className="db-hero-cta">
              <a href="/contact" className="db-btn db-btn-primary">
                Database Assessment
                <ArrowRight className="db-btn-icon" />
              </a>
              <a href="#tech" className="db-btn db-btn-secondary">
                <Play size={18} />
                Explore Platforms
              </a>
            </div>

            <div className="db-stats">
              {data.stats?.map?.((stat, idx) => (
                <div key={idx} className="db-stat-item">
                  <span className="db-stat-value">{stat.value}</span>
                  <span className="db-stat-label">{stat.label}</span>
                </div>
              )) || <div>No stats available</div>}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section ref={techRef} id="tech" className="db-tech-section">
        <div className="db-container">
          <div className="db-section-header">
            <span className="db-section-label">Technology Stack</span>
            <h2 className="db-section-title">Database Platforms</h2>
            <p className="db-section-subtitle">
              Relational and NoSQL solutions for every workload
            </p>
          </div>

          <div className="db-tech-grid">
            {data.databaseTech?.map?.((tech, index) => (
              <div
                key={index}
                className="db-tech-card"
                style={{ '--card-index': index } as React.CSSProperties}
              >
                <div className="db-tech-card-inner">
                  <div className="db-tech-shine" />
                  <div className="db-tech-header">
                    <div className="db-tech-icon-wrapper">
                      <img src={tech.icon ?? '/images/tech/placeholder.svg'} alt={tech.name ?? 'Database'} />
                    </div>
                    <div className="db-tech-meta">
                      <span className="db-tech-category">{tech.category ?? 'Database'}</span>
                      <h3 className="db-tech-name">{tech.name ?? 'Unnamed'}</h3>
                    </div>
                  </div>
                  <p className="db-tech-description">{tech.description ?? 'No description'}</p>
                  <div className="db-tech-features">
                    {Array.isArray(tech.features) && tech.features.length > 0 ? (
                      tech.features.map((feature, i) => (
                        <span key={i} className="db-tech-feature">
                          <CheckCircle2 size={14} />
                          {feature}
                        </span>
                      ))
                    ) : (
                      <span>No features listed</span>
                    )}
                  </div>
                </div>
              </div>
            )) || <div>No database technologies available</div>}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="db-capabilities">
        <div className="db-container">
          <div className="db-section-header">
            <span className="db-section-label">What We Do</span>
            <h2 className="db-section-title">Database Services</h2>
            <p className="db-section-subtitle">
              End-to-end data management expertise
            </p>
          </div>

          <div className="db-capabilities-grid">
            {data.capabilities?.map?.((cap, index) => {
              const CapIcon = capabilityIconMap[cap.icon as keyof typeof capabilityIconMap] || Database;
              return (
                <div key={index} className="db-capability-card">
                  <div className="db-capability-icon">
                    <CapIcon size={28} />
                  </div>
                  <h3 className="db-capability-title">{cap.title ?? 'Capability'}</h3>
                  <p className="db-capability-description">{cap.description ?? 'No description'}</p>
                  <div className="db-capability-line" />
                </div>
              );
            }) || <div>No capabilities listed</div>}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {/* <section className="db-projects">
        <div className="db-container">
          <div className="db-section-header">
            <span className="db-section-label">Case Studies</span>
            <h2 className="db-section-title">Database Projects</h2>
            <p className="db-section-subtitle">
              Data solutions we've architected and optimized
            </p>
          </div>

          <div className="db-projects-grid">
            {data.projects?.map?.((project, index) => (
              <div key={index} className="db-project-card">
                <div className="db-project-image">
                  <img src={project.image ?? '/images/projects/placeholder.jpg'} alt={project.name ?? 'Project'} />
                  <div className="db-project-overlay" />
                  <span className="db-project-tech">{project.tech ?? 'N/A'}</span>
                </div>
                <div className="db-project-content">
                  <span className="db-project-client">{project.client ?? 'Unknown'}</span>
                  <h3 className="db-project-name">{project.name ?? 'Unnamed'}</h3>
                  <p className="db-project-description">{project.description ?? 'No description'}</p>
                  <div className="db-project-results">
                    {Array.isArray(project.results) && project.results.length > 0 ? (
                      project.results.map((result, i) => (
                        <span key={i} className="db-project-result">
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

      {/* Architecture Section */}
      <section className="db-architecture">
        <div className="db-container">
          <div className="db-arch-grid">
            <div className="db-arch-content">
              <span className="db-section-label">System Design</span>
              <h2 className="db-section-title">Modern Data Architecture</h2>

              <div className="db-arch-list">
                {data.architectureItems?.map?.((item, idx) => (
                  <div key={idx} className="db-arch-item">
                    <div className="db-arch-number">{item.num}</div>
                    <div className="db-arch-text">
                      <strong>{item.title}</strong>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                )) || [
                  { num: '01', title: 'Polyglot Persistence', desc: 'Right database for each workload: relational, document, graph, or cache' },
                  { num: '02', title: 'Data Lakes & Warehouses', desc: 'Centralized analytics with ETL/ELT pipelines and BI integration' },
                  { num: '03', title: 'Real-time Streaming', desc: 'Kafka, Kinesis, and Change Data Capture for event-driven architectures' },
                  { num: '04', title: 'Cloud-Native Databases', desc: 'Managed services with auto-scaling, backups, and global distribution' },
                ].map((item, idx) => (
                  <div key={idx} className="db-arch-item">
                    <div className="db-arch-number">{item.num}</div>
                    <div className="db-arch-text">
                      <strong>{item.title}</strong>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="db-arch-visual">
              <div className="db-arch-diagram">
                <div className="db-arch-layer db-arch-apps">
                  <span>Applications</span>
                  <div className="db-arch-nodes">
                    <span>Web</span>
                    <span>Mobile</span>
                    <span>API</span>
                  </div>
                </div>
                <div className="db-arch-arrow">↓</div>
                <div className="db-arch-layer db-arch-cache">
                  <span>Cache Layer</span>
                  <div className="db-arch-nodes">
                    <span>Redis</span>
                    <span>Memcached</span>
                  </div>
                </div>
                <div className="db-arch-arrow">↓</div>
                <div className="db-arch-layer db-arch-primary">
                  <span>Primary Database</span>
                  <div className="db-arch-nodes">
                    <span>SQL</span>
                    <span>NoSQL</span>
                  </div>
                </div>
                <div className="db-arch-arrow">↓</div>
                <div className="db-arch-layer db-arch-replica">
                  <span>Replicas & Analytics</span>
                  <div className="db-arch-nodes">
                    <span>Read Replicas</span>
                    <span>Data Warehouse</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="db-testimonials">
        <div className="db-container">
          <div className="db-section-header">
            <span className="db-section-label">Testimonials</span>
            <h2 className="db-section-title">Client Feedback</h2>
          </div>

          <div className="db-testimonials-grid">
            {data.testimonials?.map?.((testimonial, index) => (
              <div key={index} className="db-testimonial-card">
                <Quote className="db-testimonial-quote" size={32} />
                <p className="db-testimonial-text">{testimonial.quote}</p>
                <div className="db-testimonial-author">
                  <img src={testimonial.image ?? '/images/testimonials/placeholder.jpg'} alt={testimonial.author} />
                  <div>
                    <div className="db-testimonial-name">{testimonial.author ?? 'Anonymous'}</div>
                    <div className="db-testimonial-role">{testimonial.role ?? 'Client'}</div>
                  </div>
                </div>
              </div>
            )) || <div>No testimonials available</div>}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="db-cta">
        <div className="db-container">
          <div className="db-cta-box">
            <div className="db-cta-glow" />
            <h2 className="db-cta-title">Optimize Your Data Infrastructure</h2>
            <p className="db-cta-description">
              Get a free database health check and performance assessment 
              from our certified experts
            </p>
            <div className="db-cta-buttons">
              <a href="/contact" className="db-btn db-btn-primary db-btn-lg">
                Schedule Assessment
                <ArrowRight className="db-btn-icon" />
              </a>
              <a href="tel:+918123660270" className="db-btn db-btn-outline">
                Call Us: +91 8123660270
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DatabaseTechnologies;