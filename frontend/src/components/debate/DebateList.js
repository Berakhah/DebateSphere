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
        console.error("Error fetching debates:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDebates();
  }, []);

  return (
    <div className="debate-list mt-4">
      <h2 className="text-2xl font-bold text-center mb-6">Debates</h2>
      {isLoading ? (
        <div className="text-center">Loading debates...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {debates.map((debate) => (
            <div key={debate.id} className="debate-item border rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-lg font-semibold">{debate.title}</h3>
              <div className="flex justify-between items-center mt-4">
                <Link to={`/debate/${debate.id}`} className="text-blue-500 hover:text-blue-600 transition-colors duration-150">View Details</Link>
                <Link to={`/debate/edit/${debate.id}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-150">Edit</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DebateList;
