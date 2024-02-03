import React, { useState, useEffect } from 'react';
import { fetchReports, deleteContent, suspendUser, banUser, warnUser } from '../../api/api'; // Adjust import path
import './ModerationPanel.css';

const ModerationPanel = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setIsLoading(true);
    try {
      const data = await fetchReports();
      setReports(data);
    } catch (err) {
      setError('Failed to load reports. Please try again later.');
      console.error("Error loading reports:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async (reportId, actionType) => {
    // Optional: Implement confirmation dialog before executing action
    if (!window.confirm(`Are you sure you want to ${actionType} this user/report?`)) return;

    setIsLoading(true);
    try {
      switch (actionType) {
        case 'delete':
          await deleteContent(reportId);
          break;
        case 'suspend':
          await suspendUser(reportId);
          break;
        case 'ban':
          await banUser(reportId);
          break;
        case 'warn':
          await warnUser(reportId);
          break;
        default:
          throw new Error('Unknown action type');
      }
      alert(`Successfully executed ${actionType} action.`); // Replace with a more sophisticated feedback mechanism
      loadReports(); // Refresh the list of reports
    } catch (error) {
      console.error(`Error executing action ${actionType}:`, error);
      setError(`Failed to execute action: ${actionType}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="moderation-panel-container">
      <h2>Moderation Panel</h2>
      {isLoading ? <p>Loading reports...</p> : error ? <p className="error">{error}</p> : (
        <ul>
          {reports.map((report, index) => (
            <li key={index} className="report-item">
              <p>{report.content}</p>
              <div className="actions">
                <button onClick={() => handleAction(report.id, 'delete')}>Delete</button>
                <button onClick={() => handleAction(report.id, 'ban')}>Ban User</button>
                <button onClick={() => handleAction(report.id, 'warn')}>Warn User</button>
                <button onClick={() => handleAction(report.id, 'suspend')}>Suspend User</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ModerationPanel;
