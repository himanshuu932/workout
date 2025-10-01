// src/components/Profile.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import Header from './dashboard/Header';
import { FaUser, FaLock, FaDumbbell, FaFire, FaExclamationTriangle, FaCalendarAlt } from 'react-icons/fa';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

// A reusable animated number component
const CountUp = ({ end, duration = 1.5 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            const controls = animate(0, end, {
                duration,
                ease: "easeOut",
                onUpdate(value) {
                    setCount(Math.floor(value));
                }
            });
            return () => controls.stop();
        }
    }, [isInView, end, duration]);

    return <span ref={ref}>{count.toLocaleString()}</span>;
};

// A small card for individual stats
const StatCard = ({ icon, label, value }) => (
    <div className="bg-slate-800/50 p-4 rounded-xl flex items-center gap-4 border border-slate-700">
        <div className="bg-slate-900 p-3 rounded-lg text-[#a4f16c]">
            {icon}
        </div>
        <div>
            <p className="text-sm text-slate-400">{label}</p>
            <p className="text-xl font-bold text-white">{value}</p>
        </div>
    </div>
);


const Profile = () => {
    const navigate = useNavigate();
    const { currentUser } = auth;

    // State for user data and stats
    const [history, setHistory] = useState([]);
    const [memberSince, setMemberSince] = useState('');
    const [activeTab, setActiveTab] = useState('profile');

    // State for forms
    const [nameInput, setNameInput] = useState(currentUser?.displayName || '');
    const [emailInput, setEmailInput] = useState(currentUser?.email || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    
    // State for UI feedback
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', content: '' });

    useEffect(() => {
        if (currentUser) {
            const fetchUserData = async () => {
                const docRef = doc(db, 'users', currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setHistory(docSnap.data().history || []);
                }
            };
            fetchUserData();
            
            if (currentUser.metadata.creationTime) {
                const date = new Date(currentUser.metadata.creationTime);
                setMemberSince(date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
            }
        }
    }, [currentUser]);

    const fitnessStats = {
        totalWorkouts: <CountUp end={history.length} />,
        totalCalories: <CountUp end={history.reduce((sum, workout) => sum + (workout.caloriesBurned || 0), 0)} />,
    };

    const showMessage = (type, content) => {
        setMessage({ type, content });
        setTimeout(() => setMessage({ type: '', content: '' }), 4000);
    };

    const handleReauthenticate = (password) => {
        const credential = EmailAuthProvider.credential(currentUser.email, password);
        return reauthenticateWithCredential(currentUser, credential);
    };
    
    // --- FORM HANDLERS ---
    const handleUpdateName = async (e) => {
        e.preventDefault();
        if (currentUser.displayName === nameInput) return;
        setLoading(true);
        try {
            await updateProfile(currentUser, { displayName: nameInput });
            const userDocRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userDocRef, { name: nameInput });
            showMessage('success', 'Name updated successfully!');
        } catch (error) {
            showMessage('error', 'Failed to update name.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleUpdateEmail = async (e) => {
        e.preventDefault();
        if (!currentPassword) return showMessage('error', 'Current password is required.');
        setLoading(true);
        try {
            await handleReauthenticate(currentPassword);
            await updateEmail(currentUser, emailInput);
            const userDocRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userDocRef, { email: emailInput });
            showMessage('success', 'Email updated! Please log in again.');
            setTimeout(() => auth.signOut(), 2000);
        } catch(error) {
            showMessage('error', 'Update failed. Check your password.');
        } finally {
            setLoading(false);
            setCurrentPassword('');
        }
    };
    
    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (!currentPassword || !newPassword) return showMessage('error', 'Both passwords are required.');
        if (newPassword.length < 6) return showMessage('error', 'New password must be at least 6 characters.');
        setLoading(true);
        try {
            await handleReauthenticate(currentPassword);
            await updatePassword(currentUser, newPassword);
            showMessage('success', 'Password updated! Please log in again.');
            setTimeout(() => auth.signOut(), 2000);
        } catch(error) {
            showMessage('error', 'Update failed. Check your current password.');
        } finally {
            setLoading(false);
            setCurrentPassword('');
            setNewPassword('');
        }
    };
    
    const handleLogout = async () => {
        await auth.signOut();
        navigate('/');
    };

    const TabButton = ({ tabName, label, className = '' }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 font-semibold rounded-md transition-colors ${activeTab === tabName ? 'bg-[#a4f16c] text-slate-900' : 'bg-transparent text-slate-400 hover:bg-slate-700 hover:text-white'} ${className}`}
        >
            {label}
        </button>
    );

    const formVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
    };

    return (
        <div className="relative min-h-screen bg-slate-900 text-white p-4 sm:p-8 overflow-hidden">
            <Header onLogout={handleLogout} />
            <main className="max-w-4xl mx-auto mt-8 flex flex-col gap-8">
                
                {/* --- PROFILE HEADER --- */}
                <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                    <div className="bg-slate-900 p-4 rounded-full border-2 border-[#a4f16c]">
                        <FaUser size={48} className="text-[#a4f16c]" />
                    </div>
                    <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <h1 className="text-3xl font-bold text-white text-center sm:text-left">{currentUser?.displayName || 'Fitness Enthusiast'}</h1>
                            {/* NEW: Free Plan Badge */}
                            <span className="text-xs font-bold uppercase bg-slate-700 text-[#a4f16c] px-3 py-1 rounded-full self-center sm:self-auto">Free Plan</span>
                        </div>
                        <p className="text-slate-400 text-center sm:text-left">{currentUser?.email}</p>
                    </div>
                </div>

                {/* --- STATS SECTION --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatCard icon={<FaDumbbell size={20} />} label="Total Workouts" value={fitnessStats.totalWorkouts} />
                    <StatCard icon={<FaFire size={20} />} label="Calories Burned" value={fitnessStats.totalCalories} />
                    <StatCard icon={<FaCalendarAlt size={20} />} label="Member Since" value={memberSince || '...'} />
                </div>
                
                <AnimatePresence>
                    {message.content && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                            className={`p-4 rounded-lg text-center font-semibold ${message.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                            {message.content}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* --- SETTINGS SECTION --- */}
                <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                    <div className="flex items-center gap-2 border-b border-slate-700 pb-4 mb-6 flex-wrap">
                        <TabButton tabName="profile" label="Profile" />
                        <TabButton tabName="email" label="Email" />
                        <TabButton tabName="password" label="Password" />
                        {/* NEW: Delete Account Tab */}
                        <button
                            onClick={() => setActiveTab('delete')}
                            className={`ml-auto px-4 py-2 font-semibold rounded-md transition-colors text-sm ${activeTab === 'delete' ? 'bg-red-500 text-white' : 'text-red-400/80 hover:bg-red-900/50 hover:text-red-300'}`}
                        >
                           Delete Account
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {activeTab === 'profile' && (
                            <motion.form key="profile" variants={formVariants} initial="hidden" animate="visible" exit="exit" onSubmit={handleUpdateName}>
                                <h3 className="font-semibold text-lg mb-4">Update Your Name</h3>
                                <label className="text-sm font-medium text-slate-400">Full Name</label>
                                <input type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-[#a4f16c]" />
                                <motion.button type="submit" disabled={loading} className="w-full mt-4 bg-[#a4f16c] text-slate-900 font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50" whileHover={{ scale: loading ? 1 : 1.05 }} whileTap={{ scale: loading ? 1 : 0.95 }}>
                                    {loading ? <FiLoader className="animate-spin" /> : 'Save Name'}
                                </motion.button>
                            </motion.form>
                        )}
                        {activeTab === 'email' && (
                            <motion.form key="email" variants={formVariants} initial="hidden" animate="visible" exit="exit" onSubmit={handleUpdateEmail} className="space-y-4">
                                <h3 className="font-semibold text-lg">Update Your Email</h3>
                                <div>
                                    <label className="text-sm font-medium text-slate-400">New Email</label>
                                    <input type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 mt-1" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-400">Confirm with Current Password</label>
                                    <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="••••••••" className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 mt-1" />
                                </div>
                                <motion.button type="submit" disabled={loading} className="w-full bg-slate-700 hover:bg-slate-600 font-bold py-2 px-4 rounded-lg flex items-center justify-center disabled:opacity-50" whileHover={{ scale: loading ? 1 : 1.05 }} whileTap={{ scale: loading ? 1 : 0.95 }}>
                                    {loading ? <FiLoader className="animate-spin" /> : 'Save Email'}
                                </motion.button>
                            </motion.form>
                        )}
                        {activeTab === 'password' && (
                            <motion.form key="password" variants={formVariants} initial="hidden" animate="visible" exit="exit" onSubmit={handleUpdatePassword} className="space-y-4">
                                <h3 className="font-semibold text-lg">Update Your Password</h3>
                                <div>
                                    <label className="text-sm font-medium text-slate-400">Current Password</label>
                                    <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="••••••••" className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 mt-1" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-400">New Password</label>
                                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="At least 6 characters" className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 mt-1" />
                                </div>
                                <motion.button type="submit" disabled={loading} className="w-full bg-slate-700 hover:bg-slate-600 font-bold py-2 px-4 rounded-lg flex items-center justify-center disabled:opacity-50" whileHover={{ scale: loading ? 1 : 1.05 }} whileTap={{ scale: loading ? 1 : 0.95 }}>
                                    {loading ? <FiLoader className="animate-spin" /> : 'Save Password'}
                                </motion.button>
                            </motion.form>
                        )}
                        {/* NEW: Delete Account Tab Content */}
                        {activeTab === 'delete' && (
                            <motion.div key="delete" variants={formVariants} initial="hidden" animate="visible" exit="exit">
                                <h3 className="font-semibold text-lg mb-2 text-red-400 flex items-center"><FaExclamationTriangle className="mr-2"/> Delete Account</h3>
                                <p className="text-slate-400 mb-4 text-sm">Once you delete your account, all of your data, including workout history, will be permanently removed. This action cannot be undone.</p>
                                <motion.button 
                                    className="w-full bg-red-500/80 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                >
                                    I understand, delete my account
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default Profile;