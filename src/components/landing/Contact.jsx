import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

// A reusable component for contact details
const ContactDetail = ({ icon, title, content }) => (
    <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 w-14 h-14 bg-slate-900/50 text-[#a4f16c] rounded-lg flex items-center justify-center">
            {icon}
        </div>
        <div>
            <h4 className="text-lg font-semibold text-white">{title}</h4>
            <p className="text-slate-400">{content}</p>
        </div>
    </div>
);

const Contact = () => {
  return (
    <section className="py-5 bg-slate-900 relative overflow-hidden">
        {/* MODIFICATION: Gradient overlays for fading effect */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-slate-900 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none z-10" />
        
        {/* Background Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-gradient-radial from-[#a4f16c]/10 to-transparent rounded-full blur-3xl animate-pulse pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Get in <span className="text-[#a4f16c]">Touch</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
             Reach out to us through any of the channels below.
          </p>
        </motion.div>
        
        {/* Main Card Container */}
        <motion.div 
            className="group relative bg-slate-800/60 rounded-2xl border border-slate-700 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div 
            className="absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
                background: `radial-gradient(800px at 50% 50%, rgba(164, 241, 108, 0.1), transparent 70%)`,
            }}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
              {/* Left Side: Contact Details */}
              <div className="p-8 sm:p-10 relative z-10 flex flex-col justify-center space-y-8">
                  <ContactDetail 
                      icon={<FiMapPin size={24} />}
                      title="Our Office"
                      content="Civil Lines, Gorakhpur, UP, India"
                  />
                  <ContactDetail 
                      icon={<FiMail size={24} />}
                      title="Email Us"
                      content="support@fitflow.com"
                  />
                  <ContactDetail 
                      icon={<FiPhone size={24} />}
                      title="Call Us"
                      content="+91 555 123 4567"
                  />
              </div>

              {/* Right Side: Nested Map Card */}
              <div className="p-4 h-[400px] lg:h-full">
                  {/* MODIFICATION: Changed border color for the map container */}
                   <div
                      className="relative w-full h-full bg-slate-900/50 rounded-xl border border-[#a4f16c] overflow-hidden"
                  >
                      <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113998.49015941566!2d83.29219430638515!3d26.75628931131754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991446a0c333e89%3A0x7f347e93c832595f!2sGorakhpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1679589319861!5m2!1sen!2sin"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="absolute top-0 left-0 w-full h-full filter grayscale(1) invert(90%) contrast(80%)"
                      ></iframe>
                  </div>
              </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;