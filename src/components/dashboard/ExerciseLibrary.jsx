// src/components/dashboard/ExerciseLibrary.jsx
import React, { useState } from 'react';
import { FaPlay } from 'react-icons/fa';

// UPDATED: Now receives an 'exercises' prop (array of objects)
const ExerciseLibrary = ({ exercises, onQuickStart }) => {
  // --- ENHANCEMENT: State to manage visibility of extra exercises ---
  const [showAll, setShowAll] = useState(false);
  
  // --- ENHANCEMENT: Define how many exercises to show initially ---
  const initialLimit = 4;
  const displayedExercises = showAll ? exercises : exercises.slice(0, initialLimit);

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
      {/* --- ENHANCEMENT: Centered heading on mobile/tabs --- */}
      <h3 className="text-xl font-bold mb-4 text-center sm:text-left">Exercise Library</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* UPDATED: Map over the 'displayedExercises' array */}
        {displayedExercises.map(exercise => (
          <div key={exercise.name} className="bg-slate-700/50 rounded-lg flex flex-col overflow-hidden group">
            <img 
              // UPDATED: Use the specific imageUrl from the object
              src={exercise.imageUrl} 
              alt={exercise.name} 
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-3 flex flex-col flex-grow">
              {/* UPDATED: Use exercise.name */}
              <p className="font-bold flex-grow mb-3 text-center">{exercise.name}</p>
              <button
                // UPDATED: Changed button classes for a green outline border
                onClick={() => onQuickStart(exercise.name)}
                // KEY CHANGE: Removed solid background, added green border and green text
                className="w-full font-semibold text-sm text-[#a4f16c] border-2 border-[#a4f16c] hover:bg-[#a4f16c]/10 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <FaPlay /> Start
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- ENHANCEMENT: "Explore More" button to prevent overcrowding --- */}
      {exercises.length > initialLimit && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="font-semibold text-md text-[#a4f16c] border-2 border-[#a4f16c] hover:bg-[#a4f16c]/20 py-2 px-6 rounded-lg transition-colors"
          >
            {showAll ? 'Show Less' : 'Explore More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ExerciseLibrary;