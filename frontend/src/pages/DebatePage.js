import React, { useState } from 'react';
import CreateDebate from '../components/debate/CreateDebate';
import DebateList from '../components/debate/DebateList';
import EditDebate from '../components/debate/EditDebate';
import SearchComponent from '../components/search/SearchComponent';

const DebatesPage = () => {
  const [subPage, setSubPage] = useState('');

  const renderSubPage = () => {
    switch (subPage) {
      case 'create': return <CreateDebate />;
      case 'list': return <DebateList />;
      case 'edit': return <EditDebate />;
      case 'search': return <SearchComponent />;
      default: return <p className="text-center text-lg mt-4">Select an option to proceed.</p>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Debates</h1>
        <div className="sub-navigation flex justify-center gap-4">
          <button 
            onClick={() => setSubPage('create')}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          >
            Create Debate
          </button>
          <button 
            onClick={() => setSubPage('list')}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300"
          >
            Debate List
          </button>
          <button 
            onClick={() => setSubPage('edit')}
            className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-700 transition duration-300"
          >
            Edit Debate
          </button>
          <button 
            onClick={() => setSubPage('search')}
            className="bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
          >
            Search Debates
          </button>
        </div>
      </div>
      <main className="debate-page-content mt-8">
        {renderSubPage()}
      </main>
    </div>
  );
};

export default DebatesPage;
