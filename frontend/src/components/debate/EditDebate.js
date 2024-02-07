import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { updateDebate } from '../../api/api'; // Ensure this import path matches your project structure

const EditDebate = () => {
  const [debateDetails, setDebateDetails] = useState({
    title: '',
    description: '',
    dateTime: '',
    topicCategory: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();
  const { debateId } = useParams();

  useEffect(() => {
    const fetchDebateDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3001/api/debates/${debateId}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        setDebateDetails(response.data);
      } catch (err) {
        console.error("Error fetching debate details:", err);
        setErrors({ fetch: err.message || "Could not fetch debate details." });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDebateDetails();
  }, [debateId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDebateDetails(prevDetails => ({ ...prevDetails, [name]: value }));
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

    setIsLoading(true);
    try {
      await updateDebate(debateId, debateDetails);
      setSuccessMessage('Debate updated successfully.');
      setTimeout(() => navigate('/debates'), 2000); // Redirect after success
    } catch (error) {
      console.error("Error updating debate:", error);
      setErrors({ api: error.message || "An error occurred. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="edit-debate-container">
      <h2>Edit Debate</h2>
      {successMessage && <p className="success">{successMessage}</p>}
      {errors.api && <p className="error">{errors.api}</p>}
      <form onSubmit={handleSubmit} noValidate className="edit-debate-form">
        {/* Title field */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" value={debateDetails.title} onChange={handleInputChange} className={errors.title ? "error-input" : ""} />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>
        
        {/* Description field */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={debateDetails.description} onChange={handleInputChange} className={errors.description ? "error-input" : ""}></textarea>
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        
        {/* DateTime field */}
        <div className="form-group">
          <label htmlFor="dateTime">Date and Time</label>
          <input type="datetime-local" id="dateTime" name="dateTime" value={debateDetails.dateTime} onChange={handleInputChange} className={errors.dateTime ? "error-input" : ""} />
          {errors.dateTime && <p className="error">{errors.dateTime}</p>}
        </div>
        
        {/* TopicCategory field */}
        <div className="form-group">
          <label htmlFor="topicCategory">Category</label>
          <select id="topicCategory" name="topicCategory" value={debateDetails.topicCategory} onChange={handleInputChange} className={errors.topicCategory ? "error-input" : ""}>
            <option value="">Select a Category</option>
            {/* Populate with your categories */}
          </select>
          {errors.topicCategory && <p className="error">{errors.topicCategory}</p>}
        </div>

        <button type="submit" disabled={isLoading}>{isLoading ? 'Updating...' : 'Update Debate'}</button>
      </form>
    </section>
  );
};

export default EditDebate;
