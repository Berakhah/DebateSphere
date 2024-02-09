import React, { useState } from 'react';
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
      // Assuming the server responds with JSON that includes a success field
      // Ensure your server implementation matches this expectation
      if (response.ok) {
        const responseBody = await response.json();
        if (responseBody.success) {
          setSuccessMessage('Argument submitted successfully.');
          setArgument(''); // Clear the input field on successful submission
          setErrorMessage('');
        } else {
          // Handle possible errors provided by the server in the responseBody
          setErrorMessage(responseBody.message || 'Failed to submit the argument.');
        }
      } else {
        setErrorMessage('Failed to submit the argument. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Submit Your Argument</h2>
      {successMessage && <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-lg">{successMessage}</div>}
      {errorMessage && <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="argument" className="block text-sm font-medium text-gray-700">Argument</label>
          <textarea
            id="argument"
            value={argument}
            onChange={(e) => setArgument(e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.argument ? 'border-red-500' : ''}`}
          ></textarea>
          {errors.argument && <p className="text-red-500 text-xs italic">{errors.argument}</p>}
        </div>
        <button type="submit" className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${isSubmitting ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`} disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmitArgument;
