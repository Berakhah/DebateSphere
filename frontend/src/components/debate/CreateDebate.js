import React, { useState } from 'react';
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDebateDetails({ ...debateDetails, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = {};
    // Add validation logic for each field
    tempErrors.title = debateDetails.title ? "" : "Title is required.";
    // Repeat for other fields...
    setErrors({ ...tempErrors });
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Debate form is valid!");
      // Handle debate creation logic...
    } else {
      console.log("Debate form is invalid!");
    }
  };

  return (
    <section className="create-debate-container">
      <form onSubmit={handleSubmit} noValidate>
        {/* Input fields for title, description, category, date, time, visibility */}
        {/* Submit Button */}
      </form>
    </section>
  );
};

export default CreateDebate;
