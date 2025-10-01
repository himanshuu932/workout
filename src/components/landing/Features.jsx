import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { CgGym } from 'react-icons/cg';
import { BsGraphUp, BsListCheck } from 'react-icons/bs';

const featureList = [
  {
    icon: <CgGym size={28} />,
    title: 'Personalized Plans',
    description: 'Our AI creates workout plans tailored to your goals, experience, and available equipment.',
  },
  {
    icon: <BsGraphUp size={28} />,
    title: 'Track Your Progress',
    description: 'Log every set and rep. Visualize your strength gains over time with intuitive charts and graphs.',
  },
  {
    icon: <BsListCheck size={28} />,
    title: 'Vast Exercise Library',
    description: 'Access hundreds of exercises with detailed instructions and video demos to perfect your form.',
  },
];

const FeatureCard = ({ icon, title, description, index }) => {
  const divRef = useRef(null);

  const onMouseMove = (e) => {
    if (!divRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = divRef.current.getBoundingClientRect();
    const x = clientX - left - width / 2;
    const y = clientY - top - height / 2;
    divRef.current.style.transform = `rotateY(${x / 50}deg) rotateX(${-y / 50}deg)`;
    
    divRef.current.style.setProperty('--mouse-x', `${clientX - left}px`);
    divRef.current.style.setProperty('--mouse-y', `${clientY - top}px`);
  };
  
  const onMouseLeave = () => {
    if (!divRef.current) return;
    divRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      variants={{
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 },
      }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
      style={{ perspective: '1000px' }}
      className="group relative p-8 rounded-2xl bg-slate-800/40 backdrop-blur-md border border-slate-700 h-full"
    >
        <div 
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
              background: `radial-gradient(400px at var(--mouse-x) var(--mouse-y), rgba(164, 241, 108, 0.15), transparent 80%)`,
          }}
        />

      <div className="relative z-10 flex flex-col items-center text-center h-full">
            <div className="bg-slate-900/50 text-[#a4f16c] w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#a4f16c] group-hover:text-slate-900 transition-colors duration-300">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
            <p className="text-slate-400 flex-1">{description}</p>
        </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-5 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-slate-900 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none z-10" />
      
     <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-gradient-radial from-[#a4f16c]/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-gradient-to-br from-[#a4f16c]/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            A Smarter Way to <span className="text-[#a4f16c]">Train</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
            Our intelligent features are designed to eliminate guesswork and maximize your results.
          </p>
        </div>
        
        {/* MODIFICATION: Updated grid classes for better responsiveness */}
        <motion.div
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {featureList.map((feature, index) => (
            <FeatureCard key={index} index={index} {...feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;