import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import AuthLayout from './AuthLayout';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            console.log("User logged in successfully!");
            navigate('/dashboard');
        } catch (err) {
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                setError('Invalid email or password.');
            } else {
                setError('Failed to log in. Please try again.');
            }
            console.error("Login Error:", err);
        }
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-sm bg-gray-800 bg-opacity-60 rounded-xl shadow-2xl p-8 backdrop-blur-md border border-gray-700"> {/* Kept backdrop-blur-md here for the form card itself */}
                <h2 className="text-3xl font-bold text-center text-white mb-2">
                    Log In                </h2>
                <p className="text-center text-gray-400 mb-8">
                    Welcome back to FitFlow!
                </p>

                {error && <p className="bg-red-500 bg-opacity-30 text-red-300 text-sm text-center p-3 rounded-lg mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div className="relative">
                        <HiOutlineMail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a4f16c]"
                            placeholder="Email Address"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <HiOutlineLockClosed className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a4f16c]"
                            placeholder="Password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#a4f16c] text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-lime-600 transition-colors duration-300"
                    >
                        Log In
                    </button>
                </form>
                {/* Removed the divider and the Facebook login button */}
                
                <p className="text-center text-sm text-gray-400 mt-8">
                    Don't have an account?{' '}
                    <a href="/signup" className="font-medium text-[#a4f16c] hover:underline">
                        Sign Up
                    </a>
                </p>
            </div>
        </AuthLayout>
    );
};

export default LoginForm;