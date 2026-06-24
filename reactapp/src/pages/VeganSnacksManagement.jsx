// import React, { useState, useEffect } from "react";

// const VeganSnacksManagement = () => {
//   const [veganSnacks, setVeganSnacks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:8080/snacks/getAllVeganSnacks") // Replace with your actual API endpoint
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch vegan snacks");
//         return res.json();
//       })
//       .then((data) => {
//         setVeganSnacks(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p style={{ padding: "20px" }}>Loading vegan snacks...</p>;
//   if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;

//   return (
//     <div style={{ padding: "30px" }}>
//       <h2>Vegan Snacks Management</h2>
//       <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
//         <thead>
//           <tr style={{ backgroundColor: "#7F8CAA", color: "#fff" }}>
//             <th style={styles.th}>ID</th>
//             <th style={styles.th}>Name</th>
//             <th style={styles.th}>Type</th>
//             <th style={styles.th}>Ingredients</th>
//             <th style={styles.th}>Quantity</th>
//             <th style={styles.th}>Price</th>
//             <th style={styles.th}>Expiry (months)</th>
//             <th style={styles.th}>SKU</th>
//             <th style={styles.th}>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {veganSnacks.map((snack) => (
//             <tr key={snack.id} style={{ borderBottom: "1px solid #ccc" }}>
//               <td style={styles.td}>{snack.id}</td>
//               <td style={styles.td}>{snack.snackName}</td>
//               <td style={styles.td}>{snack.snackType}</td>
//               <td style={styles.td}>{snack.ingredients}</td>
//               <td style={styles.td}>{snack.quantity}</td>
//               <td style={styles.td}>{snack.price}</td>
//               <td style={styles.td}>{snack.expiryInMonths}</td>
//               <td style={styles.td}>{snack.sku}</td>
//               <td style={styles.td}>{snack.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const styles = {
//   th: { padding: "10px", textAlign: "left" },
//   td: { padding: "10px" },
// };

// export default VeganSnacksManagement;
// VeganSnacksManagement.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VeganSnacksManagement = () => {
  const [veganSnacks, setVeganSnacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // get JWT token

    if (!token) {
      navigate("/login"); // redirect if not logged in
      return;
    }

    fetch("http://localhost:8080/snacks/getAllVeganSnacks", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          navigate("/login"); // redirect if unauthorized
          throw new Error("Unauthorized access");
        }
        if (!res.ok) throw new Error("Failed to fetch vegan snacks");
        return res.json();
      })
      .then((data) => {
        setVeganSnacks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <p style={{ padding: "20px" }}>Loading vegan snacks...</p>;
  if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "30px" }}>
      <button
        onClick={() => navigate("/admin")}
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
      <h2>Vegan Snacks Management</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#7F8CAA", color: "#fff" }}>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Ingredients</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Expiry (months)</th>
            <th style={styles.th}>SKU</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {veganSnacks.length > 0 ? (
            veganSnacks.map((snack) => (
              <tr key={snack.id} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={styles.td}>{snack.id}</td>
                <td style={styles.td}>{snack.snackName}</td>
                <td style={styles.td}>{snack.snackType}</td>
                <td style={styles.td}>{snack.ingredients}</td>
                <td style={styles.td}>{snack.quantity}</td>
                <td style={styles.td}>{snack.price}</td>
                <td style={styles.td}>{snack.expiryInMonths}</td>
                <td style={styles.td}>{snack.sku}</td>
                <td style={styles.td}>{snack.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} style={{ textAlign: "center", padding: "10px" }}>
                No vegan snacks found
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

export default VeganSnacksManagement;
