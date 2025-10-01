import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import Header from './dashboard/Header';
import KpiCards from './dashboard/KpiCards';
import WeeklyChart from './dashboard/WeeklyChart';
import WorkoutPlan from './dashboard/WorkoutPlan';
import ExerciseLibrary from './dashboard/ExerciseLibrary';
import ActiveWorkout from './dashboard/ActiveWorkout';
import AddExerciseModal from './dashboard/AddExerciseModal';
import PendingWorkoutPrompt from './dashboard/PendingWorkoutPrompt';
import EditExerciseModal from './dashboard/EditExerciseModal';
import DumbbellAnimation from './DumbbellAnimation';

import pushUp from '../assets/push.png';
import squats from '../assets/squats.png';
import deadlifts from '../assets/deadlifts.png';
import curls from '../assets/curls.png';
import pull from '../assets/pull.png';
import overhead from '../assets/overhead.png';
import bench from '../assets/bench.png';
import tricep from '../assets/tricep.png';
import lunges from '../assets/lunges.png';
import plank from '../assets/plank.png';
import crunches from '../assets/crunches.png';
import leg from '../assets/leg.png';
import running from '../assets/run.png';
import cycling from '../assets/cyc.png';
import battle from '../assets/rope.png';
import box from '../assets/box.png';



const WorkoutReminder = ({ days, onDismiss }) => {
  // Return nothing if there's no relevant data to show
  if (days === null || days < 0) {
    return null;
  }

  // Handle pluralization for "day" vs "days"
  const dayText = days === 1 ? 'day' : 'days';

  return (
    <div className="relative bg-slate-800/50 p-6 mb-8 rounded-2xl flex items-start justify-between gap-4 shadow-lg border border-[#a4f16c] animate-fade-in-down">
      
      {/* 1. Left side: Text content is grouped in its own div */}
      <div>
        <h3 className="font-bold text-lg mb-1">👋 Friendly Reminder!</h3>
        <p className="text-slate-300">
          It's been <span className="font-bold text-white">{days}</span> {dayText} since your last workout. Ready to get back to it?
        </p>
      </div>

      {/* 2. Right side: The button is now a direct child of the flex container */}
      <button 
        onClick={onDismiss} 
        // `flex-shrink-0` prevents the button from being squished by long text
        className="text-2xl font-bold text-slate-400 hover:text-white transition-colors flex-shrink-0"
        aria-label="Dismiss reminder"
      >
        &times;
      </button>
      
    </div>
  );
};



 const exerciseLibrary = [
  { name: 'Push-ups', caloriesPerSet: 5, imageUrl: pushUp, duration: 45 },
  { name: 'Pull-ups', caloriesPerSet: 7, imageUrl: pull, duration: 50 },
  { name: 'Squats', caloriesPerSet: 8, imageUrl: squats, duration: 60 },
  { name: 'Deadlifts', caloriesPerSet: 12, imageUrl: deadlifts, duration: 60 },
  { name: 'Bench Press', caloriesPerSet: 6, imageUrl: bench, duration: 50 },
  { name: 'Overhead Press', caloriesPerSet: 5, imageUrl: overhead, duration: 45 },
  { name: 'Bicep Curls', caloriesPerSet: 3, imageUrl: curls, duration: 40 },
  { name: 'Tricep Dips', caloriesPerSet: 4, imageUrl: tricep, duration: 40 },
  { name: 'Lunges', caloriesPerSet: 6, imageUrl: lunges, duration: 60 },
  { name: 'Plank', caloriesPerSet: 2, imageUrl: plank, duration: 60 },
  { name: 'Crunches', caloriesPerSet: 3, imageUrl: crunches, duration: 45 },
  { name: 'Leg Press', caloriesPerSet: 9, imageUrl: leg, duration: 60 },
  { name: 'Running', caloriesPerSet: 15, imageUrl: running, duration: 300 },
  { name: 'Cycling', caloriesPerSet: 13, imageUrl: cycling, duration: 300 },
  { name: 'Battle rope', caloriesPerSet: 15, imageUrl: battle, duration: 60 },
  { name: 'Box Jump', caloriesPerSet: 13, imageUrl: box, duration: 60 },
];

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [history, setHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [workoutPhase, setWorkoutPhase] = useState('PREP');
  const [timer, setTimer] = useState(0);
  const [workoutStartTime, setWorkoutStartTime] = useState(null);

  const [pendingWorkout, setPendingWorkout] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [exerciseToEdit, setExerciseToEdit] = useState(null);
  
  // NEW: State to manage the visibility of the reminder notification.
  const [isReminderVisible, setIsReminderVisible] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        setLoading(true);
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setWorkoutPlan(data.workoutPlan || { name: 'My First Workout', exercises: [] });
          setHistory(data.history || []);
          setPendingWorkout(data.pendingWorkout || null);
        } else {
          setWorkoutPlan({ name: 'My First Workout', exercises: [] });
          setHistory([]);
        }
        setLoading(false);
      };
      fetchUserData();
    }
  }, [currentUser]);
  
  // NEW: Check session storage on component mount to see if the reminder was already dismissed.
  useEffect(() => {
    const dismissed = sessionStorage.getItem('workoutReminderDismissed');
    if (dismissed === 'true') {
        setIsReminderVisible(false);
    }
  }, []);

  const enrichedWorkoutPlan = useMemo(() => {
    if (!workoutPlan) return null;
    return {
      ...workoutPlan,
      exercises: workoutPlan.exercises.map(ex => {
        const libraryItem = exerciseLibrary.find(libEx => libEx.name === ex.name);
        return { ...ex, ...libraryItem };
      })
    };
  }, [workoutPlan]);
  
  const kpis = useMemo(() => {
    const last7DaysHistory = history.filter(h => new Date(h.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    const totalCalories = last7DaysHistory.reduce((total, workout) => total + (workout.caloriesBurned || 0), 0);
    const avgDuration = last7DaysHistory.length > 0 ? Math.round(last7DaysHistory.reduce((acc, curr) => acc + curr.duration, 0) / (60 * last7DaysHistory.length)) : 0;
    return { calories: totalCalories.toLocaleString(), workouts: last7DaysHistory.length, avgTime: `${avgDuration} min` };
  }, [history]);

  const weeklyChartData = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const data = days.map(day => ({ day, minutes: 0 }));
    history.forEach(workout => {
        const workoutDate = new Date(workout.date);
        if (workoutDate > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
            data[workoutDate.getDay()].minutes += Math.round(workout.duration / 60);
        }
    });
    const todayIndex = new Date().getDay();
    return [...data.slice(todayIndex + 1), ...data.slice(0, todayIndex + 1)];
  }, [history]);

  const daysSinceLastWorkout = useMemo(() => {
    if (!history || history.length === 0) return null;
    const lastWorkoutDate = new Date(history[0].date);
    const today = new Date();
    const differenceInTime = today.getTime() - lastWorkoutDate.getTime();
    return Math.floor(differenceInTime / (1000 * 3600 * 24));
  }, [history]);

  const handleDismissReminder = () => {
    setIsReminderVisible(false);
    sessionStorage.setItem('workoutReminderDismissed', 'true');
  };
  


  const saveWorkout = async (workoutToSave) => {
    const durationInSeconds = Math.round((Date.now() - workoutStartTime) / 1000);
    const workoutName = `Workout - ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    
    const caloriesBurned = workoutToSave.exercises.reduce((total, ex) => {
        const exerciseData = exerciseLibrary.find(libEx => libEx.name === ex.name);
        return total + (exerciseData ? ex.sets * exerciseData.caloriesPerSet : 0);
    }, 0);

    const completedWorkout = { 
      name: workoutName,
      originalPlanName: workoutToSave.name,
      date: new Date().toISOString(), 
      duration: durationInSeconds, 
      caloriesBurned, 
      exercises: workoutToSave.exercises,
      isPartial: false
    };
    
    const updatedHistory = [completedWorkout, ...history];
    await updateDoc(doc(db, 'users', currentUser.uid), { history: updatedHistory, pendingWorkout: null });
    setHistory(updatedHistory);
    setPendingWorkout(null);

    setIsWorkoutActive(false);
    setActiveWorkout(null);
  };

   const handleDeleteExercise = async (exerciseId) => {
    if (window.confirm("Are you sure you want to remove this exercise?")) {
      if (!workoutPlan) return;
      
      const updatedExercises = workoutPlan.exercises.filter(ex => ex.id !== exerciseId);
      const updatedPlan = { ...workoutPlan, exercises: updatedExercises };
      
      await updateDoc(doc(db, 'users', currentUser.uid), { workoutPlan: updatedPlan });
      setWorkoutPlan(updatedPlan);
    }
  };

  const handleEndPrematurely = async () => {
    if (!activeWorkout) return;
    if (!window.confirm("Are you sure you want to end the workout early? Your progress will be paused.")) {
        return;
    }

    let caloriesBurnedSoFar = 0;
    const completedExercises = activeWorkout.exercises.slice(0, currentExerciseIndex);
    completedExercises.forEach(ex => {
        caloriesBurnedSoFar += (ex.sets || 0) * (ex.caloriesPerSet || 0);
    });

    const currentExercise = activeWorkout.exercises[currentExerciseIndex];
    if (currentExercise && currentSet > 1) {
        caloriesBurnedSoFar += (currentSet - 1) * (currentExercise.caloriesPerSet || 0);
    }
    
    const newPendingWorkout = {
      originalPlan: activeWorkout,
      currentExerciseIndex: currentExerciseIndex,
      currentSet: currentSet,
      workoutStartTime: workoutStartTime,
      pauseTime: Date.now(),
      caloriesBurnedSoFar: Math.round(caloriesBurnedSoFar)
    };

    await updateDoc(doc(db, 'users', currentUser.uid), { pendingWorkout: newPendingWorkout });
    setPendingWorkout(newPendingWorkout);

    setIsWorkoutActive(false);
    setActiveWorkout(null);
  };
  
  const handleResumeWorkout = () => {
      if (!pendingWorkout) return;
      
      setActiveWorkout(pendingWorkout.originalPlan);
      setCurrentExerciseIndex(pendingWorkout.currentExerciseIndex);
      setCurrentSet(pendingWorkout.currentSet);
      setWorkoutStartTime(pendingWorkout.workoutStartTime);
      
      setWorkoutPhase('PREP');
      setTimer(10);
      setIsWorkoutActive(true);

      setPendingWorkout(null);
  };

  const handleDiscardWorkout = async () => {
      if (!pendingWorkout) return;
      if (window.confirm("Are you sure you want to discard this unfinished workout? This cannot be undone.")) {
          await updateDoc(doc(db, 'users', currentUser.uid), { pendingWorkout: null });
          setPendingWorkout(null);
      }
  };


  const handleFinishSet = () => {
    if (!activeWorkout || workoutPhase !== 'WORK') return;
    setTimer(1); 
  };

  const handleSkipExercise = () => {
    if (!activeWorkout) return;
    const nextExerciseIndex = currentExerciseIndex + 1;
    if (nextExerciseIndex < activeWorkout.exercises.length) {
      setCurrentExerciseIndex(nextExerciseIndex);
      setCurrentSet(1);
      setWorkoutPhase('PREP');
      setTimer(10);
    } else {
      handleEndPrematurely();
    }
  };
  const handleOpenEditModal = (exercise) => {
    setExerciseToEdit(exercise);
    setIsEditModalOpen(true);
  };

  const handleUpdateExercise = async (updatedExercise) => {
    if (!workoutPlan || !updatedExercise) return;

    const updatedExercises = workoutPlan.exercises.map(ex => 
      ex.id === updatedExercise.id ? updatedExercise : ex
    );
    const updatedPlan = { ...workoutPlan, exercises: updatedExercises };

    await updateDoc(doc(db, 'users', currentUser.uid), { workoutPlan: updatedPlan });
    setWorkoutPlan(updatedPlan);

    setIsEditModalOpen(false);
    setExerciseToEdit(null);
  };
  
  useEffect(() => {
    if (!isWorkoutActive || !activeWorkout) return;

    const handleTimerEnd = () => {
        const currentExercise = activeWorkout.exercises[currentExerciseIndex];
        
        const delayTimeout = setTimeout(() => {
            if (workoutPhase === 'PREP') {
                const workDuration = Math.max(currentExercise.duration || 0, 30);
                setWorkoutPhase('WORK');
                setTimer(workDuration);

            } else if (workoutPhase === 'WORK') {
                setWorkoutPhase('REST');
                setTimer(currentExercise.rest);
                
            } else if (workoutPhase === 'REST') {
                if (currentSet < currentExercise.sets) {
                    setCurrentSet(prev => prev + 1); 
                    setWorkoutPhase('PREP');
                    setTimer(10);
                } else {
                    const nextExerciseIndex = currentExerciseIndex + 1;
                    if (nextExerciseIndex < activeWorkout.exercises.length) {
                        setCurrentExerciseIndex(nextExerciseIndex);
                        setCurrentSet(1);
                        setWorkoutPhase('PREP');
                        setTimer(10);
                    } else {
                        saveWorkout(activeWorkout);
                    }
                }
            }
        }, 500); 

        return () => clearTimeout(delayTimeout);
      };


    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(countdown);
          handleTimerEnd();
          return 1; 
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
        clearInterval(countdown);
    };
    
  }, [isWorkoutActive, activeWorkout, workoutPhase, currentSet, currentExerciseIndex, workoutStartTime, history, currentUser]);

  
  const handleLogout = async () => { await signOut(auth); };
  const handleClearPlan = async () => {
    if (window.confirm("Are you sure?")) {
      const clearedPlan = { ...workoutPlan, exercises: [] };
      await updateDoc(doc(db, 'users', currentUser.uid), { workoutPlan: clearedPlan });
      setWorkoutPlan(clearedPlan);
    }
  };
  const handleClearHistory = async () => {
    if (window.confirm("DANGER: Are you sure?")) {
      await updateDoc(doc(db, 'users', currentUser.uid), { history: [] });
      setHistory([]);
    }
  };
  const handleAddExercise = async (exercise) => {
    const libraryItem = exerciseLibrary.find(ex => ex.name === exercise.name);
    const exerciseWithId = { 
        id: Date.now(),
        name: exercise.name,
        sets: exercise.sets,
        reps: exercise.reps,
        rest: exercise.rest,
        caloriesPerSet: libraryItem.caloriesPerSet,
        imageUrl: libraryItem.imageUrl,
        duration: libraryItem.duration,
    };
    const updatedPlan = { ...workoutPlan, exercises: [...workoutPlan.exercises, exerciseWithId] };
    await updateDoc(doc(db, 'users', currentUser.uid), { workoutPlan: updatedPlan });
    setWorkoutPlan(updatedPlan);
  };
  
  const startWorkout = async (plan) => {
    if (plan.exercises.length === 0) return;
    
    if (pendingWorkout) {
        if (!window.confirm("You have an unfinished workout. Starting a new one will discard the old one's progress. Continue?")) {
            return;
        }
        await updateDoc(doc(db, 'users', currentUser.uid), { pendingWorkout: null });
        setPendingWorkout(null);
    }
    
    setActiveWorkout(plan);
    setCurrentExerciseIndex(0);
    setCurrentSet(1);
    setWorkoutPhase('PREP');
    setTimer(10);
    setWorkoutStartTime(Date.now());
    setIsWorkoutActive(true);
  };
  
  const handleQuickStart = (exerciseName) => {
    const libraryItem = exerciseLibrary.find(ex => ex.name === exerciseName);
    const quickStartPlan = {
      name: `Quick Start: ${exerciseName}`,
      exercises: [{ ...libraryItem, id: Date.now(), sets: 3, reps: 10, rest: 60 }]
    };
    startWorkout(quickStartPlan);
  };
  
  const generatePeripheryParticles = (count, minSize, maxSize, opacityRange) => {
    const particles = [];
    for (let i = 0; i < count; i++) {
      const size = minSize + Math.random() * (maxSize - minSize);
      const opacity = opacityRange[0] + Math.random() * (opacityRange[1] - opacityRange[0]);
      const isHorizontal = Math.random() < 0.5; 
      let left, top;
      if (isHorizontal) {
        left = Math.random() * 100;
        top = Math.random() < 0.5 ? Math.random() * 20 : 80 + Math.random() * 20; 
      } else {
        left = Math.random() < 0.5 ? Math.random() * 20 : 80 + Math.random() * 20; 
        top = Math.random() * 100;
      }

      particles.push({
        id: i,
        size,
        left,
        top,
        delay: Math.random() * 5,
        duration: Math.random() * 8 + 5, 
        opacity,
      });
    }
    return particles;
  };

  const particles = generatePeripheryParticles(40, 2, 6, [0.1, 0.5]); 

   if (loading) {
          return (
              <div className="min-h-screen bg-slate-900 flex items-center justify-center">
               <DumbbellAnimation />
              </div>
          );
      }
  return (
    <div className="relative min-h-screen bg-slate-900 text-white p-4 sm:p-8 overflow-hidden">
      
       <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {particles.map(p => (
            <motion.div
              key={p.id}
              className="absolute bg-[#a4f16c] rounded-full" 
              style={{
                width: p.size,
                height: p.size,
                left: `${p.left}%`,
                top: `${p.top}%`,
              }}
              
              animate={{
                opacity: [p.opacity, p.opacity + 0.2, p.opacity], 
                scale: [1, 1.1, 1], 
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: p.delay,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="w-1/2 h-1/2 bg-gradient-radial from-[#a4f16c]/10 to-transparent rounded-full blur-3xl" />
        </div>
      
      <main className="relative z-10 max-w-7xl mx-auto">
        <Header onLogout={handleLogout} onClearHistory={handleClearHistory} />

        {isReminderVisible && (
            <WorkoutReminder 
                days={daysSinceLastWorkout} 
                onDismiss={handleDismissReminder} 
            />
        )}
      
        <KpiCards kpis={kpis} />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
          <WeeklyChart data={weeklyChartData} />
          <WorkoutPlan 
            plan={enrichedWorkoutPlan} 
            onStart={startWorkout} 
            onClear={handleClearPlan} 
            onDeleteExercise={handleDeleteExercise}
            onEditExercise={handleOpenEditModal}
            onAddExercise={() => setIsModalOpen(true)}
          />
        </div>
           {!isWorkoutActive && (
            <PendingWorkoutPrompt 
                pendingWorkout={pendingWorkout}
                onResume={handleResumeWorkout}
                onDiscard={handleDiscardWorkout}
            />
        )}
        <ExerciseLibrary exercises={exerciseLibrary} onQuickStart={handleQuickStart} />
      </main>
      
      {isWorkoutActive && (
        <ActiveWorkout 
          workout={activeWorkout}
          timer={timer}
          setTimer={setTimer}
          phase={workoutPhase}
          currentIndex={currentExerciseIndex}
          currentSet={currentSet}
          onFinishSet={handleFinishSet} 
          onSkipExercise={handleSkipExercise}
          onEnd={handleEndPrematurely}
        />
      )}

      <AddExerciseModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddExercise}
        exercises={exerciseLibrary}
      />
      <EditExerciseModal
        isOpen={isEditModalOpen}
        onClose={() => {
            setIsEditModalOpen(false);
            setExerciseToEdit(null);
        }}
        onUpdate={handleUpdateExercise}
        exercise={exerciseToEdit}
      />
      
    </div>
  );
};

export default Dashboard;