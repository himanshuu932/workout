// src/components/dashboard/ActiveWorkout.jsx
import React, { useEffect } from 'react';

const ActiveWorkout = ({ workout, timer, setTimer,phase, currentIndex, currentSet, onFinishSet, onSkipExercise, onEnd }) => {
  const activeItem = workout.exercises[currentIndex];
   
  let totalDuration;
  if (phase === 'PREP') {
    totalDuration = 10;
  } else if (phase === 'WORK') {
    // Ensure totalDuration is consistent with Dashboard's calculation: 
    totalDuration = Math.max(activeItem.duration ?? 0, 30);
  } else if (phase === 'REST') {
    totalDuration = activeItem.rest;
  }
  
  const progress = totalDuration > 0 ? timer / totalDuration : 0;
  const circumference = 2 * Math.PI * 140;

  return (
    <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-between z-50 p-6 md:p-8">
      {/* Top Section: Exercise Info */}
      <div className="text-center">
        <p className="text-xl text-slate-400">{activeItem.name}</p>
        <p className="text-4xl md:text-5xl font-bold text-white">Set {currentSet} / {activeItem.sets}</p>
      </div>

      {/* Middle Section: Timer and Image */}
      <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center my-4">
        <img 
          src={activeItem.imageUrl} 
          alt={activeItem.name}
          className="w-full h-full rounded-full object-cover shadow-2xl shadow-black/50"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
            <svg className="absolute w-full h-full transform -rotate-90">
                <circle cx="50%" cy="50%" r="140" stroke="#334155" strokeWidth="12" fill="transparent" className=" md:block" />
                <circle
                    cx="50%" cy="50%" r="140"
                    stroke="#a4f16c" strokeWidth="12" fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - progress)}
                    className="transition-all duration-1000 linear  md:block"
                />
            </svg>
            <div className="text-center">
                <p className="text-2xl font-bold text-[#a4f16c] uppercase tracking-widest">{phase}</p>
                <p className="text-8xl font-mono font-extrabold text-white">{String(timer).padStart(2, '0')}</p>
            </div>
        </div>
      </div>

      {/* Bottom Section: Action Buttons */}
      <div className="w-full max-w-md space-y-3">
        {phase === 'WORK' && (
          <button onClick={onFinishSet} className="w-full font-semibold text-2xl bg-green-600 hover:bg-green-500 text-white py-4 rounded-lg transition-colors shadow-lg">
            FINISH SET
          </button>
        )}
        
        <div className="flex gap-3">
            {phase === 'WORK' && (
                <button onClick={onSkipExercise} className="flex-1 font-semibold bg-slate-700 hover:bg-slate-600 py-3 rounded-lg transition-colors">
                    Skip Exercise
                </button>
            )}
            {(phase === 'REST' || phase === 'PREP') && (
                <button onClick={() => setTimer(1)} className="flex-1 font-semibold bg-slate-700 hover:bg-slate-600 py-3 rounded-lg transition-colors">
                    Skip
                </button>
            )}
            <button onClick={onEnd} className="flex-1 font-semibold bg-red-800/80 hover:bg-red-800 text-red-100 py-3 rounded-lg transition-colors">
                End Workout
            </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveWorkout;