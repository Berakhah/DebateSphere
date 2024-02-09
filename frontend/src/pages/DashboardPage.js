import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DebatesPage from './DebatePage';
import ModerationPage from './ModerationPage';
import DebateSession from '../components/debate/DebateSession';
import ReportPage from '../components/moderation/ReportForm';

const DashboardPage = () => {
  const [activePage, setActivePage] = useState('');
  const [debateId, setDebateId] = useState('');
  const navigate = useNavigate();
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
      <aside className={`w-64 bg-gray-800 text-white p-4 space-y-4 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden">
          {/* Icon or text to toggle sidebar visibility */}
          {isSidebarOpen ? 'Close' : 'Menu'}
        </button>
        <nav>
          <ul className="space-y-2">
            <li className="cursor-pointer p-2 hover:bg-gray-700 rounded transition duration-150 ease-in-out" onClick={() => setActivePage('debates')}>
              Debates
            </li>
            <li className="cursor-pointer p-2 hover:bg-gray-700 rounded transition duration-150 ease-in-out" onClick={() => setActivePage('moderation')}>
              Moderation
            </li>
            <li className="cursor-pointer p-2 hover:bg-gray-700 rounded transition duration-150 ease-in-out" onClick={handleDebateSessionClick}>
              Live Debates
            </li>
            <li className="cursor-pointer p-2 hover:bg-gray-700 rounded transition duration-150 ease-in-out" onClick={() => setActivePage('report')}>
              Report
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="p-4 bg-blue-500 text-white text-lg">Dashboard</header>
        <div className="flex-grow p-8">
          {activePage ? renderPage() : <p className="text-center text-lg">Select an option from the sidebar to get started.</p>}
        </div>
      </main>
    </div>
  );

  function renderPage() {
    switch (activePage) {
      case 'debates': return <DebatesPage />;
      case 'moderation': return <ModerationPage />;
      case 'debate-session': 
        return debateId ? <DebateSession debateId={debateId} /> : null;
      case 'report': return <ReportPage />;
      default: return <p>Select an option from the sidebar.</p>;
    }
  }
};

export default DashboardPage;
