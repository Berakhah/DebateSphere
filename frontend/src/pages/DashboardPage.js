import React, { useState } from 'react';
import DebatesPage from './DebatePage';
import ModerationPage from './ModerationPage';
import DebateSession from '../components/debate/DebateSession';
import ReportPage from '../components/moderation/ReportForm';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing icons

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
      {/* Sidebar */}
      <aside className={`bg-gray-800 text-white fixed inset-y-0 left-0 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} w-64 transition duration-300 ease-in-out z-30 md:relative md:translate-x-0 md:inset-0`}>
        <div className="flex items-center justify-between md:justify-center p-4">
          <span className="text-lg font-semibold">Dashboard</span>
          <button onClick={() => setIsSidebarOpen(false)} className="text-white md:hidden">
            <FaTimes />
          </button>
        </div>
        <nav className="mt-10">
          <ul>
            {/* Navigation Links */}
            <li className="p-2 hover:bg-gray-700" onClick={() => { setActivePage('debates'); setIsSidebarOpen(false); }}>Debates</li>
            <li className="p-2 hover:bg-gray-700" onClick={() => { setActivePage('moderation'); setIsSidebarOpen(false); }}>Moderation</li>
            <li className="p-2 hover:bg-gray-700" onClick={() => { handleDebateSessionClick(); setIsSidebarOpen(false); }}>Live Debates</li>
            <li className="p-2 hover:bg-gray-700" onClick={() => { setActivePage('report'); setIsSidebarOpen(false); }}>Report</li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className={`flex-1 flex flex-col md:ml-64`}>
        {/* Mobile menu button */}
        <div className="bg-blue-500 text-white flex justify-between md:hidden">
          <span className="block p-4 text-lg font-semibold">Dashboard</span>
          <button onClick={() => setIsSidebarOpen(true)} className="p-4 focus:outline-none focus:bg-blue-600">
            <FaBars />
          </button>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4">
          {activePage ? renderPage() : <p>Select an option from the sidebar.</p>}
        </main>
      </div>
    </div>
  );

  function renderPage() {
    switch (activePage) {
      case 'debates': return <DebatesPage />;
      case 'moderation': return <ModerationPage />;
      case 'debate-session': return debateId ? <DebateSession debateId={debateId} /> : null;
      case 'report': return <ReportPage />;
      default: return <p className="text-center">Select an option from the sidebar.</p>;
    }
  }
};

export default DashboardPage;
