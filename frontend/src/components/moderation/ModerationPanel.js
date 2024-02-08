import React, { useState, useEffect } from 'react';
import { deleteContent, suspendUser, banUser, warnUser, fetchUsers, fetchDebates, listArgumentsForDebate } from '../../api/api';

const ModerationPanel = () => {
  const [debatesWithArguments, setDebatesWithArguments] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

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

        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        setError("Failed to fetch data: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteArgument = async (debateId, argumentId) => {
    const confirmation = window.confirm("Are you sure you want to delete this argument?");
    if (!confirmation) return;

    setIsLoading(true);
    try {
      await deleteContent('argument', argumentId);
      const updatedDebates = debatesWithArguments.map((debate) => {
        if (debate.debateId === debateId) {
          return { ...debate, arguments: debate.arguments.filter((arg) => arg.argumentId !== argumentId) };
        }
        return debate;
      });
      setDebatesWithArguments(updatedDebates);
    } catch (error) {
      setError("Failed to delete argument: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuspendUser = async (userId, username) => {
    const confirmation = window.confirm(`Are you sure you want to suspend user ${username}?`);
    if (!confirmation) return;

    try {
      await suspendUser(userId);
      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          return { ...user, isSuspended: true };
        }
        return user;
      });
      setUsers(updatedUsers);
    } catch (error) {
      setError("Failed to suspend user: " + error.message);
    }
  };

  const handleBanUser = async (userId, username) => {
    const confirmation = window.confirm(`Are you sure you want to ban user ${username}?`);
    if (!confirmation) return;

    try {
      await banUser(userId);
      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          return { ...user, isBanned: true };
        }
        return user;
      });
      setUsers(updatedUsers);
    } catch (error) {
      setError("Failed to ban user: " + error.message);
    }
  };

  const handleWarnUser = async (userId, username) => {
    const confirmation = window.confirm(`Are you sure you want to warn user ${username}?`);
    if (!confirmation) return;

    try {
      await warnUser(userId);
      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          return { ...user, warningCount: user.warningCount + 1 };
        }
        return user;
      });
      setUsers(updatedUsers);
    } catch (error) {
      setError("Failed to warn user: " + error.message);
    }
  };

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-red-500 mt-8">Error: {error}</div>;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Content Moderation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {debatesWithArguments.map((debate) => (
            <div key={debate.debateId}>
              <h3 className="text-lg font-semibold mb-2">{debate.title}</h3>
              {debate.arguments.map((argument) => (
                <div key={argument.argumentId} className="border p-4 rounded-lg mb-4">
                  <p className="mb-2">{argument.content}</p>
                  <p className="text-sm text-gray-500">Debate: {debate.title}</p>
                  <button
                    onClick={() => handleDeleteArgument(debate.debateId, argument.argumentId)}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                  >
                    Delete Argument
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">User Moderation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user.id} className="border p-4 rounded-lg">
              <p className="mb-2">{user.username}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => handleSuspendUser(user.id, user.username)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
                >
                  Suspend
                </button>
                <button
                  onClick={() => handleBanUser(user.id, user.username)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                >
                  Ban
                </button>
                <button
                  onClick={() => handleWarnUser(user.id, user.username)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Warn
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModerationPanel;
