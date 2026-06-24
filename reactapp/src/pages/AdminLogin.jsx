import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Static credentials check
    if (username === "admin" && password === "1234") {
      navigate("/admin"); // Redirect to admin dashboard page
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Admin Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div style={styles.field}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              placeholder="Enter username"
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #333446, #7F8CAA)", // dark gradient
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
    width: "360px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333446", // matches navbar
  },
  field: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  },
  label: {
    fontWeight: "500",
    color: "#333446",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #7F8CAA",
    marginTop: "5px",
    outline: "none",
    transition: "0.3s",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#7F8CAA", // matches feature buttons
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },
  error: {
    color: "#D32F2F", // red for error
    marginBottom: "10px",
    textAlign: "center",
    fontWeight: "600",
  },
};

// Pseudo hover/focus effects via inline style objects
styles.input[":focus"] = { borderColor: "#333446" };
styles.button[":hover"] = { backgroundColor: "#5E6B85" };

export default AdminLogin;
