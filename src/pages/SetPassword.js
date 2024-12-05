import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import apiClient from "../api/apiClient";
import "../SetPassword.css";

const SetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!password || !confirmPassword) {
      setError("Both fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await apiClient.post("/auth/set-password", { token, password });
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/"); // Redirect to login or landing page
        }, 2000);
      } else {
        setError(response.data.message || "Failed to set password.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="set-password-container">
      <h1>Set Your Password</h1>
      {error && <p className="error-message" aria-live="assertive">{error}</p>}
      {success ? (
        <p className="success-message" aria-live="polite">
          Password set successfully! Redirecting...
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="set-password-form">
          <label>
            New Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="New Password"
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              aria-label="Confirm Password"
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Setting..." : "Set Password"}
          </button>
        </form>
      )}
    </div>
  );
};

export default SetPassword;
