// src/components/SignUpForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from "firebase/firestore"; 
import AuthLayout from './AuthLayout';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi'; 

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        name: '', // <-- NEW: Added name field
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({ ...prevState, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match.");
        }
        if (formData.password.length < 6) {
            return setError("Password must be at least 6 characters long.");
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            // NEW: Update Firebase Auth profile with display name
            await updateProfile(user, { displayName: formData.name });

            // NEW: Create a user document in Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: formData.name,
                email: formData.email,
                history: [],
                workoutPlan: { name: 'My First Workout', exercises: [] },
            });

            console.log("Account created successfully!");
            navigate('/login');
        } catch (err) {
            // ... (error handling remains the same)
            if (err.code === 'auth/email-already-in-use') {
                setError('This email address is already in use.');
            } else if (err.code === 'auth/invalid-email') {
                setError('Please enter a valid email address.');
            } else {
                setError('Failed to create an account. Please try again.');
            }
            console.error("Signup Error:", err);
        }
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-sm bg-gray-800 bg-opacity-60 rounded-xl shadow-2xl p-8 backdrop-blur-sm border border-gray-700">
                <h2 className="text-3xl font-bold text-center text-white mb-2">
                    Create Your Account
                </h2>
                <p className="text-center text-gray-400 mb-8">
                    Join FitFlow and start your journey.
                </p>

                {error && <p className="bg-red-500 bg-opacity-30 text-red-300 text-sm text-center p-3 rounded-lg mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* NEW: Full Name Input */}
                    <div className="relative">
                        <HiOutlineUser className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a4f16c]"
                            placeholder="Full Name"
                            required
                        />
                    </div>

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
                    
                    {/* Confirm Password Input */}
                    <div className="relative">
                        <HiOutlineLockClosed className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a4f16c]"
                            placeholder="Confirm Password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#a4f16c] text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-lime-600 transition-colors duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                
                <p className="text-center text-sm text-gray-400 mt-8">
                    Already have an account?{' '}
                    <a href="/login" className="font-medium text-[#a4f16c] hover:underline">
                        Log In
                    </a>
                </p>
            </div>
        </AuthLayout>
    );
};

export default SignUpForm;