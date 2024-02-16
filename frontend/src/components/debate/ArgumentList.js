import React, { useState, useEffect } from 'react';
import VoteComponent from './VoteComponent';
import { listArgumentsForDebate } from '../../api/api';

const ArgumentItem = ({ argument }) => (
  <li className="bg-white shadow overflow-hidden rounded-md px-6 py-4 mb-4">
    <div className="font-medium text-gray-900">{argument.content}</div>
    <VoteComponent argumentId={argument.id} />
  </li>
);

const ArgumentList = ({ debateId }) => {
  const [argumentList, setArgumentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchArguments = async () => {
      setIsLoading(true);
      try {
        const fetchedArguments = await listArgumentsForDebate(debateId);
        setArgumentList(fetchedArguments);
        setErrorMessage('');
      } catch (error) {
        console.error('Error fetching arguments:', error);
        setErrorMessage('Failed to load arguments.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArguments();
  }, [debateId]);

  if (isLoading) return <p>Loading arguments...</p>;
  if (errorMessage) return <p className="text-red-500">{errorMessage}</p>;

  return (
    <section className="argument-list-container mt-8">
      <h2 className="text-xl font-semibold mb-4">Arguments</h2>
      {argumentList.length > 0 ? (
        <ul className="space-y-2">
          {argumentList.map((argument) => (
            <ArgumentItem key={argument.id} argument={argument} />
          ))}
        </ul>
      ) : (
        <p>No arguments have been submitted yet.</p>
      )}
    </section>
  );
};

export default ArgumentList;
