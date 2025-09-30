import React, { useState, useEffect, useMemo } from 'react';
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
import PendingWorkoutPrompt from './dashboard/PendingWorkoutPrompt'; // Import the new component
import EditExerciseModal from './dashboard/EditExerciseModal'; // Import the new modal

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

  // NEW: State for pending workout
  const [pendingWorkout, setPendingWorkout] = useState(null);
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [exerciseToEdit, setExerciseToEdit] = useState(null);
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
          // NEW: Load pending workout from database
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
  
// --- Handlers for Workout Flow ---

  // UPDATED: No longer takes 'isPartial'. A saved workout is always a complete one.
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
      isPartial: false // A saved workout is never partial in this new logic
    };
    
    const updatedHistory = [completedWorkout, ...history];
    // Also ensure the pending workout is cleared from DB upon successful completion
    await updateDoc(doc(db, 'users', currentUser.uid), { history: updatedHistory, pendingWorkout: null });
    setHistory(updatedHistory);
    setPendingWorkout(null);

    setIsWorkoutActive(false);
    setActiveWorkout(null);
  };

   const handleDeleteExercise = async (exerciseId) => {
    // Add this confirmation dialog
    if (window.confirm("Are you sure you want to remove this exercise?")) {
      if (!workoutPlan) return;
      
      // Filter out the exercise with the matching ID
      const updatedExercises = workoutPlan.exercises.filter(ex => ex.id !== exerciseId);
      const updatedPlan = { ...workoutPlan, exercises: updatedExercises };
      
      // Update the database
      await updateDoc(doc(db, 'users', currentUser.uid), { workoutPlan: updatedPlan });
      
      // Update the local state to re-render the component
      setWorkoutPlan(updatedPlan);
    }
  };
  const handleEndPrematurely = async () => {
    if (!activeWorkout) return;
    if (!window.confirm("Are you sure you want to end the workout early? Your progress will be paused.")) {
        return;
    }

    // NEW: Calculate calories burned so far before pausing
    let caloriesBurnedSoFar = 0;
    const completedExercises = activeWorkout.exercises.slice(0, currentExerciseIndex);
    completedExercises.forEach(ex => {
        // Ensure caloriesPerSet is a number to avoid NaN issues
        caloriesBurnedSoFar += (ex.sets || 0) * (ex.caloriesPerSet || 0);
    });

    const currentExercise = activeWorkout.exercises[currentExerciseIndex];
    if (currentExercise && currentSet > 1) {
        // Add calories for completed sets of the current exercise
        caloriesBurnedSoFar += (currentSet - 1) * (currentExercise.caloriesPerSet || 0);
    }
    
    // UPDATED: The new object now includes pauseTime and caloriesBurnedSoFar
    const newPendingWorkout = {
      originalPlan: activeWorkout,
      currentExerciseIndex: currentExerciseIndex,
      currentSet: currentSet,
      workoutStartTime: workoutStartTime,
      pauseTime: Date.now(), // NEW: Record the exact time of pausing
      caloriesBurnedSoFar: Math.round(caloriesBurnedSoFar) // NEW: Record calories
    };

    await updateDoc(doc(db, 'users', currentUser.uid), { pendingWorkout: newPendingWorkout });
    setPendingWorkout(newPendingWorkout);

    setIsWorkoutActive(false);
    setActiveWorkout(null);
  };

// ... (keep all other code in Dashboard.jsx the same)
  
  // NEW: Handler to resume a pending workout
  const handleResumeWorkout = () => {
      if (!pendingWorkout) return;
      
      setActiveWorkout(pendingWorkout.originalPlan);
      setCurrentExerciseIndex(pendingWorkout.currentExerciseIndex);
      setCurrentSet(pendingWorkout.currentSet);
      setWorkoutStartTime(pendingWorkout.workoutStartTime);
      
      // Resume by going into a prep phase for the current exercise
      setWorkoutPhase('PREP');
      setTimer(10);
      setIsWorkoutActive(true);

      // Pending workout is now active, so clear it from state (it will be cleared from DB on completion)
      setPendingWorkout(null);
  };

  // NEW: Handler to discard a pending workout
  const handleDiscardWorkout = async () => {
      if (!pendingWorkout) return;
      if (window.confirm("Are you sure you want to discard this unfinished workout? This cannot be undone.")) {
          await updateDoc(doc(db, 'users', currentUser.uid), { pendingWorkout: null });
          setPendingWorkout(null);
      }
  };


  // HANDLER FOR MANUAL BUTTON PRESS (FINISH SET) - Now just forces the phase change via setTimer(1)
  const handleFinishSet = () => {
    if (!activeWorkout || workoutPhase !== 'WORK') return;
    
    // Force the timer to 1. The next interval tick (within 1 second) will call handleTimerEnd, 
    // which contains the new 3-second delay logic.
    setTimer(1); 
    console.log("Manual finish: Forcing timer to 1 to trigger delayed transition.");
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
      // If skipping the last exercise, treat it as ending prematurely
      handleEndPrematurely();
    }
  };
  const handleOpenEditModal = (exercise) => {
    setExerciseToEdit(exercise);
    setIsEditModalOpen(true);
  };

  const handleUpdateExercise = async (updatedExercise) => {
    if (!workoutPlan || !updatedExercise) return;

    // Find and update the exercise in the plan
    const updatedExercises = workoutPlan.exercises.map(ex => 
      ex.id === updatedExercise.id ? updatedExercise : ex
    );

    const updatedPlan = { ...workoutPlan, exercises: updatedExercises };

    // Save to Firestore and update local state
    await updateDoc(doc(db, 'users', currentUser.uid), { workoutPlan: updatedPlan });
    setWorkoutPlan(updatedPlan);

    // Close the modal
    setIsEditModalOpen(false);
    setExerciseToEdit(null);
  };
  // CRITICAL FIX: The handleTimerEnd function now wraps phase transitions in a 3-second setTimeout.
  useEffect(() => {
    if (!isWorkoutActive || !activeWorkout) return;

    const handleTimerEnd = () => {
        const currentExercise = activeWorkout.exercises[currentExerciseIndex];
        
        // Use a 3-second delay for all phase transitions
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
                        // UPDATED: Pass false for isPartial, as this is a full completion
                        saveWorkout(activeWorkout);
                    }
                }
            }
        }, 500); 

        // Return a cleanup function for the timeout
        return () => clearTimeout(delayTimeout);
      };


    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          // IMPORTANT: Clear interval first, then execute the delayed handler
          clearInterval(countdown);
          const cleanupTimeout = handleTimerEnd(); // Execute the handler which sets the delay
          
          // The effect cleanup will now manage the timeout itself
          
          // Return the last non-zero value (1) to prevent the visual flash of 0.
          return 1; 
        }
        return prev - 1;
      });
    }, 1000);

    // This cleanup runs when the component unmounts OR when dependencies change.
    // It must clear both the interval AND the ongoing timeout (if any).
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
  
  // UPDATED: Checks for a pending workout before starting a new one.
  const startWorkout = async (plan) => {
    if (plan.exercises.length === 0) return;
    
    if (pendingWorkout) {
        if (!window.confirm("You have an unfinished workout. Starting a new one will discard the old one's progress. Continue?")) {
            return;
        }
        // Discard the old one before starting the new one
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
  

  if (loading) { return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>; }
  
  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-8">
      <main className="max-w-7xl mx-auto">
        <Header onLogout={handleLogout} onClearHistory={handleClearHistory} />
        
        {/* NEW: Render the prompt if a pending workout exists and a workout is NOT active */}
     

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