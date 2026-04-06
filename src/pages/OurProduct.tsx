// src/pages/OurProduct.tsx

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  Smartphone,
  GraduationCap,
  Users,
  BookOpen,
  LayoutDashboard,
  Bell,
  ShieldCheck,
  TrendingUp,
  CalendarCheck,
  FileText,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Quote,
  Sparkles,
  Globe,
  Award,
  Play,
  Download,
  Star,
  Cpu,
  Lock,
  Clock,
} from 'lucide-react';

import { getOurProductData } from '../service/api';
import type { OurProductPageData, FloatingIcon } from '../types';

import './OurProduct.scss';

gsap.registerPlugin(ScrollTrigger);

export function OurProduct() {
  const [data, setData] = useState<OurProductPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  // Fetch data
  useEffect(() => {
    let mounted = true;

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const pageData = await getOurProductData();
        if (mounted) {
          setData(pageData);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to load product data');
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
        '.drems-hero-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      gsap.to('.drems-float-icon', {
        y: -30,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.2, from: 'random' },
      });

      gsap.fromTo(
        '.drems-phone-container',
        { y: 100, opacity: 0, rotateY: -15 },
        { y: 0, opacity: 1, rotateY: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );

      gsap.fromTo(
        '.drems-hero-stat',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.6, ease: 'back.out(1.7)' }
      );

      gsap.fromTo(
        '.drems-feature-card',
        { y: 40, opacity: 0, rotateX: 15 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger: featuresRef.current, start: 'top 75%' } }
      );

      gsap.fromTo(
        '.drems-benefit-item',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.08, scrollTrigger: { trigger: '.drems-benefits', start: 'top 80%' } }
      );

      gsap.fromTo(
        '.drems-testimonial-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, scrollTrigger: { trigger: '.drems-testimonials', start: 'top 75%' } }
      );

      gsap.to('.drems-phone-screen-content', {
        y: -20,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, [data, loading]);

  if (loading) return <div className="drems-page loading">Loading product details...</div>;
  if (error) return <div className="drems-page error">Error: {error}</div>;
  if (!data) return <div className="drems-page">No product data available</div>;

  // ─── Floating icons mapping ────────────────────────────────────────────
  const iconMap = {
    GraduationCap,
    BookOpen,
    Users,
    Award,
    Bell,
    Sparkles,
  } as const;

  const floatingIcons = data.floatingIcons?.map?.((item: FloatingIcon) => ({
    Icon: iconMap[item.iconName as keyof typeof iconMap] || GraduationCap,
    delay: item.delay,
    duration: item.duration,
    pos: item.pos,
  })) ?? [];

  return (
    <div className="drems-page">
      {/* Hero Section */}
      <section ref={heroRef} className="drems-hero">
        <div className="drems-hero-bg">
          <div className="drems-hero-grid" />
          <div className="drems-hero-orb drems-orb-1" />
          <div className="drems-hero-orb drems-orb-2" />
          <div className="drems-hero-orb drems-orb-3" />
          <div className="drems-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="drems-particle" />
            ))}
          </div>
        </div>

        <div className="drems-container">
          <div className="drems-hero-wrapper">
            <div className="drems-hero-content">
              {/* Floating Elements */}
              <div className="drems-floating-elements">
                {floatingIcons.map(({ Icon, delay, duration, pos }, idx) => (
                  <div
                    key={idx}
                    className="drems-float-icon"
                    style={{ ...pos, animationDelay: delay, animationDuration: duration }}
                  >
                    <Icon size={24} />
                  </div>
                ))}
              </div>

              <div className="drems-hero-badge">
                <span className="drems-hero-dot" />
                <Sparkles size={14} />
                Education Reimagined
              </div>

              <h1 className="drems-hero-title">
                DREMS<br />
                Digital Campus
              </h1>

              <p className="drems-hero-description">
                {data.heroDescription ||
                  'The next-generation education management system that connects students, ' +
                  'teachers, parents, and administrators in one seamless digital ecosystem. ' +
                  'Experience real-time collaboration, intelligent analytics, and institutional excellence.'}
              </p>

              <div className="drems-hero-info">
                {data.heroInfo?.map?.((info, idx) => (
                  <div key={idx} className="drems-info-item">
                    <Cpu size={18} /> {/* fallback icon */}
                    <span>{info}</span>
                  </div>
                )) || (
                  <>
                    <div className="drems-info-item"><Cpu size={18} /><span>AI-Powered Insights</span></div>
                    <div className="drems-info-item"><Lock size={18} /><span>Bank-Grade Security</span></div>
                    <div className="drems-info-item"><Clock size={18} /><span>24/7 Support</span></div>
                  </>
                )}
              </div>

              <div className="drems-hero-cta">
                <a href="#contact" className="drems-btn drems-btn-primary">
                  <Play size={18} />
                  Watch Demo
                </a>
                <a href="#features" className="drems-btn drems-btn-secondary">
                  <Download size={18} />
                  Download App
                </a>
              </div>

              <div className="drems-hero-stats">
                {data.heroStats?.map?.((stat, idx) => (
                  <div key={idx} className="drems-hero-stat">
                    <span className="drems-stat-value">{stat.value}</span>
                    <span className="drems-stat-label">{stat.label}</span>
                  </div>
                )) || <div>No stats available</div>}
              </div>
            </div>

            {/* Interactive Phone Mockup – keep your existing JSX here */}
            <div className="drems-phone-container" ref={phoneRef}>
               <div className="drems-phone-glow" />
              <div className="drems-phone-mockup">
                <div className="drems-phone-notch" />
                <div className="drems-phone-screen">
                  <div className="drems-phone-header">
                    <div className="drems-phone-status">
                      <span>9:41</span>
                      <div className="drems-phone-icons">
                        <span className="drems-signal" />
                        <span className="drems-wifi" />
                        <span className="drems-battery" />
                      </div>
                    </div>
                  </div>
                  <div className="drems-phone-screen-content">
                    <div className="drems-phone-card drems-profile-card">
                      <div className="drems-phone-avatar" />
                      <div className="drems-phone-info">
                        <div className="drems-phone-name">Welcome back, Alex</div>
                        <div className="drems-phone-subtitle">Computer Science • Year 3</div>
                      </div>
                      <div className="drems-phone-badge">Pro</div>
                    </div>
                    
                    <div className="drems-phone-stats">
                      <div className="drems-phone-stat">
                        <span className="drems-stat-num">85%</span>
                        <span className="drems-stat-text">Attendance</span>
                      </div>
                      <div className="drems-phone-stat">
                        <span className="drems-stat-num">3.8</span>
                        <span className="drems-stat-text">GPA</span>
                      </div>
                    </div>

                    <div className="drems-phone-card drems-course-card">
                      <div className="drems-course-icon">
                        <BookOpen size={20} />
                      </div>
                      <div className="drems-course-info">
                        <div className="drems-course-title">Data Structures</div>
                        <div className="drems-course-time">Today, 10:00 AM</div>
                      </div>
                      <div className="drems-course-arrow">→</div>
                    </div>

                    <div className="drems-phone-menu">
                      <div className="drems-menu-item active">
                        <LayoutDashboard size={20} />
                        <span>Home</span>
                      </div>
                      <div className="drems-menu-item">
                        <CalendarCheck size={20} />
                        <span>Schedule</span>
                      </div>
                      <div className="drems-menu-item">
                        <FileText size={20} />
                        <span>Grades</span>
                      </div>
                      <div className="drems-menu-item">
                        <Users size={20} />
                        <span>Profile</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="drems-phone-reflection" />
              </div>
              <div className="drems-phone-float-card drems-float-1">
                <Bell size={16} />
                <span>New Assignment</span>
              </div>
              <div className="drems-phone-float-card drems-float-2">
                <Star size={16} />
                <span>A+ Grade!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Info */}
      <section className="drems-platform">
        <div className="drems-container">
          <div className="drems-platform-grid">
            {data.platformInfo?.map?.((info, idx) => (
              <div key={idx} className="drems-platform-card">
                <Smartphone size={32} /> {/* fallback */}
                <div>
                  <h4>{info.title}</h4>
                  <p>{info.desc}</p>
                </div>
              </div>
            )) || (
              <>
                <div className="drems-platform-card">
                  <Smartphone size={32} />
                  <div><h4>Platform</h4><p>Android & iOS Native Apps</p></div>
                </div>
                <div className="drems-platform-card">
                  <Globe size={32} />
                  <div><h4>Deployment</h4><p>Cloud & On-Premise</p></div>
                </div>
                <div className="drems-platform-card">
                  <ShieldCheck size={32} />
                  <div><h4>Compliance</h4><p>GDPR & FERPA Ready</p></div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section ref={featuresRef} id="features" className="drems-features-section">
        <div className="drems-container">
          <div className="drems-section-header">
            <span className="drems-section-label">Capabilities</span>
            <h2 className="drems-section-title">Core Features</h2>
            <p className="drems-section-subtitle">
              Tailored solutions for every stakeholder in your institution
            </p>
          </div>

          <div className="drems-features-grid">
            {/* Students */}
            <div className="drems-feature-card drems-student">
              <div className="drems-feature-shine" />
              <div className="drems-feature-header">
                <div className="drems-feature-icon-wrapper">
                  <GraduationCap size={28} />
                </div>
                <h4>For Students</h4>
              </div>
              <ul className="drems-feature-list">
                {data.studentFeatures?.map?.((feature, idx) => (
                  <li key={idx}>
                    <BookOpen size={18} /> {/* fallback */}
                    {feature.text}
                  </li>
                )) || <li>No student features available</li>}
              </ul>
            </div>

            {/* Teachers */}
            <div className="drems-feature-card drems-teacher">
              <div className="drems-feature-shine" />
              <div className="drems-feature-header">
                <div className="drems-feature-icon-wrapper">
                  <BookOpen size={28} />
                </div>
                <h4>For Teachers</h4>
              </div>
              <ul className="drems-feature-list">
                {data.teacherFeatures?.map?.((feature, idx) => (
                  <li key={idx}>
                    <Users size={18} /> {/* fallback */}
                    {feature.text}
                  </li>
                )) || <li>No teacher features available</li>}
              </ul>
            </div>

            {/* Parents */}
            <div className="drems-feature-card drems-parent">
              <div className="drems-feature-shine" />
              <div className="drems-feature-header">
                <div className="drems-feature-icon-wrapper">
                  <Users size={28} />
                </div>
                <h4>For Parents</h4>
              </div>
              <ul className="drems-feature-list">
                {data.parentFeatures?.map?.((feature, idx) => (
                  <li key={idx}>
                    <TrendingUp size={18} /> {/* fallback */}
                    {feature.text}
                  </li>
                )) || <li>No parent features available</li>}
              </ul>
            </div>

            {/* Administration */}
            <div className="drems-feature-card drems-admin">
              <div className="drems-feature-shine" />
              <div className="drems-feature-header">
                <div className="drems-feature-icon-wrapper">
                  <LayoutDashboard size={28} />
                </div>
                <h4>For Administration</h4>
              </div>
              <ul className="drems-feature-list">
                {data.adminFeatures?.map?.((feature, idx) => (
                  <li key={idx}>
                    <BarChart3 size={18} /> {/* fallback */}
                    {feature.text}
                  </li>
                )) || <li>No admin features available</li>}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="drems-benefits">
        <div className="drems-container">
          <div className="drems-section-header">
            <span className="drems-section-label">Advantages</span>
            <h2 className="drems-section-title">Key Benefits</h2>
            <p className="drems-section-subtitle">
              Why institutions choose DREMS
            </p>
          </div>

          <div className="drems-benefits-grid">
            {data.benefits?.map?.((benefit, idx) => (
              <div key={idx} className="drems-benefit-item">
                <div className="drems-benefit-icon">
                  <Smartphone size={28} /> {/* fallback */}
                </div>
                <h4>{benefit.title}</h4>
                <p>{benefit.desc}</p>
              </div>
            )) || <div>No benefits listed</div>}
          </div>
        </div>
      </section>

      {/* Why DREMS Section */}
      <section className="drems-why">
        <div className="drems-container">
          <div className="drems-why-grid">
            <div className="drems-why-content">
              <span className="drems-section-label">Why Choose Us</span>
              <h2 className="drems-section-title">The DREMS Advantage</h2>
              <ul className="drems-why-list">
                {data.WhyAdvantages?.map?.((item, idx) => (
                  <li key={idx}>
                    <CheckCircle2 className="drems-why-check" size={20} />
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.desc}</p>
                    </div>
                  </li>
                )) || (
                  // Fallback if not in JSON yet
                  <div>No advantages available</div>
                )}
              </ul>
            </div>
            <div className="drems-why-visual">
              <div className="drems-dashboard-preview">
                <div className="drems-dashboard-header">
                  <div className="drems-dashboard-avatar" />
                  <div className="drems-dashboard-info">
                    <div className="drems-dashboard-title">Admin Dashboard</div>
                    <div className="drems-dashboard-status">
                      <span className="drems-status-dot" />
                      Live Data
                    </div>
                  </div>
                </div>
                <div className="drems-dashboard-stats">
                  <div className="drems-dstat">
                    <span className="drems-dstat-value">2,847</span>
                    <span className="drems-dstat-label">Students</span>
                  </div>
                  <div className="drems-dstat">
                    <span className="drems-dstat-value">156</span>
                    <span className="drems-dstat-label">Teachers</span>
                  </div>
                  <div className="drems-dstat">
                    <span className="drems-dstat-value">98%</span>
                    <span className="drems-dstat-label">Attendance</span>
                  </div>
                </div>
                <div className="drems-dashboard-chart">
                  <div className="drems-chart-bars">
                    <div className="drems-bar" style={{ height: '60%' }} />
                    <div className="drems-bar" style={{ height: '80%' }} />
                    <div className="drems-bar" style={{ height: '45%' }} />
                    <div className="drems-bar" style={{ height: '90%' }} />
                    <div className="drems-bar" style={{ height: '70%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="drems-testimonials">
        <div className="drems-container">
          <div className="drems-section-header">
            <span className="drems-section-label">Testimonials</span>
            <h2 className="drems-section-title">Client Feedback</h2>
            <p className="drems-section-subtitle">
              What educational leaders say about DREMS
            </p>
          </div>

          <div className="drems-testimonials-grid">
            {data.testimonials?.map?.((testimonial, index) => (
              <div key={index} className="drems-testimonial-card">
                <Quote className="drems-testimonial-quote-icon" size={32} />
                <p className="drems-testimonial-text">{testimonial.quote}</p>
                <div className="drems-testimonial-author">
                  <img src={testimonial.image} alt={testimonial.author} />
                  <div>
                    <div className="drems-testimonial-name">{testimonial.author}</div>
                    <div className="drems-testimonial-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            )) || <div>No testimonials available</div>}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="drems-cta">
        <div className="drems-container">
          <div className="drems-cta-box">
            <div className="drems-cta-glow" />
            <h2 className="drems-cta-title">Ready to Transform Your Institution?</h2>
            <p className="drems-cta-description">
              Join hundreds of schools, colleges, and universities already using DREMS 
              to streamline their educational management.
            </p>
            <div className="drems-cta-buttons">
              <a href="/contact" className="drems-btn drems-btn-primary drems-btn-lg">
                Schedule Demo
                <ArrowRight className="drems-btn-icon" />
              </a>
              <a href="tel:+918123660270" className="drems-btn drems-btn-outline">
                Call: +91 8123660270
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OurProduct;