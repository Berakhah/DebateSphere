import React, { useState, useEffect } from 'react';
import VoteComponent from './VoteComponent'; // Ensure you've created the VoteComponent
import './ArgumentList.css'; // Ensure you have corresponding CSS for styling

const ArgumentList = ({ debateId }) => {
    const [argumentList, setArgumentList] = useState([]);

  useEffect(() => {
    // Fetch the list of arguments for the specific debate from the API and set the arguments state
    // Example: fetchArguments(debateId).then(data => setArguments(data));
  }, [debateId]);

  return (
    <section className="argument-list-container">
      <h2>Arguments</h2>
      <ul>
        {arguments.map((argument, index) => (
          <li key={index} className="argument-item">
            <p>{argument.text}</p>
            <div className="vote-section">
              <VoteComponent argumentId={argument.id} />
              {/* You can add a comment section or other functionalities as needed */}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ArgumentList;
