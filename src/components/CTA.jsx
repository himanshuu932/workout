import React from 'react';
import { motion } from 'framer-motion';

const CTA = () => {
  return (
    <section className="bg-slate-900 py-20">
      <motion.div 
        className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Ready to Transform Your Body?
        </h2>
        <p className="mt-4 text-lg text-slate-400">
          Join thousands of users who are already achieving their dream physique. Your personalized plan is just a click away.
        </p>
        <div className="mt-8">
          <button className="font-semibold text-slate-900 bg-[#a4f16c] hover:bg-[#8cd953] px-10 py-4 rounded-lg transition-colors text-xl shadow-lg shadow-[#a4f16c]/20">
            Get Started for Free
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;