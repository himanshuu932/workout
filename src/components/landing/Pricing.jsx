// src/components/Pricing.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

const Pricing = () => {
    const Checkmark = () => <FiCheck className="inline-block mr-3 text-[#a4f16c]" size={20} />;

    return (
        <section id="pricing" className="py-20 bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                        Choose Your <span className="text-[#a4f16c]">Plan</span>
                    </h2>
                    <p className="mt-4 text-lg text-slate-400">Start with a 7-day free trial.</p>
                </motion.div>

                {/* MODIFICATION: Changed lg:flex-row to md:flex-row */}
                <div className="mt-16 flex flex-col md:flex-row justify-center items-center gap-8">
                    {/* Monthly Plan */}
                    <motion.div
                        className="w-full max-w-md bg-slate-800/60 p-8 rounded-2xl border border-slate-700"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-bold text-white">Monthly</h3>
                        <p className="mt-2 text-slate-400">Flexibility first.</p>
                        <p className="mt-6 text-5xl font-extrabold text-white">
                            ₹150 <span className="text-lg font-medium text-slate-400">/ month</span>
                        </p>
                        <ul className="mt-8 space-y-4 text-slate-300">
                            <li><Checkmark /> Unlimited AI-Generated Workouts</li>
                            <li><Checkmark /> Full Exercise Library Access</li>
                            <li><Checkmark /> Advanced Progress Tracking</li>
                            <li><Checkmark /> Community Support</li>
                        </ul>
                        <button className="mt-10 w-full font-semibold text-white bg-slate-700 hover:bg-slate-600 px-8 py-3 rounded-lg text-lg transition-colors duration-300">
                            Get Started
                        </button>
                    </motion.div>

                    {/* Yearly Plan (Highlighted) */}
                    <motion.div
                        className="w-full max-w-md bg-slate-800 p-8 rounded-2xl border-2 border-[#a4f16c] relative shadow-[0_0_30px_rgba(164,241,108,0.2)]"
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#a4f16c] text-slate-900 px-4 py-1 rounded-full text-sm font-bold">
                            BEST VALUE
                        </div>
                        <h3 className="text-2xl font-bold text-white">Yearly</h3>
                        <p className="mt-2 text-[#a4f16c]">Save over 20%!</p>
                        <p className="mt-6 text-5xl font-extrabold text-white">
                            ₹1440 <span className="text-lg font-medium text-slate-400">/ year</span>
                        </p>
                        <ul className="mt-8 space-y-4 text-slate-300">
                            <li><Checkmark /> Unlimited AI-Generated Workouts</li>
                            <li><Checkmark /> Full Exercise Library Access</li>
                            <li><Checkmark /> Advanced Progress Tracking</li>
                            <li><Checkmark /> Community Support</li>
                        </ul>
                        <motion.button 
                            className="mt-10 w-full font-semibold text-slate-900 bg-[#a4f16c] px-8 py-3 rounded-lg text-lg shadow-[0_0_20px_rgba(164,241,108,0.3)] transition-all duration-300"
                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(164, 241, 108, 0.5)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Start Free Trial
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;