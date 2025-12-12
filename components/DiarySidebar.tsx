import React from 'react';
import { DiaryEntry } from '../types';
import { X } from 'lucide-react';
import { MOODS } from '../constants';

interface DiarySidebarProps {
  entry: DiaryEntry | null;
  onClose: () => void;
}

export const DiarySidebar: React.FC<DiarySidebarProps> = ({ entry, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 md:w-96 bg-white/60 backdrop-blur-xl shadow-2xl transform transition-transform duration-500 ease-in-out z-50 border-l border-white/50 ${
        entry ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {entry && (
        <div className="p-8 h-full flex flex-col overflow-y-auto">
          <button 
            onClick={onClose}
            className="self-end p-2 rounded-full hover:bg-black/5 transition-colors mb-4"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>

          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
               <span 
                className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-2 shadow-sm uppercase tracking-wider"
                style={{ backgroundColor: entry.color_code }}
               >
                 {MOODS[entry.mood].description}
               </span>
               <h2 className="text-3xl font-bold serif-font text-gray-800 leading-tight">
                 {entry.date}
               </h2>
               <div className="text-gray-500 text-lg mt-1 font-mono">
                 {entry.time}
               </div>
            </div>

            <div className="prose prose-slate">
              <p className="font-serif italic text-xl text-gray-600 mb-2">
                 Dear Diary,
              </p>
              <p className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg">
                {entry.text}
              </p>
            </div>
          </div>
          
          <div className="mt-auto pt-8 text-center text-gray-400 text-sm italic">
            "Every emotion is a drop in the ocean of you."
          </div>
        </div>
      )}
    </div>
  );
};