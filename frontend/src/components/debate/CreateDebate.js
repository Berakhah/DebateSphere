import React, { useState } from 'react';
import './CreateDebate.css'; 
import { createDebate } from '../../api/api'; 
import { useNavigate } from 'react-router-dom';

const CreateDebate = () => {
  // State for storing debate details entered by the user
  const [debateDetails, setDebateDetails] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    visibility: 'public' // Defaulting the visibility to public
  });

  // State for storing any validation errors
  const [errors, setErrors] = useState({});
  // State to indicate whether the form is currently being submitted
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Hook to navigate the user programmatically after form submission
  const navigate = useNavigate();

  // Handles form input changes by updating the debateDetails state
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDebateDetails({ ...debateDetails, [name]: value });
  };

  // Validates the form fields and sets any validation errors
  const validateForm = () => {
    let tempErrors = {};
    // Basic validation for each field
    tempErrors.title = debateDetails.title ? "" : "Title is required.";
    tempErrors.description = debateDetails.description ? "" : "Description is required.";
    tempErrors.category = debateDetails.category ? "" : "Category is required.";
    tempErrors.date = debateDetails.date ? "" : "Date is required.";
    tempErrors.time = debateDetails.time ? "" : "Time is required.";
    tempErrors.visibility = ['public', 'private'].includes(debateDetails.visibility) ? "" : "Visibility must be either 'public' or 'private'.";
  
    setErrors({ ...tempErrors });
    return Object.values(tempErrors).every(x => x === "");
  };

  // Handles the form submission event
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Attempt to create the debate using the API utility function
        const data = await createDebate(debateDetails);
        console.log("Debate created successfully:", data);
        navigate('/debate'); // Navigate to the debates page upon successful creation
      } catch (error) {
        // Handle any errors that occur during the API call
        console.error("Error creating debate:", error.message || "An error occurred. Please try again later.");
        setErrors({ api: error.message || "An error occurred. Please try again later." });
      }
      setIsSubmitting(false); // Reset submission state
    } else {
      console.log("Debate form is invalid!");
    }
  };

  return (
    <section className="create-debate-container">
      <form onSubmit={handleSubmit} noValidate>
        {/* Form field for debate title */}
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

        {/* Form field for debate category (select input) */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select 
            id="category" 
            name="category"
            value={debateDetails.category} 
            onChange={handleInputChange} 
            className={errors.category ? "error-input" : ""}
          >
            <option value="">Select a Category</option>
            <option value="technology">Technology</option>
            <option value="politics">Politics</option>
            <option value="science">Science</option>
            {/* Additional categories can be added here */}
          </select>
          {errors.category && <p className="error">{errors.category}</p>}
        </div>

        {/* Form fields for date and time */}
        {/* Similar structure as above for date and time inputs */}

        {/* Form field for setting debate visibility (public/private) */}
        <div className="form-group">
          <label htmlFor="visibility">Visibility</label>
          <select 
            id="visibility" 
            name="visibility"
            value={debateDetails.visibility} 
            onChange={handleInputChange} 
            className={errors.visibility ? "error-input" : ""}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          {errors.visibility && <p className="error">{errors.visibility}</p>}
        </div>

        {/* Submit button, disabled when form is submitting */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating Debate...' : 'Create Debate'}
        </button>

        {/* Error message display for API errors */}
        {errors.api && <p className="error">{errors.api}</p>}
      </form>
    </section>
  );
};

export default CreateDebate;
