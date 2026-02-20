// src/components/Testimonials/Testimonials.tsx
import React, { useState, useEffect } from 'react';
import { ScrollReveal } from '../../animations/scrollReveal';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import './Testimonials.scss';

const testimonials = [
  {
    name: 'John Smith',
    role: 'CEO, TechCorp',
    image: '/images/testimonials/avatar-1.jpg',
    content: 'Magnax transformed our entire IT infrastructure. Their team\'s expertise and dedication exceeded our expectations. The results speak for themselves - improved efficiency and reduced costs.',
    rating: 5,
  },
  {
    name: 'Sarah Johnson',
    role: 'CTO, InnovateLab',
    image: '/images/testimonials/avatar-2.jpg',
    content: 'The team\'s expertise in cloud migration was exceptional. They guided us through every step of the process, ensuring a smooth transition with minimal downtime.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Director, DataFlow Inc',
    image: '/images/testimonials/avatar-3.jpg',
    content: 'Outstanding service and support throughout our digital transformation journey. Magnax truly understands the needs of modern businesses.',
    rating: 5,
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-container">
        {/* Header */}
        <div className="section-header">
          <ScrollReveal animation="fadeUp">
            <span className="section-subtitle">// TESTIMONIALS //</span>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={0.1}>
            <h2 className="section-title">What Our Clients Say</h2>
          </ScrollReveal>
        </div>

        {/* Carousel */}
        <ScrollReveal animation="fadeUp" delay={0.2}>
          <div 
            className="carousel-wrapper"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="quote-icon">
              <Quote />
            </div>

            <div className="testimonial-card">
              <div className="card-decoration top" />
              <div className="card-decoration bottom" />

              <div className="testimonial-content">
                <div className="stars">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="star-filled" />
                  ))}
                </div>

                <p className="testimonial-text">
                  "{testimonials[currentIndex].content}"
                </p>

                <div className="author-info">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="author-avatar"
                  />
                  <div>
                    <h4 className="author-name">{testimonials[currentIndex].name}</h4>
                    <p className="author-role">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="carousel-controls">
                <button onClick={goToPrevious} className="nav-btn prev">
                  <ChevronLeft />
                </button>

                <div className="carousel-dots">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setCurrentIndex(index);
                      }}
                      className={`dot ${index === currentIndex ? 'active' : ''}`}
                    />
                  ))}
                </div>

                <button onClick={goToNext} className="nav-btn next">
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}