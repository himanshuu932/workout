import React from 'react';

const PendingWorkoutPrompt = ({ pendingWorkout, onResume, onDiscard }) => {
  if (!pendingWorkout) return null;

  const {
    originalPlan,
    currentExerciseIndex,
    currentSet,
    workoutStartTime,
    pauseTime,
    caloriesBurnedSoFar
  } = pendingWorkout;

  const currentExercise = originalPlan.exercises[currentExerciseIndex];

  // --- Helper Functions for Formatting ---
  const formatTime = (start, end) => {
    const seconds = Math.floor((end - start) / 1000);
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const timeSpent = formatTime(workoutStartTime, pauseTime);
  const datePaused = formatDate(pauseTime);

  return (
    <div className="
      relative bg-slate-800/50 border border-[#a4f16c]
      p-6 mb-8 rounded-2xl
    ">
      
      {/* Main Container: Removed items-start to allow columns to stretch on desktop */}
      <div className="flex flex-col md:flex-row justify-between gap-8">
        
        {/* --- Left Column --- */}
        {/* On desktop, this is now a flex column itself, distributing space between its children */}
        <div className="md:pl-2 order-1 md:flex md:flex-col md:justify-between">
          {/* Top part of the left column */}
          <div>
            <h3 className="text-xl font-bold text-[#a4f16c] uppercase tracking-wider">
              Unfinished Workout
            </h3>
            <p className="text-slate-300 mt-2">
              You left a session in progress. Pick up where you left off.
            </p>
          </div>
          
          {/* Desktop-only buttons: These are pushed to the bottom by justify-between */}
          <div className="hidden md:flex gap-3 w-full md:w-auto mt-6">
            <button
              onClick={onDiscard}
              className="flex-1 md:flex-none font-semibold bg-slate-700 hover:bg-slate-600 py-2 px-5 rounded-lg transition-colors"
            >
              Discard
            </button>
            <button
              onClick={onResume}
              className="flex-1 md:flex-none font-bold text-slate-900 bg-[#a4f16c] hover:bg-[#8cd953] py-2 px-5 rounded-lg transition-colors"
            >
              Resume
            </button>
          </div>
        </div>

        {/* --- Right Column (Stats) --- */}
        <div className="w-full md:w-auto flex flex-col items-start md:items-end gap-2 order-2">
          <div className="text-left md:text-right">
              <p className="text-slate-300">Last Activity:</p>
              <p className="font-bold text-[#a4f16c] text-2xl">
                {currentExercise.name}
              </p>
              <p className="text-slate-400 -mt-1">
                (Set {currentSet} / {currentExercise.sets})
              </p>
          </div>
          
          <div className="flex gap-6 text-left md:text-right mt-4 pt-4 border-t border-slate-700">
            <div>
              <p className="text-sm text-slate-400">Time Spent</p>
              <p className="text-xl font-bold text-white">{timeSpent}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Calories Burned</p>
              <p className="text-xl font-bold text-white">{caloriesBurnedSoFar} kcal</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Date Paused</p>
              <p className="text-xl font-bold text-white">{datePaused}</p>
            </div>
          </div>
        </div>
      
        {/* --- Mobile-Only Buttons --- */}
        <div className="flex md:hidden gap-3 w-full order-3">
          <button
            onClick={onDiscard}
            className="flex-1 md:flex-none font-semibold bg-slate-700 hover:bg-slate-600 py-2 px-5 rounded-lg transition-colors"
          >
            Discard
          </button>
          <button
            onClick={onResume}
            className="flex-1 md:flex-none font-bold text-slate-900 bg-[#a4f16c] hover:bg-[#8cd953] py-2 px-5 rounded-lg transition-colors"
          >
            Resume
          </button>
        </div>

      </div>
    </div>
  );
};

export default PendingWorkoutPrompt;