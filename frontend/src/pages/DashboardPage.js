import React, { useState } from 'react';
import DebatesPage from './DebatePage';
import ModerationPage from './ModerationPage';
import DebateSession from '../components/debate/DebateSession';
import ReportPage from '../components/moderation/ReportForm';
import { FaBars, FaTimes } from 'react-icons/fa'; // Ensure these are installed via `npm install react-icons`

const DashboardPage = () => {
  const [activePage, setActivePage] = useState('');
  const [debateId, setDebateId] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleDebateSessionClick = () => {
    const inputId = prompt('Enter the debate ID:');
    if (inputId) {
      setDebateId(inputId);
      setActivePage('debate-session');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className={`bg-gray-800 text-white fixed inset-y-0 left-0 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} w-64 transition-transform duration-300 ease-in-out z-30 lg:relative lg:translate-x-0`}>
        <div className="flex items-center justify-between p-4">
          <span className="text-xl font-semibold">Dashboard</span>
          <button onClick={() => setIsSidebarOpen(false)} className="text-xl md:hidden">
            <FaTimes />
          </button>
        </div>
        <nav className="mt-10">
          <ul className="space-y-2">
            <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => { setActivePage('debates'); setIsSidebarOpen(false); }}>Debates</li>
            <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => { setActivePage('moderation'); setIsSidebarOpen(false); }}>Moderation</li>
            <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => { handleDebateSessionClick(); setIsSidebarOpen(false); }}>Live Debates</li>
            <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => { setActivePage('report'); setIsSidebarOpen(false); }}>Report</li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <div className="bg-blue-500 text-white flex justify-between items-center md:hidden">
          <span className="block p-4 text-xl font-semibold">Dashboard</span>
          <button onClick={() => setIsSidebarOpen(true)} className="p-4 focus:outline-none">
            <FaBars className="text-xl" />
          </button>
        </div>

        <main className="flex-grow p-4">
          {activePage ? renderPage() : <p className="text-center text-lg">Select an option from the sidebar to get started.</p>}
        </main>
      </div>
    </div>
  );

  function renderPage() {
    switch (activePage) {
      case 'debates': return <DebatesPage />;
      case 'moderation': return <ModerationPage />;
      case 'debate-session': return debateId ? <DebateSession debateId={debateId} /> : <p className="text-center text-lg">Enter a Debate ID to get started.</p>;
      case 'report': return <ReportPage />;
      default: return <p className="text-center text-lg">Select an option from the sidebar.</p>;
    }
  }
};

export default DashboardPage;
