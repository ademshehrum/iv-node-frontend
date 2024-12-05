import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get("/auth/getProfile");
        setUser(response.data);
        setIsSubscribed(response.data.plan === "subscribed");
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await apiClient.post("/auth/logout");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="container">
      <div className="logout">
        <span onClick={handleLogout}>
           Logout
        </span>
      </div>
      <h1>Welcome, {user.name || "User"}!</h1>
      <p>Email: {user.email}</p>
      <p>Plan: {isSubscribed ? "Subscribed" : "Basic"}</p>
      <div className="actions">
        <button onClick={() => (window.location.href = "/books")}>View Books</button>
        <button
          onClick={() => isSubscribed && (window.location.href = "/wishlist")}
          className={!isSubscribed ? "disabled" : ""}
          title={!isSubscribed ? "Wishlist is only available for subscribed users" : ""}
          disabled={!isSubscribed}
        >
          View Wishlist
        </button>
        {!isSubscribed && (
          <button onClick={() => (window.location.href = "/subscription")}>Subscribe</button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
