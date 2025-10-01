import React from 'react';
import { useNavigate } from 'react-router-dom';

// Using a placeholder background image URL as local assets can't be imported directly.
const loginBgUrl = 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop';

// Replaced react-icon with an inline SVG for a self-contained component.
const FireshipIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="30" 
        height="30" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="#a4f16c" // The brand color
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
    </svg>
);

// This is a placeholder for the content that the layout will wrap (e.g., a login or sign-up form).
const PlaceholderForm = () => (
    <div className="w-full max-w-md bg-gray-800 bg-opacity-70 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
        <h2 className="text-white text-3xl font-bold mb-6 text-center">Welcome Back</h2>
        <div className="space-y-4">
            <div>
                <label className="text-gray-300 text-sm font-semibold mb-2 block" htmlFor="email">Email Address</label>
                <input className="w-full bg-gray-900 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#a4f16c]" type="email" id="email" placeholder="you@example.com" />
            </div>
            <div>
                <label className="text-gray-300 text-sm font-semibold mb-2 block" htmlFor="password">Password</label>
                <input className="w-full bg-gray-900 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#a4f16c]" type="password" id="password" placeholder="••••••••" />
            </div>
        </div>
        <button className="w-full bg-[#a4f16c] text-black font-bold py-3 px-4 rounded-lg mt-8 hover:bg-opacity-90 transition-all duration-300">
            Sign In
        </button>
        <p className="text-center text-gray-400 mt-6">
            Don't have an account? <a href="#" className="text-[#a4f16c] hover:underline">Sign up</a>
        </p>
    </div>
);


const AuthLayout = ({ children }) => {
    const navigate = useNavigate();
    return (
        <div 
            className="min-h-screen w-full bg-cover bg-no-repeat "
            style={{ 
                backgroundImage: `url(${loginBgUrl})`,
            }}
        >
            <div className="min-h-screen w-full flex flex-col bg-black bg-opacity-60 backdrop-blur-sm">
                
                <header className="w-full">
                    <div className="container mx-auto flex justify-between items-center p-4 sm:p-6">
                        <div className="flex items-center gap-3">
                            <FireshipIcon />
                            <h1 className="text-2xl font-bold text-white">FITFLOW</h1>
                        </div>
                        <nav>
                            <button 
                                onClick={() => navigate('/')}
                                className="font-semibold px-5 py-2 rounded-lg border-2 border-white text-white hover:bg-white hover:text-black transition-colors duration-300"
                            >
                                Home
                            </button>
                        </nav>
                    </div>
                </header>

                <main className="flex-grow flex items-center p-4 sm:p-6 md:p-8">
                    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    
                    {/* Left Side: Branding Text */}
                    {/* MODIFICATION: Changed md responsive prefixes to lg to match the grid */}
                    <div className="text-center lg:text-left p-4 pt-16 lg:pt-4">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#a4f16c] uppercase tracking-wider mb-4">
                            FITFLOW
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300">
                            Plan Your Power. Track Your Progress.
                        </p>
                    </div>

                    {/* Right Side: Form Card */}
                    <div className="flex justify-center">
                        {children}
                    </div>

                </div>
                </main>
            </div>
        </div>
    );
};

export default AuthLayout;