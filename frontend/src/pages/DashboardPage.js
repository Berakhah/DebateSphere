import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import './DashboardPage.css'; // Make sure to create a DashboardPage.css file for styling

const DashboardPage = () => {
  return (
    <div>
      <Navbar />
      {/* Content of the dashboard page */}
      <Footer />
    </div>
  );
};

export default DashboardPage;
