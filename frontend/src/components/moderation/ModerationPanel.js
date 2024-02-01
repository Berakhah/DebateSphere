import React, { useState, useEffect } from 'react';
import './ModerationPanel.css'; // Ensure you have corresponding CSS for styling

const ModerationPanel = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch the list of reports from the API and set the reports state
    // Example: fetchReports().then(data => setReports(data));
  }, []);

  const handleAction = (reportId, action) => {
    console.log(`Action ${action} taken on report ${reportId}`);
    // Handle the moderation action (edit, delete, ban) based on the report ID and action
  };

  return (
    <section className="moderation-panel-container">
      <h2>Moderation Panel</h2>
      <ul>
        {reports.map((report, index) => (
          <li key={index} className="report-item">
            <p>{report.content}</p>
            {/* Add buttons or links for different actions (edit, delete, ban) */}
            <button onClick={() => handleAction(report.id, 'edit')}>Edit</button>
            <button onClick={() => handleAction(report.id, 'delete')}>Delete</button>
            <button onClick={() => handleAction(report.id, 'ban')}>Ban User</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ModerationPanel;
