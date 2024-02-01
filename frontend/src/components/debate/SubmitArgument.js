import React, { useState } from 'react';
import './SubmitArgument.css'; // Ensure you have corresponding CSS for styling

const SubmitArgument = ({ debateId }) => {
  const [argument, setArgument] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.argument = argument ? "" : "Argument is required.";
    // You can add more validation rules as per your requirements
    setErrors({ ...tempErrors });
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Argument is valid!");
      // Handle argument submission logic...
    } else {
      console.log("Argument is invalid!");
    }
  };

  return (
    <section className="submit-argument-container">
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="argument">Your Argument</label>
          <textarea 
            id="argument" 
            value={argument} 
            onChange={(e) => setArgument(e.target.value)} 
            className={errors.argument ? "error-input" : ""}
          ></textarea>
          {errors.argument && <p className="error">{errors.argument}</p>}
        </div>
        <button type="submit">Submit Argument</button>
      </form>
    </section>
  );
};

export default SubmitArgument;
