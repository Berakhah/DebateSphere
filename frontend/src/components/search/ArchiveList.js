import React, { useState, useEffect } from 'react';
import { fetchArchivedDebates } from '../../api/api'; 
import './ArchiveList.css';

const ArchiveList = () => {
  const [debates, setDebates] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArchivedDebates = async () => {
      try {
        const data = await fetchArchivedDebates();
        setDebates(data);
      } catch (err) {
        setError('Failed to fetch archived debates. Please try again later.');
        console.error("Error fetching archived debates:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadArchivedDebates();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  return (
    <section className="archive-list-container">
      <h2>Archived Debates</h2>
      {debates.length > 0 ? (
        <ul>
          {debates.map((debate) => (
            <li key={debate.id}>
              <h3>{debate.title}</h3>
              <p>Date and Time: {debate.dateTime}</p>
              <p>Status: {debate.status}</p>
              <p>Category: {debate.topicCategory}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No archived debates found.</p>
      )}
    </section>
  );
};

export default ArchiveList;
