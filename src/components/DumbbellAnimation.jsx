export default function DumbbellAnimation() {
  return (
    <>
      <style jsx>{`
        /* --- LARGER PLATES (Move First) --- */
        @keyframes plateOuter {
          /* Stays at start */
          0% { transform: translateX(0); }
          /* Moves IN */
          20% { transform: translateX(var(--outer-translate)); }
          /* Holds IN position for the rest of the sequence */
          80% { transform: translateX(var(--outer-translate)); }
          /* Moves OUT at the end */
          100% { transform: translateX(0); }
        }

        /* --- SMALLER PLATES (Move Second) --- */
        @keyframes plateInner {
          /* Waits for outer plate to move */
          0%, 20% { transform: translateX(0); }
          /* Moves IN */
          40% { transform: translateX(var(--inner-translate)); }
          /* Holds IN for the pause */
          60% { transform: translateX(var(--inner-translate)); }
          /* Moves OUT first */
          80% { transform: translateX(0); }
          /* Stays OUT */
          100% { transform: translateX(0); }
        }

        .plate-left-outer {
          --outer-translate: 40px; 
          animation: plateOuter 4s ease-in-out infinite;
        }

        .plate-left-inner {
          --inner-translate: 20px;
          animation: plateInner 4s ease-in-out infinite;
        }

        .plate-right-outer {
          --outer-translate: -40px;
          animation: plateOuter 4s ease-in-out infinite;
        }

        .plate-right-inner {
          --inner-translate: -20px;
          animation: plateInner 4s ease-in-out infinite;
        }
      `}</style>
   
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <svg width="400" height="200" viewBox="0 0 400 200" className="w-full max-w-md">
          {/* Center bar */}
          <rect x="120" y="95" width="160" height="15" fill="#a4f16c" rx="5" />

          {/* Left outer plate */}
          <g className="plate-left-outer">
            <rect x="100" y="60" width="25" height="80" fill="#a4f16c" rx="10" />
          </g>

          {/* Left inner plate */}
          <g className="plate-left-inner">
            <rect x="100" y="72" width="20" height="55" fill="#a4f16c" rx="10" />
          </g>

          {/* Right inner plate */}
          <g className="plate-right-inner">
            <rect x="280" y="72" width="20" height="55" fill="#a4f16c" rx="10" />
          </g>

          {/* Right outer plate */}
          <g className="plate-right-outer">
            <rect x="280" y="60" width="25" height="80" fill="#a4f16c" rx="10" />
          </g>
        </svg>
      </div>
    </>
  )
}