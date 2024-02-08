import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SubmitArgument from './SubmitArgument'; // Adjust the path as needed
import VoteComponent from './VoteComponent'; // Adjust the path as needed
import { fetchDebateDetail, listArgumentsForDebate } from '../../api/api'; // Adjust the import path as needed

const DebateSession = () => {
  const [debate, setDebate] = useState(null);
  const [argumentsList, setArgumentsList] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id: debateId } = useParams();

  useEffect(() => {
    const fetchSessionDetails = async () => {
      console.log("Debate ID:", debateId); // Debug log
      if (!debateId) {
        console.error("Debate ID is undefined.");
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
  }, [debateId]);

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
          argumentsList.map((argument) => (
            <div key={argument.id} className="border-b border-gray-200 py-4">
              <p className="mb-2">{argument.content}</p>
              <VoteComponent debateId={debateId} argumentId={argument.id} />
            </div>
          ))
        ) : (
          <p>No arguments submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default DebateSession;
