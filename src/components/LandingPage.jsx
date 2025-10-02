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
import FloatingNav from './landing/FloatingNav'; // Import the new component

const LandingPage = () => {
  // Function to handle smooth scrolling
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-900">
      {/* Pass scroll handler to Hero */}
      <Hero handleScroll={handleScroll} />
      <main id="main">
        {/* Added section wrappers with IDs */}
        <section id="features">
          <Features />
        </section>
        <HowItWorks />
        <Testimonials />
        <section id="pricing">
          <Pricing />
        </section>
        <CTA />
        <section id="contact">
          <Contact />
        </section>
        <FAQ />
      </main>
      {/* Pass scroll handler to Footer */}
      <Footer handleScroll={handleScroll} />

      {/* Add the FloatingNav here */}
      <FloatingNav handleScroll={handleScroll} />
    </div>
  );
};

export default LandingPage;