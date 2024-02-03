import React, { useState } from 'react';
import { submitVote, updateVote, revokeVote } from '../../api/api'; 
import './VoteComponent.css';

const VoteComponent = ({ debateId, argumentId }) => {
  const [vote, setVote] = useState(0); // 0 for no vote, 1 for upvote, -1 for downvote

  const handleVote = async (value) => {
    if (vote === value) {
      // Revoke vote if the same button is clicked again
      try {
        await revokeVote(debateId, argumentId);
        setVote(0);
      } catch (error) {
        console.error("Error revoking vote:", error);
      }
    } else {
      try {
        if (vote === 0) {
          // New vote
          await submitVote(debateId, { argumentId, vote: value });
        } else {
          // Updating existing vote
          await updateVote(debateId, { argumentId, vote: value });
        }
        setVote(value);
      } catch (error) {
        console.error("Error submitting/updating vote:", error);
      }
    }
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
