// EditDebate.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Using axios for API calls
import { useNavigate, useParams } from 'react-router-dom'; // For navigation and URL parameters
import { updateDebate } from '../../api/api'; // Adjust import path as needed
import './EditDebate.css';

const EditDebate = () => {
  const [debateDetails, setDebateDetails] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    visibility: 'public', // Default set to public
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();
  const { debateId } = useParams(); // Using useParams hook for React Router v6

  useEffect(() => {
    const fetchDebateDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3001/api/debates/${debateId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
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
    tempErrors.category = debateDetails.category ? "" : "Category is required.";
    tempErrors.date = debateDetails.date ? "" : "Date is required.";
    tempErrors.time = debateDetails.time ? "" : "Time is required.";
    tempErrors.visibility = ['public', 'private'].includes(debateDetails.visibility) ? "" : "Visibility must be either 'public' or 'private'.";
  
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
      setTimeout(() => navigate('/debates'), 2000); // Redirect after a success
    } catch (error) {
      console.error("Error updating debate:", error);
      setErrors({ api: error.message || "An error occurred. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  // Render form with validation feedback for each field
  return (
    <section className="edit-debate-container">
      <h2>Edit Debate</h2>
      {successMessage && <p className="success">{successMessage}</p>}
      {errors.api && <p className="error">{errors.api}</p>}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            id="title" 
            name="title"
            value={debateDetails.title} 
            onChange={handleInputChange} 
            className={errors.title ? "error-input" : ""}
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>
        
        {/* Repeat structure for description, category, date, time, and visibility fields */}
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={debateDetails.description}
            onChange={handleInputChange}
            className={errors.description ? "error-input" : ""}
          ></textarea>
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        {/* Example for one more field, repeat for others */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input 
            type="text" 
            id="category" 
            name="category"
            value={debateDetails.category} 
            onChange={handleInputChange} 
            className={errors.category ? "error-input" : ""}
          />
          {errors.category && <p className="error">{errors.category}</p>}
        </div>
        
        <button type="submit" disabled={isLoading}>{isLoading ? 'Updating...' : 'Update Debate'}</button>
      </form>
    </section>
  );
};

export default EditDebate;
