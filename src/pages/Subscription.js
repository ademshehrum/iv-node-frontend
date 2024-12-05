import React, { useState, useEffect } from "react";
import apiClient from "../api/apiClient";
import "../Subscription.css";

const Subscription = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  // fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get("/auth/getProfile");
        if (response.data) {
          setProfile(response.data);
        } else {
          console.error("Failed to fetch user profile:", response);
          alert("Failed to fetch user profile.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err.message);
        alert("Error fetching profile. Please try again.");
      }
    };

    fetchProfile();
  }, []);

  const handleSubscribe = async () => {
    if (!profile) {
      alert("Profile is not loaded yet. Please try again.");
      return;
    }
  
    setLoading(true);
    try {
      // send subscription data to backend
      const response = await apiClient.post("/subscription", {
        paymentAmount: "30.00",
        refNo: `REF-${Date.now()}`, // generate random refNo
        email: profile.email,
        name: profile.name,
      });
  
      if (response.data.success) {
        alert("Redirecting to payment gateway...");
        window.location.href = response.data.paymentUrl; // redirect to payment gateway
      } else {
        alert(response.data.message || "Failed to initiate subscription.");
      }
    } catch (err) {
      console.error("Error initiating subscription:", err.message);
      alert("An error occurred while initiating subscription.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="subscription-container">
      <h1>Subscribe Now</h1>
      <p>Get access to exclusive features and content by subscribing only RM30 in a lifetime.</p>

      {profile ? (
        <div className="profile-details">
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
        </div>
      ) : (
        <p>Loading profile details...</p>
      )}

      <button
        className="subscribe-button"
        onClick={handleSubscribe}
        disabled={loading || !profile}
      >
        {loading ? "Processing..." : "Subscribe Now"}
      </button>
    </div>
  );
};

export default Subscription;
