import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ArchiveList from '../components/search/ArchiveList'; // Adjust the import path as needed
import './ArchivePage.css';

const ArchivePage = () => {
  return (
    <div>
      <Navbar />
      <main className="archive-page-content">
        <h1>Archived Debates</h1>
        <ArchiveList />
      </main>
      <Footer />
    </div>
  );
};

export default ArchivePage;
