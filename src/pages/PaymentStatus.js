import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import apiClient from "../api/apiClient";

const PaymentStatus = () => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const refNo = searchParams.get("refNo");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await apiClient.get(`/payment/status?refNo=${refNo}`);
        if (response.data.success) {
          const paymentData = response.data.data;
          setStatus(paymentData);

          // redirect
          if (paymentData.payment_status === "completed") {
            setTimeout(() => navigate("/dashboard"), 2500);
          }
        } else {
          setError(response.data.message || "Failed to fetch payment status.");
        }
      } catch (err) {
        setError("An error occurred while fetching payment status.");
      }
    };

    if (refNo) {
      fetchPaymentStatus();
    } else {
      setError("Payment reference number is missing.");
    }
  }, [refNo, navigate]);

  if (error) {
    return <div className="payment-status-container">{error}</div>;
  }

  if (!status) {
    return <div className="payment-status-container">Loading...</div>;
  }

  return (
    <div className="payment-status-container">
      <h1>Payment Status</h1>
      <p><strong>Reference Number:</strong> {status.payment_ref_no}</p>
      <p><strong>Amount:</strong> {status.payment_amount}</p>
      <p><strong>Status:</strong> {status.payment_status}</p>
      {status.payment_status === "completed" && (
        <p>Your subscription has been activated! Redirecting to dashboard...</p>
      )}
    </div>
  );
};

export default PaymentStatus;
