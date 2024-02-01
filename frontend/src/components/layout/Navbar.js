import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <header>
      <nav>
        {/* Responsive menu toggle */}
        <button className="menu-button" onClick={handleNavCollapse}>Menu</button>
        {/* Conditionally render navigation links */}
        <ul className={isNavCollapsed ? 'collapse' : ''}>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/archive">Archive</Link></li>
          <li><Link to="/active-session">Active session</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
