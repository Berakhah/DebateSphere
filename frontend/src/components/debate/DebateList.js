import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchDebates } from '../../api/api'; 
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

  return (
    <div className="debate-list">
      <h2>Debates</h2>
      {isLoading ? (
        <div>Loading debates...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <ul>
          {debates.map((debate) => (
            <li key={debate.id} className="debate-item">
              <div className="debate-content">
                <h3>{debate.title}</h3>
                <p>{debate.description}</p>
                <small>Scheduled for: {debate.date} at {debate.time}</small>
              </div>
              <Link to={`/debate/${debate.id}`} className="view-details">View Details</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DebateList;
