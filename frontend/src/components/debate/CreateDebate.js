import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios for making HTTP requests
import './CreateDebate.css'; // Ensure you have corresponding CSS for styling

const CreateDebate = () => {
  const [debateDetails, setDebateDetails] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    visibility: 'public' // Default set to public
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDebateDetails({ ...debateDetails, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = {};
    // Title validation
    tempErrors.title = debateDetails.title ? "" : "Title is required.";
    
    // Description validation
    tempErrors.description = debateDetails.description ? "" : "Description is required.";
    
    // Category validation
    tempErrors.category = debateDetails.category ? "" : "Category is required.";
    
    // Date validation
    tempErrors.date = debateDetails.date ? "" : "Date is required.";
    
    // Time validation
    tempErrors.time = debateDetails.time ? "" : "Time is required.";
    
    // Visibility validation (if you have specific requirements for visibility)
    tempErrors.visibility = ['public', 'private'].includes(debateDetails.visibility) ? "" : "Visibility must be either 'public' or 'private'.";
  
    setErrors({ ...tempErrors });
    return Object.values(tempErrors).every(x => x === "");
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await axios.post('http://localhost:3000/api/debates', debateDetails, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Retrieve the token from local storage
          }
        });
        console.log("Debate created successfully:", response.data);
        // Handle success (e.g., redirect to the debate details page or show a success message)
      } catch (error) {
        console.error("Error creating debate:", error);
        setErrors({ api: error.response.data.message || "An error occurred. Please try again later." });
      }
      setIsSubmitting(false);
    } else {
      console.log("Debate form is invalid!");
    }
  };

  return (
    <section className="create-debate-container">
      <form onSubmit={handleSubmit} noValidate>
        {/* Input fields for title, description, category, date, time, visibility */}
        {/* Submit Button */}
        {errors.api && <p className="error">{errors.api}</p>}
      </form>
    </section>
  );
};

export default CreateDebate;
