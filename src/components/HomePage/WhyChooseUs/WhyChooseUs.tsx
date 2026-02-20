// src/components/WhyChooseUs/WhyChooseUs.tsx
import React, { useEffect, useRef, useState } from 'react';
import { ScrollReveal } from '../../animations/scrollReveal';
import { Check, Users, Trophy, Clock } from 'lucide-react';
import './WhyChooseUs.scss';

const features = [
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Certified professionals with extensive industry experience.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock assistance for your business needs.',
  },
  {
    icon: Trophy,
    title: 'Proven Results',
    description: 'Track record of successful implementations.',
  },
  {
    icon: Check,
    title: 'Custom Solutions',
    description: 'Tailored to your specific business requirements.',
  },
];

const stats = [
  { number: 150, suffix: '+', label: 'Expert Team Members' },
  { number: 50, suffix: '+', label: 'Industry Awards' },
  { number: 24, suffix: '/7', label: 'Support Available' },
];

function Counter({ end, suffix, isInView }: { end: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(end * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, isInView]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="why-choose-us">
      <div className="why-container">
        <div className="why-grid">
          {/* Left: Features */}
          <div className="features-column">
            <ScrollReveal animation="fadeUp">
              <span className="section-subtitle">// WHY CHOOSE US //</span>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp" delay={0.1}>
              <h2 className="section-title">What Makes Us Different</h2>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp" delay={0.2}>
              <p className="why-desc">
                We combine technical expertise with a customer-first approach to 
                deliver solutions that truly make a difference for your business.
              </p>
            </ScrollReveal>

            <div className="features-grid">
              {features.map((feature, index) => (
                <ScrollReveal
                  key={index}
                  animation="slideLeft"
                  delay={0.3 + index * 0.1}
                >
                  <div className="feature-item">
                    <div className="feature-icon">
                      <feature.icon />
                    </div>
                    <div className="feature-text">
                      <h4>{feature.title}</h4>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right: Stats */}
          <div ref={sectionRef} className="stats-column">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <ScrollReveal
                  key={index}
                  animation="scale"
                  delay={0.4 + index * 0.1}
                >
                  <div className="stat-card">
                    <div className="stat-number">
                      <Counter end={stat.number} suffix={stat.suffix} isInView={isInView} />
                    </div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Decorative elements */}
            <div className="decor-circle top-right" />
            <div className="decor-circle bottom-left" />
          </div>
        </div>
      </div>
    </section>
  );
}