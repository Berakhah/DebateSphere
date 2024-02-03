// DebatePage.js
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import DebateList from '../components/debate/DebateList'; 
import CreateDebate from '../components/debate/CreateDebate'; 
import './DebatePage.css';

const DebatePage = () => {
  return (
    <div>
      <Navbar />
      <main className="debate-page-content">
        <h1>Debates</h1>
        <CreateDebate />
        <DebateList />
      </main>
      <Footer />
    </div>
  );
};

export default DebatePage;
