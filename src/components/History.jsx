// src/components/History.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { SiFireship } from 'react-icons/si';
import { FaCalendarAlt, FaChevronRight, FaFire } from 'react-icons/fa';

// MODIFIED: Import the loader GIF
import DumbbellAnimation from './DumbbellAnimation';

const History = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentUser) {
            const fetchHistory = async () => {
                const docRef = doc(db, 'users', currentUser.uid);
                const docSnap = await getDoc(docRef);
                // Reverse the history array to show the latest workout first
                if (docSnap.exists() && docSnap.data().history) {
                    setHistory(docSnap.data().history.reverse());
                }
                setLoading(false);
            };
            fetchHistory();
        }
    }, [currentUser]);

    // MODIFIED: Replace loading text with the GIF loader
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
             <DumbbellAnimation />
            </div>
        );
    }

    // Helper function to format seconds to M:SS
    const formatDuration = (seconds) => {
        if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) return '0m 0s';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-8">
            <header className="max-w-7xl mx-auto flex justify-between items-center mb-12 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                    <SiFireship size={30} className="text-[#a4f16c]" />
                    <h1 className="text-2xl font-bold">HISTORY</h1>
                </div>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="font-semibold px-6 py-2 rounded-lg border-2 border-[#a4f16c] text-[#a4f16c] hover:bg-[#a4f16c] hover:text-slate-900 transition-all shadow-md"
                >
                    Back
                </button>
            </header>

            <main className="max-w-4xl mx-auto">
                {history.length > 0 ? (
                    <div className="space-y-6">
                        {history.map((workout, index) => (
                            <div
                                key={index}
                                className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 shadow-2xl transition-all duration-300 hover:bg-slate-700/80 hover:scale-[1.01]"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-3 border-b border-slate-700/50">
                                    <h3 className="text-xl md:text-2xl font-extrabold text-[#a4f16c] mb-2 sm:mb-0">
                                        {workout.name || 'Untitled Workout'}
                                    </h3>
                                    
                                    <div className="flex flex-wrap gap-3 sm:gap-4 justify-start sm:justify-end">
                                        {workout.caloriesBurned > 0 && (
                                            <p className="text-sm text-white font-bold flex items-center gap-2 bg-gray-700/80 px-3 py-1 rounded-full">
                                                <FaFire className="text-red-300" />
                                                {Math.round(workout.caloriesBurned)} Kcal
                                            </p>
                                        )}
                                        <p className="text-sm text-slate-400 font-medium flex items-center gap-2 bg-slate-700/50 px-3 py-1 rounded-full">
                                            <span className="text-slate-200 font-bold mr-1">Time:</span>
                                            {formatDuration(workout.duration)}
                                        </p>
                                        <p className="text-sm text-slate-400 font-medium flex items-center gap-2 bg-slate-700/50 px-3 py-1 rounded-full">
                                            <FaCalendarAlt className="text-[#a4f16c]" />
                                            {new Date(workout.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    
                                </div>
                                <ul className="space-y-1">
                                    {workout.exercises.map((ex, exIndex) => (
                                        <li
                                            key={exIndex}
                                            className="py-2 flex items-center justify-between text-base border-b border-slate-700/30 last:border-b-0"
                                        >
                                            <div className="flex items-center text-slate-200 font-medium">
                                                <FaChevronRight size={10} className="text-[#a4f16c] mr-3" />
                                                {ex.name}
                                            </div>
                                            <span className="text-sm text-slate-400 bg-slate-700 px-2 py-1 rounded-md">
                                                {ex.sets} sets x {ex.reps} reps
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/50">
                        <FaCalendarAlt size={40} className="mx-auto text-slate-600 mb-4" />
                        <h3 className="text-2xl font-bold text-slate-300">Start Your Fitness Journey!</h3>
                        <p className="text-slate-400 mt-2">No completed workouts yet. Head back to the dashboard to log your first session.</p>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="mt-6 font-semibold px-8 py-3 rounded-lg bg-[#a4f16c] text-slate-900 hover:bg-[#8cd953] transition-colors shadow-lg"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default History;