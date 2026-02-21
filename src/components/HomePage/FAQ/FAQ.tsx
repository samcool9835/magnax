// src/components/FAQ/FAQ.tsx
import React, { useState } from 'react';
import { ScrollReveal } from '../../animations/scrollReveal';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import './FAQ.scss';

const faqs = [
  {
    question: 'What services does Magnax offer?',
    answer: 'Magnax offers a comprehensive range of IT services including cloud solutions, cybersecurity, data analytics, custom software development, IT consulting, and managed services. We tailor our solutions to meet your specific business needs.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on scope and complexity. A typical project can range from 4-12 weeks. During our initial consultation, we provide a detailed timeline based on your specific requirements.',
  },
  {
    question: 'Do you provide ongoing support?',
    answer: 'Yes, we offer 24/7 support for all our clients. Our support packages include system monitoring, maintenance, troubleshooting, and regular updates to ensure your systems run smoothly.',
  },
  {
    question: 'What industries do you specialize in?',
    answer: 'We work with clients across various industries including healthcare, finance, retail, manufacturing, and technology. Our diverse experience allows us to bring best practices from different sectors to your project.',
  },
  {
    question: 'How do you ensure data security?',
    answer: 'Security is our top priority. We implement industry-standard security protocols, encryption, regular security audits, and compliance with regulations like GDPR and HIPAA. Our team stays updated with the latest security practices.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <div className="faq-grid">
          {/* Left: Header */}
          <div className="faq-header">
            <ScrollReveal animation="fadeUp">
              <span className="section-subtitle">// FAQ //</span>
            </ScrollReveal>
            <ScrollReveal animation="fadeUp" delay={0.1}>
              <h2 className="section-title">Frequently Asked Questions</h2>
            </ScrollReveal>
            <ScrollReveal animation="fadeUp" delay={0.2}>
              <p className="faq-desc">
                Find answers to common questions about our services. Can't find what you're looking for? Feel free to contact us directly.
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fadeUp" delay={0.3}>
              <a href="#cta" className="contact-link">
                Contact Us <ChevronDown className="link-icon" />
              </a>
            </ScrollReveal>
          </div>

          {/* Right: FAQ List */}
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <ScrollReveal key={index} animation="slideRight" delay={0.1 + index * 0.1}>
                <div className={`faq-item ${openIndex === index ? 'open' : ''}`}>
                  <button onClick={() => toggleFAQ(index)} className="faq-question">
                    <span>{faq.question}</span>
                    <div className="faq-toggle">
                      {openIndex === index ? <Minus /> : <Plus />}
                    </div>
                  </button>

                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}