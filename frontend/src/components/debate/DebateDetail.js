import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to install axios for making HTTP requests
import { Link } from 'react-router-dom';
import './DebateDetail.css'; // Make sure to create a DebateDetail.css file for styling

const DebateDetail = ({ match }) => {
  const [debate, setDebate] = useState(null);
  const [error, setError] = useState(null);
  const debateId = match.params.id; // Assuming you're using React Router and getting the debate ID from the URL

  useEffect(() => {
    const fetchDebateDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/debates/${debateId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Retrieve the token from local storage
          }
        });
        setDebate(response.data);
      } catch (err) {
        console.error("Error fetching debate detail:", err);
        setError(err.response?.data?.message || "An error occurred while fetching the debate details.");
      }
    };

    fetchDebateDetail();
  }, [debateId]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!debate) {
    return <p>Loading...</p>; 
  }

  return (
    <section className="debate-detail-container">
      <h2>{debate.title}</h2>
      <p>{debate.description}</p>
      <p>Scheduled for: {debate.date} at {debate.time}</p>
      {/* Add options to participate or view arguments */}
      <Link to={`/debate/${debateId}/participate`}>Participate</Link>
      {/* More details and actions as needed */}
    </section>
  );
};

export default DebateDetail;
