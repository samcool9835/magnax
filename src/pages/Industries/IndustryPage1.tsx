// src/pages/IndustryPage1.tsx

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  ArrowRight,
  Landmark,
  HeartPulse,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

import { getIndustryPageData } from '../../service/api/pages/industry';
import type { IndustryPageData} from '../../types';

import './IndustryPage.scss';

gsap.registerPlugin(ScrollTrigger);

export function IndustryPage1() {
  const [data, setData] = useState<IndustryPageData | null>(null);
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
        const pageData = await getIndustryPageData();
        if (mounted) {
          setData(pageData);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to load industry data');
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
        '.industry-hero-content',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.industry-section',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.industry-main',
            start: 'top 80%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [data, loading]);

  if (loading) return <div className="industry-page loading">Loading industries...</div>;
  if (error) return <div className="industry-page error">Error: {error}</div>;
  if (!data) return <div className="industry-page">No industry data available</div>;

  // ─── Icon mapping ─────────────────────────────────────────────────────
  const industryIconMap = {
    Landmark,
    HeartPulse,
  } as const;

  const getIndustryIcon = (iconName: string) => {
    const IconComponent = industryIconMap[iconName as keyof typeof industryIconMap];
    return IconComponent ? <IconComponent size={32} /> : <Landmark size={32} />;
  };

  return (
    <div className="industry-page">
      {/* Hero Section */}
      <section ref={heroRef} className="industry-hero">
        <div className="industry-hero-bg">
          <div className="industry-hero-grid" />
          <div className="industry-hero-orb industry-orb-1" />
          <div className="industry-hero-orb industry-orb-2" />
        </div>

        <div className="industry-container">
          <div className="industry-hero-content">
            <div className="industry-hero-badge">
              <Sparkles size={14} />
              Industries We Serve
            </div>

            <h1 className="industry-hero-title">
              {data.heroTitle || 'Fintech & Healthcare'}
            </h1>

            <p className="industry-hero-description">
              {data.heroDescription ||
                'Delivering secure, innovative technology solutions for financial services and healthcare organizations worldwide.'}
            </p>
          </div>
        </div>
      </section>

      {/* Industries Content */}
      <main className="industry-main">
        <div className="industry-container">
          {data.industries?.map?.((industry) => (
            <section key={industry.id} className="industry-section">
              <div className="industry-content-grid">
                <div className="industry-image-wrapper">
                  <img src={industry.image} alt={industry.title} />
                  <div className="industry-image-overlay" />
                  <div className="industry-image-icon">
                    {getIndustryIcon(industry.icon)}
                  </div>
                </div>
                <div className="industry-content">
                  <div className="industry-label">Industry</div>
                  <h2 className="industry-title">{industry.title}</h2>
                  <p className="industry-description">{industry.description}</p>
                  <div className="industry-features">
                    <h4>What We Support:</h4>
                    <ul>
                      {industry.features?.map?.((feature, idx) => (
                        <li key={idx}>
                          <CheckCircle2 size={18} />
                          <span>{feature}</span>
                        </li>
                      )) || <li>No features listed</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )) || <div>No industries available</div>}
        </div>
      </main>

      {/* CTA Section */}
      <section className="industry-cta">
        <div className="industry-container">
          <div className="industry-cta-box">
            <div className="industry-cta-glow" />
            <h2 className="industry-cta-title">Ready to Transform Your Industry?</h2>
            <p className="industry-cta-description">
              {data.ctaDescription ||
                "Let's discuss how our technology solutions can help your business grow and succeed."}
            </p>
            <a href="/contact" className="industry-btn industry-btn-primary industry-btn-lg">
              Contact Us
              <ArrowRight className="industry-btn-icon" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default IndustryPage1;