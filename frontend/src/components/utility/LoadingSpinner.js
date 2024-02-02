import React from 'react';
import './LoadingSpinner.css'; // Make sure to create a LoadingSpinner.css file for styling

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
