// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {isAuthenticated && <li><Link to="/dashboard">Dashboard</Link></li>}
          <li><Link to="/debate">Debates</Link></li> 
          {isAuthenticated && <li><Link to="/moderation">Moderation</Link></li>}
          <li><Link to="/archive">Archive</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {!isAuthenticated ? (
            <li><Link to="/auth/login">Login</Link></li>
          ) : (
            <li><button onClick={() => {localStorage.removeItem('token'); window.location.href = '/';}}>Logout</button></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
