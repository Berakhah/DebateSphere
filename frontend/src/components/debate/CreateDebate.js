import React, { useState } from 'react';
import './CreateDebate.css'; 
import { createDebate } from '../../api/api'; 
import { useNavigate } from 'react-router-dom';

const CreateDebate = () => {
  const [debateDetails, setDebateDetails] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    visibility: 'public'
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
    tempErrors.category = debateDetails.category ? "" : "Category is required.";
    tempErrors.date = debateDetails.date ? "" : "Date is required.";
    tempErrors.time = debateDetails.time ? "" : "Time is required.";
    tempErrors.visibility = ['public', 'private'].includes(debateDetails.visibility) ? "" : "Visibility must be either 'public' or 'private'.";
    setErrors({ ...tempErrors });
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
        {/* Dynamic form generation based on debateDetails state */}
        {Object.entries(debateDetails).map(([key, value]) => (
          key !== 'visibility' ? (
            <div key={key} className="form-group">
              <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input
                type={key === 'date' || key === 'time' ? key : 'text'}
                id={key}
                name={key}
                value={value}
                onChange={handleInputChange}
                className={errors[key] ? "error-input" : ""}
              />
              {errors[key] && <p className="error">{errors[key]}</p>}
            </div>
          ) : (
            <div key={key} className="form-group">
              <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <select
                id={key}
                name={key}
                value={value}
                onChange={handleInputChange}
                className={errors[key] ? "error-input" : ""}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
              {errors[key] && <p className="error">{errors[key]}</p>}
            </div>
          )
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
