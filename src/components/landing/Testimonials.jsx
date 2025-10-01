// src/components/Testimonials.jsx
import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "FitFlow's AI is no joke. I broke a 6-month plateau in just 4 weeks. The plans adapt perfectly as I get stronger. Game-changer!",
    name: 'Alex Johnson',
    title: 'Weightlifter',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    quote: "As a beginner, the gym was intimidating. The video library taught me proper form, and now I work out with confidence. I've never felt better!",
    name: 'Samantha Lee',
    title: 'New Fitness Enthusiast',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    quote: "The progress tracking is my favorite part. Seeing the graphs go up every week is the best motivation. It’s data-driven fitness that actually works.",
    name: 'David Chen',
    title: 'Data Analyst & Gym Goer',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
];

const TestimonialCard = ({ testimonial, variants }) => {
    const cardRef = useRef(null);

    const onMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={onMouseMove}
            variants={variants}
            // Updated border color here
            className="group relative p-8 rounded-2xl border border-[#a4f16c] bg-slate-800/60" 
        >
             {/* The glowing border effect div */}
            <div
                className="absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(350px at var(--mouse-x) var(--mouse-y), rgba(164, 241, 108, 0.15), transparent 80%)`,
                }}
            />
            <div className="relative flex flex-col h-full">
                <p className="text-slate-300 flex-grow">"{testimonial.quote}"</p>
                <div className="mt-6 flex items-center">
                    <img className="w-12 h-12 rounded-full" src={testimonial.avatar} alt={testimonial.name} />
                    <div className="ml-4">
                        <p className="font-semibold text-white">{testimonial.name}</p>
                        <p className="text-sm text-[#a4f16c]">{testimonial.title}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Testimonials = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };
  
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
        id: i, size, left, top,
        delay: Math.random() * 5,
        duration: Math.random() * 8 + 5,
        opacity,
      });
    }
    return particles;
  };

  const particles = generatePeripheryParticles(30, 2, 5, [0.1, 0.4]);

  return (
    <section className="relative py-20 bg-slate-900 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {particles.map(p => (
            <motion.div
              key={p.id}
              className="absolute bg-[#a4f16c] rounded-full"
              style={{ width: p.size, height: p.size, left: `${p.left}%`, top: `${p.top}%` }}
              animate={{ opacity: [p.opacity, p.opacity + 0.2, p.opacity], scale: [1, 1.1, 1] }}
              transition={{ duration: p.duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: p.delay }}
            />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="w-1/2 h-1/2 bg-gradient-radial from-[#a4f16c]/5 to-transparent rounded-full blur-3xl" />
        </div>
        
        {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Trusted by <span className="text-[#a4f16c]">Thousands</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">Don't just take our word for it. Here's what our users are saying.</p>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
                key={index} 
                testimonial={testimonial} 
                variants={itemVariants} 
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;