import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollReveal } from '../../animations/scrollReveal';
import { ArrowRight, Calendar, CheckCircle, Award } from 'lucide-react';
import './About.scss';

gsap.registerPlugin(ScrollTrigger);

const infoCards = [
  {
    icon: Calendar,
    number: '10+',
    label: 'Years',
    sublabel: 'Of Experience',
  },
  {
    icon: CheckCircle,
    number: '500+',
    label: 'Projects',
    sublabel: 'Delivered',
  },
  {
    icon: Award,
    number: '98%',
    label: 'Satisfaction',
    sublabel: 'Client Rate',
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax on scroll
      gsap.to(imageRef.current, {
        y: -50,
        rotateY: 3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about"
    >
      <div className="about-container">
        <div className="about-grid">
          {/* Image */}
          <div className="about-image-wrapper">
            <div
              ref={imageRef}
              className="about-image-container"
            >
              <ScrollReveal animation="slideLeft">
                <div className="about-image-box">
                  <img
                    src="/images/about-image.jpg"
                    alt="Our team at work"
                    className="about-image"
                  />
                </div>
              </ScrollReveal>

              {/* Decorative elements */}
              <div className="about-decor about-decor-1" />
              <div className="about-decor about-decor-2" />
            </div>
          </div>

          {/* Content */}
          <div className="about-content">
            <ScrollReveal animation="fadeUp">
              <span className="about-subtitle">// ABOUT US //</span>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp" delay={0.1}>
              <h2 className="about-title">
                Innovative IT Solutions for Your Business
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp" delay={0.2}>
              <p className="about-text about-text-lg">
                With over a decade of experience, we deliver tailored technology 
                solutions that empower businesses to thrive in the digital age. 
                Our expert team combines innovation with reliability to help you 
                achieve your goals.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp" delay={0.3}>
              <p className="about-text">
                We specialize in cloud solutions, cybersecurity, data analytics, 
                and custom software development. Our approach is collaborative, 
                transparent, and focused on delivering measurable results for your business.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp" delay={0.4}>
              <a
                href="#services"
                className="about-link"
              >
                Explore Our Services
                <ArrowRight className="about-link-icon" />
              </a>
            </ScrollReveal>

            {/* Info Cards */}
            {/* <div className="about-cards">
              {infoCards.map((card, index) => (
                <ScrollReveal
                  key={index}
                  animation="fadeUp"
                  delay={0.5 + index * 0.1}
                >
                  <div className="about-card">
                    <card.icon className="about-card-icon" />
                    <div className="about-card-number">
                      {card.number}
                    </div>
                    <div className="about-card-label">
                      {card.label}
                    </div>
                    <div className="about-card-sublabel">{card.sublabel}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;