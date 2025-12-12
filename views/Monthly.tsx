import React, { useEffect, useRef, useState } from 'react';
import { Fish } from '../components/Fish';
import { DiarySidebar } from '../components/DiarySidebar';
import { getEntriesByMonth } from '../services/storage';
import { DiaryEntry } from '../types';

export const Monthly: React.FC = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const now = new Date();
    setEntries(getEntriesByMonth(now.getFullYear(), now.getMonth()));

    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className="h-[calc(100vh-80px)] w-full relative flex items-center justify-center p-4">
      {/* Hint Text */}
      <div className="absolute top-8 left-0 right-0 text-center z-20 pointer-events-none">
        <span className="text-[#a8cfb4] font-serif italic text-lg tracking-wide opacity-80 mix-blend-plus-lighter drop-shadow-lg">
          Hover over the fish to view the diary.
        </span>
      </div>

      {/* Aquarium Container */}
      <div 
        ref={containerRef}
        className="w-full h-full max-w-6xl relative rounded-[3rem] shadow-2xl overflow-hidden border border-white/5"
        style={{
          backgroundColor: '#0f1712', // Deep, almost black-green base
          background: `
            radial-gradient(circle at 15% 25%, #2a402e 0%, transparent 45%),
            radial-gradient(circle at 75% 15%, #1e2f23 0%, transparent 40%),
            radial-gradient(circle at 50% 60%, #344e39 0%, transparent 60%),
            radial-gradient(circle at 85% 85%, #233628 0%, transparent 45%),
            radial-gradient(circle at 20% 80%, #1a2920 0%, transparent 40%),
            #0f1712
          `,
          boxShadow: 'inset 0 0 150px rgba(0,0,0,0.8), 0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Noise Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none z-0 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Ambient Floating Particles (Static Decor) */}
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-green-900/20 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-yellow-900/10 blur-3xl rounded-full" />

        {/* Decor: Organic "Algae" Dots */}
        <div className="absolute top-1/3 left-10 w-3 h-3 rounded-full bg-[#4a6b50]/30 animate-[float_10s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-20 w-4 h-4 rounded-full bg-[#5a7b60]/20 animate-[float_14s_ease-in-out_infinite_1s]" />
        <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-[#3a5b40]/20 animate-[float_18s_ease-in-out_infinite_2s]" />

        {entries.length === 0 ? (
          <div className="flex items-center justify-center h-full text-[#4a6b50] font-serif italic text-2xl tracking-wide z-10 relative">
            The water is deep and still...
          </div>
        ) : (
          entries.map((entry) => (
            <Fish
              key={entry.id}
              entry={entry}
              containerDimensions={dimensions}
              onHover={setSelectedEntry}
              onLeave={() => setSelectedEntry(null)}
            />
          ))
        )}
      </div>

      <DiarySidebar entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
    </div>
  );
};