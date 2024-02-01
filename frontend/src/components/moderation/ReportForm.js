import React, { useState } from 'react';
import './ReportForm.css'; // Ensure you have corresponding CSS for styling

const ReportForm = ({ contentId }) => {
  const [reportDetails, setReportDetails] = useState({
    reason: '',
    details: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReportDetails({ ...reportDetails, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.reason = reportDetails.reason ? "" : "Reason for reporting is required.";
    tempErrors.details = reportDetails.details ? "" : "Detailed explanation is required.";
    setErrors({ ...tempErrors });
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Report is valid!");
      // Handle report submission logic...
    } else {
      console.log("Report is invalid!");
    }
  };

  return (
    <section className="report-form-container">
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="reason">Reason for Reporting</label>
          <select 
            id="reason" 
            name="reason" 
            value={reportDetails.reason} 
            onChange={handleInputChange}
            className={errors.reason ? "error-input" : ""}
          >
            {/* Options for reasons */}
          </select>
          {errors.reason && <p className="error">{errors.reason}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="details">Details</label>
          <textarea 
            id="details" 
            name="details" 
            value={reportDetails.details} 
            onChange={handleInputChange} 
            className={errors.details ? "error-input" : ""}
          ></textarea>
          {errors.details && <p className="error">{errors.details}</p>}
        </div>
        <button type="submit">Submit Report</button>
      </form>
    </section>
  );
};

export default ReportForm;
