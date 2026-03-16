import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  Building2, 
  Target, 
  Users, 
  Briefcase, 
  Sparkles,
  Globe,
  Award,
  TrendingUp,
  Shield,
  Zap,
  Star,
  Trophy,
} from 'lucide-react';
import './Company.scss';

gsap.registerPlugin(ScrollTrigger);



const leaders = [
  { name: 'John Smith', role: 'CEO & Founder', image: '/images/team/john.jpg' },
  { name: 'Sarah Johnson', role: 'CTO', image: '/images/team/sarah.jpg' },
  { name: 'Michael Chen', role: 'COO', image: '/images/team/michael.jpg' },
  { name: 'Emily Davis', role: 'VP Engineering', image: '/images/team/emily.jpg' },
];
const floatingIcons = [
  { Icon: Globe, delay: '0s', duration: '6s', pos: { top: '10%', left: '5%' } },
  { Icon: Award, delay: '1s', duration: '8s', pos: { top: '20%', right: '10%' } },
  { Icon: Building2, delay: '2s', duration: '7s', pos: { bottom: '30%', left: '8%' } },
  { Icon: Star, delay: '0.5s', duration: '9s', pos: { bottom: '20%', right: '5%' } },
  { Icon: Zap, delay: '1.5s', duration: '6s', pos: { top: '60%', left: '3%' } },
  { Icon: Sparkles, delay: '2.5s', duration: '8s', pos: { top: '40%', right: '8%' } }
];

export function Company() {
  const heroRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero content animation
      gsap.fromTo(
        '.company-hero-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      // Floating icons
      gsap.to('.company-float-icon', {
        y: -30,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.2,
          from: 'random'
        }
      });

      // Timeline animation
      gsap.fromTo(
        '.company-timeline-item',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          delay: 0.8,
          ease: 'power3.out'
        }
      );

      // Stats counter animation
      gsap.fromTo(
        '.company-hero-stat',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.6,
          ease: 'back.out(1.7)'
        }
      );

      // Section animations
      gsap.fromTo(
        '.company-section',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.company-main',
            start: 'top 80%',
          },
        }
      );

      // Timeline scroll animation
      gsap.to('.company-timeline-progress', {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true
        }
      });
    });

    return () => ctx.revert();
  }, []);


  return (
    <div className="company-page">
      {/* Hero - Unique Timeline/Story Design */}
      <section ref={heroRef} className="company-hero">
        <div className="company-hero-bg">
          <div className="company-hero-grid" />
          <div className="company-hero-orb company-orb-1" />
          <div className="company-hero-orb company-orb-2" />
          <div className="company-hero-orb company-orb-3" />
          <div className="company-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="company-particle" />
            ))}
          </div>
          {/* <div className="company-scan-line" /> */}
        </div>
        
        <div className="company-container">
          <div className="company-hero-wrapper">
            <div className="company-hero-content">
              {/* Floating Elements */}
              <div className="company-floating-elements">
                {floatingIcons.map(({ Icon, delay, duration, pos }, idx) => (
                  <div 
                    key={idx} 
                    className="company-float-icon"
                    style={{ 
                      ...pos,
                      animationDelay: delay,
                      animationDuration: duration
                    }}
                  >
                    <Icon size={24} />
                  </div>
                ))}
              </div>

              <div className="company-hero-badge">
                <span className="company-hero-dot" />
                <Sparkles size={14} />
                Since 2022
              </div>
              
              <h1 className="company-hero-title">
                Building the<br />
                <span className="company-gradient-text">Future Together</span>
              </h1>
              
              <p className="company-hero-description">
                Magnax is a leading technology solutions provider dedicated to delivering 
                innovative software development, IT consulting, and digital transformation 
                services to businesses worldwide for over 3 years.
              </p>

              {/* <div className="company-hero-info">
                <div className="company-info-item">
                  <Shield size={18} />
                  <span>ISO 27001 Certified</span>
                </div>
                <div className="company-info-item">
                  <Award size={18} />
                  <span>CMMI Level 3</span>
                </div>
                <div className="company-info-item">
                  <Globe size={18} />
                  <span>Global Presence</span>
                </div>
              </div> */}
              
              {/* Hero Stats */}
              {/* <div className="company-hero-stats">
                {stats.map((stat, idx) => (
                  <div key={idx} className="company-hero-stat">
                    <span className="company-stat-value">{stat.value}</span>
                    <span className="company-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div> */}
            </div>

            {/* Interactive Timeline */}
            {/* <div className="company-timeline-container" ref={timelineRef}> */}
              {/* <div className="company-timeline-header">
                <Clock size={20} />
                <span>Our Journey</span>
              </div>
              <div className="company-timeline">
                <div className="company-timeline-line" />
                <div className="company-timeline-progress" />
                {milestones.map((milestone, index) => (
                  <div 
                    key={index} 
                    className={`company-timeline-item ${index <= 2 ? 'active' : ''}`}
                  >
                    <div className="company-timeline-dot" />
                    <div className="company-timeline-content">
                      <span className="company-timeline-year">{milestone.year}</span>
                      <h4 className="company-timeline-title">{milestone.title}</h4>
                      <p className="company-timeline-desc">{milestone.desc}</p>
                    </div>
                  </div>
                ))}
              </div> */}
              {/* <div className="company-timeline-nav">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id, index)}
                    className={`company-timeline-node ${activeSection === index ? 'active' : ''}`}
                    title={section.label}
                  >
                    <section.icon size={16} />
                  </button>
                ))}
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="company-main">
        {/* About Company */}
        <section id="about-company" className="company-section">
          <div className="company-container">
            <div className="company-section-header">
              <span className="company-section-label">Who We Are</span>
              <div className="company-section-title-wrap">
                <Building2 className="company-section-icon" size={32} />
                <h2>About Company</h2>
              </div>
            </div>
         

  {/* Row 1 */}
  <div className="company-about-row">
    
    <div className="company-about-text">
      <p className="company-lead-text">
        Magnax was established in 2022 and has become a trusted developer of modern software solutions 
        by creating and partnering with business processes to innovate, grow, and succeed in the digital era.
      </p>

      <p>
        At the center of our modeling capabilities is the ability to convert ideas into future-proofing technologies and
         solutions. Working in concert with those companies who want to expand rapidly or assist organisations grow 
         their existing medium and large scale businesses. We engage in a mutually beneficial relationship by 
        listening and collaborating with clients closely to provide solutions that will have a measurable impact.
      </p>
    </div>

    <div className="company-about-image">
      <img src="/images/about1.png" alt="Magnax team working" />
    </div>

  </div>


  {/* Row 2 */}
  <div className="company-about-row reverse">

    <div className="company-about-image">
      <img src="/images/about2.png" alt="Magnax technology solutions" />
    </div>

    <div className="company-about-text">
      <p>
        We think that technology ought to be instinctive to use, as well as able to solve a 
        lot of very difficult problems. We use creativity and experience, along with an intelligent 
        approach to problem-solving, in our strategies,
         so that we can create reliable software systems that allow you to expand your business.
      </p>

      <p>
        Each solution we develop exhibits a fusion of experience, inventiveness, and curiosity.
         By taking away the complexity and experimenting with different methods of addressing issues, 
         we can provide results to our clients 
        that regularly satisfy and, many times, exceed their expectations.
      </p>
    </div>

  </div>

</div>

        </section>

        {/* Mission */}
        <section id="mission" className="company-section company-section-alt">
          <div className="company-container">
            <div className="company-section-header">
              <span className="company-section-label">Purpose</span>
              <div className="company-section-title-wrap">
                <Target className="company-section-icon" size={32} />
                <h2>Our Mission</h2>
              </div>
            </div>
            <div className="company-mission-content">
              <div className="company-mission-statement">
                <div className="company-quote-icon">
                  <Sparkles size={32} />
                </div>
                <blockquote>
                  "To offer innovative tech solutions to help companies be more productive, 
                  simplified processes, and make digital transformation go faster."
                </blockquote>
                <div className="company-mission-author">— Magnax Leadership</div>
              </div>
              <div className="company-mission-grid">
                <div className="company-mission-item">
                  <div className="company-mission-icon">
                    <Globe size={28} />
                  </div>
                  <h3>Vision</h3>
                  <p>To establish ourself as a leading global technology brand that develops innovative and reliable products,
                     so digital solutions can provide maximum value.</p>
                </div>
                <div className="company-mission-item">
                  <div className="company-mission-icon">
                    <Star size={28} />
                  </div>
                  <h3>Values</h3>
                  <p>Every decision at Magnax is determined by our core values of Integrity, Excellence, Innovation,
                     Collaboration, and Client Success. These values
                     define our company culture and the way we relate to our clients and partners.</p>
                </div>
                <div className="company-mission-item">
                  <div className="company-mission-icon">
                    <Shield size={28} />
                  </div>
                  <h3>Commitment</h3>
                  <p>Delivering solutions that exceed expectations and create sustainable 
                    value for clients is at the heart of what we do. 
                    We believe that our people are our most valuable asset. </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section id="leadership" className="company-section">
          <div className="company-container">
            <div className="company-section-header">
              <span className="company-section-label">Leadership</span>
              <div className="company-section-title-wrap">
                <Users className="company-section-icon" size={32} />
                <h2>Executive Team</h2>
              </div>
            </div>
            <div className="company-leadership-grid">
              {leaders.map((leader, idx) => (
                <div key={idx} className="company-leader-card">
                  <div className="company-leader-glow" />
                  <div className="company-leader-image">
                    <img src={leader.image} alt={leader.name} />
                    <div className="company-leader-overlay" />
                  </div>
                  <div className="company-leader-info">
                    <h3>{leader.name}</h3>
                    <p>{leader.role}</p>
                  </div>
                  <div className="company-leader-shine" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section id="our-team" className="company-section company-section-alt">
          <div className="company-container">
            <div className="company-section-header">
              <span className="company-section-label">People</span>
              <div className="company-section-title-wrap">
                <Briefcase className="company-section-icon" size={32} />
                <h2>Our Team</h2>
              </div>
            </div>
            <div className="company-team-content">
              <p className="company-team-intro">
               Our value comes not only from our skills in development, design, project management, and consulting 
               (we have over 50 professionals with diverse backgrounds) 
               but also from our ability to collaborate and share knowledge with others.
              </p>
              <div className="company-team-stats">
                <div className="company-team-stat">
                  <div className="company-team-icon">
                    <TrendingUp size={32} />
                  </div>
                  <span>50%</span>
                  <p>Senior Engineers</p>
                </div>
                <div className="company-team-stat">
                  <div className="company-team-icon">
                    <Award size={32} />
                  </div>
                  <span>40+</span>
                  <p>Certified Professionals</p>
                </div>
                <div className="company-team-stat">
                  <div className="company-team-icon">
                    <Trophy/>
                  </div>
                  <span>100+</span>
                  <p>Successful Projects</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio */}
        {/* <section id="portfolio" className="company-section">
          <div className="company-container">
            <div className="company-section-header">
              <span className="company-section-label">Work</span>
              <div className="company-section-title-wrap">
                <Briefcase className="company-section-icon" size={32} />
                <h2>Portfolio</h2>
              </div>
            </div>
            <div className="company-portfolio-grid">
              <div className="company-portfolio-card">
                <span className="company-portfolio-industry">Banking</span>
                <h3>Riyadh Bank</h3>
                <p>Digital banking platform transformation with modern UI/UX</p>
                <div className="company-portfolio-arrow">
                  <ArrowRight size={20} />
                </div>
              </div>
              <div className="company-portfolio-card">
                <span className="company-portfolio-industry">Healthcare</span>
                <h3>Banfield Pet Hospital</h3>
                <p>Comprehensive healthcare management system</p>
                <div className="company-portfolio-arrow">
                  <ArrowRight size={20} />
                </div>
              </div>
              <div className="company-portfolio-card">
                <span className="company-portfolio-industry">Fintech</span>
                <h3>Western Union</h3>
                <p>Money transfer platform enhancement</p>
                <div className="company-portfolio-arrow">
                  <ArrowRight size={20} />
                </div>
              </div>
              <div className="company-portfolio-card">
                <span className="company-portfolio-industry">Gaming</span>
                <h3>KBombay</h3>
                <p>Mobile gaming application with real-time features</p>
                <div className="company-portfolio-arrow">
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Partners */}
        {/* <section id="partners" className="company-section company-section-alt">
          <div className="company-container">
            <div className="company-section-header">
              <span className="company-section-label">Ecosystem</span>
              <div className="company-section-title-wrap">
                <Handshake className="company-section-icon" size={32} />
                <h2>Partners</h2>
              </div>
            </div>
            <div className="company-partners-content">
              <p className="company-partners-intro">
                We partner with leading technology providers to deliver best-in-class 
                solutions to our clients.
              </p>
              <div className="company-partners-logos">
                <div className="company-partner-logo">
                  <span>AWS</span>
                  <small>Advanced Partner</small>
                </div>
                <div className="company-partner-logo">
                  <span>Microsoft</span>
                  <small>Gold Partner</small>
                </div>
                <div className="company-partner-logo">
                  <span>Google</span>
                  <small>Cloud Partner</small>
                </div>
                <div className="company-partner-logo">
                  <span>Oracle</span>
                  <small>Partner</small>
                </div>
                <div className="company-partner-logo">
                  <span>Salesforce</span>
                  <small>Partner</small>
                </div>
                <div className="company-partner-logo">
                  <span>SAP</span>
                  <small>Partner</small>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Locations */}
        {/* <section id="locations" className="company-section">
          <div className="company-container">
            <div className="company-section-header">
              <span className="company-section-label">Global</span>
              <div className="company-section-title-wrap">
                <MapPin className="company-section-icon" size={32} />
                <h2>Locations</h2>
              </div>
            </div>
            <div className="company-locations-grid">
              <div className="company-location-card company-location-headquarters">
                <div className="company-location-badge">HQ</div>
                <div className="company-location-icon">
                  <MapPin size={24} />
                </div>
                <h3>United States</h3>
                <p>Dallas, Texas</p>
                <span>Headquarters</span>
              </div>
              <div className="company-location-card">
                <div className="company-location-icon">
                  <Globe size={24} />
                </div>
                <h3>United Kingdom</h3>
                <p>London</p>
                <span>EMEA Office</span>
              </div>
              <div className="company-location-card">
                <div className="company-location-icon">
                  <Building2 size={24} />
                </div>
                <h3>India</h3>
                <p>Bangalore, Hyderabad</p>
                <span>Development Centers</span>
              </div>
              <div className="company-location-card">
                <div className="company-location-icon">
                  <Handshake size={24} />
                </div>
                <h3>UAE</h3>
                <p>Dubai</p>
                <span>MENA Office</span>
              </div>
            </div>
          </div>
        </section> */}
      </main>

      {/* CTA */}
      <section className="company-cta">
        <div className="company-container">
          <div className="company-cta-box">
            <div className="company-cta-glow" />
            <h2 className="company-cta-title">Ready to Partner With Us?</h2>
            <p className="company-cta-description">Get in touch to discuss how we can help transform your business.</p>
            <a href="/contact" className="company-btn company-btn-primary company-btn-lg">
              Contact Us
              <ArrowRight className="company-btn-icon" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Company;