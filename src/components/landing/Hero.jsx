import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase'; // Import auth instance
import { useAuth } from '../../context/AuthContext'; // Import the custom hook
import { FiMenu, FiX } from "react-icons/fi"; // Icons for hamburger menu

import heroBg from '../../assets/hero-athlete.png';
import { SiFireship } from "react-icons/si";
import { FaDumbbell, FaWeightHanging, FaFire } from "react-icons/fa";

// MODIFICATION: Added handleScroll prop and menu items
const LoggedInNav = ({ handleLogout, navigate, handleScroll }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  const handleActionClick = (action) => {
    setIsOpen(false);
    action();
  };

  return (
    <div className="relative z-50" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 border-2 border-white rounded-lg hover:bg-slate-700 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX size={24} className="text-white" /> : <FiMenu size={24} className="text-white" />}
      </button>
      <div
        className={`absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 p-2' : 'max-h-0 opacity-0 p-0'}`}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <button
          onClick={() => handleActionClick(() => navigate('/dashboard'))}
          className="w-full text-left px-4 py-2 text-white hover:bg-slate-700 rounded-md transition-colors font-semibold"
        >
          Dashboard
        </button>
        <div className="my-1 border-t border-slate-700"></div>
        <button onClick={() => handleActionClick(() => handleScroll('features'))} className="w-full text-left px-4 py-2 text-white hover:bg-slate-700 rounded-md transition-colors font-semibold">Features</button>
        <button onClick={() => handleActionClick(() => handleScroll('pricing'))} className="w-full text-left px-4 py-2 text-white hover:bg-slate-700 rounded-md transition-colors font-semibold">Pricing</button>
        <button onClick={() => handleActionClick(() => handleScroll('contact'))} className="w-full text-left px-4 py-2 text-white hover:bg-slate-700 rounded-md transition-colors font-semibold">Contact</button>
        <div className="my-1 border-t border-slate-700"></div>
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-700 rounded-md transition-colors font-semibold"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

// Hamburger menu for logged-out users on mobile and tablet
const GuestNav = ({ handleScroll, navigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  const handleActionClick = (action) => {
    setIsOpen(false);
    action();
  };

  return (
    <div className="relative z-50 lg:hidden " ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 border-2 border-white rounded-lg hover:bg-slate-700 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX size={24} className="text-white" /> : <FiMenu size={24} className="text-white" />}
      </button>
      <div
        className={`absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 p-2' : 'max-h-0 opacity-0 p-0'}`}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <button onClick={() => handleActionClick(() => handleScroll('features'))} className="w-full text-left px-4 py-2 text-white hover:bg-slate-700 rounded-md transition-colors font-semibold">Features</button>
        <button onClick={() => handleActionClick(() => handleScroll('pricing'))} className="w-full text-left px-4 py-2 text-white hover:bg-slate-700 rounded-md transition-colors font-semibold">Pricing</button>
        <button onClick={() => handleActionClick(() => handleScroll('contact'))} className="w-full text-left px-4 py-2 text-white hover:bg-slate-700 rounded-md transition-colors font-semibold">Contact</button>
        <button onClick={() => handleActionClick(() => navigate('/login'))} className="w-full text-left px-4 py-2 mt-2 text-white bg-[#a4f16c]/20 hover:bg-[#a4f16c]/30 rounded-md transition-colors font-semibold border-t border-slate-700">Log In</button>
      </div>
    </div>
  );
};


const CountUp = ({ end, duration = 2000, decimals = 0 }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime = null;
    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(progress * end);
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };
    requestAnimationFrame(animateCount);
  }, [end, duration]);
  return <span>{count.toFixed(decimals)}</span>;
};

const workoutTools = [
  { icon: <FaDumbbell size={120} className="text-[#a4f16c]" />, text: 'Customize your workout plans with a vast library of exercises.' },
  { icon: <FaWeightHanging size={120} className="text-[#a4f16c]" />, text: 'Track your strength progress, set new records, and reach your goals.' },
  { icon: <FaFire size={120} className="text-[#a4f16c]" />, text: 'Monitor calories burned and stay on top of your nutrition targets.' }
];

const Hero = ({ handleScroll }) => {
  const [currentToolIndex, setCurrentToolIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  useEffect(() => {
    const toolInterval = setInterval(() => {
      setCurrentToolIndex(prevIndex => (prevIndex + 1) % workoutTools.length);
    }, 10000);
    return () => clearInterval(toolInterval);
  }, []);

  useEffect(() => {
    const targetText = workoutTools[currentToolIndex].text;
    setTypedText('');
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < targetText.length) {
        setTypedText(prev => targetText.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 40);
    return () => clearInterval(typingInterval);
  }, [currentToolIndex]);

  return (
    <div
      className="relative min-h-screen bg-cover bg-top bg-no-repeat text-white p-4 md:p-8 flex items-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/70 to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-slate-900 to-transparent"></div>

      <div className="relative mb-20 z-10 w-full max-w-7xl mx-auto flex flex-col justify-between h-[90vh]">
        <header id="page-header"className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <SiFireship size={30} className="text-[#a4f16c]" />
            <h1 className="text-2xl font-bold">FITFLOW</h1>
          </div>
          <nav className="flex items-center gap-4">
            {currentUser ? (
              // Logged-in user nav
              <>
                {/* MODIFICATION: Desktop Nav for Logged-In now includes all options */}
                <div className="hidden px-6 py-2 rounded-lg border-2 border-white hover:bg-slate-600 lg:flex items-center gap-6">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="ffont-semibold hover:text-[#a4f16c] transition-colors"
                  >
                    Dashboard
                  </button>
                  <button onClick={() => handleScroll('features')} className="font-semibold hover:text-[#a4f16c] transition-colors">Features</button>
                  <button onClick={() => handleScroll('pricing')} className="font-semibold hover:text-[#a4f16c] transition-colors">Pricing</button>
                  <button onClick={() => handleScroll('contact')} className="font-semibold hover:text-[#a4f16c] transition-colors">Contact</button>
                  
                  <button
                    onClick={handleLogout}
                    className="font-semibold hover:text-[#a4f16c] transition-colors"
                  >
                    Log Out
                  </button>
                </div>
                <div className="lg:hidden">
                  <LoggedInNav handleLogout={handleLogout} navigate={navigate} handleScroll={handleScroll} />
                </div>
              </>
            ) : (
              // Logged-out user nav
              <>
                {/* Desktop Nav */}
                <div className='hidden px-6 py-2 rounded-lg border-2 border-white hover:bg-slate-600 lg:flex items-center gap-4'>
                  <button onClick={() => handleScroll('features')} className="font-semibold hover:text-[#a4f16c] transition-colors">Features</button>
                  <button onClick={() => handleScroll('pricing')} className="font-semibold hover:text-[#a4f16c] transition-colors">Pricing</button>
                  <button onClick={() => handleScroll('contact')} className="font-semibold hover:text-[#a4f16c] transition-colors">Contact</button>
                  <button
                    onClick={() => navigate('/login')}
                    className="font-semibold hover:text-[#a4f16c] transition-colors"
                  >
                    Log In
                  </button>
                </div>
                {/* Mobile & Tablet Nav */}
                <GuestNav handleScroll={handleScroll} navigate={navigate} />
              </>
            )}
          </nav>
        </header>

        <main className="max-w-md mx-auto md:max-w-2xl lg:max-w-1/2 lg:mx-0 text-center lg:text-left flex flex-col items-center lg:items-start">
          <div key={currentToolIndex} className="h-32 flex justify-center lg:justify-start">
            <div className='animate-semicircle-path-large'>
              {workoutTools[currentToolIndex].icon}
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
            PLAN YOUR POWER. <br /> TRACK YOUR PROGRESS
          </h2>
          <p className="mt-4 mb-8 text-lg md:text-xl text-slate-400 min-h-[56px] md:min-h-[64px] lg:min-h-[32px]">
            {typedText}
            <span className="animate-pulse">|</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm md:max-w-md">
            <button
              onClick={() => navigate('/signup')}
              className="font-semibold text-slate-900 bg-[#a4f16c] hover:bg-[#8cd953] px-8 py-3 rounded-lg transition-colors w-full"
            >
              Get Started
            </button>
            <button 
              onClick={() => handleScroll('contact')}
              className="font-semibold text-white bg-transparent border-2 border-slate-600 hover:bg-slate-600 px-8 py-3 rounded-lg transition-colors w-full">
              Contact Us
            </button>
          </div>

          <div className="w-full flex justify-center lg:justify-start gap-8 md:gap-16 mt-5">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold"><CountUp end={1} />M+</p>
              <p className="text-sm text-slate-400">Happy Users</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold"><CountUp end={200} />+</p>
              <p className="text-sm text-slate-400">Workout Plans</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold"><CountUp end={4.9} decimals={1} />/5</p>
              <p className="text-sm text-slate-400">App Rating</p>
            </div>
          </div>
        </main>
        
        <div/>

      </div>
    </div>
  );
};

export default Hero;