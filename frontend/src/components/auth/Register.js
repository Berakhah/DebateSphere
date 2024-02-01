import React, { useState } from 'react';
import './Register.css'; // Make sure to create a Register.css file for styling

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.name = user.name ? "" : "Name is required.";
    tempErrors.email = /[^@]+@[^\.]+\..+/.test(user.email) ? "" : "Please enter a valid email address.";
    tempErrors.password = user.password.length > 5 ? "" : "Password must be at least 6 characters long.";
    tempErrors.confirmPassword = user.password === user.confirmPassword ? "" : "Passwords do not match.";
    setErrors({ ...tempErrors });
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      console.log("Registration form is valid!");
      // Simulate an API call
      setTimeout(() => {
        setIsSubmitting(false);
        // Here you would handle the registration logic
      }, 2000);
    } else {
      console.log("Registration form is invalid!");
    }
  };

  return (
    <section className="register-container">
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name"
            value={user.name} 
            onChange={handleInputChange} 
            className={errors.name ? "error-input" : ""}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        {/* Repeat the structure for email, password, and confirmPassword fields */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </section>
  );
};

export default Register;
