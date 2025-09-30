// src/components/dashboard/KpiCards.jsx
import React from 'react';
import { FaFire, FaDumbbell, FaClock } from 'react-icons/fa';

const KpiCards = ({ kpis }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 flex items-center gap-4">
        <FaFire className="text-3xl text-[#a4f16c]" />
        <div>
          <p className="text-slate-400 text-sm">Calories This Week</p>
          <p className="text-2xl font-bold">{kpis.calories} kcal</p>
        </div>
      </div>
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 flex items-center gap-4">
        <FaDumbbell className="text-3xl text-[#a4f16c]" />
        <div>
          <p className="text-slate-400 text-sm">Workouts This Week</p>
          <p className="text-2xl font-bold">{kpis.workouts}</p>
        </div>
      </div>
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 flex items-center gap-4">
        <FaClock className="text-3xl text-[#a4f16c]" />
        <div>
          <p className="text-slate-400 text-sm">Average Duration</p>
          <p className="text-2xl font-bold">{kpis.avgTime}</p>
        </div>
      </div>
    </div>
  );
};

export default KpiCards;