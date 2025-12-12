import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { DiaryEntry } from '../types';
import { MOODS } from '../constants';

interface MoodChartProps {
  entries: DiaryEntry[];
}

export const MoodChart: React.FC<MoodChartProps> = ({ entries }) => {
  if (entries.length === 0) return <div className="text-xs text-gray-400">No data</div>;

  const data = Object.values(MOODS).map(moodConfig => {
    return {
      name: moodConfig.label,
      value: entries.filter(e => e.mood === moodConfig.label).length,
      color: moodConfig.color
    };
  }).filter(d => d.value > 0);

  return (
    <div className="w-full h-32">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={25}
            outerRadius={40}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
            itemStyle={{ fontSize: '12px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};