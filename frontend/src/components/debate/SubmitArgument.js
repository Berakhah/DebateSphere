import React, { useState } from 'react';
import { postArgument } from '../../api/api';

const SubmitArgument = ({ debateId, onArgumentSubmitted }) => {
  const [argument, setArgument] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const validateForm = () => {
    let tempErrors = {};
    if (!argument.trim()) {
      tempErrors.argument = "Argument cannot be empty.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
  
    setIsSubmitting(true);
    setMessage({ text: '', type: '' }); // Reset message
    try {
      // Directly use the response body as postArgument already parses the JSON
      const responseBody = await postArgument(debateId, { content: argument });
  
      // Since postArgument throws for non-OK responses, reaching here means the submission was successful
      setMessage({ text: 'Argument submitted successfully.', type: 'success' });
      setArgument(''); // Clear the input field on successful submission
      
      if (onArgumentSubmitted) {
        onArgumentSubmitted(); // Optionally, callback to parent component to refresh the argument list
      }
    } catch (error) {
      // Handle any errors that occurred during submission, including network errors and API-reported issues
      console.error('Submission error:', error);
      // error.message would be 'Network response was not ok' if the fetch response wasn't ok
      setMessage({ text: error.message || 'An error occurred. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Submit Your Argument</h2>
      {message.text && (
        <div className={`p-4 mb-4 text-white rounded-lg ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="argument" className="block text-sm font-medium text-gray-700">Argument</label>
          <textarea
            id="argument"
            name="argument"
            value={argument}
            onChange={(e) => setArgument(e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${errors.argument ? 'border-red-500' : ''}`}
            rows="4"
          ></textarea>
          {errors.argument && <p className="text-red-500 text-xs italic">{errors.argument}</p>}
        </div>
        <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400">
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default SubmitArgument;
