import React, { useState } from 'react';
import DebatesPage from './DebatePage'; 
import ModerationPage from './ModerationPage';
import ArchivesPage from './ArchivePage';
import ReportPage from '../components/moderation/ReportForm'; // Ensure correct import path

const DashboardPage = () => {
  const [activePage, setActivePage] = useState('');

  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-gray-800 text-white p-4">
        <ul className="space-y-2">
          <li className="cursor-pointer" onClick={() => setActivePage('debates')}>Debates</li>
          <li className="cursor-pointer" onClick={() => setActivePage('moderation')}>Moderation</li>
          <li className="cursor-pointer" onClick={() => setActivePage('archives')}>Archives</li>
          <li className="cursor-pointer" onClick={() => setActivePage('report')}>Report</li>
        </ul>
      </div>
      <div className="flex-1 flex flex-col">
        <main className="flex-grow p-8">
          {activePage ? renderPage() : <p className="text-center text-lg">Select an option from the sidebar to get started.</p>}
        </main>
      </div>
    </div>
  );

  function renderPage() {
    switch (activePage) {
      case 'debates': return <DebatesPage />;
      case 'moderation': return <ModerationPage />;
      case 'archives': return <ArchivesPage />;
      case 'report': return <ReportPage />;
      default: return <p>Select an option from the sidebar.</p>;
    }
  }
};

export default DashboardPage;
