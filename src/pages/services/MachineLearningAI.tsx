import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Brain, 
  Bot, 
  Network, 
  Sparkles,
  ArrowRight,
  // Quote,
  Cpu,
  Eye,
  MessageSquare,
  Code2,
  Mic,
  GitBranch,
  Zap,
  Shield,
  Terminal,
  Workflow
} from 'lucide-react';
import './MachineLearningAI.scss';

gsap.registerPlugin(ScrollTrigger);

// --- Data Configuration ---

const stats = [
  { value: '99.2%', label: 'Model Accuracy' },
  { value: '10x', label: 'Faster Inference' },
  { value: '50+', label: 'AI Models Deployed' },
  { value: '24/7', label: 'AI Monitoring' }
];

const floatingIcons = [
  { Icon: Brain, delay: '0s', duration: '6s', pos: { top: '15%', left: '5%' } },
  { Icon: Bot, delay: '1s', duration: '8s', pos: { top: '25%', right: '10%' } },
  { Icon: Network, delay: '2s', duration: '7s', pos: { bottom: '25%', left: '8%' } },
  { Icon: Cpu, delay: '0.5s', duration: '9s', pos: { bottom: '15%', right: '5%' } },
  { Icon: Sparkles, delay: '1.5s', duration: '6s', pos: { top: '60%', left: '3%' } },
  { Icon: Terminal, delay: '2.5s', duration: '8s', pos: { top: '40%', right: '8%' } }
];

const mlFeatures = [
  {
    icon: Brain,
    title: 'Predictive Modeling',
    description: 'Advanced algorithms that forecast trends, behaviors, and outcomes with high precision.',
    description2: 'Using ensemble methods, gradient boosting, and deep learning for superior accuracy.',
  },
  {
    icon: Eye,
    title: 'Computer Vision',
    description: 'Image recognition, object detection, and visual analysis for automated inspection.',
    description2: 'CNN architectures for medical imaging, quality control, and autonomous systems.',
  },
  {
    icon: MessageSquare,
    title: 'Natural Language Processing',
    description: 'Text analysis, sentiment detection, and language understanding at scale.',
    description2: 'Transformer-based models for chatbots, document analysis, and content generation.',
  },
  {
    icon: Zap,
    title: 'AutoML & Optimization',
    description: 'Automated machine learning pipelines that select and tune optimal models.',
    description2: 'Neural architecture search and hyperparameter optimization for peak performance.',
  },
];

const generativeFeatures = [
  {
    icon: Bot,
    title: 'Large Language Models',
    description: 'Custom LLM implementations and fine-tuning for domain-specific applications.',
    description2: 'GPT, Claude, and open-source model integration with retrieval-augmented generation.',
  },
  {
    icon: Sparkles,
    title: 'Image & Video Generation',
    description: 'AI-powered visual content creation using diffusion models and GANs.',
    description2: 'Stable Diffusion, Midjourney API, and custom generative pipelines for creative assets.',
  },
  {
    icon: Code2,
    title: 'AI Code Assistants',
    description: 'Intelligent development tools that accelerate coding and reduce bugs.',
    description2: 'Copilot integration, automated code review, and intelligent documentation.',
  },
  {
    icon: Mic,
    title: 'Voice & Audio AI',
    description: 'Speech recognition, synthesis, and audio processing for interactive experiences.',
    description2: 'Text-to-speech, voice cloning, and real-time transcription services.',
  },
];

const integrationFeatures = [
  {
    icon: Workflow,
    title: 'MLOps & Pipeline',
    description: 'End-to-end machine learning operations for continuous deployment and monitoring.',
    description2: 'CI/CD for ML, model versioning, A/B testing, and automated retraining.',
  },
  {
    icon: GitBranch,
    title: 'API Integration',
    description: 'Seamless embedding of AI capabilities into existing applications and workflows.',
    description2: 'RESTful and GraphQL APIs for real-time inference and batch processing.',
  },
  {
    icon: Cpu,
    title: 'Edge AI & IoT',
    description: 'Lightweight models optimized for deployment on edge devices and sensors.',
    description2: 'TensorFlow Lite, ONNX runtime, and custom hardware acceleration.',
  },
  {
    icon: Shield,
    title: 'Ethical AI & Governance',
    description: 'Responsible AI frameworks ensuring fairness, transparency, and compliance.',
    description2: 'Bias detection, explainability tools, and regulatory compliance (EU AI Act).',
  },
];

const techStack = [
  { name: 'TensorFlow', category: 'Framework' },
  { name: 'PyTorch', category: 'Framework' },
  { name: 'OpenAI', category: 'API' },
  { name: 'LangChain', category: 'LLM Ops' },
  { name: 'HuggingFace', category: 'Models' },
  { name: 'Scikit-learn', category: 'ML' },
  { name: 'Keras', category: 'Deep Learning' },
  { name: 'MLflow', category: 'MLOps' },
];

// const testimonials = [
//   {
//     quote: "Their predictive models increased our demand forecasting accuracy by 40%. Game-changing for our supply chain.",
//     author: "Dr. James Mitchell",
//     role: "Chief Data Scientist, LogiCorp",
//     image: "https://i.pravatar.cc/150?u=james",
//   },
//   {
//     quote: "The computer vision system they built automated our quality inspection, saving 2000+ man-hours monthly.",
//     author: "Sarah Chen",
//     role: "VP Operations, ManufactureX",
//     image: "https://i.pravatar.cc/150?u=sarah",
//   },
//   {
//     quote: "Finally, an AI integration that actually works in production. Their MLOps expertise is unmatched.",
//     author: "Rahul Sharma",
//     role: "CTO, FinTech Solutions",
//     image: "https://i.pravatar.cc/150?u=rahul",
//   },
// ];


// --- Component ---

export function MachineLearningAI() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Parallax
      gsap.fromTo(
        '.ml-hero-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      // Floating Icons
      gsap.to('.ml-float-icon', {
        y: -30,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.2, from: 'random' }
      });

      // Stats
      gsap.fromTo(
        '.ml-stat-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: { trigger: '.ml-stats', start: 'top 85%' },
        }
      );

      // Tech Stack
      gsap.fromTo(
        '.ml-tech-item',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          scrollTrigger: { trigger: '.ml-tech-section', start: 'top 80%' },
        }
      );

      // Feature Cards
      gsap.fromTo(
        '.ml-feature-card',
        { y: 40, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: { trigger: '.ml-features-grid', start: 'top 75%' },
        }
      );
      
      // // Testimonials
      // gsap.fromTo(
      //   '.ml-testimonial-card',
      //   { y: 40, opacity: 0 },
      //   {
      //     y: 0,
      //     opacity: 1,
      //     duration: 0.6,
      //     stagger: 0.15,
      //     scrollTrigger: { trigger: '.ml-testimonials', start: 'top 80%' },
      //   }
      // );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="ml-page">
      {/* --- Hero Section --- */}
      <section id="machine-learning" ref={heroRef} className="ml-hero">
        <div className="ml-hero-bg">
          <div className="ml-neural-network">
             {/* Neural network nodes and connections */}
             <div className="ml-node ml-node-1"></div>
             <div className="ml-node ml-node-2"></div>
             <div className="ml-node ml-node-3"></div>
             <div className="ml-node ml-node-4"></div>
             <div className="ml-node ml-node-5"></div>
             <div className="ml-connection ml-conn-1"></div>
             <div className="ml-connection ml-conn-2"></div>
             <div className="ml-connection ml-conn-3"></div>
             <div className="ml-connection ml-conn-4"></div>
          </div>
          <div className="ml-hero-orb ml-orb-1" />
          <div className="ml-hero-orb ml-orb-2" />
          <div className="ml-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="ml-particle" />
            ))}
          </div>
        </div>
        
        <div className="ml-container">
          <div className="ml-hero-content">
            <div className="ml-floating-elements">
              {floatingIcons.map(({ Icon, delay, duration, pos }, idx) => (
                <div 
                  key={idx} 
                  className="ml-float-icon"
                  style={{ ...pos, animationDelay: delay, animationDuration: duration }}
                >
                  <Icon size={24} />
                </div>
              ))}
            </div>

            <div className="ml-hero-badge">
              <span className="ml-hero-dot" />
              <Sparkles size={14} />
              Artificial Intelligence
            </div>
            
            <h1 className="ml-hero-title">
              Machine Learning &<br />
              <span className="ml-gradient-text">AI Solutions</span>
            </h1>
            
            <p className="ml-hero-description">
              From predictive analytics to generative AI, we build intelligent systems 
              that learn, adapt, and transform your business operations.
            </p>
            
            <div className="ml-hero-cta">
              <a href="/contact" className="ml-btn ml-btn-primary">
                Build Your AI
                <ArrowRight className="ml-btn-icon" />
              </a>
            </div>

            <div className="ml-stats">
              {stats.map((stat, idx) => (
                <div key={idx} className="ml-stat-item">
                  <span className="ml-stat-value">{stat.value}</span>
                  <span className="ml-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Tech Stack Section --- */}
      <section className="ml-tech-section">
        <div className="ml-container">
          <div className="ml-section-header">
            <span className="ml-section-label">AI Toolkit</span>
            <h2 className="ml-section-title">ML Technologies</h2>
            <p className="ml-section-subtitle">
              State-of-the-art frameworks for next-generation AI
            </p>
          </div>

          <div className="ml-tech-grid">
            {techStack.map((tech, index) => (
              <div key={index} className="ml-tech-item">
                <div className="ml-tech-shine" />
                <span className="ml-tech-name">{tech.name}</span>
                <span className="ml-tech-category">{tech.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Machine Learning Section --- */}
      <section  className="ml-service ml-service-ml">
        <div className="ml-container">
          <div className="ml-section-header">
            <div className="ml-service-badge ml-service-badge-ml">
              <Brain size={28} />
            </div>
            <h2 className="ml-section-title">Machine Learning</h2>
            <p className="ml-section-subtitle">
              Data-driven algorithms that learn patterns and make intelligent predictions
            </p>
          </div>

          <div className="ml-features-grid">
            {mlFeatures.map((feature, index) => (
              <div key={index} className="ml-feature-card ml-feature-card-ml">
                <div className="ml-feature-icon ml-feature-icon-ml">
                  <feature.icon size={28} />
                </div>
                <h3 className="ml-feature-title">{feature.title}</h3>
                <p className="ml-feature-description">{feature.description}</p>
                <p className="ml-feature-description2">{feature.description2}</p>
                <div className="ml-feature-line" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Generative AI Section --- */}
      <section className="ml-service ml-service-genai">
        <div className="ml-container">
          <div className="ml-section-header">
            <div className="ml-service-badge ml-service-badge-genai">
              <Bot size={28} />
            </div>
            <h2 className="ml-section-title">Generative AI</h2>
            <p className="ml-section-subtitle">
              Creative artificial intelligence that generates content, code, and conversations
            </p>
          </div>

          <div className="ml-features-grid">
            {generativeFeatures.map((feature, index) => (
              <div key={index} className="ml-feature-card ml-feature-card-genai">
                <div className="ml-feature-icon ml-feature-icon-genai">
                  <feature.icon size={28} />
                </div>
                <h3 className="ml-feature-title">{feature.title}</h3>
                <p className="ml-feature-description">{feature.description}</p>
                <p className="ml-feature-description2">{feature.description2}</p>
                <div className="ml-feature-line" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- AI Integration Section --- */}
      <section id="ai" className="ml-service ml-service-integration">
        <div className="ml-container">
          <div className="ml-section-header">
            <div className="ml-service-badge ml-service-badge-integration">
              <Network size={28} />
            </div>
            <h2 className="ml-section-title">AI Integration</h2>
            <p className="ml-section-subtitle">
              Production-ready deployment and operational excellence for AI systems
            </p>
          </div>

          <div className="ml-features-grid">
            {integrationFeatures.map((feature, index) => (
              <div key={index} className="ml-feature-card ml-feature-card-integration">
                <div className="ml-feature-icon ml-feature-icon-integration">
                  <feature.icon size={28} />
                </div>
                <h3 className="ml-feature-title">{feature.title}</h3>
                <p className="ml-feature-description">{feature.description}</p>
                <p className="ml-feature-description2">{feature.description2}</p>
                <div className="ml-feature-line" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Testimonials ---
      <section className="ml-testimonials">
        <div className="ml-container">
          <div className="ml-section-header">
            <span className="ml-section-label">Testimonials</span>
            <h2 className="ml-section-title">Client Success Stories</h2>
          </div>
          <div className="ml-testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="ml-testimonial-card">
                <Quote className="ml-testimonial-quote" size={32} />
                <p className="ml-testimonial-text">{testimonial.quote}</p>
                <div className="ml-testimonial-author">
                  <img src={testimonial.image} alt={testimonial.author} />
                  <div>
                    <div className="ml-testimonial-name">{testimonial.author}</div>
                    <div className="ml-testimonial-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* --- CTA Section --- */}
      <section className="ml-cta">
        <div className="ml-container">
          <div className="ml-cta-box">
            <div className="ml-cta-glow" />
            <h2 className="ml-cta-title">Ready to Deploy Intelligence?</h2>
            <p className="ml-cta-description">
              Let's build AI systems that transform your data into competitive advantage.
            </p>
            <div className="ml-cta-buttons">
              <a href="/contact" className="ml-btn ml-btn-primary ml-btn-lg">
                Schedule a Consultation
                <ArrowRight className="ml-btn-icon" />
              </a>
              <a href="tel:+918123660270" className="ml-btn ml-btn-outline">
                Call: +91 8123660270
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MachineLearningAI;