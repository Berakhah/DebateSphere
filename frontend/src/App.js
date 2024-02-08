// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import DebatePage from './pages/DebatePage';
import ModerationPage from './pages/ModerationPage';
import ArchivePage from './pages/ArchivePage';
import ContactPage from './pages/ContactPage';
import LoginPage from './components/auth/Login';
import RegisterPage from './components/auth/Register';
import ForgotPasswordPage from './components/auth/ForgotPassword';
import EditDebate from './components/debate/EditDebate';
import DebateList from './components/debate/DebateList';
import DebateDetail from './components/debate/DebateDetail'; // Path to your DebateDetail component

import './index.css';

const isAuthenticated = () => !!localStorage.getItem('token');

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/auth/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/debate/:id" element={<ProtectedRoute><DebatePage /></ProtectedRoute>} />
        <Route path="/debates" element={<DebateList />} />
        <Route path="/debate/edit/:debateId" element={<EditDebate />} />
        <Route path="/debates/:id" element={<DebateDetail />} />
        <Route path="/moderation" element={<ProtectedRoute><ModerationPage /></ProtectedRoute>} />
        <Route path="/archive" element={<ProtectedRoute><ArchivePage /></ProtectedRoute>} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
