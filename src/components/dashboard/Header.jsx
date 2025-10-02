// src/components/dashboard/Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiFireship } from 'react-icons/si';
import { FaHistory, FaTrash, FaBars, FaTimes, FaHome, FaUserCircle } from 'react-icons/fa'; // Import FaUserCircle

const Header = ({ onClearHistory, onLogout }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogoutClick = () => {
    onLogout();
    setIsMenuOpen(false);
  };

  const handleClearHistoryClick = () => {
    onClearHistory();
    setIsMenuOpen(false); 
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <header className="relative max-w-7xl mx-auto flex justify-between items-center mb-8 md:mb-12 p-4 text-white">

      <div className="flex items-center gap-2 z-20"> 
        <button onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer">
          <SiFireship size={30} className="text-[#a4f16c]" />
          <h1 className="text-2xl font-bold">DASHBOARD</h1>
        </button>
      </div>

      <div className="relative lg:hidden z-20" ref={menuRef}> 
        <button 
          className="text-2xl" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div 
          className={`absolute right-0 top-full mt-2 w-48 bg-slate-800 rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-80 opacity-100 p-2' : 'max-h-0 opacity-0 p-0'
          }`}
          style={{ pointerEvents: isMenuOpen ? 'auto' : 'none' }}
        >
          {/* NEW: Profile button added to mobile menu */}
          <button 
            onClick={() => handleNavigation('/profile')} 
            className="w-full text-left px-4 py-2 text-white hover:bg-slate-700 rounded-md transition-colors font-semibold"
          >
            <FaUserCircle className="inline mr-2" /> Profile
          </button>
          <button 
            onClick={() => handleNavigation('/')} 
            className="w-full text-left px-4 py-2 text-white hover:bg-slate-700 rounded-md transition-colors font-semibold"
          >
            <FaHome className="inline mr-2" /> Home
          </button>
          <button 
            onClick={() => handleNavigation('/history')} 
            className="w-full text-left px-4 py-2 text-white hover:bg-slate-700 rounded-md transition-colors font-semibold"
          >
            <FaHistory className="inline mr-2" /> History
          </button>
          <button 
            onClick={handleClearHistoryClick} 
            title="Clear All History" 
            className="w-full text-left px-4 py-2 text-slate-400 hover:text-red-500 rounded-md transition-colors font-semibold border-t border-slate-700"
          >
            <FaTrash className="inline mr-2" /> Reset Stats
          </button>
          <button 
            onClick={handleLogoutClick} 
            className="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-700 rounded-md transition-colors font-semibold"
          >
            Log Out
          </button>
        </div>
      </div>

      <nav className="hidden lg:flex items-center gap-4">
        {/* NEW: Profile button added to desktop nav */}
       
        <button 
          onClick={() => handleNavigation('/')} 
          className="font-semibold px-4 py-2 hover:text-[#a4f16c] transition-colors"
        >
          <FaHome className="inline mr-2" /> Home
        </button>
        <button 
          onClick={onClearHistory} 
          title="Clear All History" 
          className="font-semibold px-4 py-2 text-slate-400 hover:text-red-500 transition-colors"
        >
          <FaTrash className="inline mr-2" /> Reset Stats
        </button>
        <button 
          onClick={() => handleNavigation('/history')} 
          className="font-semibold px-4 py-2 hover:text-[#a4f16c] transition-colors"
        >
          <FaHistory className="inline mr-2" /> History
        </button>
         <button 
          onClick={() => handleNavigation('/profile')} 
          className="font-semibold px-4 py-2 hover:text-[#a4f16c] transition-colors"
        >
          <FaUserCircle className="inline mr-2" /> Profile
        </button>
        
        <button 
          onClick={onLogout} 
          className="font-semibold px-6 py-2 rounded-lg border-2 border-slate-600 hover:bg-red-500 hover:border-red-500 transition-colors"
        >
          Log Out
        </button>
      </nav>
    </header>
  );
};

export default Header;