import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import "../Wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        // Fetch user profile to determine the role
        const profileResponse = await apiClient.get("/auth/getProfile");
        setUserRole(profileResponse.data.role);

        // Fetch wishlist items
        const response = await apiClient.get("/wishlist");
        if (response.data.success) {
          setWishlist(response.data.data || []);
        } else {
          alert("Failed to fetch wishlist.");
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          alert("Access denied: Only subscribed users can view their wishlist.");
          navigate("/dashboard");
        } else {
          alert("An error occurred while fetching your wishlist.");
        }
      }
    };

    fetchWishlist();
  }, [navigate]);

  const handleRemoveFromWishlist = async (bookId) => {
    try {
      await apiClient.delete(`/wishlist/${bookId}`);
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item.book_id !== bookId)
      );
      alert("Book removed from wishlist.");
    } catch (error) {
      alert("Failed to remove book from wishlist.");
    }
  };

  const handleLogout = async () => {
    try {
      await apiClient.post("/auth/logout");
      navigate("/");
    } catch (error) {
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="wishlist-container">
      <div className="books-header-links">
        <a href="/dashboard">Back to Dashboard</a>
        <a href="#" onClick={handleLogout}>
          Logout
        </a>
      </div>
      <h1>Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty. Add some books to your wishlist!</p>
      ) : (
        <div className="wishlist-items">
          {wishlist.map((item) => (
            <div className="wishlist-card" key={item.book_id}>
              <img
                src={item.book_image || "https://via.placeholder.com/150"}
                alt={item.book_name}
              />
              <div className="wishlist-details">
                <h2>{item.book_name}</h2>
                <div className="wishlist-actions">
                  <a
                    href={item.book_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wishlist-button"
                  >
                    Download
                  </a>
                  <button
                    onClick={() => handleRemoveFromWishlist(item.book_id)}
                    className="wishlist-button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
