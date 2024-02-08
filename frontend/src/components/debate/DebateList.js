import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchDebates } from '../../api/api';

const DebateList = () => {
  const [debates, setDebates] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDebates = async () => {
      try {
        const data = await fetchDebates();
        setDebates(data);
      } catch (err) {
        setError('Failed to fetch debates. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadDebates();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold text-center mb-10">Debates</h2>
      {isLoading ? (
        <div className="text-center text-lg">Loading debates...</div>
      ) : error ? (
        <div className="text-red-500 text-center text-lg">{error}</div>
      ) : debates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {debates.map((debate) => (
            <div key={debate.id} className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out bg-white">
              <h3 className="text-xl font-semibold mb-4">{debate.title}</h3>
              <p className="text-gray-600 mb-4">{debate.description.slice(0, 100)}...</p>
              <div className="flex justify-between">
                <Link to={`/debate-session/${debate.id}`} className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-150">View</Link>
                <Link to={`/debate/edit/${debate.id}`} className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-150">Edit</Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-lg">No debates found.</div>
      )}
    </div>
  );
};

export default DebateList;
