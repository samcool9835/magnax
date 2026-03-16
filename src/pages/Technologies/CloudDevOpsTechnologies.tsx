// src/pages/Technologies/CloudDevOpsTechnologies.tsx

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  Cloud,
  Server,
  Container,
  GitBranch,
  Shield,
  ArrowRight,
  CheckCircle2,
  Quote,
  Monitor,
  Scale,
  RefreshCw,
  Code,
  Sparkles,
  Play,
  Star,
  Terminal,
  Cpu,
} from 'lucide-react';

import { getCloudDevOpsTechnologiesData } from '../../service/api/pages/technologies/technologies'; // Use @/ alias if set up
import type { CloudDevOpsPageData, FloatingIcon } from '../../types'; // Use @/ alias if set up

import './CloudDevOpsTechnologies.scss';

gsap.registerPlugin(ScrollTrigger);

export function CloudDevOpsTechnologies() {
  const [data, setData] = useState<CloudDevOpsPageData | null>(null);
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
        const pageData = await getCloudDevOpsTechnologiesData();
        if (mounted) {
          setData(pageData);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to load cloud & DevOps data');
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
        '.cd-hero-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      gsap.to('.cd-float-icon', {
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
        '.cd-stat-item',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, scrollTrigger: { trigger: '.cd-stats', start: 'top 85%' } }
      );

      gsap.fromTo(
        '.cd-tech-card',
        { y: 40, opacity: 0, rotateX: 15 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger: techRef.current, start: 'top 75%' } }
      );

      gsap.fromTo(
        '.cd-capability-card',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.08, scrollTrigger: { trigger: '.cd-capabilities', start: 'top 80%' } }
      );

      gsap.fromTo(
        '.cd-project-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, scrollTrigger: { trigger: '.cd-projects', start: 'top 75%' } }
      );

      gsap.fromTo(
        '.cd-lifecycle-step',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, scrollTrigger: { trigger: '.cd-lifecycle', start: 'top 70%' } }
      );

      gsap.fromTo(
        '.cd-testimonial-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, scrollTrigger: { trigger: '.cd-testimonials', start: 'top 80%' } }
      );

      return () => {
        heroRef.current?.removeEventListener('mousemove', handleMouseMove);
      };
    });

    return () => ctx.revert();
  }, [data, loading]);

  // Loading / Error states
  if (loading) return <div className="cd-page loading">Loading cloud & DevOps technologies...</div>;
  if (error) return <div className="cd-page error">Error: {error}</div>;
  if (!data) return <div className="cd-page">No data available</div>;

  // ─── Icon mappings ─────────────────────────────────────────────────────
  const iconMap = {
    Cloud,
    Terminal,
    Container,
    GitBranch,
    Server,
    Cpu,
  } as const;

  const floatingIcons = data.floatingIcons?.map?.((item: FloatingIcon) => ({
    Icon: iconMap[item.iconName as keyof typeof iconMap] || Cloud,
    delay: item.delay,
    duration: item.duration,
    pos: item.pos,
  })) ?? [];

  const capabilityIconMap = {
    Cloud,
    Container,
    RefreshCw,
    Shield,
    Scale,
    Monitor,
  } as const;

  // ─── Lifecycle icons map & helper ──────────────────────────────────────
  const lifecycleIconMap = {
    Code,
    GitBranch,
    Container,
    Shield,
    Server,
    Monitor,
    // Add any others from your JSON lifecycleSteps
  } as const;

  const getLifecycleIcon = (iconName: string) => {
    const IconComponent = lifecycleIconMap[iconName as keyof typeof lifecycleIconMap];
    return IconComponent ? <IconComponent size={24} /> : <Cloud size={24} />;
  };

  return (
    <div className="cd-page">
      {/* Hero Section */}
      <section ref={heroRef} className="cd-hero">
        <div className="cd-hero-bg">
          <div className="cd-hero-grid" />
          <div className="cd-hero-glow" ref={glowRef} />
          <div className="cd-hero-orb cd-orb-1" />
          <div className="cd-hero-orb cd-orb-2" />
          <div className="cd-hero-orb cd-orb-3" />
        </div>

        <div className="cd-container">
          <div className="cd-hero-content">
            <div className="cd-floating-elements">
              {floatingIcons.map(({ Icon, delay, duration, pos }, idx) => (
                <div
                  key={idx}
                  className="cd-float-icon"
                  style={{ ...pos, animationDelay: delay, animationDuration: duration }}
                >
                  <Icon size={24} />
                </div>
              ))}
            </div>

            <div className="cd-hero-badge">
              <span className="cd-hero-dot" />
              <Sparkles size={14} />
              Infrastructure & DevOps
            </div>

            <h1 className="cd-hero-title">
              Cloud Native<br />
              <span className="cd-gradient-text">DevOps Excellence</span>
            </h1>

            <p className="cd-hero-description">
              Modernize your infrastructure with cloud-native architectures and DevOps automation. 
              We design, migrate, and manage scalable, secure, and cost-effective cloud solutions.
            </p>

            <div className="cd-hero-cta">
              <a href="#contact" className="cd-btn cd-btn-primary">
                Cloud Assessment
                <ArrowRight className="cd-btn-icon" />
              </a>
              <a href="#tech" className="cd-btn cd-btn-secondary">
                <Play size={18} />
                Explore Platforms
              </a>
            </div>

            <div className="cd-stats">
              {data.stats?.map?.((stat, idx) => (
                <div key={idx} className="cd-stat-item">
                  <span className="cd-stat-value">{stat.value}</span>
                  <span className="cd-stat-label">{stat.label}</span>
                </div>
              )) || <div>No stats available</div>}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section ref={techRef} id="tech" className="cd-tech-section">
        <div className="cd-container">
          <div className="cd-section-header">
            <span className="cd-section-label">Technology Stack</span>
            <h2 className="cd-section-title">Cloud & DevOps Platforms</h2>
            <p className="cd-section-subtitle">
              Leading platforms and tools for modern infrastructure
            </p>
          </div>

          <div className="cd-tech-grid">
            {data.cloudTech?.map?.((tech, index) => (
              <div
                key={index}
                className="cd-tech-card"
                style={{ '--card-index': index } as React.CSSProperties}
              >
                <div className="cd-tech-card-inner">
                  <div className="cd-tech-shine" />
                  <div className="cd-tech-header">
                    <div className="cd-tech-icon-wrapper">
                      <img src={tech.icon ?? '/images/tech/placeholder.svg'} alt={tech.name ?? 'Tech'} />
                    </div>
                    <div className="cd-tech-meta">
                      <span className="cd-tech-category">{tech.category ?? 'Platform'}</span>
                      <h3 className="cd-tech-name">{tech.name ?? 'Unnamed'}</h3>
                    </div>
                  </div>
                  <p className="cd-tech-description">{tech.description ?? 'No description'}</p>
                  <div className="cd-tech-features">
                    {Array.isArray(tech.features) && tech.features.length > 0 ? (
                      tech.features.map((feature, i) => (
                        <span key={i} className="cd-tech-feature">
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
            )) || <div>No cloud technologies available</div>}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="cd-capabilities">
        <div className="cd-container">
          <div className="cd-section-header">
            <span className="cd-section-label">What We Do</span>
            <h2 className="cd-section-title">Our DevOps Capabilities</h2>
            <p className="cd-section-subtitle">
              End-to-end infrastructure and automation services
            </p>
          </div>

          <div className="cd-capabilities-grid">
            {data.capabilities?.map?.((cap, index) => {
              const CapIcon = capabilityIconMap[cap.icon as keyof typeof capabilityIconMap] || Cloud;
              return (
                <div key={index} className="cd-capability-card">
                  <div className="cd-capability-icon">
                    <CapIcon size={28} />
                  </div>
                  <h3 className="cd-capability-title">{cap.title ?? 'Capability'}</h3>
                  <p className="cd-capability-description">{cap.description ?? 'No description'}</p>
                  <div className="cd-capability-line" />
                </div>
              );
            }) || <div>No capabilities listed</div>}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {/* <section className="cd-projects">
        <div className="cd-container">
          <div className="cd-section-header">
            <span className="cd-section-label">Case Studies</span>
            <h2 className="cd-section-title">Infrastructure Projects</h2>
            <p className="cd-section-subtitle">
              Cloud transformations we've delivered
            </p>
          </div>

          <div className="cd-projects-grid">
            {data.projects?.map?.((project, index) => (
              <div key={index} className="cd-project-card">
                <div className="cd-project-image">
                  <img src={project.image ?? '/images/projects/placeholder.jpg'} alt={project.name ?? 'Project'} />
                  <div className="cd-project-overlay" />
                  <span className="cd-project-tech">{project.tech ?? 'N/A'}</span>
                </div>
                <div className="cd-project-content">
                  <span className="cd-project-client">{project.client ?? 'Unknown'}</span>
                  <h3 className="cd-project-name">{project.name ?? 'Unnamed'}</h3>
                  <p className="cd-project-description">{project.description ?? 'No description'}</p>
                  <div className="cd-project-results">
                    {Array.isArray(project.results) && project.results.length > 0 ? (
                      project.results.map((result, i) => (
                        <span key={i} className="cd-project-result">
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

      {/* Lifecycle Section – FIXED */}
      <section className="cd-lifecycle">
        <div className="cd-container">
          <div className="cd-section-header">
            <span className="cd-section-label">DevOps Lifecycle</span>
            <h2 className="cd-section-title">Continuous Integration & Delivery</h2>
            <p className="cd-section-subtitle">
              From code commit to production deployment
            </p>
          </div>

          <div className="cd-lifecycle-grid">
            {data.lifecycleSteps?.map?.((step, idx) => (
              <div key={idx} className="cd-lifecycle-step">
                <div className="cd-lifecycle-number">{step.num}</div>
                {/* <div className="cd-lifecycle-icon">
                  {getLifecycleIcon(step.icon)}
                </div> */}
                <h3 className="cd-lifecycle-title">{step.title}</h3>
                <p className="cd-lifecycle-description">{step.desc}</p>
              </div>
            )) || <div>No lifecycle steps available</div>}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="cd-testimonials">
        <div className="cd-container">
          <div className="cd-section-header">
            <span className="cd-section-label">Testimonials</span>
            <h2 className="cd-section-title">Client Success</h2>
          </div>

          <div className="cd-testimonials-grid">
            {data.testimonials?.map?.((testimonial, index) => (
              <div key={index} className="cd-testimonial-card">
                <Quote className="cd-testimonial-quote" size={32} />
                <p className="cd-testimonial-text">{testimonial.quote}</p>
                <div className="cd-testimonial-author">
                  <img src={testimonial.image ?? '/images/testimonials/placeholder.jpg'} alt={testimonial.author} />
                  <div>
                    <div className="cd-testimonial-name">{testimonial.author ?? 'Anonymous'}</div>
                    <div className="cd-testimonial-role">{testimonial.role ?? 'Client'}</div>
                  </div>
                </div>
              </div>
            )) || <div>No testimonials available</div>}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cd-cta">
        <div className="cd-container">
          <div className="cd-cta-box">
            <div className="cd-cta-glow" />
            <h2 className="cd-cta-title">Ready for Cloud Native?</h2>
            <p className="cd-cta-description">
              Get a free cloud assessment and roadmap for your infrastructure transformation
            </p>
            <div className="cd-cta-buttons">
              <a href="#contact" className="cd-btn cd-btn-primary cd-btn-lg">
                Schedule Assessment
                <ArrowRight className="cd-btn-icon" />
              </a>
              <a href="tel:+918123660270" className="cd-btn cd-btn-outline">
                Call Us: +91 8123660270
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CloudDevOpsTechnologies;