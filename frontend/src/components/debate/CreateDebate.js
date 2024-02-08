import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDebate } from '../../api/api'; // Adjust this import as necessary

const CreateDebate = () => {
  const [debateDetails, setDebateDetails] = useState({
    title: '',
    description: '',
    dateTime: '',
    topicCategory: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDebateDetails({ ...debateDetails, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.title = debateDetails.title ? "" : "Title is required.";
    tempErrors.description = debateDetails.description ? "" : "Description is required.";
    tempErrors.dateTime = debateDetails.dateTime ? "" : "Date and time are required.";
    tempErrors.topicCategory = debateDetails.topicCategory ? "" : "Topic category is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      console.log("Debate form is invalid!");
      return;
    }

    setIsSubmitting(true);
    try {
      await createDebate(debateDetails);
      navigate('/debates'); // Adjust this path as necessary
    } catch (error) {
      console.error("Error creating debate:", error);
      setErrors({ api: error.message || "An error occurred. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold mb-6">Create Debate</h2>
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="form-group">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" id="title" name="title" value={debateDetails.title} onChange={handleInputChange} className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.title ? "border-red-500" : ""}`} />
          {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" name="description" value={debateDetails.description} onChange={handleInputChange} rows="4" className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.description ? "border-red-500" : ""}`}></textarea>
          {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700">Date and Time</label>
          <input type="datetime-local" id="dateTime" name="dateTime" value={debateDetails.dateTime} onChange={handleInputChange} className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.dateTime ? "border-red-500" : ""}`} />
          {errors.dateTime && <p className="text-red-500 text-xs italic">{errors.dateTime}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="topicCategory" className="block text-sm font-medium text-gray-700">Category</label>
          <select id="topicCategory" name="topicCategory" value={debateDetails.topicCategory} onChange={handleInputChange} className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.topicCategory ? "border-red-500" : ""}`}>
            <option value="">Select a Category</option>
            <option value="politics">Politics</option>
            <option value="science">Science</option>
            <option value="technology">Technology</option>
            <option value="health">Health</option>
            <option value="environment">Environment</option>
            {/* Add more categories as needed */}
          </select>
          {errors.topicCategory && <p className="text-red-500 text-xs italic">{errors.topicCategory}</p>}
        </div>
        <button type="submit" disabled={isSubmitting} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          {isSubmitting ? 'Creating...' : 'Create Debate'}
        </button>
      </form>
    </section>
  );
};

export default CreateDebate;
