// src/components/Footer/Footer.tsx
import React from 'react';
import { ScrollReveal } from '../animations/scrollReveal';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  ArrowUp,
  Mail
} from 'lucide-react';
import './Footer.scss';

const quickLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About Us', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'Contact', href: '#cta' },
];

const services = [
  { name: 'Cloud Solutions', href: '#services' },
  { name: 'Cybersecurity', href: '#services' },
  { name: 'Data Analytics', href: '#services' },
  { name: 'Software Development', href: '#services' },
  { name: 'IT Consulting', href: '#services' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Column */}
          <ScrollReveal animation="fadeUp">
            <div className="brand-column">
              <a href="#hero" className="logo-link">
                <div className="logo-icon">
                  <span>M</span>
                </div>
                <span className="logo-text">Magnax</span>
              </a>
              <p className="brand-desc">
                Transforming businesses through innovative IT solutions. 
                Your trusted partner for digital transformation.
              </p>
              {/* Social Links */}
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="social-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="social-icon-svg" />
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal animation="fadeUp" delay={0.1}>
            <div className="link-column">
              <h4 className="column-title">Quick Links</h4>
              <ul className="link-list">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="link-item"
                    >
                      <span className="link-hover-bar" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Services */}
          <ScrollReveal animation="fadeUp" delay={0.2}>
            <div className="link-column">
              <h4 className="column-title">Services</h4>
              <ul className="link-list">
                {services.map((service, index) => (
                  <li key={index}>
                    <a
                      href={service.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(service.href);
                      }}
                      className="link-item"
                    >
                      <span className="link-hover-bar" />
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Newsletter */}
          <ScrollReveal animation="fadeUp" delay={0.3}>
            <div className="newsletter-column">
              <h4 className="column-title">Newsletter</h4>
              <p className="newsletter-desc">
                Subscribe to get the latest news and updates.
              </p>
              <form className="newsletter-form">
                <div className="input-wrapper">
                  <Mail className="input-icon" />
                  <input
                    type="email"
                    placeholder="Your email"
                    className="newsletter-input"
                  />
                </div>
                <button type="submit" className="subscribe-btn">
                  Subscribe
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="bottom-container">
          <p className="copyright">
            © {new Date().getFullYear()} Magnax. All rights reserved.
          </p>
          <div className="bottom-links">
            <a href="#" className="bottom-link">Privacy Policy</a>
            <a href="#" className="bottom-link">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="scroll-to-top"
        aria-label="Scroll to top"
      >
        <ArrowUp className="arrow-up-icon" />
      </button>
    </footer>
  );
}

export default Footer;