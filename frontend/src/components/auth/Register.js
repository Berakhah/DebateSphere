import React, { useState } from 'react';
// import './Register.css'; // Ensure you have corresponding CSS for styling
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const result = await registerUser(user);
        if (result.success) {
          console.log("Registration successful", result.data);
          // Redirect user to login page or show success message
          navigate('/login');
        } else {
          // Handle registration errors, e.g., user already exists
          console.error("Registration failed:", result.message);
          // Set error state here to display message to the user
          setErrors(prevErrors => ({ ...prevErrors, api: result.message }));
        }
      } catch (error) {
        console.error("Registration exception:", error.message);
        // Handle unexpected errors, e.g., network issues, server down
        setErrors(prevErrors => ({ ...prevErrors, api: error.message }));
      }
      setIsSubmitting(false);
    } else {
      console.log("Registration form is invalid!");
    }
  };

  return (
<section className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 sm:px-6 lg:px-8">
  <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" noValidate>
    <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
    {/* Name Input */}
    <div className="mb-4">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
      <input 
        type="text" 
        id="name" 
        name="name"
        value={user.name} 
        onChange={handleInputChange} 
        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.name ? "border-red-500" : ""}`}
        placeholder="John Doe"
      />
      {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
    </div>
    {/* Email Input */}
    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
      <input 
        type="email" 
        id="email" 
        name="email"
        value={user.email} 
        onChange={handleInputChange} 
        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.email ? "border-red-500" : ""}`}
        placeholder="example@example.com"
      />
      {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
    </div>
    {/* Password Input */}
    <div className="mb-4">
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
      <input 
        type="password" 
        id="password" 
        name="password"
        value={user.password} 
        onChange={handleInputChange} 
        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.password ? "border-red-500" : ""}`}
        placeholder="••••••••"
      />
      {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
    </div>
    {/* Confirm Password Input */}
    <div className="mb-4">
      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
      <input 
        type="password" 
        id="confirmPassword" 
        name="confirmPassword"
        value={user.confirmPassword} 
        onChange={handleInputChange} 
        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.confirmPassword ? "border-red-500" : ""}`}
        placeholder="••••••••"
      />
      {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
    </div>
    {/* Role Input */}
    <div className="mb-6">
      <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
      <input
        type="text" 
        id="role" 
        name="role"
        value={user.role} 
        onChange={handleInputChange} 
        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.role ? "border-red-500" : ""}`}
        placeholder="User role"
      />
      {errors.role && <p className="mt-2 text-sm text-red-600">{errors.role}</p>}
    </div>
    {/* Submit Button */}
    <div className="flex items-center justify-center">
      <button type="submit" disabled={isSubmitting} className="group relative w-full sm:w-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>
    </div>
  </form>
</section>  
  );
};

export default Register;
