// src/components/Process/Process.tsx
import { ScrollReveal } from '../../animations/scrollReveal';
import { Search, Lightbulb, Rocket, HeartHandshake } from 'lucide-react';
import './Process.scss';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Discovery',
    description: 'Understanding your business needs, goals, and challenges through in-depth consultation.',
  },
  {
    icon: Lightbulb,
    number: '02',
    title: 'Strategy',
    description: 'Developing a tailored solution roadmap aligned with your objectives and budget.',
  },
  {
    icon: Rocket,
    number: '03',
    title: 'Implementation',
    description: 'Executing with precision and expertise, ensuring smooth deployment and integration.',
  },
  {
    icon: HeartHandshake,
    number: '04',
    title: 'Support',
    description: 'Ongoing maintenance, optimization, and support to ensure long-term success.',
  },
];

export function Process() {
  return (
    <section id="process" className="process-section">
      <div className="process-container">
        {/* Header */}
        <div className="section-header">
          <ScrollReveal animation="fadeUp">
            <span className="section-subtitle">// OUR PROCESS //</span>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={0.1}>
            <h2 className="section-title">How We Work</h2>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={0.2}>
            <p className="section-desc">
              Our proven methodology ensures successful project delivery every time.
            </p>
          </ScrollReveal>
        </div>

        {/* Steps */}
        <div className="process-steps">
          {/* Connecting Line - Desktop */}
          <div className="process-line" />

          <div className="steps-grid">
            {steps.map((step, index) => (
              <ScrollReveal
                key={index}
                animation="scale"
                delay={0.2 + index * 0.15}
              >
                <div className="step-card">
                  {/* Icon */}
                  <div className="step-icon-wrapper">
                    <step.icon className="step-icon" />
                  </div>

                  {/* Number */}
                  <div className="step-number">{step.number}</div>

                  {/* Content */}
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}