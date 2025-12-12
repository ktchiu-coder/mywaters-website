import React, { useState } from 'react';
import { Clock } from '../components/Clock';
import { MOODS } from '../constants';
import { MoodType, DiaryEntry } from '../types';
import { saveEntry } from '../services/storage';
import { Check, Droplets } from 'lucide-react';

// Serene Lake with Grass in Foreground
const BACKGROUND_IMAGE = 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2560&auto=format&fit=crop';

export const Home: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [text, setText] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) {
      setFeedback('Please select a mood.');
      return;
    }
    if (!text.trim()) {
      setFeedback('Don\'t leave your thoughts empty.');
      return;
    }

    const now = new Date();
    const generatedTitle = `Mood Entry @ ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const entry: DiaryEntry = {
      id: crypto.randomUUID(),
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString(),
      title: generatedTitle,
      text,
      mood: selectedMood,
      color_code: MOODS[selectedMood].color,
    };

    saveEntry(entry);
    
    setText('');
    setSelectedMood(null);
    setFeedback('Fish dropped successfully!');
    
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-start pt-10 px-4 pb-24 overflow-hidden">
      
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${BACKGROUND_IMAGE})`,
          // Adjusted filter for the new nature scene to maintain readability but keep the vibe
          filter: 'brightness(0.65) contrast(1.05) saturate(0.9)' 
        }}
      />
      
      {/* Dark Gradient Overlay for Readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/50 via-black/10 to-black/60 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* Title */}
        <header className="text-center mb-8 w-full max-w-2xl">
          <h1 className="text-5xl md:text-6xl text-[#eaddcf] mb-2 handwriting-font drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-normal whitespace-nowrap">
            My Daily Emotion Waters
          </h1>
        </header>

        <Clock />

        {/* Floating Input Area */}
        <div className="relative w-full max-w-xl animate-[sway_8s_ease-in-out_infinite] origin-top">
          
          {/* Glassy/Dark Container */}
          <div 
            className="rounded-[3rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 backdrop-blur-md relative overflow-hidden transition-all duration-500"
            style={{
              backgroundColor: 'rgba(15, 20, 25, 0.6)', // Deep cool dark tone
              boxShadow: 'inset 0 0 60px rgba(0,0,0,0.8), 0 20px 40px rgba(0,0,0,0.6)'
            }}
          >
            <form onSubmit={handleSubmit} className="relative z-10">
              
              {/* Mood Selection */}
              <div className="mb-8 text-center">
                <label className="block text-[#eaddcf] text-2xl handwriting-font mb-6 drop-shadow-md opacity-90">
                  How is your mood today?
                </label>
                
                <div className="flex justify-center gap-6 md:gap-8 mb-2">
                  {(Object.keys(MOODS) as MoodType[]).map((mood) => (
                    <div key={mood} className="flex flex-col items-center gap-3 group">
                      <button
                        type="button"
                        onClick={() => setSelectedMood(mood)}
                        className={`
                          relative w-12 h-12 rounded-full transition-all duration-300 transform 
                          flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-white/20
                          ${selectedMood === mood ? 'scale-110 ring-2 ring-offset-2 ring-offset-black/50' : 'hover:scale-105 opacity-80 hover:opacity-100'}
                        `}
                        style={{ 
                          backgroundColor: MOODS[mood].color, 
                          ['--tw-ring-color' as any]: MOODS[mood].color,
                          boxShadow: selectedMood === mood ? `0 0 25px ${MOODS[mood].color}80` : ''
                        }}
                      >
                         {selectedMood === mood && <Check className="text-black/50 w-6 h-6" />}
                      </button>
                      <span 
                        className={`text-xs uppercase tracking-widest font-bold transition-colors duration-300 drop-shadow-md ${selectedMood === mood ? 'text-[#eaddcf]' : 'text-[#a89b93]'}`}
                      >
                        {MOODS[mood].description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Paper Note Input */}
              <div className="space-y-6">
                <div className="relative transform rotate-[0.5deg]">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Pour your thoughts here..."
                    rows={6}
                    className="w-full bg-[#E8DFC5] text-[#2A211B] rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.4)] p-6 resize-none focus:outline-none focus:ring-1 focus:ring-[#E8DFC5]/50 transition-all font-serif text-lg leading-relaxed placeholder-[#2A211B]/40 opacity-95 hover:opacity-100 focus:opacity-100"
                    style={{ 
                      backgroundImage: 'linear-gradient(#E8DFC5 0%, #E8DFC5 95%, #d0c8b0 100%)', 
                      backgroundSize: '100% 2rem',
                      lineHeight: '2rem',
                      caretColor: '#2A211B'
                    }}
                  />
                  {/* Paper fold corner effect */}
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-black/20 to-transparent pointer-events-none rounded-br-sm" />
                </div>
              </div>

              {/* Action */}
              <div className="mt-8 flex flex-col items-center gap-3">
                <button
                  type="submit"
                  className="flex items-center gap-3 px-8 py-3 rounded-full text-[#2A211B] text-lg shadow-[0_0_20px_rgba(255,255,255,0.1)] transform transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed font-light tracking-wide bg-[#eaddcf] hover:bg-white hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                  disabled={!selectedMood || !text}
                >
                  <span className="handwriting-font text-2xl px-1 font-bold">Drop your fish</span>
                  <Droplets className="w-5 h-5" />
                </button>
                
                <div className="h-6">
                   {feedback && (
                     <span className={`text-sm tracking-wider font-light drop-shadow-md ${feedback.includes('success') ? 'text-[#B4CEB3]' : 'text-[#E86252]'} animate-pulse`}>
                       {feedback}
                     </span>
                   )}
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};