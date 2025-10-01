import React from 'react';

// Import all your components
import Hero from './landing/Hero';
import Features from './landing/Features';
import HowItWorks from './landing/HowItWorks';
import Testimonials from './landing/Testimonials';
import Pricing from './landing/Pricing';
import FAQ from './landing/FAQ';
import CTA from './landing/CTA';
import Footer from './landing/Footer';

const LandingPage = () => {
  return (
    <div className="bg-slate-900">
      <main>
        {/* 1. Hero: Grab attention and state the value proposition. */}
        <Hero />
        
        {/* 2. Features: Explain the core benefits and what the app does. */}
        <Features />

        <HowItWorks />
        
       
        <CTA />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;