import React, { useState } from 'react';
import { resetPassword } from '../../api/api'; // Ensure this path matches your project structure
import './ResetPassword.css'; // Update this path as needed

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
    <div className="reset-password-container">
      <form onSubmit={handleSubmit} className="reset-password-form">
        <h2>Reset Your Password</h2>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={errors.newPassword ? "input error" : "input"}
            placeholder="Enter new password"
          />
          {errors.newPassword && <p className="error-message">{errors.newPassword}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={errors.confirmPassword ? "input error" : "input"}
            placeholder="Confirm new password"
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Resetting...' : 'Reset Password'}
        </button>
        {message && <p className={errors.api ? "error-message" : "success-message"}>{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
