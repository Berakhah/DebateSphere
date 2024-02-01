import React, { useState, useEffect } from 'react';
import './DebateList.css'; // Make sure to create a DebateList.css file for styling

const DebateList = () => {
  const [debates, setDebates] = useState([]);

  useEffect(() => {
    // Fetch the list of debates from the API and set the debates state
    // Example: fetchDebates().then(data => setDebates(data));
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
            {/* Add a link or button to navigate to the DebateDetail component */}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DebateList;
