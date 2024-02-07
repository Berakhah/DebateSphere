// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import DebatePage from './pages/DebatePage';
import ModerationPage from './pages/ModerationPage';
import ArchivePage from './pages/ArchivePage';
import ContactPage from './pages/ContactPage';
import LoginPage from './components/auth/Login';

// Authentication check function (simplified for demonstration)
const isAuthenticated = () => !!localStorage.getItem('token');

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={isAuthenticated() ? <DashboardPage /> : <Navigate to="/auth/login" />} />
        <Route path="/debate/:id" element={isAuthenticated() ? <DebatePage /> : <Navigate to="/auth/login" />} />
        <Route path="/moderation" element={isAuthenticated() ? <ModerationPage /> : <Navigate to="/auth/login" />} />
        <Route path="/archive" element={isAuthenticated() ? <ArchivePage /> : <Navigate to="/auth/login" />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
