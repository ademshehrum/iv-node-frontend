import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import "../Books.css";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await apiClient.get("/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error.message);
      }
    };

    fetchBooks();
  }, []);

  const handleLogout = async () => {
    try {
      await apiClient.post("/auth/logout");
      navigate("/");
    } catch (error) {
      alert("Failed to log out. Please try again.");
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? books.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === books.length - 1 ? 0 : prevIndex + 1));
  };

  const handleAddToWishlist = async (book) => {
    const { id: bookId, title: bookName, image: bookImage, pdfLink: bookUrl } = book;
  
    try {
      const response = await apiClient.post("/wishlist", { bookId, bookName, bookImage, bookUrl });
  
      if (response.data.success) {
        alert(response.data.message);
      } else {
        alert(`Failed: ${response.data.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || "An unexpected error occurred."}`);
    }
  };  

  return (
    <div className="books-carousel-container">
      <div className="books-header-links">
        <a href="/dashboard">Back to Dashboard</a>
        <a href="#" onClick={handleLogout}>
          Logout
        </a>
      </div>
      <div className="books-carousel">
        {books.length > 0 && (
          <>
            <button className="carousel-btn prev" onClick={handlePrev}>
              &lt;
            </button>
            <div className="book-card">
              <img src={books[currentIndex].image} alt={books[currentIndex].title} />
              <h2>{books[currentIndex].title}</h2>
              <p>{books[currentIndex].description}</p>
              <div className="book-actions">
                <a href={books[currentIndex].pdfLink} target="_blank" className="bg-white-btn" rel="noopener noreferrer">
                  Download
                </a>
                <button onClick={() => handleAddToWishlist(books[currentIndex])}>
                  Add to Wishlist
                </button>
              </div>
            </div>
            <button className="carousel-btn next" onClick={handleNext}>
              &gt;
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Books;