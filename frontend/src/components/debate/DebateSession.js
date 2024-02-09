import React, { useState, useEffect } from 'react';
import SubmitArgument from './SubmitArgument';
import VoteComponent from './VoteComponent';
import { fetchDebateDetail, listArgumentsForDebate, postComment, submitVote } from '../../api/api';

// CommentSection Component
const CommentSection = ({ argumentId, comments, onSubmitComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newComment.trim()) {
      await onSubmitComment(argumentId, newComment);
      setNewComment(''); // Reset comment input field
    }
  };

  return (
    <div className="mt-4">
      <div className="space-y-2">
        {comments && comments.map((comment, index) => (
          <div key={index} className="text-sm text-gray-600">{comment.content}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex">
        <input
          className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
};

const DebateSession = ({ debateId }) => {
  const [debate, setDebate] = useState(null);
  const [argumentsList, setArgumentsList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchSessionDetails() {
      if (!debateId) {
        setError("Debate ID is undefined.");
        return;
      }
      try {
        const debateDetails = await fetchDebateDetail(debateId);
        setDebate(debateDetails);
        const args = await listArgumentsForDebate(debateId);
        setArgumentsList(args);
      } catch (err) {
        console.error("Error fetching session details:", err);
        setError('Failed to load session details.');
      }
    }

    fetchSessionDetails();
  }, [debateId]);

  const handleCommentSubmit = async (argumentId, content) => {
    try {
      // Assuming postComment returns the updated list of comments for the argument
      const updatedComments = await postComment(debateId, argumentId, { content });
      const updatedArguments = argumentsList.map(arg => 
        arg.id === argumentId ? { ...arg, comments: updatedComments } : arg
      );
      setArgumentsList(updatedArguments);
    } catch (error) {
      console.error('Failed to post comment:', error);
      setError('Failed to post comment. Please try again.');
    }
  };

  const handleVote = async (argumentId, voteData) => {
    try {
      const updatedArgument = await submitVote(debateId, argumentId, voteData);
      const updatedArguments = argumentsList.map(arg => 
        arg.id === argumentId ? updatedArgument : arg
      );
      setArgumentsList(updatedArguments);
    } catch (error) {
      console.error('Failed to submit vote:', error);
      setError('Failed to submit vote. Please try again.');
    }
  };

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!debate) {
    return <div className="text-center">Loading session details...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Debate Session: {debate.title}</h2>
      <SubmitArgument debateId={debateId} onCommentSubmit={handleCommentSubmit} />
      <div className="mt-6 space-y-4">
        {argumentsList.length > 0 ? (
          argumentsList.map((argument, index) => (
            <div key={argument.id} className={`py-4 px-6 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'} border-b border-gray-300 rounded-lg shadow transition duration-300 ease-in-out hover:shadow-lg`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 ${index % 2 === 0 ? 'bg-blue-500' : 'bg-green-500'} text-white rounded-full flex items-center justify-center font-semibold`}>
                    {index % 2 === 0 ? 'A' : 'B'}
                  </div>
                  <p className="text-lg text-gray-700">{argument.content}</p>
                </div>
                <VoteComponent debateId={debateId} argumentId={argument.id} onVote={handleVote} />
              </div>
              <CommentSection argumentId={argument.id} comments={argument.comments || []} onSubmitComment={handleCommentSubmit} />
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No arguments submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default DebateSession;
