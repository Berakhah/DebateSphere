import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { updateDebate } from '../../api/api'; // Adjust this import as necessary

const EditDebate = () => {
  const [debateDetails, setDebateDetails] = useState({
    title: '',
    description: '',
    dateTime: '',
    topicCategory: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();
  const { debateId } = useParams();
  const API_BASE_URL = 'http://localhost:3001';

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${API_BASE_URL}/api/debates/update/${debateId}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    })
    .then(response => {
      const { title, description, dateTime, topicCategory } = response.data;
      setDebateDetails({
        title,
        description,
        dateTime: dateTime.slice(0, 16), 
        topicCategory,
      });
      setIsLoading(false);
    })
    .catch(error => {
      console.error("Error fetching debate details:", error);
      setErrors({ fetch: error.message || "Could not fetch debate details." });
      setIsLoading(false);
    });
  }, [debateId, API_BASE_URL]);

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

    updateDebate(debateId, debateDetails)
      .then(() => {
        setSuccessMessage('Debate updated successfully.');
        setTimeout(() => navigate('/debates'), 2000); 
      })
      .catch(error => {
        console.error("Error updating debate:", error);
        setErrors({ api: error.message || "An error occurred. Please try again later." });
      });
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold mb-6">Edit Debate</h2>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errors.api && <p className="text-red-500">{errors.api}</p>}
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="form-group">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" id="title" name="title" value={debateDetails.title} onChange={handleInputChange} className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.title ? "border-red-500" : ""}`} />
          {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" name="description" value={debateDetails.description} onChange={handleInputChange} className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.description ? "border-red-500" : ""}`}></textarea>
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
          </select>
          {errors.topicCategory && <p className="text-red-500 text-xs italic">{errors.topicCategory}</p>}
        </div>
        <button type="submit" disabled={isLoading} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          {isLoading ? 'Updating...' : 'Update Debate'}
        </button>
      </form>
    </section>
  );
};

export default EditDebate;
