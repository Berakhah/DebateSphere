import React, { useState } from 'react';
import './CreateDebate.css'; 
import { createDebate } from '../../api/api'; 
import { useNavigate } from 'react-router-dom';

const CreateDebate = () => {
  const [debateDetails, setDebateDetails] = useState({
    title: '',
    description: '',
    topicCategory: '', // Renamed from category to match backend requirement
    date: '',
    time: ''
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
    tempErrors.topicCategory = debateDetails.topicCategory ? "" : "Topic category is required.";
    tempErrors.date = debateDetails.date ? "" : "Date is required.";
    tempErrors.time = debateDetails.time ? "" : "Time is required.";
    setErrors({ ...tempErrors });
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      console.log("Debate form is invalid!");
      return;
    }
    
    const submissionData = {
      ...debateDetails,
      dateTime: `${debateDetails.date}T${debateDetails.time}` // Combine date and time into a dateTime field
    };
    delete submissionData.date; // Remove the separate date
    delete submissionData.time; // Remove the separate time

    setIsSubmitting(true);
    try {
      await createDebate(submissionData);
      navigate('/debates'); // Adjust the navigation path as necessary
    } catch (error) {
      console.error("Error creating debate:", error);
      setErrors({ api: error.message || "An error occurred. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="create-debate-container">
      <h2>Create Debate</h2>
      <form onSubmit={handleSubmit} noValidate>
        {Object.entries(debateDetails).map(([key, value]) => (
          <div key={key} className="form-group">
            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1).replace('topicCategory', 'Topic Category')}</label>
            {key === 'topicCategory' ? (
              <select
                id={key}
                name={key}
                value={value}
                onChange={handleInputChange}
                className={errors[key] ? "error-input" : ""}
              >
                {/* Example categories, replace or populate with actual ones */}
                <option value="">Select a category</option>
                <option value="politics">Politics</option>
                <option value="science">Science</option>
                <option value="technology">Technology</option>
              </select>
            ) : (
              <input
                type={key === 'date' || key === 'time' ? key : 'text'}
                id={key}
                name={key}
                value={value}
                onChange={handleInputChange}
                className={errors[key] ? "error-input" : ""}
              />
            )}
            {errors[key] && <p className="error">{errors[key]}</p>}
          </div>
        ))}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Debate'}
        </button>
        {errors.api && <p className="error">{errors.api}</p>}
      </form>
    </section>
  );
};

export default CreateDebate;
