import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <header className="bg-blue-500 text-white">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <ul className="flex items-center space-x-4">
          <li><Link to="/dashboard" className="hover:text-blue-200">Home</Link></li>
          {isAuthenticated && <li><Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link></li>}
          <li><Link to="/debate" className="hover:text-blue-200">Debates</Link></li>
          {isAuthenticated && <li><Link to="/moderation" className="hover:text-blue-200">Moderation</Link></li>}
          <li><Link to="/archive" className="hover:text-blue-200">Archive</Link></li>
          <li><Link to="/contact" className="hover:text-blue-200">Contact</Link></li>
          {!isAuthenticated ? (
            <li><Link to="/auth/login" className="bg-transparent py-2 px-4 border border-white rounded hover:bg-blue-700">Login</Link></li>
          ) : (
            <li><button onClick={() => {localStorage.removeItem('token'); window.location.href = '/';}} className="bg-red-500 py-2 px-4 border border-white rounded hover:bg-red-700">Logout</button></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
