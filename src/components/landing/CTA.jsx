import React from 'react';
import { motion } from 'framer-motion';
import ctaArm from '../../assets/cta-arm.png'; 

const CTA = () => {
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
            particles.push({ id: i, size, left, top, delay: Math.random() * 5, duration: Math.random() * 8 + 5, opacity });
        }
        return particles;
    };
    const particles = generatePeripheryParticles(40, 2, 6, [0.1, 0.5]);

    return (
        <div className="relative bg-slate-900 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-slate-900 to-transparent pointer-events-none z-20" />
            
            <section className="py-32 text-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="xl:hidden absolute inset-0 overflow-hidden pointer-events-none z-0">
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
                    
                    <div className="hidden xl:block">
                        <motion.div
                            className="absolute bottom-0 left-0 w-full max-w-xl -translate-x-1/4 z-10 pointer-events-none"
                            initial={{ x: -200, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="w-full h-full aspect-square" style={{ maskImage: `url(${ctaArm})`, maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center', backgroundColor: '#a4f16c' }}></div>
                        </motion.div>
                        <motion.div
                            className="absolute bottom-0 right-0 w-full max-w-xl translate-x-1/4 z-10 pointer-events-none"
                            initial={{ x: 200, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="w-full h-full aspect-square scale-x-[-1]" style={{ maskImage: `url(${ctaArm})`, maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center', backgroundColor: '#a4f16c' }}></div>
                        </motion.div>
                    </div>
                    
                    <motion.div 
                        className="relative z-10 text-center"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-4xl font-extrabold text-[#a4f16c] sm:text-5xl lg:text-5xl">
                            Unlock Your Potential?
                        </h2>
                        {/* MODIFICATION: Added text and text-justify class */}
                        <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto text-justify">
                            Your personalized fitness journey is just a click away. Join thousands of users who are smashing their goals with our AI-powered platform that designs the perfect workout plan tailored to your body. Stop guessing and start progressing. What are you waiting for?
                        </p>
                        <div className="mt-10">
                            <motion.button 
                                className="font-semibold text-slate-900 bg-[#a4f16c] px-10 py-4 rounded-lg text-xl shadow-[0_0_30px_rgba(164,241,108,0.4)] transition-all duration-300"
                                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(164, 241, 108, 0.6)", filter: "brightness(1.1)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Start Your Free Trial
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default CTA;