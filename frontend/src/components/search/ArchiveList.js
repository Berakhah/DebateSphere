import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to install axios for making HTTP requests
import './ArchiveList.css'; // Ensure you have corresponding CSS for styling

const ArchiveList = () => {
  const [debates, setDebates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArchivedDebates = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/debates/archived', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Retrieve the token from local storage
          }
        });
        setDebates(response.data);
      } catch (err) {
        console.error("Error fetching archived debates:", err);
        setError(err.response?.data?.message || "An error occurred while fetching the archived debates.");
      }
    };

    fetchArchivedDebates();
  }, []);

  if (error) {
    return <p>Error: {error}</p>; // Display error message if any
  }

  return (
    <section className="archive-list-container">
      <h2>Archived Debates</h2>
      <ul>
        {debates.map((debate, index) => (
          <li key={index}>
            <h3>{debate.title}</h3>
            <p>{debate.description}</p>
            <p>Scheduled for: {debate.date} at {debate.time}</p>
            {/* Add more details or actions as needed */}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ArchiveList;
