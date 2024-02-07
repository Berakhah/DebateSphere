import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...props }) => {
  const isAuthenticated = localStorage.getItem('token');

  if (!isAuthenticated) {
    // Redirect the user to the login page if not authenticated
    return <Navigate to="/auth/login" replace />;
  }

  // Render the specified element if authenticated
  return <Route {...props} element={element} />;
};

export default PrivateRoute;
