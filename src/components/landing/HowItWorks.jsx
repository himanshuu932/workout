import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Create Your Profile',
    description: 'Sign up and tell us about your fitness goals, experience level, and preferences.',
  },
  {
    number: '02',
    title: 'Get Your Custom Plan',
    description: 'Our smart planner instantly generates a personalized workout schedule just for you.',
  },
  {
    number: '03',
    title: 'Track & Dominate',
    description: 'Follow your plan, log your workouts, and watch your progress soar as you crush your goals.',
  },
];

const StepCard = ({ number, title, description, index }) => {
    const cardRef = useRef(null);

    const onMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };

    const itemVariants = {
        hidden: { y: 60, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.7, ease: "easeOut", delay: index * 0.2 },
        },
    };

    return (
        // MODIFICATION: Changed `md:translate-y-16` to `lg:translate-y-16`
        <motion.div
            className={`relative p-8 text-center flex flex-col items-center ${index === 1 ? 'lg:translate-y-16' : ''}`}
            variants={itemVariants}
        >
            <div
                ref={cardRef}
                onMouseMove={onMouseMove}
                className="group w-full"
            >
                {/* The glowing border effect div */}
                <div 
                    className="absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                        background: `radial-gradient(400px at var(--mouse-x) var(--mouse-y), rgba(164, 241, 108, 0.2), transparent 80%)`,
                    }}
                />
                
                {/* The main card content with the glass background */}
                <div className="relative w-full h-full bg-slate-800/60 backdrop-blur-md border border-slate-700 rounded-2xl p-8">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 flex items-center justify-center bg-slate-900 border-2 border-[#a4f16c] rounded-full text-3xl font-bold text-[#a4f16c] shadow-[0_0_20px_rgba(164,241,108,0.3)]">
                        {number}
                    </div>
                    <h3 className="mt-10 text-xl font-bold text-white">{title}</h3>
                    <p className="mt-2 text-slate-400">{description}</p>
                </div>
            </div>
        </motion.div>
    );
};

const HowItWorks = () => {
  const generatePeripheryParticles = (count, minSize, maxSize, opacityRange) => {
    const particles = [];
    for (let i = 0; i < count; i++) {
      const size = minSize + Math.random() * (maxSize - minSize);
      const opacity = opacityRange[0] + Math.random() * (opacityRange[1] - opacityRange[0]);
      const isHorizontal = Math.random() < 0.5; 
      let left, top;
      if (isHorizontal) {
        left = Math.random() * 100;
        top = Math.random() < 0.5 ? Math.random() * 20 : 80 + Math.random() * 20; 
      } else {
        left = Math.random() < 0.5 ? Math.random() * 20 : 80 + Math.random() * 20; 
        top = Math.random() * 100;
      }

      particles.push({
        id: i,
        size,
        left,
        top,
        delay: Math.random() * 5,
        duration: Math.random() * 8 + 5, 
        opacity,
      });
    }
    return particles;
  };

  const particles = generatePeripheryParticles(40, 2, 6, [0.1, 0.5]); 

  return (
    <div className="relative bg-slate-900">
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-slate-900 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none z-10" />
      
      <section className="py-12 text-white relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map(p => (
            <motion.div
              key={p.id}
              className="absolute bg-[#a4f16c] rounded-full" 
              style={{
                width: p.size,
                height: p.size,
                left: `${p.left}%`,
                top: `${p.top}%`,
              }}
              
              animate={{
                opacity: [p.opacity, p.opacity + 0.2, p.opacity], 
                scale: [1, 1.1, 1], 
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: p.delay,
              }}
            />
          ))}
        </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="w-1/2 h-1/2 bg-gradient-radial from-[#a4f16c]/10 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl"><span className="text-[#a4f16c]">Start</span> Your Transformation</h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">Getting started is simpler than you think. Follow three easy steps to unlock your potential.</p>
          </div>
          
          {/* MODIFICATION: Updated grid classes for better responsiveness */}
          <motion.div
            className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 md:gap-y-16 md:gap-x-8 lg:gap-x-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {steps.map((step, index) => (
              <StepCard key={index} index={index} {...step} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;