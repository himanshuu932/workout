import React, { useState } from 'react';

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); 
        setSuccess('');

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }
        console.log("Form submitted successfully:", formData);
        
        setSuccess("Account created successfully! Check your console.");
        
        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
        });
    };

    return (
        <div className="w-full max-w-md bg-slate-800 rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white">Create Your Account</h1>
                <p className="text-slate-400 mt-2">Join us and start your fitness journey.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="you@example.com" 
                        required 
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="••••••••" 
                        required 
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="••••••••" 
                        required 
                    />
                </div>

                {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
                {success && <p className="text-green-400 text-sm text-center mb-4">{success}</p>}

                <button 
                    type="submit"
                    className="w-full bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-emerald-500">
                    Sign Up
                </button>
            </form>

            <p className="text-center text-sm text-slate-400 mt-6">
                Already have an account?
                <a href="#" className="font-medium text-emerald-500 hover:underline">
                    Log In
                </a>
            </p>
        </div>
    );
};

export default SignUpForm;