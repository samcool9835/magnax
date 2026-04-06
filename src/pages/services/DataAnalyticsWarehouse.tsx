
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Database, 
  Server, 
  BarChart3, 
  Cloud,
  ArrowRight,
  Quote,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Workflow,
  Search,
  Sparkles,
  Terminal
} from 'lucide-react';
import './DataAnalyticsWarehouse.scss';

gsap.registerPlugin(ScrollTrigger);

// --- Data Configuration ---

const stats = [
  { value: '10PB+', label: 'Data Processed' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '5x', label: 'Faster Insights' },
  { value: '24/7', label: 'Monitoring' }
];

const floatingIcons = [
  { Icon: Database, delay: '0s', duration: '6s', pos: { top: '15%', left: '5%' } },
  { Icon: Cloud, delay: '1s', duration: '8s', pos: { top: '25%', right: '10%' } },
  { Icon: Terminal, delay: '2s', duration: '7s', pos: { bottom: '25%', left: '8%' } },
  { Icon: Cpu, delay: '0.5s', duration: '9s', pos: { bottom: '15%', right: '5%' } },
  { Icon: BarChart3, delay: '1.5s', duration: '6s', pos: { top: '60%', left: '3%' } },
  { Icon: Workflow, delay: '2.5s', duration: '8s', pos: { top: '40%', right: '8%' } }
];

const analyticsFeatures = [
  {
    icon: Search,
    title: 'Predictive Analytics',
    description: 'Leverage machine learning models to forecast trends and customer behavior with high accuracy.',
    description2: 'Transform historical data into actionable future insights using Python and R ecosystems.',
  },
  {
    icon: BarChart3,
    title: 'Real-time Dashboards',
    description: 'Interactive visualizations that update instantly, giving you a live pulse of your business metrics.',
    description2: 'Built with Tableau and PowerBI integration for executive-level decision making.',
  },
  {
    icon: Zap,
    title: 'Automated Reporting',
    description: 'Eliminate manual data gathering with automated pipelines that deliver reports to your inbox.',
    description2: 'Scheduled ETL jobs ensure your stakeholders have the latest data without lifting a finger.',
  },
  {
    icon: ShieldCheck,
    title: 'Data Governance',
    description: 'Ensure compliance and data quality with robust governance frameworks and lineage tracking.',
    description2: 'We implement strict access controls and auditing to keep your sensitive data secure.',
  },
];

const warehousingFeatures = [
  {
    icon: Database,
    title: 'Cloud Data Warehouses',
    description: 'Scalable solutions on Snowflake, BigQuery, and Redshift to handle petabytes of data.',
    description2: 'Pay-as-you-scale architecture that reduces infrastructure costs by up to 40%.',
  },
  {
    icon: Layers,
    title: 'ETL/ELT Pipelines',
    description: 'Robust data integration pipelines that clean, transform, and load data efficiently.',
    description2: 'Using Apache Airflow and dbt for modular, testable, and version-controlled data transformations.',
  },
  {
    icon: Server,
    title: 'Data Lake Architecture',
    description: 'Store structured and unstructured data in centralized lakes for flexible analysis.',
    description2: 'Integration with Delta Lake and Apache Iceberg for ACID transactions on big data.',
  },
  {
    icon: Workflow,
    title: 'Master Data Mgmt',
    description: 'Consolidate data from disparate sources into a single source of truth.',
    description2: 'Ensuring consistency across your enterprise applications and reporting tools.',
  },
];

const bigDataFeatures = [
  {
    icon: Cpu,
    title: 'Distributed Computing',
    description: 'Process massive datasets in parallel using Apache Spark and Hadoop ecosystems.',
    description2: 'Dramatically reduce processing time for complex computations on billions of rows.',
  },
  {
    icon: Cloud,
    title: 'Stream Processing',
    description: 'Handle high-velocity data in real-time with Kafka and Flink.',
    description2: 'Perfect for IoT sensor data, financial transactions, and live user activity tracking.',
  },
  {
    icon: Terminal,
    title: 'NoSQL Solutions',
    description: 'Flexible database architectures using MongoDB, Cassandra, and DynamoDB.',
    description2: 'Designed for high write throughput and horizontal scalability across regions.',
  },
  {
    icon: Zap,
    title: 'AI & ML Ops',
    description: 'Deploy and manage machine learning models at scale on big data infrastructure.',
    description2: 'End-to-end MLOps pipelines for training, versioning, and serving models.',
  },
];

const techStack = [
  { name: 'Python', category: 'Language' },
  { name: 'SQL', category: 'Query' },
  { name: 'Snowflake', category: 'Warehouse' },
  { name: 'Spark', category: 'Big Data' },
  { name: 'Kafka', category: 'Streaming' },
  { name: 'Databricks', category: 'Data Analytics' },
  { name: 'Tableau', category: 'Viz' },
  { name: 'AWS/Azure', category: 'Cloud' },
  { name: 'Payspark', category: 'Payment Gateway' },
];

const testimonials = [
  {
    quote: "Their data warehousing solution reduced our reporting time from 6 hours to 15 minutes. Unbelievable efficiency gains.",
    author: "Sarah Jenkins",
    role: "Head of Data, FinCorp",
    image: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    quote: "The real-time analytics dashboard they built gives us a competitive edge we never had before.",
    author: "David Chen",
    role: "CTO, RetailNext",
    image: "https://i.pravatar.cc/150?u=david",
  },
  {
    quote: "Finally, a team that understands both the technical complexity of Big Data and the business needs behind it.",
    author: "Elena Rodriguez",
    role: "VP of Analytics, HealthPlus",
    image: "https://i.pravatar.cc/150?u=elena",
  },
];


// --- Component ---

export function DataSolutions() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Parallax
      gsap.fromTo(
        '.ds-hero-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      // Floating Icons
      gsap.to('.ds-float-icon', {
        y: -30,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.2, from: 'random' }
      });

      // Stats
      gsap.fromTo(
        '.ds-stat-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: { trigger: '.ds-stats', start: 'top 85%' },
        }
      );

      // Tech Stack
      gsap.fromTo(
        '.ds-tech-item',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          scrollTrigger: { trigger: '.ds-tech-section', start: 'top 80%' },
        }
      );

      // Feature Cards
      gsap.fromTo(
        '.ds-feature-card',
        { y: 40, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: { trigger: '.ds-features-grid', start: 'top 75%' },
        }
      );
      
      // Testimonials
      gsap.fromTo(
        '.ds-testimonial-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: { trigger: '.ds-testimonials', start: 'top 80%' },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="ds-page">
      {/* --- Hero Section --- */}
      <section id="analytics" ref={heroRef} className="ds-hero">
        <div className="ds-hero-bg">
          <div className="ds-data-streams">
             {/* Simulated data streams using CSS gradients */}
             <div className="ds-stream ds-stream-1"></div>
             <div className="ds-stream ds-stream-2"></div>
             <div className="ds-stream ds-stream-3"></div>
          </div>
          <div className="ds-hero-orb ds-orb-1" />
          <div className="ds-hero-orb ds-orb-2" />
          <div className="ds-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="ds-particle" />
            ))}
          </div>
        </div>
        
        <div className="ds-container">
          <div className="ds-hero-content">
            <div className="ds-floating-elements">
              {floatingIcons.map(({ Icon, delay, duration, pos }, idx) => (
                <div 
                  key={idx} 
                  className="ds-float-icon"
                  style={{ ...pos, animationDelay: delay, animationDuration: duration }}
                >
                  <Icon size={24} />
                </div>
              ))}
            </div>

            <div className="ds-hero-badge">
              <span className="ds-hero-dot" />
              <Sparkles size={14} />
              Data Intelligence
            </div>
            
            <h1 className="ds-hero-title">
              Unlock the Power of<br />
              <span className="ds-gradient-text">Your Data</span>
            </h1>
            
            <p className="ds-hero-description">
              From massive Big Data architectures to insightful Analytics dashboards, 
              we engineer data ecosystems that drive intelligent business decisions.
            </p>
            
            <div className="ds-hero-cta">
              <a href="/contact" className="ds-btn ds-btn-primary">
                Start Your Project
                <ArrowRight className="ds-btn-icon" />
              </a>
            </div>

            <div className="ds-stats">
              {stats.map((stat, idx) => (
                <div key={idx} className="ds-stat-item">
                  <span className="ds-stat-value">{stat.value}</span>
                  <span className="ds-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Tech Stack Section --- */}
      <section className="ds-tech-section">
        <div className="ds-container">
          <div className="ds-section-header">
            <span className="ds-section-label">Our Toolkit</span>
            <h2 className="ds-section-title">Data Technologies</h2>
            <p className="ds-section-subtitle">
              Industry-leading tools for modern data engineering
            </p>
          </div>

          <div className="ds-tech-grid">
            {techStack.map((tech, index) => (
              <div key={index} className="ds-tech-item">
                <div className="ds-tech-shine" />
                <span className="ds-tech-name">{tech.name}</span>
                <span className="ds-tech-category">{tech.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Data Analytics Section --- */}
      <section  className="ds-service ds-service-analytics">
        <div className="ds-container">
          <div className="ds-section-header">
            <div className="ds-service-badge ds-service-badge-analytics">
              <BarChart3 size={28} />
            </div>
            <h2 className="ds-section-title">Data Analytics</h2>
            <p className="ds-section-subtitle">
              Transform raw numbers into strategic assets with advanced statistical analysis and visualization.
            </p>
          </div>

          <div className="ds-features-grid">
            {analyticsFeatures.map((feature, index) => (
              <div key={index} className="ds-feature-card ds-feature-card-analytics">
                <div className="ds-feature-icon ds-feature-icon-analytics">
                  <feature.icon size={28} />
                </div>
                <h3 className="ds-feature-title">{feature.title}</h3>
                <p className="ds-feature-description">{feature.description}</p>
                <p className="ds-feature-description2">{feature.description2}</p>
                <div className="ds-feature-line" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Data Warehousing Section --- */}
      <section id="warehouse" className="ds-service ds-service-warehouse">
        <div className="ds-container">
          <div className="ds-section-header">
            <div className="ds-service-badge ds-service-badge-warehouse">
              <Database size={28} />
            </div>
            <h2 className="ds-section-title">Data Warehousing</h2>
            <p className="ds-section-subtitle">
              Centralized, clean, and structured data storage designed for high-performance querying.
            </p>
          </div>

          <div className="ds-features-grid">
            {warehousingFeatures.map((feature, index) => (
              <div key={index} className="ds-feature-card ds-feature-card-warehouse">
                <div className="ds-feature-icon ds-feature-icon-warehouse">
                  <feature.icon size={28} />
                </div>
                <h3 className="ds-feature-title">{feature.title}</h3>
                <p className="ds-feature-description">{feature.description}</p>
                <p className="ds-feature-description2">{feature.description2}</p>
                <div className="ds-feature-line" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Big Data Section --- */}
      <section id="bigdata" className="ds-service ds-service-bigdata">
        <div className="ds-container">
          <div className="ds-section-header">
            <div className="ds-service-badge ds-service-badge-bigdata">
              <Cpu size={28} />
            </div>
            <h2 className="ds-section-title">Big Data Solutions</h2>
            <p className="ds-section-subtitle">
              Scalable architectures to handle velocity, volume, and variety of massive datasets.
            </p>
          </div>

          <div className="ds-features-grid">
            {bigDataFeatures.map((feature, index) => (
              <div key={index} className="ds-feature-card ds-feature-card-bigdata">
                <div className="ds-feature-icon ds-feature-icon-bigdata">
                  <feature.icon size={28} />
                </div>
                <h3 className="ds-feature-title">{feature.title}</h3>
                <p className="ds-feature-description">{feature.description}</p>
                <p className="ds-feature-description2">{feature.description2}</p>
                <div className="ds-feature-line" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Testimonials --- */}
      <section className="ds-testimonials">
        <div className="ds-container">
          <div className="ds-section-header">
            <span className="ds-section-label">Testimonials</span>
            <h2 className="ds-section-title">Client Success Stories</h2>
          </div>
          <div className="ds-testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="ds-testimonial-card">
                <Quote className="ds-testimonial-quote" size={32} />
                <p className="ds-testimonial-text">{testimonial.quote}</p>
                <div className="ds-testimonial-author">
                  <img src={testimonial.image} alt={testimonial.author} />
                  <div>
                    <div className="ds-testimonial-name">{testimonial.author}</div>
                    <div className="ds-testimonial-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="ds-cta">
        <div className="ds-container">
          <div className="ds-cta-box">
            <div className="ds-cta-glow" />
            <h2 className="ds-cta-title">Ready to Become Data-Driven?</h2>
            <p className="ds-cta-description">
              Let's architect a data solution that scales with your ambition.
            </p>
            <div className="ds-cta-buttons">
              <a href="/contact" className="ds-btn ds-btn-primary ds-btn-lg">
                Schedule a Consultation
                <ArrowRight className="ds-btn-icon" />
              </a>
              <a href="tel:+918123660270" className="ds-btn ds-btn-outline">
                Call: +91 8123660270
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DataSolutions;