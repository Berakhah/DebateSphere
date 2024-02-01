import React, { useState } from 'react';
import './ForgotPassword.css'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.email = /[^@]+@[^\.]+\..+/.test(email) ? "" : "Please enter a valid email address.";
    setErrors({ ...tempErrors });
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      console.log("Password reset request is valid!");
      // Simulate an API call
      setTimeout(() => {
        setIsSubmitting(false);
        // Here you would handle the password reset logic
      }, 2000);
    } else {
      console.log("Password reset request is invalid!");
    }
  };

  return (
    <section className="forgot-password-container">
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className={errors.email ? "error-input" : ""}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending reset link...' : 'Send Reset Link'}
        </button>
      </form>
    </section>
  );
};

export default ForgotPassword;
