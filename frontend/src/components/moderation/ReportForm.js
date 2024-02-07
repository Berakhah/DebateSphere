import React, { useState } from 'react';
import { reportContent } from '../../api/api'; 
import './ReportForm.css'; 

const ReportForm = ({ contentId }) => {
  const [reportDetails, setReportDetails] = useState({
    reason: '',
    details: '',
    contentId,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReportDetails({ ...reportDetails, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.reason = reportDetails.reason ? "" : "Reason for reporting is required.";
    tempErrors.details = reportDetails.details ? "" : "Detailed explanation is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      console.log("Report is invalid!");
      return; 
    }

    setIsSubmitting(true);
    try {
      await reportContent(reportDetails);
      console.log("Report submitted successfully.");
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Reporting content error:', error);
      setErrors({ api: 'Failed to submit report. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section className="report-form-container">
      {submitSuccess && <p className="success">Report submitted successfully!</p>}
      <form onSubmit={handleSubmit} noValidate>
        {/* Reason for reporting dropdown */}
        <div className="form-group">
          <label htmlFor="reason">Reason for Reporting</label>
          <select
            id="reason"
            name="reason"
            value={reportDetails.reason}
            onChange={handleInputChange}
            className={errors.reason ? "error-input" : ""}
          >
            <option value="">Select a reason</option>
            {/* Add more reasons as options here */}
          </select>
          {errors.reason && <p className="error">{errors.reason}</p>}
        </div>
        {/* Detailed explanation textarea */}
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
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </button>
        {errors.api && <p className="error">{errors.api}</p>}
      </form>
    </section>
  );
};

export default ReportForm;
