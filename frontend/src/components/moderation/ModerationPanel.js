import React, { useState, useEffect } from 'react';
import { fetchReports, deleteContent, suspendUser, banUser, warnUser } from '../../api/api';
import './ModerationPanel.css';

const ModerationPanel = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadReports = async () => {
    setIsLoading(true);
    try {
      const data = await fetchReports();
      setReports(data);
    } catch (error) {
      setError('Failed to load reports: ' + error.message);
      console.error("Error loading reports:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleAction = async (reportId, actionType) => {
    if (!window.confirm(`Are you sure you want to ${actionType} this report?`)) return;

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
          console.error('Unknown action type:', actionType);
          setIsLoading(false);
          return;
      }
      alert(`Action ${actionType} successfully executed.`);
      loadReports();
    } catch (error) {
      console.error(`Error executing action ${actionType}:`, error);
      setError(`Failed to execute action: ${actionType}.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="moderation-panel-container">
      <h2>Moderation Panel</h2>
      {isLoading ? <p>Loading...</p> : error ? <p className="error">{error}</p> : (
        <ul>
          {reports.length > 0 ? reports.map((report, index) => (
            <li key={index} className="report-item">
              <p>{report.content}</p>
              <div className="actions">
                <button onClick={() => handleAction(report.id, 'delete')}>Delete</button>
                <button onClick={() => handleAction(report.id, 'ban')}>Ban</button>
                <button onClick={() => handleAction(report.id, 'warn')}>Warn</button>
                <button onClick={() => handleAction(report.id, 'suspend')}>Suspend</button>
              </div>
            </li>
          )) : <p>No reports to display.</p>}
        </ul>
      )}
    </section>
  );
};

export default ModerationPanel;
