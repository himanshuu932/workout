
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiFireship } from 'react-icons/si';
import { FaHistory, FaTrash, FaBars, FaTimes } from 'react-icons/fa';

const Header = ({ onClearHistory, onLogout }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="max-w-7xl mx-auto flex justify-between items-center mb-8 md:mb-12 p-4">

      <div className="flex items-center gap-2 z-20"> 
        <SiFireship size={30} className="text-[#a4f16c]" />
        <h1 className="text-2xl font-bold">DASHBOARD</h1>
      </div>

      <button 
        className="md:hidden text-2xl z-20" 
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <nav className="hidden md:flex items-center gap-4">
        <button 
          onClick={onClearHistory} 
          title="Clear All History" 
          className="font-semibold px-4 py-2 text-slate-400 hover:text-red-500 transition-colors"
        >
          <FaTrash className="inline mr-2" /> Reset Stats
        </button>
        <button 
          onClick={() => navigate('/history')} 
          className="font-semibold px-4 py-2 hover:text-[#a4f16c] transition-colors"
        >
          <FaHistory className="inline mr-2" /> History
        </button>
        <button 
          onClick={onLogout} 
          className="font-semibold px-6 py-2 rounded-lg border-2 border-slate-600 hover:bg-red-500 hover:border-red-500 transition-colors"
        >
          Log Out
        </button>
      </nav>

      <nav 
        className={`fixed top-0 left-0 h-full w-full bg-slate-900/95 backdrop-blur-sm z-10 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 text-xl">
          <button 
            onClick={() => { onClearHistory(); setIsMenuOpen(false); }} 
            title="Clear All History" 
            className="font-semibold px-4 py-2 text-slate-400 hover:text-red-500 transition-colors w-1/2 text-center"
          >
            <FaTrash className="inline mr-2" /> Reset Stats
          </button>
          <button 
            onClick={() => handleNavigation('/history')} 
            className="font-semibold px-4 py-2 hover:text-[#a4f16c] transition-colors w-1/2 text-center"
          >
            <FaHistory className="inline mr-2" /> History
          </button>
          <button 
            onClick={() => { onLogout(); setIsMenuOpen(false); }} 
            className="font-semibold px-6 py-2 rounded-lg border-2 border-slate-600 hover:bg-red-500 hover:border-red-500 transition-colors w-1/2 text-center"
          >
            Log Out
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;