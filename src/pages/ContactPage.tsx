// src/components/Contact/Contact.tsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

import './ContactPage.scss';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (patternRef.current) {
        gsap.to(patternRef.current, {
          x: -30,
          duration: 25,
          ease: 'none',
          repeat: -1,
          yoyo: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="cta" ref={sectionRef} className="contact-section">
      {/* Background Pattern */}
      <div ref={patternRef} className="contact-pattern">
        <div className="contact-overlay" />
      </div>

      <div className="contact-container">
        <div className="contact-grid">
          {/* Left: Text + Contact Info */}
          <div className="contact-content">
            <h2 className="contact-title">
              Ready to Transform Your Business?
            </h2>
            <p className="contact-desc">
              Let's discuss how our IT solutions can help you achieve your goals.
              Get a free consultation with our experts today.
            </p>

            <div className="contact-info">
              <div className="info-item">
                <div className="info-icon">
                  <Mail />
                </div>
                <span>contact@magnax.com</span>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Phone />
                </div>
                <span>+91 98765 43210</span>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <MapPin />
                </div>
                <span>Bangalore, Karnataka, India</span>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-wrapper">
            <h3 className="form-heading">
              Get a Free Consultation
            </h3>

            <form className="contact-form">
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    className="form-control"
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="form-control"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Company</label>
                <input
                  type="text"
                  placeholder="Your Company"
                  className="form-control"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="form-textarea"
                />
              </div>

              <button type="submit" className="submit-button">
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;