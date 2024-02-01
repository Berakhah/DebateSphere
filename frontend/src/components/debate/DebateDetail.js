import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DebateDetail.css'; // Make sure to create a DebateDetail.css file for styling

const DebateDetail = ({ match }) => {
  const [debate, setDebate] = useState(null);
  const debateId = match.params.id; // Assuming you're using React Router and getting the debate ID from the URL

  useEffect(() => {
    // Fetch the detailed information of the debate from the API and set the debate state
    // Example: fetchDebateDetail(debateId).then(data => setDebate(data));
  }, [debateId]);

  if (!debate) {
    return <p>Loading...</p>; // Or some other loading indicator
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
