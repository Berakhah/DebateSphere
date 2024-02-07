import React, { useState } from 'react';
import { requestPasswordReset } from '../../api/api';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(''); 

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.email = /[^@]+@[^\.]+\..+/.test(email) ? "" : "Please enter a valid email address.";
    setErrors({ ...tempErrors });
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      const response = await requestPasswordReset(email);
      setIsSubmitting(false);
      setMessage(response.message); 
      if (!response.success) {
        setErrors({ api: response.message });
      }
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
        {message && <p className={errors.api ? "error" : "success"}>{message}</p>}
      </form>
    </section>
  );
};

export default ForgotPassword;
