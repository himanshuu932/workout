// src/components/History.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { SiFireship } from 'react-icons/si';
import { FaCalendarAlt } from 'react-icons/fa';

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
                if (docSnap.exists() && docSnap.data().history) {
                    setHistory(docSnap.data().history);
                }
                setLoading(false);
            };
            fetchHistory();
        }
    }, [currentUser]);

    if (loading) {
        return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading History...</div>;
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-8">
            <header className="max-w-7xl mx-auto flex justify-between items-center mb-12">
                <div className="flex items-center gap-2">
                    <SiFireship size={30} className="text-[#a4f16c]" />
                    <h1 className="text-2xl font-bold">WORKOUT HISTORY</h1>
                </div>
                <button onClick={() => navigate('/dashboard')} className="font-semibold px-6 py-2 rounded-lg border-2 border-slate-600 hover:bg-slate-700 transition-colors">
                    Back to Dashboard
                </button>
            </header>

            <main className="max-w-4xl mx-auto">
                {history.length > 0 ? (
                    <div className="space-y-6">
                        {history.map((workout, index) => (
                            <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-2xl font-bold text-[#a4f16c]">{workout.name}</h3>
                                    <p className="text-sm text-slate-400 flex items-center gap-2">
                                        <FaCalendarAlt />
                                        {new Date(workout.date).toLocaleDateString()}
                                    </p>
                                </div>
                                <ul>
                                    {workout.exercises.map((ex, exIndex) => (
                                        <li key={exIndex} className="py-2 border-b border-slate-700/50 last:border-b-0">
                                            {ex.name} - <span className="text-slate-300">{ex.sets} sets x {ex.reps} reps</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 border-2 border-dashed border-slate-700 rounded-lg">
                        <FaCalendarAlt size={40} className="mx-auto text-slate-600 mb-4" />
                        <h3 className="text-xl font-semibold">No workout history found.</h3>
                        <p className="text-slate-400">Complete a workout on your dashboard to see it here.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default History;