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
import Contact from './landing/Contact';

const LandingPage = () => {
  return (
    <div className="bg-slate-900">
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <CTA />
        <Contact/>
        <FAQ />
        
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;