import React, { useState } from 'react';
import './VoteComponent.css'; // Ensure you have corresponding CSS for styling

const VoteComponent = ({ argumentId }) => {
  const [vote, setVote] = useState(0); // 0 for no vote, 1 for upvote, -1 for downvote

  const handleVote = (value) => {
    if (vote === value) {
      setVote(0); // Remove vote if the same button is clicked again
    } else {
      setVote(value); // Set vote to the clicked value
    }
    // Handle vote submission logic, potentially update the vote count on the server...
  };

  return (
    <div className="vote-container">
      <button 
        className={`vote-button ${vote === 1 ? 'voted' : ''}`} 
        onClick={() => handleVote(1)}
      >
        Upvote
      </button>
      <button 
        className={`vote-button ${vote === -1 ? 'voted' : ''}`} 
        onClick={() => handleVote(-1)}
      >
        Downvote
      </button>
    </div>
  );
};

export default VoteComponent;
