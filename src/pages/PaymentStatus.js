import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

const PaymentStatus = () => {
  const [status, setStatus] = useState("Processing...");
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const paymentKey = searchParams.get("uniqueKey");
        if (!paymentKey) {
          setError("Payment unique key is missing.");
          return;
        }

        const response = await apiClient.get(`/payment/status?uniqueKey=${paymentKey}`);
        if (response.data.success) {
          setStatus(response.data.message || "Payment completed successfully.");
        } else {
          setError(response.data.message || "Failed to verify payment.");
        }
      } catch (err) {
        setError("An error occurred while checking payment status.");
      }
    };

    fetchPaymentStatus();
  }, [searchParams]);

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="payment-status-container">
      <h1>Payment Status</h1>
      {error ? <p className="error-message">{error}</p> : <p>{status}</p>}
      <button onClick={handleBackToDashboard}>Back to Dashboard</button>
    </div>
  );
};

export default PaymentStatus;
