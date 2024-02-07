import React, { useState, useEffect } from 'react';
import { fetchReports } from '../../api/api'; 
import './ReportsList.css'; 

const ReportsList = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadReports = async () => {
      try {
        const data = await fetchReports();
        setReports(data);
        setIsLoading(false);
      } catch (error) {
        setError('Failed to fetch reports: ' + error.message);
        setIsLoading(false);
      }
    };

    loadReports();
  }, []);

  if (isLoading) return <p>Loading reports...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <section className="reports-list-container">
      <h2>Reports</h2>
      {reports.length > 0 ? (
        <ul>
          {reports.map((report, index) => (
            <li key={index}>
              <p><strong>Reason:</strong> {report.reason}</p>
              <p><strong>Details:</strong> {report.details}</p>
              {/* Add more report details as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reports found.</p>
      )}
    </section>
  );
};

export default ReportsList;
