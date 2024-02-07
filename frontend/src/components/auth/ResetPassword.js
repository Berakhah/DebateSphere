import React, { useState } from 'react';
import { resetPassword } from '../../api/api'; // Ensure this path matches your project structure
// import './ResetPassword.css'; // Update this path as needed

const ResetPassword = ({ token }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const validateForm = () => {
    let tempErrors = {};
    if (!newPassword || newPassword.length < 6) {
      tempErrors.newPassword = "Password must be at least 6 characters.";
    }
    if (newPassword !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors({ ...tempErrors });
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      const response = await resetPassword(token, newPassword);
      setMessage(response.message);
      setIsSubmitting(false);
      if (!response.success) {
        setErrors({ api: response.message });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 sm:px-6 lg:px-8">
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <h2 className="text-lg font-medium text-center text-gray-900 mb-6">Reset Your Password</h2>
      {/* New Password Input */}
      <div className="mb-4">
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.newPassword ? "border-red-500" : ""}`}
          placeholder="Enter new password"
        />
        {errors.newPassword && <p className="mt-2 text-sm text-red-600">{errors.newPassword}</p>}
      </div>
      {/* Confirm New Password Input */}
      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.confirmPassword ? "border-red-500" : ""}`}
          placeholder="Confirm new password"
        />
        {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
      </div>
      <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={isSubmitting}>
        {isSubmitting ? 'Resetting...' : 'Reset Password'}
      </button>
      {message && <p className={`mt-2 text-sm ${errors.api ? "text-red-600" : "text-green-600"}`}>{message}</p>}
    </form>
  </div>
  
  );
};

export default ResetPassword;
