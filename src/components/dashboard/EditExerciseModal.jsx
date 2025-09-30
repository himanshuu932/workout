// src/components/dashboard/EditExerciseModal.jsx
import React, { useState, useEffect } from 'react';

const EditExerciseModal = ({ isOpen, onClose, onUpdate, exercise }) => {
  // Initialize state as null. It will be populated by the useEffect hook.
  const [editedExercise, setEditedExercise] = useState(null);

  // This effect syncs the component's internal state with the exercise prop.
  // It runs when the modal is opened (when `exercise` changes from null to an object).
  useEffect(() => {
    // We create a copy to avoid directly mutating the prop object.
    if (exercise) {
      setEditedExercise({ ...exercise });
    }
  }, [exercise]);

  // This is the crucial guard. If the modal isn't open or if the internal state
  // hasn't been populated yet, we render nothing. This prevents the error.
  if (!isOpen || !editedExercise) {
    return null;
  }

  // A single handler for all form input changes.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedExercise(prev => ({
      ...prev,
      // Ensure the value is parsed as an integer.
      [name]: parseInt(value) || 0,
    }));
  };

  const handleUpdate = () => {
    onUpdate(editedExercise);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-md m-4">
        {/* We can safely access exercise.name because the guard above ensures it's not null */}
        <h3 className="text-2xl font-bold mb-2">Edit Exercise</h3>
        <p className="text-slate-400 mb-6">Editing: <span className="font-semibold text-white">{exercise.name}</span></p>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-bold text-slate-400 block mb-2">Sets</label>
              <input 
                type="number"
                name="sets" // Add name attribute
                value={editedExercise.sets} 
                onChange={handleChange}
                className="w-full p-3 bg-slate-700 rounded-lg border border-slate-600" 
              />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-400 block mb-2">Reps</label>
              <input 
                type="number" 
                name="reps" // Add name attribute
                value={editedExercise.reps} 
                onChange={handleChange}
                className="w-full p-3 bg-slate-700 rounded-lg border border-slate-600" 
              />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-400 block mb-2">Rest (s)</label>
              <input 
                type="number" 
                name="rest" // Add name attribute
                value={editedExercise.rest} 
                onChange={handleChange}
                className="w-full p-3 bg-slate-700 rounded-lg border border-slate-600" 
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-8">
          <button onClick={handleUpdate} className="flex-1 font-semibold text-slate-900 bg-[#a4f16c] hover:bg-[#8cd953] px-8 py-3 rounded-lg transition-colors">Update</button>
          <button onClick={onClose} className="flex-1 font-semibold text-white bg-slate-600 hover:bg-slate-500 px-8 py-3 rounded-lg transition-colors">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditExerciseModal;