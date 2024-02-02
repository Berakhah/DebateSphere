import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; 
import { loginUser } from '../../api/api';
import {useNavigate} from 'react-router-dom';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.email = /[^@]+@[^\.]+\..+/.test(email) ? "" : "Please enter a valid email address.";
    tempErrors.password = password.length > 5 ? "" : "Password must be at least 6 characters long.";
    setErrors({ ...tempErrors });
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      console.log("Form is valid!");
      // Simulate an API call
      loginUser({"email" : email, "password" : password})
      navigate('/HomePage')
      setTimeout(() => {
        setIsLoading(false);
        // Here you would handle the login logic
      }, 2000);
    } else {
      console.log("Form is invalid!");
    }
  };

  return (
    <section className="login-container">
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
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? "error-input" : ""}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <div className="login-help">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
