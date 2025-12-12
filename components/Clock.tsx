import React, { useState, useEffect } from 'react';

export const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center mb-6">
      <div className="text-4xl md:text-5xl font-thin font-mono text-[#eaddcf] drop-shadow-[0_0_8px_rgba(234,221,207,0.4)] tracking-wider">
        {time.toLocaleTimeString([], { hour12: false })}
      </div>
      <div className="text-[#d6c4b0] mt-1 font-light uppercase tracking-[0.2em] text-xs drop-shadow-md">
        {time.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
    </div>
  );
};