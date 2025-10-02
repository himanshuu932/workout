import React from 'react';
import { SiFireship } from 'react-icons/si';
import { FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa';

// MODIFICATION: Accept handleScroll prop
const Footer = ({ handleScroll }) => {
  const currentYear = new Date().getFullYear();
  
  // A helper component for consistent styling
  const ScrollButton = ({ id, children }) => (
    <button onClick={() => handleScroll(id)} className="text-left hover:text-white transition-colors">
      {children}
    </button>
  );

  return (
    <footer  id="footer" className="bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
         
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <SiFireship size={28} className="text-[#a4f16c]" />
              <span className="text-white text-2xl font-bold">FITFLOW</span>
            </a>
            <p className="text-sm">Your personal fitness journey, redefined.</p>
            <div className="flex space-x-6 mt-4">
              <a href="#" className="hover:text-white"><FaTwitter /></a>
              <a href="#" className="hover:text-white"><FaInstagram /></a>
              <a href="#" className="hover:text-white"><FaFacebookF /></a>
            </div>
          </div>
          
          {/* MODIFICATION: Links converted to scrollable buttons */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-2">
              <li><ScrollButton id="features">Features</ScrollButton></li>
              <li><ScrollButton id="pricing">Pricing</ScrollButton></li>
              <li><a href="#" className="hover:text-white">Updates</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><ScrollButton id="contact">Contact</ScrollButton></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm">
          <p>&copy; {currentYear} FitFlow by Rudraashwi Technology. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;