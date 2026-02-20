// src/pages/HomePage/HomePage.tsx
import React,{useEffect,useRef}from 'react';
import { ArrowRight, Mail, Phone, MapPin, Play } from 'lucide-react';
import { About } from '../components/HomePage/About/About';
import { Testimonials } from '../components/HomePage/Testimonials/Testimonials';
import { FAQ } from '../components/HomePage/FAQ/FAQ';
import { Services } from '../components/HomePage/Services/Services';
import { Process } from '../components/HomePage/Process/Process';
import { WhyChooseUs } from '../components/HomePage/WhyChooseUs/WhyChooseUs';
import { Hero } from '../components/HomePage/Hero/Hero';
import { Contact } from '../pages/ContactPage'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HomePage.scss';

gsap.registerPlugin(ScrollTrigger);



const Home: React.FC = () => {
 

  return (
    <div className="home-page">
     
      <Hero />
      <About />
      <Services />
      <Process />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <Contact />

     
    </div>
  );
};

export default Home;