import React, { useState } from 'react';
import { requestPasswordReset } from '../../api/api';
// import './ForgotPassword.css';

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
    <section className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 sm:px-6 lg:px-8">
    <form onSubmit={handleSubmit} className="w-full max-w-md" noValidate>
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
      <button type="submit" disabled={isSubmitting} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        {isSubmitting ? 'Sending reset link...' : 'Send Reset Link'}
      </button>
      {message && <p className={`mt-2 text-sm ${errors.api ? "text-red-600" : "text-green-600"}`}>{message}</p>}
    </form>
  </section>
  
  );
};

export default ForgotPassword;
