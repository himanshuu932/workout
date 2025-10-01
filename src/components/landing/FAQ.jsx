import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

const faqs = [
    {
        question: "Is FitFlow suitable for complete beginners?",
        answer: "Absolutely! When you create your profile, you can set your experience level to 'Beginner.' The AI will then generate workouts that match your current fitness level, focusing on foundational movements and proper form. Our video library is also perfect for learning exercises safely."
    },
    {
        question: "What kind of equipment do I need?",
        answer: "FitFlow is designed to be flexible. You can tell the AI exactly what equipment you have access to—whether that's a full gym, just a pair of dumbbells at home, or even no equipment at all (bodyweight only). The plans will be tailored accordingly."
    },
    {
        question: "How does the AI personalization work?",
        answer: "Our smart planner uses an algorithm that considers your goals (e.g., muscle gain, fat loss), experience level, available equipment, and time commitment. It also learns from your logged workouts, progressively adjusting the difficulty to ensure you're always challenged."
    },
    {
        question: "Can I cancel my subscription anytime?",
        answer: "Yes, you can cancel your subscription at any time, no questions asked. If you cancel during your 7-day free trial, you will not be charged. You will retain access to premium features until the end of your current billing period."
    }
];

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-slate-700 last:border-b-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left p-6 hover:bg-slate-800/40 transition-colors duration-300 rounded-lg"
            >
                <h3 className="text-lg font-semibold text-white">{question}</h3>
                <motion.span
                    className="text-[#a4f16c]"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <FiPlus size={22} />
                </motion.span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <p className="px-6 pb-6 text-slate-400">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
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

const FAQ = () => {
    return (
        <section className="py-24 bg-slate-900 relative overflow-hidden">
            {/* NEW: Gradient overlays to fade the glow at the top and bottom */}
            <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-slate-900 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none z-10" />

            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-gradient-radial from-[#a4f16c]/10 to-transparent rounded-full blur-3xl animate-pulse pointer-events-none z-0"></div>
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
            
            {/* Main Content */}
            <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        Frequently Asked <span className="text-[#a4f16c]">Questions</span>
                    </h2>
                </motion.div>
                <motion.div 
                    className="bg-slate-800/40 backdrop-blur-md border border-slate-700 rounded-2xl"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} {...faq} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;