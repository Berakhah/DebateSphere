import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to install axios for making HTTP requests
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
    const fetchDebateDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/debates/${debateId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Retrieve the token from local storage
          }
        });
        setDebateDetails(response.data);
      } catch (err) {
        console.error("Error fetching debate details:", err);
        // Handle errors appropriately
      }
    };

    fetchDebateDetails();
  }, [debateId]);

  const validateForm = () => {
    // Validation logic here...
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(`http://localhost:3000/api/debates/update/${debateId}`, debateDetails, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log("Debate updated successfully:", response.data);
        // Handle success (e.g., redirect to the debate details page or show a success message)
      } catch (error) {
        console.error("Error updating debate:", error);
        setErrors({ api: error.response.data.message || "An error occurred. Please try again later." });
      }
    } else {
      console.log("Debate form is invalid!");
    }
  };

  return (
    <section className="edit-debate-container">
      <form onSubmit={handleSubmit} noValidate>
        {/* Reuse input fields from CreateDebate.js */}
        {/* Submit Button */}
        {errors.api && <p className="error">{errors.api}</p>}
      </form>
    </section>
  );
};

export default EditDebate;
