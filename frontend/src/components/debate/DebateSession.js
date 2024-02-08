import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SubmitArgument from './SubmitArgument';
import VoteComponent from './VoteComponent';
import { fetchDebateDetail, listArgumentsForDebate, postComment, submitVote } from '../../api/api';

const DebateSession = () => {
  const [debate, setDebate] = useState(null);
  const [argumentsList, setArgumentsList] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id: debateId } = useParams();

  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (!debateId) {
        console.error("Debate ID is undefined.");
        navigate('/'); // Redirect to a safe page or error page
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
    };
    fetchSessionDetails();
  }, [debateId, navigate]);

  const handleCommentSubmit = async (argumentId, content) => {
    try {
      await postComment(debateId, { content }); // Use debateId for posting comment
      // Refresh comments after posting
      const args = await listArgumentsForDebate(debateId);
      setArgumentsList(args);
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  const handleVote = async (argumentId, voteData) => {
    try {
      await submitVote(debateId, argumentId, voteData); // Use debateId for voting
      // Refresh arguments after voting
      const args = await listArgumentsForDebate(debateId);
      setArgumentsList(args);
    } catch (error) {
      console.error('Failed to submit vote:', error);
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!debate) {
    return <div>Loading session details...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Debate Session: {debate.title}</h2>
      <SubmitArgument debateId={debateId} />
      <div className="mt-6">
        {argumentsList.length > 0 ? (
          argumentsList.map((argument, index) => (
            <div key={argument.id} className={`py-4 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'} border-b border-gray-300`}>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold mr-2">
                    {index % 2 === 0 ? 'A' : 'B'}
                  </div>
                  <p className="text-lg">{argument.content}</p>
                </div>
                <VoteComponent debateId={debateId} argumentId={argument.id} handleVote={handleVote} />
              </div>
              {/* Comment section */}
              <CommentSection
                argumentId={argument.id}
                onCommentSubmit={(content) => handleCommentSubmit(argument.id, content)}
              />
            </div>
          ))
        ) : (
          <p>No arguments submitted yet.</p>
        )}
      </div>
    </div>
  );
};

// Comment Section Component
const CommentSection = ({ argumentId, onCommentSubmit }) => {
  const [commentContent, setCommentContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;
    onCommentSubmit(commentContent);
    setCommentContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex mt-2">
      <input
        type="text"
        placeholder="Write a comment..."
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        className="flex-1 rounded-l border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none">
        Post
      </button>
    </form>
  );
};

export default DebateSession;
