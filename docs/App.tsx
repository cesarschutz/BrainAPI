
import React, { useState, useEffect, useMemo } from 'react';
import type { NavItem, Section } from './types';
import { sectionsData } from './content/sections'; 
import { BrainIcon, LightBulbIcon, CodeBracketIcon, PuzzlePieceIcon, WrenchScrewdriverIcon, PlayIcon, DocumentTextIcon, CogIcon, CommandLineIcon } from './components/ui';

const App: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>(sectionsData[0]?.id || '');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems: NavItem[] = useMemo(() => sectionsData.map(sec => ({
    id: sec.id,
    label: sec.navLabel,
    icon: sec.icon || <DocumentTextIcon className="w-5 h-5" />
  })), []);

  const activeSection = useMemo(() => sectionsData.find(sec => sec.id === activeSectionId), [activeSectionId]);

  useEffect(() => {
    // Scroll to top when section changes
    const contentArea = document.getElementById('main-content-area');
    if (contentArea) {
      contentArea.scrollTo(0, 0);
    }
  }, [activeSectionId]);
  
  const SectionContentWrapper: React.FC<{ section: Section | undefined }> = ({ section }) => {
    if (!section) {
      return <div className="text-center p-10 text-brand-gray-500">Seção não encontrada.</div>;
    }
    // The actual content is JSX, so we just render it.
    return <div className="animate-fade-in-up">{section.content}</div>;
  };

  return (
    <div className="flex h-screen bg-brand-gray-100">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-primary-blue to-brand-gray-800 text-white p-4 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:flex md:flex-col shadow-lg`}>
        <div className="flex items-center space-x-3 mb-8 p-2">
          <img src="https://picsum.photos/seed/brainapi-logo/60/60" alt="BrainAPI Logo" className="w-12 h-12 rounded-full border-2 border-light-teal animate-pulse-logo" />
          <div>
            <h1 className="text-2xl font-bold">BrainAPI</h1>
            <p className="text-xs text-brand-gray-300">Guia Técnico</p>
          </div>
        </div>
        <nav className="flex-grow space-y-2 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSectionId(item.id);
                setIsSidebarOpen(false); // Close sidebar on mobile after click
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left hover:bg-secondary-blue hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-light-teal ${
                activeSectionId === item.id ? 'bg-secondary-blue bg-opacity-50 font-semibold shadow-inner' : 'hover:text-light-teal'
              }`}
            >
              {item.icon && React.isValidElement(item.icon) && React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, {className: "w-5 h-5 flex-shrink-0"})}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t border-brand-gray-700 text-center text-xs text-brand-gray-400">
          &copy; {new Date().getFullYear()} BrainAPI Project
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar for mobile */}
        <header className="md:hidden bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-20">
          <div className="flex items-center space-x-2">
            <img src="https://picsum.photos/seed/brainapi-logo/40/40" alt="BrainAPI Logo" className="w-8 h-8 rounded-full" />
            <span className="text-xl font-semibold text-primary-blue">BrainAPI</span>
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-primary-blue focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </header>
        
        {/* Content Area */}
        <div id="main-content-area" className="flex-1 overflow-y-auto p-6 md:p-10 bg-brand-gray-50">
          <SectionContentWrapper section={activeSection} />
        </div>
      </main>
    </div>
  );
};

export default App;
