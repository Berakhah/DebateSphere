import React, { useState } from 'react';
import { submitVote, updateVote, revokeVote } from '../../api/api'; 
import './VoteComponent.css'; 

const VoteComponent = ({ debateId, argumentId }) => {
  const [vote, setVote] = useState(0); // 0: no vote, 1: upvote, -1: downvote
  const [isLoading, setIsLoading] = useState(false);

  const handleVoteChange = async (newVote) => {
    if (isLoading) return; // Prevent multiple requests if one is already in progress
    setIsLoading(true);

    try {
      if (vote === newVote) {
        // If the same vote button is clicked, revoke the vote
        await revokeVote(debateId, argumentId);
        setVote(0);
      } else {
        // Submit or update vote
        newVote === 1 ? await submitVote(debateId, argumentId, { vote: newVote }) : await updateVote(debateId, argumentId, { vote: newVote });
        setVote(newVote);
      }
    } catch (error) {
      console.error("Error handling vote:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="vote-container">
      <button 
        disabled={isLoading}
        className={`vote-button ${vote === 1 ? 'voted' : ''}`} 
        onClick={() => handleVoteChange(1)}
      >
        Upvote
      </button>
      <button 
        disabled={isLoading}
        className={`vote-button ${vote === -1 ? 'voted' : ''}`} 
        onClick={() => handleVoteChange(-1)}
      >
        Downvote
      </button>
    </div>
  );
};

export default VoteComponent;
