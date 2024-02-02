import React, { createContext, useState, useEffect } from 'react';
import { fetchDebates, submitDebate, fetchDebateDetails } from './api/debate'; // Assume these functions are defined in your API service

// Create the context
export const DebateContext = createContext();

const DebateProvider = ({ children }) => {
  const [debates, setDebates] = useState([]);
  const [selectedDebate, setSelectedDebate] = useState(null);

  // Fetch debates on component mount
  useEffect(() => {
    const getDebates = async () => {
      const debateData = await fetchDebates();
      setDebates(debateData);
    };

    getDebates();
  }, []);

  // Function to handle debate submission
  const submitDebate = async (debateDetails) => {
    const newDebate = await submitDebate(debateDetails);
    if (newDebate) {
      setDebates([...debates, newDebate]);
    }
  };

  // Function to select a debate for detailed view
  const selectDebate = async (debateId) => {
    const details = await fetchDebateDetails(debateId);
    setSelectedDebate(details);
  };

  return (
    <DebateContext.Provider value={{ debates, submitDebate, selectedDebate, selectDebate }}>
      {children}
    </DebateContext.Provider>
  );
};

export default DebateProvider;
