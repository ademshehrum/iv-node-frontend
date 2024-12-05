import React, { useState } from "react";
import apiClient from "../api/apiClient";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/auth/register", { name, email });
      alert("Registration successful. Check your email to set your password.");
      console.log(response.data);
    } catch (error) {
      alert("Registration failed");
      console.error("Error registering:", error.message);
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;