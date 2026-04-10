import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';

import './ContactPage.scss';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: ''
  });

  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors: any = {};

    if (formData.firstName.trim().length < 3) {
      newErrors.firstName = "Minimum 3 characters";
    }

    if (formData.lastName.trim().length < 3) {
      newErrors.lastName = "Minimum 3 characters";
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      formData,
      'YOUR_PUBLIC_KEY'
    )
    .then(() => {
      setSuccess(true);
      setLoading(false);

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        message: ''
      });

      setTimeout(() => setSuccess(false), 3000);
    })
    .catch((error) => {
      console.log("FULL ERROR:", error);
      setErrorMsg("Failed to send message. Try again.");
      setLoading(false);

      setTimeout(() => setErrorMsg(''), 3000);
    });
  };

  return (
    <section id="cta" ref={sectionRef} className="contact-section">
      
      <div ref={patternRef} className="contact-pattern">
        <div className="contact-overlay" />
      </div>

      <div className="contact-container">
        <div className="contact-grid">

          {/* LEFT */}
          <div className="contact-content">
            <h2 className="contact-title">
              Ready to Transform Your Business?
            </h2>

            <p className="contact-desc">
              Let's discuss how our IT solutions can help you achieve your goals.
            </p>

            <div className="contact-info">
              <div className="info-item">
                <div className="info-icon"><Mail /></div>
                <span>contact@magnax.com</span>
              </div>

              <div className="info-item">
                <div className="info-icon"><Phone /></div>
                <span>+91 8123660270</span>
              </div>

              <div className="info-item">
                <div className="info-icon"><MapPin /></div>
                <span>Bangalore, India</span>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="contact-form-wrapper">
            <h3 className="form-heading">Get a Free Consultation</h3>

            <form className="contact-form" onSubmit={handleSubmit}>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">First Name</label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`form-control ${errors.firstName ? 'error' : ''}`}
                  />
                  {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                </div>

                <div className="form-field">
                  <label className="form-label">Last Name</label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`form-control ${errors.lastName ? 'error' : ''}`}
                  />
                  {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-control ${errors.email ? 'error' : ''}`}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-field">
                <label className="form-label">Company</label>
                <input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`form-control ${errors.company ? 'error' : ''}`}
                />
                {errors.company && <span className="error-text">{errors.company}</span>}
              </div>

              <div className="form-field">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`form-textarea ${errors.message ? 'error' : ''}`}
                />
                {errors.message && <span className="error-text">{errors.message}</span>}
              </div>

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? "Sending..." : "Send Message →"}
              </button>

            </form>
          </div>
        </div>
      </div>

      {/* SUCCESS */}
      {success && (
        <div className="success-toast">
          ✅ Message sent successfully!
        </div>
      )}

      {/* ERROR */}
      {errorMsg && (
        <div className="error-toast">
          ❌ {errorMsg}
        </div>
      )}

    </section>
  );
}

export default Contact;