// src/pages/Home/HomePage.tsx
import React from 'react';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import './HomePage.scss';

// Menu & service data
const menuItems = ["Home", "About Us", "Services", "Pages", "Blog", "Contact"];

const serviceHighlights = [
  {
    title: "Custom Software Engineering",
    text: "Build cloud-ready web and mobile products tailored to your exact workflows and business goals.",
  },
  {
    title: "Managed IT & DevOps",
    text: "Scale reliably with 24/7 monitoring, automation, and secure infrastructure management.",
  },
  {
    title: "Data & AI Solutions",
    text: "Turn raw data into strategic intelligence with analytics platforms and practical AI integrations.",
  },
];

const Home: React.FC = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="tagline">BEST IT COMPANY</p>
          <h1>Best IT Solution Agency For Your Business</h1>
          <p className="subtitle">
            We design, build, and scale digital products for startups and enterprises with agile delivery and measurable impact.
          </p>
          <button className="btn-primary">Let's Talk With Us</button>
        </div>
        <div className="slider-dots">
          <span></span>
          <span></span>
          <span className="active"></span>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-heading">
            <p>WHAT WE OFFER</p>
            <h2>Software Services Built For Growth</h2>
          </div>

          <div className="services-grid">
            {serviceHighlights.map((service) => (
              <article className="service-card" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a href="#" className="learn-more">
                  Learn More →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section – Added at the end */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-grid">
            {/* Left: Text & Contact Info */}
            <div className="cta-content">
              <h2 className="cta-title">
                Ready to Transform Your Business?
              </h2>
              <p className="cta-desc">
                Let's discuss how our IT solutions can help you achieve your goals. 
                Get a free consultation with our experts today.
              </p>

              <div className="cta-contact">
                <div className="contact-item">
                  <div className="contact-icon">
                    <Mail size={20} />
                  </div>
                  <span>contact@magnax.com</span>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <Phone size={20} />
                  </div>
                  <span>+91 98765 43210</span>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <MapPin size={20} />
                  </div>
                  <span>Bangalore, Karnataka, India</span>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="cta-form-container">
              <h3 className="form-title">
                Get a Free Consultation
              </h3>

              <form className="cta-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      placeholder="John"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Company</label>
                  <input
                    type="text"
                    placeholder="Your Company"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="form-textarea"
                  />
                </div>

                <button type="submit" className="submit-btn">
                  Send Message
                  <ArrowRight size={20} className="btn-arrow" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;