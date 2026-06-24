
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PMFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); // redirect if not logged in
      return;
    }

    // Fetch all product reviews with authentication token
    fetch("http://localhost:8080/product-reviews/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.status === 401) {
          navigate("/login"); // unauthorized → force login
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch feedbacks");
        return res.json();
      })
      .then(data => {
        setFeedbacks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <p style={{ padding: "20px" }}>Loading feedbacks...</p>;
  if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#EAEFEF",
        minHeight: "100vh",
      }}
    >
       <button
        onClick={() => navigate("/product-manager-home")}
        style={{
          fontSize: "24px",
          background: "none",
          border: "none",
          cursor: "pointer",
          marginBottom: "15px",
        }}
      >
        ☰
      </button>
      <h2 style={{ color: "#333446", marginBottom: "20px" }}>
        All Product Reviews
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#7F8CAA", color: "#fff" }}>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Customer ID</th>
            <th style={styles.th}>Username</th>
            <th style={styles.th}>Product</th>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Review</th>
            <th style={styles.th}>Rating</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Verified Purchase</th>
            <th style={styles.th}>Approved</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map(fb => (
            <tr key={fb.id} style={{ borderBottom: "1px solid #ccc" }}>
              <td style={styles.td}>{fb.id}</td>
              <td style={styles.td}>{fb.customerId}</td>
              <td style={styles.td}>{fb.customerUsername}</td>
              <td style={styles.td}>{fb.productName}</td>
              <td style={styles.td}>{fb.reviewTitle}</td>
              <td style={styles.td}>{fb.reviewText}</td>
              <td style={styles.td}>{fb.rating}</td>
              <td style={styles.td}>
                {fb.reviewDate
                  ? new Date(fb.reviewDate).toLocaleDateString()
                  : "-"}
              </td>
              <td style={styles.td}>{fb.isVerifiedPurchase ? "Yes" : "No"}</td>
              <td style={styles.td}>{fb.isApproved ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  th: { padding: "12px", textAlign: "left" },
  td: { padding: "12px" },
};

export default PMFeedback;
