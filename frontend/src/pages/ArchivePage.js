import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ArchiveList from '../components/search/ArchiveList'; // Adjust the import path as needed
import './ArchivePage.css';

const ArchivePage = () => {
  return (
    <div>
      <main className="archive-page-content">
        <h1>Archived Debates</h1>
        <ArchiveList />
      </main>
    </div>
  );
};

export default ArchivePage;
