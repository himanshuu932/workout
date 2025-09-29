import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const CTA = () => {
    const sectionRef = useRef(null);

    // This makes the background glow react to the mouse's vertical position
    const onMouseMove = (e) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const height = rect.height;
        const intensity = 1 - Math.abs(y - height / 2) / (height / 2); // 1 at center, 0 at edges

        sectionRef.current.style.setProperty('--glow-opacity', `${0.3 + intensity * 0.5}`);
        sectionRef.current.style.setProperty('--glow-scale', `${1 + intensity * 0.2}`);
    };

    const onMouseLeave = () => {
        if (!sectionRef.current) return;
        sectionRef.current.style.setProperty('--glow-opacity', '0.3');
        sectionRef.current.style.setProperty('--glow-scale', '1');
    };

    return (
        <div className="relative bg-slate-900">
            {/* Top Fade Effect */}
            <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-slate-900 to-transparent pointer-events-none z-10" />
            
            <section
                ref={sectionRef}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                className="py-32 text-white relative overflow-hidden"
            >
                {/* ✨ Interactive Aurora Glow */}
                <div 
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 transition-all duration-300"
                    style={{ 
                        opacity: 'var(--glow-opacity, 0.3)',
                        transform: 'scale(var(--glow-scale, 1))',
                    }}
                >
                    <div className="w-2/3 h-2/3 bg-gradient-radial from-[#a4f16c]/20 to-transparent rounded-full blur-3xl" />
                </div>
                
                <motion.div 
                    className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-20"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
                        Ready to Unlock Your Potential?
                    </h2>
                    <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
                        Your personalized fitness journey is just a click away. Join thousands of users who are smashing their goals. What are you waiting for?
                    </p>
                    <div className="mt-10">
                        <motion.button 
                            className="font-semibold text-slate-900 bg-[#a4f16c] px-10 py-4 rounded-lg text-xl shadow-[0_0_30px_rgba(164,241,108,0.4)] transition-all duration-300"
                            whileHover={{ 
                                scale: 1.05, 
                                boxShadow: "0 0 40px rgba(164, 241, 108, 0.6)",
                                filter: "brightness(1.1)" 
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Start Your Free Trial
                        </motion.button>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default CTA;