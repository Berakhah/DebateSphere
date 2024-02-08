import React, { useState, useEffect } from 'react';
import { fetchDebates, fetchReports, listArgumentsForDebate, deleteContent, suspendUser, banUser, warnUser } from '../../api/api';

const ModerationPanel = () => {
  const [reports, setReports] = useState([]);
  const [debates, setDebates] = useState([]);
  const [selectedDebateId, setSelectedDebateId] = useState('');
  const [argumentsForSelectedDebate, setArgumentsForSelectedDebate] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Consolidated data loading function
  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      const debatesData = await fetchDebates();
      setDebates(debatesData);
      const reportsData = await fetchReports();
      setReports(reportsData);
      setError('');
    } catch (error) {
      setError(`Failed to load data: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    const loadArguments = async () => {
      if (!selectedDebateId) {
        setArgumentsForSelectedDebate([]);
        return;
      }
      setIsLoading(true);
      try {
        const args = await listArgumentsForDebate(selectedDebateId);
        setArgumentsForSelectedDebate(args);
        setError('');
      } catch (error) {
        setError(`Failed to load arguments: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadArguments();
  }, [selectedDebateId]);

  const handleAction = async (id, actionType, entity = 'report') => {
    if (!window.confirm(`Are you sure you want to ${actionType} this ${entity}?`)) return;

    setIsLoading(true);
    try {
      // Assuming deleteContent function is versatile for both reports and arguments
      if (actionType === 'delete') {
        await deleteContent(id);
      } else if (entity === 'user') {
        // User-specific actions
        actionType === 'suspend' ? await suspendUser(id) :
        actionType === 'ban' ? await banUser(id) :
        await warnUser(id);
      }
      alert(`${actionType.charAt(0).toUpperCase() + actionType.slice(1)} action performed successfully.`);
      await loadInitialData(); // Refresh all data after an action
    } catch (error) {
      setError(`Failed to perform ${actionType} action: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-gray-900">Moderation Dashboard</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="my-4">
            <label htmlFor="debateSelector" className="block text-sm font-medium text-gray-700">Select a Debate:</label>
            <select id="debateSelector" value={selectedDebateId} onChange={(e) => setSelectedDebateId(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option value="">--Choose a debate--</option>
              {debates.map((debate) => (
                <option key={debate.id} value={debate.id}>{debate.title}</option>
              ))}
            </select>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Arguments for Selected Debate:</h3>
            <ul className="divide-y divide-gray-200">
              {argumentsForSelectedDebate.map((argument) => (
                <li key={argument.id} className="py-4 flex justify-between items-center">
                  <p className="text-sm text-gray-500">{argument.content}</p>
                  <button onClick={() => handleAction(argument.id, 'delete', 'argument')} className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-xs">Delete Argument</button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ModerationPanel;
