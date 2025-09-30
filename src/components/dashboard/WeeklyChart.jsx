// src/components/dashboard/WeeklyChart.jsx
import React from 'react';
import { FaChartBar } from 'react-icons/fa';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const WeeklyChart = ({ data }) => {
  return (
    <div className="lg:col-span-3 bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <FaChartBar /> Weekly Activity (minutes)
      </h3>
      <div className="w-full h-64">
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="day" tick={{ fill: '#94a3b8' }} />
            <YAxis tick={{ fill: '#94a3b8' }} />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
            <Bar dataKey="minutes" fill="#a4f16c" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyChart;