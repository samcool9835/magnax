// src/components/Services/Services.tsx
import { ScrollReveal } from '../../animations/scrollReveal';
import { 
  Cloud, 
  Shield, 
  BarChart3, 
  Code2, 
  MessageSquare, 
  Headphones,
  ArrowRight 
} from 'lucide-react';
import './Services.scss';

const services = [
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and migration services to modernize your business operations.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Enterprise-grade security solutions and consulting to protect your digital assets.',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics',
    description: 'Transform data into actionable business insights with our advanced analytics solutions.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Code2,
    title: 'Software Development',
    description: 'Custom applications built specifically for your business needs and requirements.',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: MessageSquare,
    title: 'IT Consulting',
    description: 'Strategic technology planning and guidance to help you make informed decisions.',
    color: 'from-pink-500 to-pink-600',
  },
  {
    icon: Headphones,
    title: 'Managed Services',
    description: '24/7 monitoring and support for your systems to ensure maximum uptime.',
    color: 'from-cyan-500 to-cyan-600',
  },
];

export function Services() {
  return (
    <section id="services" className="services-section">
      <div className="services-container">
        {/* Header */}
        <div className="section-header">
          <ScrollReveal animation="fadeUp">
            <span className="section-subtitle">// OUR SERVICES //</span>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={0.1}>
            <h2 className="section-title mt-4">Solutions We Provide</h2>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={0.2}>
            <p className="section-desc">
              Comprehensive IT services tailored to meet your business needs and drive growth.
            </p>
          </ScrollReveal>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service, index) => (
            <ScrollReveal
              key={index}
              animation="scale"
              delay={0.2 + index * 0.1}
            >
              <div className="service-card">
                <div className="card-inner">
                  {/* Icon */}
                  <div className="service-icon-wrapper">
                    <service.icon className="service-icon" />
                  </div>

                  {/* Content */}
                  <h3 className="service-title">
                    {service.title}
                  </h3>
                  <p className="service-desc">
                    {service.description}
                  </p>

                  {/* Link */}
                  <div className="service-link">
                    <span>Learn More</span>
                    <ArrowRight className="link-icon" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}