import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Wishlist from "./pages/Wishlist";
import SetPassword from "./pages/SetPassword";
import Subscription from "./pages/Subscription";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/books" element={<Books />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/subscription" element={<Subscription />} />
      </Routes>
    </Router>
  );
}

export default App;