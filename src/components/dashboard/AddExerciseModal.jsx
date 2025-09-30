// src/components/dashboard/AddExerciseModal.jsx
import React, { useState } from 'react';

// UPDATED: Receives 'exercises' prop instead of 'exerciseNames'
const AddExerciseModal = ({ isOpen, onClose, onAdd, exercises }) => {
  // Set the default name from the first item in the exercises array
  const [exercise, setExercise] = useState({ name: exercises[0]?.name || '', sets: 3, reps: 10, rest: 60 });
  
  if (!isOpen) return null;

  const handleAdd = () => {
    onAdd(exercise);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-md m-4">
        <h3 className="text-2xl font-bold mb-6">Add New Exercise</h3>
        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-400 block">Exercise</label>
          <select value={exercise.name} onChange={e => setExercise({ ...exercise, name: e.target.value })} className="w-full p-3 bg-slate-700 rounded-lg border border-slate-600">
            {/* UPDATED: Map over 'exercises' to get the name for each option */}
            {exercises.map(ex => <option key={ex.name} value={ex.name}>{ex.name}</option>)}
          </select>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-bold text-slate-400 block mb-2">Sets</label>
              <input type="number" value={exercise.sets} onChange={e => setExercise({ ...exercise, sets: parseInt(e.target.value) })} className="w-full p-3 bg-slate-700 rounded-lg border border-slate-600" />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-400 block mb-2">Reps</label>
              <input type="number" value={exercise.reps} onChange={e => setExercise({ ...exercise, reps: parseInt(e.target.value) })} className="w-full p-3 bg-slate-700 rounded-lg border border-slate-600" />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-400 block mb-2">Rest (s)</label>
              <input type="number" value={exercise.rest} onChange={e => setExercise({ ...exercise, rest: parseInt(e.target.value) })} className="w-full p-3 bg-slate-700 rounded-lg border border-slate-600" />
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-8">
          <button onClick={handleAdd} className="flex-1 font-semibold text-slate-900 bg-[#a4f16c] hover:bg-[#8cd953] px-8 py-3 rounded-lg transition-colors">Add</button>
          <button onClick={onClose} className="flex-1 font-semibold text-white bg-slate-600 hover:bg-slate-500 px-8 py-3 rounded-lg transition-colors">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddExerciseModal;