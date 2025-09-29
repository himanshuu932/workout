import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

  import Features from '../components/Features'; 
  import Footer from '../components/Footer';
import HowItWorks from '../components/HowItWorks';
import CTA from '../components/CTA';

const LandingPage = () => {
  return (
    <div className="bg-slate-900">
     
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
       
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;