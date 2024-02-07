import React, { useState } from 'react';
import './SubmitArgument.css'; 
import { postArgument } from '../../api/api'; 

const SubmitArgument = ({ debateId }) => {
  const [argument, setArgument] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Validate form inputs
  const validateForm = () => {
    let tempErrors = {};
    if (!argument.trim()) tempErrors.argument = "Argument cannot be empty.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return; // Stop the form from submitting if validation fails

    setIsSubmitting(true);
    try {
      const response = await postArgument(debateId, { content: argument });
      if (response.success) {
        setSuccessMessage('Argument submitted successfully.');
        setArgument(''); // Clear the input field on successful submission
      } else {
        setErrorMessage('Failed to submit the argument.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="submit-argument-container">
      <h2>Submit Your Argument</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="argument">Argument</label>
          <textarea
            id="argument"
            value={argument}
            onChange={(e) => setArgument(e.target.value)}
            className={`form-control ${errors.argument ? 'is-invalid' : ''}`}
          ></textarea>
          {errors.argument && <div className="invalid-feedback">{errors.argument}</div>}
        </div>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmitArgument;
