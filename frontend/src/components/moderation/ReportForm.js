import React, { useState } from 'react';
import { reportContent } from '../../api/api';

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
    tempErrors.reason = reportDetails.reason ? '' : 'Reason for reporting is required.';
    tempErrors.details = reportDetails.details ? '' : 'Detailed explanation is required.';
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await reportContent(reportDetails);
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Reporting content error:', error);
      setErrors({ api: 'Failed to submit report. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="report-form-container bg-white p-6 rounded-lg shadow-md">
      {submitSuccess && <p className="text-green-500">Report submitted successfully!</p>}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group mb-4">
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
            Reason for Reporting
          </label>
          <select
            id="reason"
            name="reason"
            value={reportDetails.reason}
            onChange={handleInputChange}
            className={`mt-1 block w-full p-2 border ${
              errors.reason ? 'border-red-500' : 'border-gray-300'
            } rounded-md`}
          >
            <option value="">Select a reason</option>
            <option value="Harassment">Harassment</option>
            <option value="Spam">Spam</option>
            <option value="Inappropriate Content">Inappropriate Content</option>
            <option value="Other">Other</option>
          </select>
          {errors.reason && <p className="text-red-500 text-sm">{errors.reason}</p>}
        </div>
        <div className="form-group mb-4">
          <label htmlFor="details" className="block text-sm font-medium text-gray-700">
            Details
          </label>
          <textarea
            id="details"
            name="details"
            value={reportDetails.details}
            onChange={handleInputChange}
            className={`mt-1 block w-full p-2 border ${
              errors.details ? 'border-red-500' : 'border-gray-300'
            } rounded-md`}
          ></textarea>
          {errors.details && <p className="text-red-500 text-sm">{errors.details}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </button>
        {errors.api && <p className="text-red-500 text-sm mt-2">{errors.api}</p>}
      </form>
    </section>
  );
};

export default ReportForm;
