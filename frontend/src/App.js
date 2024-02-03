import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Authentication Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';

// Debate Management Components
import CreateDebate from './components/debate/CreateDebate';
import EditDebate from './components/debate/EditDebate';
import DebateList from './components/debate/DebateList';
import DebateDetail from './components/debate/DebateDetail';

// Debate Participation Components
import SubmitArgument from './components/debate/SubmitArgument';
import VoteComponent from './components/debate/VoteComponent';
import ArgumentList from './components/debate/ArgumentList';

// Content Moderation Components
import ModerationPanel from './components/moderation/ModerationPanel';
import ReportForm from './components/moderation/ReportForm';

// Search and Archive Components
import SearchComponent from './components/search/SearchComponent';
import ArchiveList from './components/search/ArchiveList';

// Utility and Common Components
import PrivateRoute from './components/utility/PrivateRoute';
import LoadingSpinner from './components/utility/LoadingSpinner';
import ErrorBoundary from './components/utility/ErrorBoundary';

// Pages
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import DebatePage from './pages/DebatePage';
import ModerationPage from './pages/ModerationPage';
import ArchivePage from './pages/ArchivePage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <Navbar />
      <ErrorBoundary>
        {/* <LoadingSpinner /> Conditionally rendered */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/debate/:id" element={<PrivateRoute><DebatePage /></PrivateRoute>} />
          <Route path="/moderation" element={<PrivateRoute><ModerationPage /></PrivateRoute>} />
          <Route path="/archive" element={<PrivateRoute><ArchivePage /></PrivateRoute>} />
          <Route path="/contact" element={<PrivateRoute><ContactPage /></PrivateRoute>} />
          {/* Add more routes as needed */}
        </Routes>
      </ErrorBoundary>
      <Footer />
    </Router>
  );
}

export default App;
