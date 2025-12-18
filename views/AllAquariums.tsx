import React, { useState, useEffect } from 'react';
import { getAvailableYears, getEntriesByMonth } from '../services/storage';
import { DiaryEntry } from '../types';
import { MoodChart } from '../components/MoodChart';
import { ChevronDown, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

interface MonthData {
  monthIndex: number;
  entries: DiaryEntry[];
}

const MonthReflection: React.FC<{ entries: DiaryEntry[] }> = ({ entries }) => {
    const [reflection, setReflection] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const generateReflection = async () => {
        if (entries.length === 0) return;
        setLoading(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `
                I have a list of diary entries from a user for a specific month. 
                Each entry has a mood and a description.
                Entries: ${entries.map(e => `Mood: ${e.mood}, Text: ${e.text}`).join(' | ')}
                
                Please provide a short, compassionate summary (2-3 sentences) of the user's emotions over this entire month. 
                Also, identify specific activities or moments mentioned in the text that seem to trigger feelings of calmness or happiness.
                Format the response as a friendly reflection.
            `;
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: prompt
            });
            setReflection(response.text);
        } catch (err) {
            console.error(err);
            setReflection("The waters are a bit murky right now... I couldn't dive deep enough for a reflection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4 border-t border-[#2A211B]/10 pt-4 relative z-10">
            {!reflection && !loading && (
                <button 
                    onClick={generateReflection}
                    className="flex items-center gap-2 text-xs font-bold text-[#2A211B]/60 hover:text-[#2A211B] transition-colors uppercase tracking-widest"
                >
                    <Sparkles className="w-3 h-3" />
                    Generate AI Reflection
                </button>
            )}
            {loading && (
                <div className="flex items-center gap-2 text-xs text-[#2A211B]/60 italic">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Gazing into the waters...
                </div>
            )}
            {reflection && (
                <div className="text-sm text-[#2A211B] leading-relaxed italic animate-in fade-in slide-in-from-top-2">
                    <p className="font-serif">"{reflection}"</p>
                </div>
            )}
        </div>
    );
};

// Reusable Tank Component
const MonthTank: React.FC<{ 
  monthName: string; 
  entries: DiaryEntry[]; 
  isHero?: boolean; 
}> = ({ monthName, entries, isHero = false }) => {
  return (
    <div className={`flex flex-col items-center group transition-all duration-700 ${isHero ? 'scale-100' : 'scale-95 hover:scale-100'}`}>
        <h3 className={`${isHero ? 'text-6xl md:text-7xl mb-10' : 'text-3xl mb-4'} font-serif text-[#eaddcf] tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-center transition-all duration-500`}>
            {monthName}
        </h3>
        
        <div className={`relative ${isHero ? 'w-[320px] md:w-[420px]' : 'w-[260px]'} aspect-square mb-8 transition-all duration-500`}>
            <div 
                className="w-full h-full rounded-[2.5rem] relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-[4px] border-white/5 backdrop-blur-sm bg-[#1a2e35]"
                style={{
                    background: 'radial-gradient(circle at 50% 120%, rgba(6,182,212,0.2), rgba(0,0,0,0) 70%), linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(30,50,60,0.5) 100%)',
                    boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8), 0 20px 40px rgba(0,0,0,0.6)'
                }}
            >
                <div className="absolute top-[15%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                {entries.map((entry) => {
                    const topPos = 25 + (Math.random() * 55); 
                    const leftPos = 15 + (Math.random() * 70);
                    const delay = Math.random() * -10;
                    const duration = 4 + Math.random() * 6;
                    const isFacingLeft = Math.random() > 0.5;

                    return (
                        <div
                            key={entry.id}
                            className="absolute animate-swim-horizontal"
                            style={{
                                top: `${topPos}%`,
                                left: `${leftPos}%`,
                                animationDuration: `${duration}s`,
                                animationDelay: `${delay}s`,
                            }}
                        >
                            <div 
                                className={`rounded-full rounded-tr-none shadow-[0_0_8px_rgba(255,255,255,0.4)] ${isHero ? 'w-5 h-5' : 'w-3 h-3'}`}
                                style={{
                                    backgroundColor: entry.color_code,
                                    transform: isFacingLeft ? 'rotate(135deg)' : 'rotate(-45deg)',
                                    animation: 'sway 3s ease-in-out infinite alternate',
                                    animationDelay: `${delay}s`
                                }}
                                title={entry.mood}
                            />
                        </div>
                    );
                })}

                {entries.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white/10 text-5xl font-serif italic">~</span>
                    </div>
                )}
            </div>
        </div>

        <div className={`w-full ${isHero ? 'max-w-[320px] md:max-w-[420px] p-6' : 'max-w-[260px] p-4'} bg-[#E8DFC5] rounded-xl shadow-lg relative overflow-hidden transform transition-all hover:translate-y-[-2px]`}>
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-yellow-900/10 mix-blend-multiply" />
            
            <div className="flex justify-between items-center mb-1 relative z-10 border-b border-[#2A211B]/10 pb-2">
                <span className="text-sm font-bold text-[#2A211B] uppercase tracking-widest opacity-80">Moods</span>
                <span className="text-sm font-serif italic text-[#3E3228] font-semibold">{entries.length} Entries</span>
            </div>
            <div className="relative z-10">
                    <MoodChart entries={entries} />
            </div>
            
            <MonthReflection entries={entries} />
        </div>
    </div>
  );
};

export const AllAquariums: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [years, setYears] = useState<number[]>([]);
  const [yearData, setYearData] = useState<MonthData[]>([]);

  useEffect(() => {
    setYears(getAvailableYears());
  }, []);

  useEffect(() => {
    const data = MONTH_NAMES.map((_, index) => ({
      monthIndex: index,
      entries: getEntriesByMonth(selectedYear, index)
    }));
    setYearData(data);
  }, [selectedYear]);

  const currentMonthIndex = new Date().getMonth();

  const heroMonthData = yearData.find(d => d.monthIndex === currentMonthIndex);
  const otherMonthsData = yearData.filter(d => d.monthIndex !== currentMonthIndex);

  return (
    <div className="w-full min-h-screen relative pb-32">
      <style>{`
        @keyframes swimHorizontal {
          0% { transform: translateX(-15px); }
          50% { transform: translateX(15px); }
          100% { transform: translateX(-15px); }
        }
        .animate-swim-horizontal {
          animation: swimHorizontal 8s ease-in-out infinite;
        }
      `}</style>

      <div className="sticky top-0 z-50 flex justify-center py-6 bg-gradient-to-b from-[#110e0d] to-transparent pointer-events-none">
         <div className="flex gap-6 items-center bg-black/40 px-8 py-3 rounded-full border border-white/5 backdrop-blur-md shadow-2xl pointer-events-auto">
            {years.length > 0 ? years.map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`transition-all duration-300 handwriting-font text-4xl ${
                    selectedYear === year 
                    ? 'text-[#eaddcf] drop-shadow-[0_0_12px_rgba(234,221,207,0.5)] scale-110' 
                    : 'text-white/30 hover:text-white/60'
                  }`}
                >
                  {year}
                </button>
            )) : (
                 <div className="text-4xl text-[#eaddcf] handwriting-font">{selectedYear}</div>
            )}
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        
        {heroMonthData && (
            <div className="min-h-[calc(85vh-120px)] flex flex-col justify-center items-center relative mb-20 fade-in">
                <MonthTank 
                    monthName={MONTH_NAMES[heroMonthData.monthIndex]} 
                    entries={heroMonthData.entries} 
                    isHero={true} 
                />
                
                <div className="absolute -bottom-8 md:bottom-0 flex flex-col items-center animate-bounce opacity-40">
                    <span className="text-[#eaddcf] text-[10px] uppercase tracking-[0.3em] mb-2 font-light">Past Months</span>
                    <ChevronDown className="text-[#eaddcf] w-5 h-5" />
                </div>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 pt-10 border-t border-white/5">
            {otherMonthsData.map((data) => (
                <MonthTank 
                    key={data.monthIndex}
                    monthName={MONTH_NAMES[data.monthIndex]} 
                    entries={data.entries} 
                    isHero={false}
                />
            ))}
        </div>

      </div>
    </div>
  );
};