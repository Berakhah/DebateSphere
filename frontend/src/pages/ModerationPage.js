import React from 'react';
import ModerationPanel from '../components/moderation/ModerationPanel'; 

const ModerationPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Moderation Dashboard</h1>
        <ModerationPanel />
      </main>
    </div>
  );
};

export default ModerationPage;
