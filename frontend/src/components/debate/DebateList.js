// DebateList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchDebates } from '../../api/api'; // Adjust the import path to your api.js
import './DebateList.css';

const DebateList = () => {
  const [debates, setDebates] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDebates = async () => {
      try {
        const data = await fetchDebates();
        setDebates(data);
      } catch (err) {
        setError('Failed to fetch debates. Please try again later.');
        console.error("Error fetching debates:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDebates();
  }, []);

  if (isLoading) {
    return <div className="debate-list-loading">Loading debates...</div>;
  }

  if (error) {
    return <div className="debate-list-error">Error: {error}</div>;
  }

  return (
    <section className="debate-list-container">
      <h2>Debates</h2>
      {debates.length > 0 ? (
        <ul>
          {debates.map(debate => (
            <li key={debate.id}>
              <h3>{debate.title}</h3>
              <p>{debate.description}</p>
              <p>Scheduled for: {debate.date} at {debate.time}</p>
              <Link to={`/debate/${debate.id}`}>View Details</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No debates found.</p>
      )}
    </section>
  );
};

export default DebateList;
