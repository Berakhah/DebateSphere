import React, { useState, useEffect } from 'react';
import { fetchDebates, listArgumentsForDebate } from '../../api/api';

const DebateList = () => {
  const [debatesWithArguments, setDebatesWithArguments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDebate, setSelectedDebate] = useState(null); // Selected debate for popup
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const debates = await fetchDebates();
        const debatesWithArgs = await Promise.all(
          debates.map(async (debate) => {
            const argumentsForDebate = await listArgumentsForDebate(debate.debateId);
            return { ...debate, arguments: argumentsForDebate };
          })
        );
        setDebatesWithArguments(debatesWithArgs);
      } catch (error) {
        setError("Failed to fetch data: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDebateClick = async (debateId) => {
    try {
      const argumentsForDebate = await listArgumentsForDebate(debateId);
      const selectedDebate = debatesWithArguments.find((debate) => debate.debateId === debateId);
      setSelectedDebate({ ...selectedDebate, arguments: argumentsForDebate });
    } catch (error) {
      console.error('Error fetching arguments for popup:', error);
      setError('Failed to fetch debate details. Please try again later.');
    }
  };

  const handleClosePopup = () => {
    setSelectedDebate(null);
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const filteredDebates = debatesWithArguments.filter((debate) =>
    debate.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-red-500 mt-8">Error: {error}</div>;

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Debates</h2>
      <div className="mb-4">
        <input
          type="text"
          value={searchKeyword}
          onChange={handleSearchChange}
          placeholder="Search debates..."
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredDebates.map((debate) => (
          <div key={debate.debateId} className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">{debate.title}</h3>
            <div className="grid grid-cols-1 gap-4">
              {debate.arguments.map((argument) => (
                <div key={argument.argumentId} className="bg-gray-100 p-4 rounded-lg">
                  <p className="mb-2">{argument.content}</p>
                  <p className="text-sm text-gray-500">Debate: {debate.title}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleDebateClick(debate.debateId)}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              See More
            </button>
          </div>
        ))}
      </div>

      {/* Popup for displaying debate details */}
      {selectedDebate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 max-w-xl overflow-y-auto max-h-screen">
            <h2 className="text-2xl font-bold mb-4">{selectedDebate.title}</h2>
            <h3 className="text-xl font-semibold mb-2">Debate Details</h3>
            <div className="grid grid-cols-1 gap-4">
              {selectedDebate.arguments.map((argument) => (
                <div key={argument.argumentId} className="bg-gray-100 p-4 rounded-lg">
                  <p className="mb-2">{argument.content}</p>
                  <p className="text-sm text-gray-500">Debate: {selectedDebate.title}</p>
                </div>
              ))}
            </div>
            <button
              onClick={handleClosePopup}
              className="mt-4 px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebateList;
