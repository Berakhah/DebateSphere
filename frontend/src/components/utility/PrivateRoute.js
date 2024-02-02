import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token') ? true : false;

  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" replace />
      }
    />
  );
};

export default PrivateRoute;
