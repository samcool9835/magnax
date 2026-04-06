// src/pages/KeyProjects.tsx

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  ArrowRight,
  Building2,
  Wallet,
  HeartPulse,
  Users,
  Gamepad2,
  Smartphone,
  CheckCircle2,
  ExternalLink,
  Filter,
  Sparkles,
  Briefcase,
  TrendingUp,
  Globe,
  Award,
  Zap,
} from 'lucide-react';

import { getKeyProjectsData } from '../service/api';
import type { KeyProjectsPageData, FloatingIcon } from '../types';

import './KeyProjects.scss';

gsap.registerPlugin(ScrollTrigger);

export function KeyProjects() {
  const [data, setData] = useState<KeyProjectsPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isFilterSticky, setIsFilterSticky] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Fetch data
  useEffect(() => {
    let mounted = true;

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const pageData = await getKeyProjectsData();
        if (mounted) {
          setData(pageData);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to load key projects data');
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

  // Sticky filter logic
  useEffect(() => {
    const handleScroll = () => {
      if (filterRef.current) {
        const rect = filterRef.current.getBoundingClientRect();
        setIsFilterSticky(rect.top <= 80);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP animations
  useEffect(() => {
    if (loading || !data) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.kp-hero-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      gsap.to('.kp-float-icon', {
        y: -30,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.2, from: 'random' },
      });

      gsap.fromTo(
        '.kp-stat-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: { trigger: '.kp-stats', start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.kp-filter-btn',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          scrollTrigger: { trigger: '.kp-filter-section', start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.kp-project-card',
        { y: 60, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: projectsRef.current, start: 'top 75%' },
        }
      );
    });

    return () => ctx.revert();
  }, [data, loading, activeFilter]);

  // Animate on filter change
  useEffect(() => {
    gsap.fromTo(
      '.kp-project-card',
      { scale: 0.9, opacity: 0, y: 30 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'back.out(1.7)',
      }
    );
  }, [activeFilter]);

  if (loading) return <div className="kp-page loading">Loading key projects...</div>;
  if (error) return <div className="kp-page error">Error: {error}</div>;
  if (!data) return <div className="kp-page">No projects data available</div>;

  // ─── Floating icons mapping ────────────────────────────────────────────
  const iconMap = {
    Briefcase,
    TrendingUp,
    Globe,
    Award,
    Zap,
    Sparkles,
  } as const;

  const floatingIcons = data.floatingIcons?.map?.((item: FloatingIcon) => ({
    Icon: iconMap[item.iconName as keyof typeof iconMap] || Briefcase,
    delay: item.delay,
    duration: item.duration,
    pos: item.pos,
  })) ?? [];

  // ─── Project icon mapping ──────────────────────────────────────────────
  const projectIconMap = {
    Building2,
    Wallet,
    HeartPulse,
    Users,
    Gamepad2,
    Smartphone,
  } as const;

  const getProjectIcon = (iconName: string) => {
    const IconComponent = projectIconMap[iconName as keyof typeof projectIconMap];
    return IconComponent ? <IconComponent size={32} /> : <Briefcase size={32} />;
  };

  // Filter projects
  const filteredProjects = activeFilter === 'All'
    ? data.projects ?? []
    : (data.projects ?? []).filter(p => p.industry === activeFilter);

  return (
    <div className="kp-page">
      {/* Hero Section */}
      <section ref={heroRef} className="kp-hero">
        <div className="kp-hero-bg">
          <div className="kp-hero-grid" />
          <div className="kp-hero-orb kp-orb-1" />
          <div className="kp-hero-orb kp-orb-2" />
          <div className="kp-hero-orb kp-orb-3" />
          <div className="kp-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="kp-particle" />
            ))}
          </div>
        </div>

        <div className="kp-container">
          <div className="kp-hero-content">
            <div className="kp-floating-elements">
              {floatingIcons.map(({ Icon, delay, duration, pos }, idx) => (
                <div
                  key={idx}
                  className="kp-float-icon"
                  style={{ ...pos, animationDelay: delay, animationDuration: duration }}
                >
                  <Icon size={24} />
                </div>
              ))}
            </div>

            <div className="kp-hero-badge">
              <span className="kp-hero-dot" />
              <Sparkles size={14} />
              Portfolio
            </div>

            <h1 className="kp-hero-title">
              Key Projects &<br />
              Case Studies
            </h1>

            <p className="kp-hero-description">
              {data.heroDescription ||
                'Explore our portfolio of successful digital transformations across banking, ' +
                'healthcare, fintech, and entertainment industries. Each project showcases ' +
                'our commitment to delivering innovative, scalable, and user-centric solutions.'}
            </p>

            <div className="kp-hero-cta">
              <a href="#projects" className="kp-btn kp-btn-primary">
                View Projects
                <ArrowRight className="kp-btn-icon" />
              </a>
              <a href="/contact" className="kp-btn kp-btn-secondary">
                Start Your Project
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="kp-stats">
        <div className="kp-container">
          <div className="kp-stats-grid">
            {data.stats?.map?.((stat, idx) => (
              <div key={idx} className="kp-stat-item">
                <span className="kp-stat-value">{stat.value}</span>
                <span className="kp-stat-label">{stat.label}</span>
              </div>
            )) || <div>No stats available</div>}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section ref={filterRef} className={`kp-filter-section ${isFilterSticky ? 'kp-filter-sticky' : ''}`}>
        <div className="kp-container">
          <div className="kp-filter-wrapper">
            <div className="kp-filter-header">
              <div className="kp-filter-icon-wrapper">
                <Filter size={18} />
              </div>
              <span>Filter by Industry</span>
            </div>

            <div className="kp-filter-buttons">
              {data.industries?.map?.((industry) => (
                <button
                  key={industry}
                  className={`kp-filter-btn ${activeFilter === industry ? 'active' : ''}`}
                  onClick={() => setActiveFilter(industry)}
                >
                  <span className="kp-filter-text">{industry}</span>
                  {activeFilter === industry && <span className="kp-filter-glow" />}
                  <span className="kp-filter-particles">
                    {[...Array(3)].map((_, i) => (
                      <span key={i} className="kp-filter-particle" />
                    ))}
                  </span>
                </button>
              )) || <div>No industries available</div>}
            </div>

            <div className="kp-filter-active-indicator">
              <span className="kp-filter-count">
                {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={projectsRef} id="projects" className="kp-projects">
        <div className="kp-container">
          <div className="kp-projects-grid">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="kp-project-card"
                style={{ '--project-color': project.color } as React.CSSProperties}
              >
                <div className="kp-project-glow" />
                <div className="kp-project-content">
                  <div className="kp-project-header">
                    <div className="kp-project-icon-wrapper">
                      {getProjectIcon(project.icon)}
                    </div>
                    <div className="kp-project-meta">
                      <span className="kp-project-industry">{project.industry}</span>
                      <div className="kp-project-stat">
                        <TrendingUp size={14} />
                        <span>{project.stats.value}</span>
                        <small>{project.stats.label}</small>
                      </div>
                    </div>
                  </div>

                  <h3 className="kp-project-title">{project.title}</h3>
                  <p className="kp-project-solution">{project.solution}</p>
                  <p className="kp-project-description">{project.description}</p>

                  <div className="kp-project-highlights">
                    <h4>Key Highlights</h4>
                    <ul>
                      {project.highlights?.map?.((highlight, idx) => (
                        <li key={idx}>
                          <CheckCircle2 size={16} />
                          <span>{highlight}</span>
                        </li>
                      )) || <li>No highlights available</li>}
                    </ul>
                  </div>

                  <div className="kp-project-footer">
                    <button className="kp-project-btn">
                      <span>View Case Study</span>
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
                <div className="kp-project-shine" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="kp-cta">
        <div className="kp-container">
          <div className="kp-cta-box">
            <div className="kp-cta-glow" />
            <h2 className="kp-cta-title">Ready to Build Your Next Success Story?</h2>
            <p className="kp-cta-description">
              {data.ctaDescription ||
                "Let's discuss how we can help transform your ideas into powerful digital solutions."}
            </p>
            <div className="kp-cta-buttons">
              <a href="/contact" className="kp-btn kp-btn-primary kp-btn-lg">
                Start a Project
                <ArrowRight className="kp-btn-icon" />
              </a>
              <a href="tel:+918123660270" className="kp-btn kp-btn-outline">
                Call: +91 8123660270
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default KeyProjects;