// src/components/dashboard/WorkoutPlan.jsx
import React from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const WorkoutPlan = ({ plan, onStart, onClear, onAddExercise }) => {
  return (
    <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700 rounded-2xl p-6 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Your Workout Plan</h3>
        <div className="flex items-center gap-3">
          <button onClick={onClear} title="Clear Workout Plan" className="text-xl text-slate-400 hover:text-red-500">
            <FaTrash />
          </button>
          <button onClick={onAddExercise} title="Add Exercise" className="text-2xl text-slate-400 hover:text-[#a4f16c]">
            <FaPlus />
          </button>
        </div>
      </div>
      <div className="space-y-3 overflow-y-auto pr-2 flex-grow">
        {plan?.exercises.map(ex => (
          <div key={ex.id} className="flex items-center gap-4 bg-slate-700/50 p-3 rounded-lg">
            {/* UPDATED: Use the new ex.imageUrl property */}
            <img 
              src={ex.imageUrl} 
              alt={ex.name} 
              className="w-12 h-12 rounded-md object-cover" 
            />
            <div>
              <p className="font-bold">{ex.name}</p>
              <p className="text-sm text-slate-400">{ex.sets}x{ex.reps} reps, {ex.rest}s rest</p>
            </div>
          </div>
        ))}
        {plan?.exercises.length === 0 && <p className="text-slate-400 text-center py-8">Your plan is empty.</p>}
      </div>
      <button
        onClick={() => onStart(plan)}
        className="w-full mt-4 font-bold text-lg text-slate-900 bg-[#a4f16c] hover:bg-[#8cd953] py-3 rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
        disabled={plan?.exercises.length === 0}
      >
        START PLANNED WORKOUT
      </button>
    </div>
  );
};

export default WorkoutPlan;