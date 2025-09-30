// src/components/dashboard/ExerciseLibrary.jsx
import React, { useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';

// --- ENHANCEMENT: Custom hook to detect screen size for responsive logic ---
// This hook checks if the browser window matches a specific media query (like screen width)
const useMediaQuery = (query) => {
  // Safely get initial value for server-side rendering
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQueryList = window.matchMedia(query);
    const listener = (event) => setMatches(event.matches);

    // Modern way to listen for changes
    mediaQueryList.addEventListener('change', listener);

    // Cleanup listener on component unmount
    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
};


const ExerciseLibrary = ({ exercises, onQuickStart }) => {
  const [showAll, setShowAll] = useState(false);
  
  // --- ENHANCEMENT: Detect if the view is a tablet (md to lg breakpoint) ---
  // Tailwind CSS breakpoints: md: 768px, lg: 1024px.
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');

  // --- ENHANCEMENT: Set initial limit based on screen size ---
  // Show 6 items on tablet, and 4 on mobile or desktop.
  const initialLimit = isTablet ? 6 : 4;
  
  const displayedExercises = showAll ? exercises : exercises.slice(0, initialLimit);

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
      <h3 className="text-xl font-bold mb-4 text-center sm:text-left">Exercise Library</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedExercises.map(exercise => (
          <div key={exercise.name} className="bg-slate-700/50 rounded-lg flex flex-col overflow-hidden group">
            <img 
              src={exercise.imageUrl} 
              alt={exercise.name} 
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-3 flex flex-col flex-grow">
              <p className="font-bold flex-grow mb-3 text-center">{exercise.name}</p>
              <button
                onClick={() => onQuickStart(exercise.name)}
                className="w-full font-semibold text-sm text-[#a4f16c] border-2 border-[#a4f16c] hover:bg-[#a4f16c]/10 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <FaPlay /> Start
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* This button will only appear if there are more exercises than the initial limit */}
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