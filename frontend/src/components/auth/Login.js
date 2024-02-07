import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import './Login.css'; 
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
      try {
        const data = await loginUser({ email, password });
        console.log("Login successful!", data);
        navigate('/HomePage'); // Use the correct path, considering case sensitivity and routing setup
      } catch (error) {
        console.error("Login failed:", error);
        setErrors(prevErrors => ({ ...prevErrors, api: error.message || 'Login failed' }));
      }
      setIsLoading(false);
    } else {
      console.log("Form is invalid!");
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 sm:px-6 lg:px-8">
    <form onSubmit={handleSubmit} className="w-full max-w-md" noValidate>
      {/* Email Input */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input 
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.email ? "border-red-500" : ""}`}
        />
        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
      </div>
      {/* Password Input */}
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input 
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.password ? "border-red-500" : ""}`}
        />
        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
      </div>
      {/* Submit Button */}
      <button type="submit" disabled={isLoading} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      <div className="mt-4 text-center">
        <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot Password?</Link>
      </div>
    </form>
  </section>
  
  );
};

export default Login;
