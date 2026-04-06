// src/components/Clients/Clients.tsx

import { useEffect, useRef, useState, useCallback } from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import { ScrollReveal } from '../../animations/scrollReveal';
import { getClientsData } from '../../../service/api';
import type { ClientsData } from '../../../types';

import './Clients.scss';

export function Clients() {
  const [data, setData] = useState<ClientsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const animationRef = useRef<number | null>(null);
  const isManualScrolling = useRef(false);
 const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Fetch data
  useEffect(() => {
    let mounted = true;

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const clientsData = await getClientsData();
        if (mounted) {
          setData(clientsData);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to load clients data');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  // Get card width including gap
  const getCardWidth = useCallback(() => {
    if (!trackRef.current) return 160;
    const card = trackRef.current.querySelector('.client-card') as HTMLElement;
    if (!card) return 160;
    const style = window.getComputedStyle(card);
    const marginRight = parseInt(style.marginRight) || 0;
    return card.offsetWidth + marginRight + 32; // 32 is the gap
  }, []);

  // Update current index based on scroll position
  const updateCurrentIndex = useCallback(() => {
    if (!trackRef.current) return;
    const scrollLeft = trackRef.current.scrollLeft;
    const cardWidth = getCardWidth();
    const newIndex = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(newIndex);
  }, [getCardWidth]);

  // Navigation handlers
  const scrollLeft = useCallback(() => {
    if (!trackRef.current) return;
    
    // Pause auto-scroll temporarily
    isManualScrolling.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    
    const cardWidth = getCardWidth();
    const newScrollLeft = Math.max(0, trackRef.current.scrollLeft - cardWidth);
    
    trackRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    
    // Resume auto-scroll after animation
    scrollTimeoutRef.current = setTimeout(() => {
      isManualScrolling.current = false;
      updateCurrentIndex();
    }, 500);
  }, [getCardWidth, updateCurrentIndex]);

  const scrollRight = useCallback(() => {
    if (!trackRef.current) return;
    
    // Pause auto-scroll temporarily
    isManualScrolling.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    
    const cardWidth = getCardWidth();
    const maxScroll = trackRef.current.scrollWidth / 2; // Half because of duplication
    let newScrollLeft = trackRef.current.scrollLeft + cardWidth;
    
    // Loop back to start if near end
    if (newScrollLeft >= maxScroll - cardWidth) {
      newScrollLeft = 0;
      trackRef.current.scrollTo({ left: newScrollLeft, behavior: 'auto' });
    } else {
      trackRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
    
    // Resume auto-scroll after animation
    scrollTimeoutRef.current = setTimeout(() => {
      isManualScrolling.current = false;
      updateCurrentIndex();
    }, 500);
  }, [getCardWidth, updateCurrentIndex]);

  // Fast auto-scroll animation (1.5px per frame)
  const animate = useCallback(() => {
    if (!trackRef.current || isPaused || isManualScrolling.current) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const track = trackRef.current;
    const maxScroll = track.scrollWidth / 2;

    // Faster speed: 1.5 pixels per frame
    track.scrollLeft += 1.5;

    // Seamless loop
    if (track.scrollLeft >= maxScroll) {
      track.scrollLeft = 0;
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused]);

  // Start animation
  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [animate]);

  // Handle scroll events to update index
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      if (!isManualScrolling.current) {
        updateCurrentIndex();
      }
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => track.removeEventListener('scroll', handleScroll);
  }, [updateCurrentIndex]);

  if (loading) return <section className="clients-section loading">Loading clients...</section>;
  if (error) return <section className="clients-section error">Error: {error}</section>;
  if (!data) return <section className="clients-section">No clients data available</section>;

  const clients = data.clients ?? [];
  // Triple the array for smoother infinite scroll
  const duplicatedClients = [...clients, ...clients, ...clients];
  const totalDots = Math.min(clients.length, 6);

  return (
    <section id="clients" className="clients-section">
      <div className="clients-container">
        {/* Header */}
        <div className="section-header">
          <ScrollReveal animation="fadeUp">
            <span className="section-subtitle">
              {data.subtitle || 'CLIENTS WE SERVE'}
            </span>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={0.1}>
            <h2 className="section-title">
              {data.title || 'Trusted by Industry Leaders'}
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={0.2}>
            <p className="section-desc">
              {data.description ||
                "We've been building for millions of people since 2022. " +
                "We build trustworthy secure and adaptable digital solutions, " +
                "designed to solve today's problems and empower whatever future we create tomorrow"}
            </p>
          </ScrollReveal>
        </div>

        {/* Carousel with Side Buttons */}
        <ScrollReveal animation="fadeUp" delay={0.3}>
          <div className="clients-carousel-outer">
            {/* Left Button */}
            <button 
              className="carousel-nav carousel-nav-left" 
              onClick={scrollLeft}
              aria-label="Scroll left"
            >
              <ChevronLeft />
            </button>

            {/* Carousel Track */}
            <div
              className="clients-carousel-wrapper"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="gradient-mask gradient-mask-left" />
              <div className="gradient-mask gradient-mask-right" />

              <div className="clients-track" ref={trackRef}>
                {duplicatedClients.map((client, index) => (
                  <div key={`${client.name}-${index}`} className="client-card">
                    <div className="logo-circle">
                      <img
                        src={client.logo || '/images/placeholder-logo.png'}
                        alt={client.name || 'Client'}
                        className="client-logo"
                        loading="lazy"
                        draggable="false"
                      />
                    </div>
                    <span className="client-name">{client.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Button */}
            <button 
              className="carousel-nav carousel-nav-right" 
              onClick={scrollRight}
              aria-label="Scroll right"
            >
              <ChevronRight />
            </button>
          </div>

          {/* Progress Dots */}
          <div className="carousel-progress">
            {Array.from({ length: totalDots }).map((_, index) => (
              <button
                key={index}
                className={`progress-dot ${index === currentIndex % totalDots ? 'active' : ''}`}
                onClick={() => {
                  if (trackRef.current) {
                    isManualScrolling.current = true;
                    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
                    
                    const cardWidth = getCardWidth();
                    trackRef.current.scrollTo({
                      left: index * cardWidth,
                      behavior: 'smooth'
                    });
                    setCurrentIndex(index);
                    
                    scrollTimeoutRef.current = setTimeout(() => {
                      isManualScrolling.current = false;
                    }, 500);
                  }
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}