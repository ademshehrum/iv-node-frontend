import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiClient from "../api/apiClient";

const PaymentStatus = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const refNo = searchParams.get("refNo");

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await apiClient.get(`/subscription/status?refNo=${refNo}`);
        if (response.data.success) {
          setStatus(response.data.data.payment_status);
        } else {
          setStatus("Failed to fetch payment status.");
        }
      } catch (err) {
        console.error("Error fetching payment status:", err);
        setStatus("Error while fetching payment status.");
      } finally {
        setLoading(false);
      }
    };

    if (refNo) {
      fetchPaymentStatus();
    } else {
      setStatus("Invalid payment reference.");
      setLoading(false);
    }
  }, [refNo]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Payment Status</h1>
      <p>Status: {status}</p>
    </div>
  );
};

export default PaymentStatus;
