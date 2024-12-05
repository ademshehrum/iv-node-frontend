import React, { useState } from "react";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setFormData({ name: "", email: "", password: "" });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login API
        await apiClient.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        navigate("/dashboard");
      } else {
        // Register API
        await apiClient.post("/auth/register", {
          name: formData.name,
          email: formData.email,
        });
        alert("Registration successful! Check your email to set your password.");
        toggleForm();
      }
    } catch (error) {
      alert("Error: " + error.response?.data || error.message);
      console.error("Error:", error);
    }
  };

  return (
    <div className="landing-page">
      <div className="card">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {isLogin && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          )}
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>
        <p className="toggle-text" onClick={toggleForm}>
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default LandingPage;