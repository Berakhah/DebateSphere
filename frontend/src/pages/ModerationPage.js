import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ModerationPanel from '../components/moderation/ModerationPanel'; 
import './ModerationPage.css';

const ModerationPage = () => {
  return (
    <div>
      <Navbar />
      <main className="moderation-page-content">
        <h1>Moderation Dashboard</h1>
        <ModerationPanel />
      </main>
      <Footer />
    </div>
  );
};

export default ModerationPage;
