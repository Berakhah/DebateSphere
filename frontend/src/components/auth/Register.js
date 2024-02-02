import React, { useState } from 'react';
import './Register.css'; // Ensure you have corresponding CSS for styling
import { registerUser } from '../../api/api';
import {useNavigate} from 'react-router-dom';


const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const navigate = useNavigate()

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.name = user.name ? "" : "Name is required.";
    tempErrors.email = /[^@]+@[^\.]+\..+/.test(user.email) ? "" : "Please enter a valid email address.";
    tempErrors.password = user.password.length > 5 ? "" : "Password must be at least 6 characters long.";
    tempErrors.confirmPassword = user.password === user.confirmPassword ? "" : "Passwords do not match.";
    tempErrors.role = user.role ? "" : "Role is required";
    setErrors({ ...tempErrors });
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Here you would typically send a request to your backend to register the user
      // user.name = "TestUser";
      // user.role = "admin";
      console.log("Registration form is valid and being submitted", user);
      // Simulate an API call
    registerUser(user);
      console.log("registered");
      navigate('/login')
      setTimeout(() => {
        setIsSubmitting(false);
        // Handle post-registration logic here, like redirecting to a login page or showing a success message
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
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            value={user.email} 
            onChange={handleInputChange} 
            className={errors.email ? "error-input" : ""}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            value={user.password} 
            onChange={handleInputChange} 
            className={errors.password ? "error-input" : ""}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword"
            value={user.confirmPassword} 
            onChange={handleInputChange} 
            className={errors.confirmPassword ? "error-input" : ""}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="role">role</label>
          <input 
            type="text" 
            id="role" 
            name="role"
            value={user.role} 
            onChange={handleInputChange} 
            className={errors.role ? "error-input" : ""}
          />
          {errors.role && <p className="error">{errors.role}</p>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </section>
  );
};

export default Register;
