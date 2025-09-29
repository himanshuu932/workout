import React, { useState, useEffect } from 'react';
import heroBg from '../assets/hero-athlete.png'; 

import { SiFireship } from "react-icons/si";
import { FaDumbbell, FaWeightHanging, FaFire } from "react-icons/fa"; 

const CountUp = ({ end, duration = 2000, decimals = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = progress * end;
      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };
    requestAnimationFrame(animateCount);
  }, [end, duration]);

  return <span>{count.toFixed(decimals)}</span>;
};


const workoutTools = [
  {
    icon: <FaDumbbell size={120} className="text-[#a4f16c]" />,
    text: 'Customize your workout plans with a vast library of exercises.'
  },
  {
    icon: <FaWeightHanging size={120} className="text-[#a4f16c]" />,
    text: 'Track your strength progress, set new records, and reach your goals.'
  },
  {
    icon: <FaFire size={120} className="text-[#a4f16c]" />,
    text: 'Monitor calories burned and stay on top of your nutrition targets.'
  }
];


const Hero = () => {
  const [currentToolIndex, setCurrentToolIndex] = useState(0);
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const toolInterval = setInterval(() => {
      setCurrentToolIndex(prevIndex => (prevIndex + 1) % workoutTools.length);
    }, 5000);
    return () => clearInterval(toolInterval);
  }, []);

  useEffect(() => {
    const targetText = workoutTools[currentToolIndex].text;
    if (targetText.length > 0) {
      setTypedText(targetText.charAt(0));
    } else {
      setTypedText('');
    }
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < targetText.length) {
        setTypedText(prev => prev + targetText.charAt(charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 40);
    return () => clearInterval(typingInterval);
  }, [currentToolIndex]);

  return (
    <div
      className="relative min-h-screen bg-cover bg-top bg-no-repeat md:bg-right-top text-white p-4 md:p-8 flex items-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/70 to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-slate-900 to-transparent"></div>

      <div className="relative mb-20 z-10 w-full max-w-7xl mx-auto flex flex-col justify-between h-[90vh]">
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <SiFireship size={30} className="text-[#a4f16c]" />
            <h1 className="text-2xl font-bold">FITFLOW</h1>
          </div>

          <nav className="flex items-center gap-4">
            <button className="font-semibold px-6 py-2 rounded-lg border-2 border-slate-600 hover:bg-slate-600 transition-colors">
              Log In
            </button>
          </nav>
        </header>

        <main className="max-w-full lg:max-w-1/2 text-center lg:text-left items-center lg:items-start">
          <div key={currentToolIndex} className="h-32 flex justify-center lg:justify-start">
            <div className='animate-semicircle-path-large'>
              {workoutTools[currentToolIndex].icon}
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
             PLAN YOUR POWER. <br /> TRACK YOUR PROGRESS
          </h2>
          <p className="mt-4 mb-8 text-lg text-slate-400 min-h-[56px] lg:min-h-[28px]">
            {typedText}
            <span className="animate-pulse">|</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="font-semibold text-slate-900 bg-[#a4f16c] hover:bg-[#8cd953] px-8 py-3 rounded-lg transition-colors">
              Get Started
            </button>
            <button className="font-semibold text-white bg-transparent border-2 border-slate-600 hover:bg-slate-600 px-8 py-3 rounded-lg transition-colors">
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

