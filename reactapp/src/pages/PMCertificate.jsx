
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PMCertificate = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // ✅ Get token from storage

    fetch("http://localhost:8080/certifications/all", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, // ✅ Secure request with token
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 401) {
          throw new Error("Unauthorized! Please login again.");
        }
        if (!res.ok) throw new Error("Failed to fetch certificates");

        return res.json();
      })
      .then(data => {
        setCertificates(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: "20px" }}>Loading certificates...</p>;
  if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "30px", backgroundColor: "#EAEFEF", minHeight: "100vh" }}>
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
      <h2 style={{ color: "#333446", marginBottom: "20px" }}>All Certificates</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#fff",
          borderRadius: "10px",
          overflow: "hidden"
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#7F8CAA", color: "#fff" }}>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Vendor Id</th>
            <th style={styles.th}>Vendor Name</th>
            <th style={styles.th}>Certificate Number</th>
            <th style={styles.th}>Certificate Type</th>
            <th style={styles.th}>Issue Date</th>
            <th style={styles.th}>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map(cert => (
            <tr key={cert.id} style={{ borderBottom: "1px solid #ccc" }}>
              <td style={styles.td}>{cert.id}</td>
              <td style={styles.td}>{cert.vendorId}</td>
              <td style={styles.td}>{cert.vendorBusinessName}</td>
              <td style={styles.td}>{cert.certificateNumber}</td>
              <td style={styles.td}>{cert.certificationType || "-"}</td>
              <td style={styles.td}>
                {cert.issueDate ? new Date(cert.issueDate).toLocaleDateString() : "-"}
              </td>
              <td style={styles.td}>
                {cert.expiryDate ? new Date(cert.expiryDate).toLocaleDateString() : "-"}
              </td>
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

export default PMCertificate;
