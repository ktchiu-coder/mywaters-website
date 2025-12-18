import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Label } from 'recharts';
import { DiaryEntry } from '../types';
import { MOODS } from '../constants';

interface MoodChartProps {
  entries: DiaryEntry[];
}

export const MoodChart: React.FC<MoodChartProps> = ({ entries }) => {
  if (entries.length === 0) return <div className="text-xs text-gray-400">No data</div>;

  const data = Object.values(MOODS).map(moodConfig => {
    return {
      name: moodConfig.description,
      value: entries.filter(e => e.mood === moodConfig.label).length,
      color: moodConfig.color
    };
  }).filter(d => d.value > 0);

  const renderCustomizedLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, value, index, name } = props;
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 15;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="#2A211B" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        style={{ fontSize: '10px', fontWeight: 'bold', opacity: 0.8 }}
      >
        {name} ({value})
      </text>
    );
  };

  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={45}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
            label={renderCustomizedLabel}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <Label 
              value={entries.length} 
              position="center" 
              fill="#2A211B"
              style={{ fontSize: '16px', fontWeight: 'bold' }}
            />
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