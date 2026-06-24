
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PMNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    const token = localStorage.getItem("token"); // ✅ get token from localStorage
    if (!token) {
      setError("Unauthorized: Please login first");
      return;
    }

    fetch("http://localhost:8080/notifications/get", {
      headers: {
        "Authorization": `Bearer ${token}`, // ✅ attach token
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch notifications");
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setNotifications(data);
        } else if (Array.isArray(data.notifications)) {
          setNotifications(data.notifications);
        } else {
          setNotifications([]);
          console.error("Notifications response is not an array:", data);
        }
      })
      .catch(err => setError(err.message));
  };

  return (
    <div style={{ padding: "30px" }}>
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
      <h2>All Notifications</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#7F8CAA", color: "#fff" }}>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Message</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Priority</th>
            <th style={styles.th}>Read</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(notifications) && notifications.length > 0 ? (
            notifications.map(n => (
              <tr key={n.id} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={styles.td}>{n.id}</td>
                <td style={styles.td}>{n.message}</td>
                <td style={styles.td}>
                  {n.createdDate ? new Date(n.createdDate).toLocaleString() : "N/A"}
                </td>
                <td style={styles.td}>{n.type}</td>
                <td style={styles.td}>{n.priority}</td>
                <td style={styles.td}>{n.isRead ? "Yes" : "No"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: "10px" }}>
                No notifications found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  th: { padding: "10px", textAlign: "left" },
  td: { padding: "10px" },
};

export default PMNotification;
