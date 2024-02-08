import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './DebateDetail.css'; // Make sure this file exists and contains your custom styles if needed

const DebateDetail = () => {
  const [debate, setDebate] = useState(null);
  const [error, setError] = useState('');
  const { id: debateId } = useParams();

  useEffect(() => {
    const fetchDebateDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/debates/${debateId}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
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
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!debate) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <section className="max-w-4xl mx-auto mt-10 p-5 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-3">{debate.title}</h2>
      <p className="mb-2">{debate.description}</p>
      <p className="text-sm text-gray-600">Scheduled for: {debate.dateTime}</p>
      {/* Additional details and actions */}
      <Link to={`/debate/participate/${debateId}`} className="inline-block mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Participate
      </Link>
      {/* Customize further as needed */}
    </section>
  );
};

export default DebateDetail;
