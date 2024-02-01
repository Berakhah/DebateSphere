import React, { useState, useEffect } from 'react';
import './EditDebate.css'; // Make sure to create an EditDebate.css file for styling

const EditDebate = ({ match }) => {
  const [debateDetails, setDebateDetails] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    visibility: 'public' // Default set to public
  });
  const [errors, setErrors] = useState({});
  const debateId = match.params.id; // Assuming you're using React Router and getting the debate ID from the URL

  useEffect(() => {
    // Fetch the debate details from the API and populate the state
    // Example: fetchDebateDetails(debateId).then(data => setDebateDetails(data));
  }, [debateId]);

  // Reuse the validation and input handling logic from CreateDebate.js
  // ...

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Debate form is valid!");
      // Handle debate update logic...
    } else {
      console.log("Debate form is invalid!");
    }
  };

  return (
    <section className="edit-debate-container">
      <form onSubmit={handleSubmit} noValidate>
        {/* Reuse input fields from CreateDebate.js */}
        {/* Submit Button */}
      </form>
    </section>
  );
};

export default EditDebate;
