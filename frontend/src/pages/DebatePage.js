import React, { useState } from 'react';
import CreateDebate from '../components/debate/CreateDebate';
import DebateList from '../components/debate/DebateList';
import EditDebate from '../components/debate/EditDebate';

const DebatesPage = () => {
  const [subPage, setSubPage] = useState('');

  const renderSubPage = () => {
    switch (subPage) {
      case 'create': return <CreateDebate />;
      case 'list': return <DebateList />;
      case 'edit': return <EditDebate />;
      default: return <p>Select an option to proceed.</p>;
    }
  };

  return (
    <div>
      <div className="sub-navigation">
        <button onClick={() => setSubPage('create')}>Create Debate</button>
        <button onClick={() => setSubPage('list')}>Debate List</button>
        <button onClick={() => setSubPage('edit')}>Edit Debate</button>
      </div>
      <main className="debate-page-content">
        <h1>Debates</h1>
        {renderSubPage()}
      </main>
    </div>
  );
};

export default DebatesPage;
