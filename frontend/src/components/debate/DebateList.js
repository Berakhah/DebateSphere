import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to install axios for making HTTP requests
import { Link } from 'react-router-dom';
import './DebateList.css'; // Make sure to create a DebateList.css file for styling

const DebateList = () => {
  const [debates, setDebates] = useState([]);

  useEffect(() => {
    const fetchDebates = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/debates/search', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Retrieve the token from local storage
          }
        });
        setDebates(response.data);
      } catch (err) {
        console.error("Error fetching debates:", err);
        // Handle errors appropriately
      }
    };

    fetchDebates();
  }, []);

  return (
    <section className="debate-list-container">
      <h2>Debates</h2>
      <ul>
        {debates.map((debate, index) => (
          <li key={index}>
            <h3>{debate.title}</h3>
            <p>{debate.description}</p>
            <p>Scheduled for: {debate.date} at {debate.time}</p>
            <Link to={`/debate/${debate.id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DebateList;
