import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaLightbulb, FaHome, FaRupeeSign, FaPhoneAlt } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

const menuItems = [
  { id: 'dashboard', type: 'navigate', path: '/dashboard', icon: <MdDashboard size={20} />, label: 'Dashboard' },
  { id: 'page-header', type: 'scroll', icon: <FaHome size={20} />, label: 'Home' },
  { id: 'features', type: 'scroll', icon: <FaLightbulb size={20} />, label: 'Features' },
  { id: 'pricing', type: 'scroll', icon: <FaRupeeSign size={20} />, label: 'Pricing' },
  { id: 'contact', type: 'scroll', icon: <FaPhoneAlt size={20} />, label: 'Contact' },
];

const FloatingNav = ({ handleScroll }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Effects for visibility and click-outside are unchanged...
  useEffect(() => {
    const toggleVisibility = () => {
        if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuRef]);
  
  const onMenuButtonClick = (item) => {
    if (item.type === 'navigate') {
      navigate(item.path);
    } else {
      handleScroll(item.id);
    }
    setIsOpen(false);
  };

  return (
    <div
      ref={menuRef}
           className={`fixed bottom-12 right-8 z-50 transition-all duration-300 transform-gpu ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}

    >
      {/* MODIFICATION: The map now renders a container div for the button and label */}
      {menuItems.map((item, index) => (
        <div
          key={item.id}
          className="absolute flex flex-col items-center"
          style={{
            // Increased translateY to make space for the label
            transform: isOpen ? `translateY(-${(index + 1) * 90}px)` : 'translateY(0)',
            opacity: isOpen ? 1 : 0,
            transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
            transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
            pointerEvents: isOpen ? 'auto' : 'none',
            // Centering the container div relative to the main button
            right: 0,
            bottom: 0,
            width: '64px', // Same width as the main button for alignment
          }}
        >
          <button
            onClick={() => onMenuButtonClick(item)}
            className="w-14 h-14 bg-slate-800/95 backdrop-blur-sm text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out hover:bg-[#a4f16c] hover:text-slate-900"
            aria-label={item.label}
          >
            {item.icon}
          </button>
          {/* New span for the text label */}
          <span className="mt-2 text-xs text-slate-200 font-semibold whitespace-nowrap">
            {item.label}
          </span>
        </div>
      ))}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#a4f16c] text-slate-900 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 hover:scale-110 relative"
        aria-label="Toggle navigation menu"
      >
        <FiX size={28} className={`transition-all duration-300 absolute ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
        <FiMenu size={28} className={`transition-all duration-300 absolute ${isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
      </button>
    </div>
  );
};

export default FloatingNav;