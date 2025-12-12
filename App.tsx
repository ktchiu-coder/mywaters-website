import React, { useState } from 'react';
import { Home } from './views/Home';
import { Monthly } from './views/Monthly';
import { AllAquariums } from './views/AllAquariums';
import { Tab } from './types';
import { Home as HomeIcon, Waves, LayoutGrid } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.HOME: return <Home />;
      case Tab.MONTHLY: return <Monthly />;
      case Tab.ALL: return <AllAquariums />;
      default: return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-[#110e0d] text-gray-800 font-sans selection:bg-blue-200">
      
      {/* Main Content Area */}
      <main className="pb-24 min-h-screen">
        {renderContent()}
      </main>

      {/* Floating Navigation Bar */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-full px-6 py-3 z-50 flex items-center gap-2">
        <NavButton 
          isActive={activeTab === Tab.HOME} 
          onClick={() => setActiveTab(Tab.HOME)} 
          icon={<HomeIcon className="w-5 h-5" />} 
          label="Diary" 
        />
        <div className="w-px h-6 bg-white/20 mx-2" />
        <NavButton 
          isActive={activeTab === Tab.MONTHLY} 
          onClick={() => setActiveTab(Tab.MONTHLY)} 
          icon={<Waves className="w-5 h-5" />} 
          label="This Month" 
        />
        <div className="w-px h-6 bg-white/20 mx-2" />
        <NavButton 
          isActive={activeTab === Tab.ALL} 
          onClick={() => setActiveTab(Tab.ALL)} 
          icon={<LayoutGrid className="w-5 h-5" />} 
          label="History" 
        />
      </nav>
    </div>
  );
};

// Helper Component for Nav
const NavButton: React.FC<{ isActive: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ isActive, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
      ${isActive ? 'bg-[#eaddcf] text-[#2A211B] shadow-md transform scale-105' : 'text-[#a89b93] hover:bg-white/10 hover:text-white'}
    `}
  >
    {icon}
    <span className={`text-sm font-semibold ${isActive ? 'inline-block' : 'hidden md:inline-block'}`}>
      {label}
    </span>
  </button>
);

export default App;