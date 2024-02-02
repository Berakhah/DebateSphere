import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios for making HTTP requests
import './VoteComponent.css'; // Ensure you have corresponding CSS for styling

const VoteComponent = ({ debateId, argumentId }) => {
  const [vote, setVote] = useState(0); // 0 for no vote, 1 for upvote, -1 for downvote

  const handleVote = async (value) => {
    if (vote === value) {
      // Revoke vote if the same button is clicked again
      try {
        await axios.delete(`http://localhost:3000/api/debates/${debateId}/vote`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          data: { argumentId: argumentId }
        });
        setVote(0);
      } catch (error) {
        console.error("Error revoking vote:", error);
        // Handle error
      }
    } else {
      // Submit or update vote
      try {
        const method = vote === 0 ? 'post' : 'put';
        await axios[method](`http://localhost:3000/api/debates/${debateId}/vote`, {
          argumentId: argumentId,
          vote: value
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setVote(value);
      } catch (error) {
        console.error("Error submitting/updating vote:", error);
        // Handle error
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
