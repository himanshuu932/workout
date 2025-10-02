import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaLightbulb, FaHome, FaRupeeSign, FaPhoneAlt } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';


const menuItems = [
  { id: 'dashboard', type: 'navigate', path: '/dashboard', icon: <MdDashboard size={20} />, label: 'Dashboard' },
  { id: 'page-header', type: 'scroll', icon: <FaHome size={20} />, label: 'Go to Top' },
  { id: 'features', type: 'scroll', icon: <FaLightbulb size={20} />, label: 'Features' },
  { id: 'pricing', type: 'scroll', icon: <FaRupeeSign size={20} />, label: 'Pricing' },
  { id: 'contact', type: 'scroll', icon: <FaPhoneAlt size={20} />, label: 'Contact' },
];

const FloatingNav = ({ handleScroll }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const toggleVisibility = () => {
      const header = document.getElementById('page-header');
      if (header) {
        if (window.scrollY > header.offsetHeight) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setIsOpen(false);
        }
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
      className={`fixed bottom-12 right-8 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      {menuItems.map((item, index) => (
        <button
          key={item.id}
          onClick={() => onMenuButtonClick(item)}
          className="absolute w-14 h-14 bg-slate-800/95 backdrop-blur-sm text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out hover:bg-[#a4f16c] hover:text-slate-900"
          style={{
            transform: isOpen ? `translateY(-${(index + 1) * 70}px)` : 'translateY(0)',
            opacity: isOpen ? 1 : 0,
            transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
            pointerEvents: isOpen ? 'auto' : 'none',
            right: '4px',
            bottom: '4px'
          }}
          aria-label={item.label}
        >
          {item.icon}
        </button>
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