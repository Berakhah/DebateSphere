import React, { useState, useEffect } from 'react';
import './ArchiveList.css'; // Ensure you have corresponding CSS for styling

const ArchiveList = () => {
  const [debates, setDebates] = useState([]);

  useEffect(() => {
    // Fetch the list of archived debates from the API and set the debates state
    // Example: fetchArchivedDebates().then(data => setDebates(data));
  }, []);

  return (
    <section className="archive-list-container">
      <h2>Archived Debates</h2>
      <ul>
        {debates.map((debate, index) => (
          <li key={index}>
            {/* Debate details */}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ArchiveList;
