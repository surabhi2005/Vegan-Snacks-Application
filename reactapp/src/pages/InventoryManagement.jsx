// import React, { useState, useEffect } from "react";

// const InventoryManagement = () => {
//   const [inventory, setInventory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch all inventory items
//   useEffect(() => {
//     fetch("http://localhost:8080/inventory/all")
//       .then(res => {
//         if (!res.ok) throw new Error("Failed to fetch inventory");
//         return res.json();
//       })
//       .then(data => {
//         setInventory(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p style={{ padding: "20px" }}>Loading inventory...</p>;
//   if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;

//   return (
//     <div style={{ padding: "30px" }}>
//       <h2>Inventory Management</h2>
//       <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
//         <thead>
//           <tr style={{ backgroundColor: "#7F8CAA", color: "#fff" }}>
//             <th style={styles.th}>ID</th>
//             <th style={styles.th}>Product</th>
//             <th style={styles.th}>Current Stock</th>
//             <th style={styles.th}>Reorder Point</th>
//             <th style={styles.th}>Max Stock</th>
//             <th style={styles.th}>Cost/Unit</th>
//             <th style={styles.th}>Last Restock</th>
//             <th style={styles.th}>Last Updated</th>
//             <th style={styles.th}>Location</th>
//           </tr>
//         </thead>
//         <tbody>
//           {inventory.map(item => (
//             <tr key={item.id} style={{ borderBottom: "1px solid #ccc" }}>
//               <td style={styles.td}>{item.id}</td>
//               <td style={styles.td}>{item.productName}</td>
//               <td style={styles.td}>{item.currentStock}</td>
//               <td style={styles.td}>{item.reorderPoint}</td>
//               <td style={styles.td}>{item.maxStock}</td>
//               <td style={styles.td}>{item.costPerUnit}</td>
//               <td style={styles.td}>{item.lastRestockDate ? new Date(item.lastRestockDate).toLocaleDateString() : "-"}</td>
//               <td style={styles.td}>{item.lastUpdated ? new Date(item.lastUpdated).toLocaleDateString() : "-"}</td>
//               <td style={styles.td}>{item.location}</td>
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

// export default InventoryManagement;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  // Fetch all inventory items with authentication
  useEffect(() => {
    const token = localStorage.getItem("token"); // ✅ Get token from local storage

    fetch("http://localhost:8080/inventory/all", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, // ✅ Secure API call
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 401) {
          throw new Error("Unauthorized! Please login again.");
        }
        if (!res.ok) throw new Error("Failed to fetch inventory");
        return res.json();
      })
      .then(data => {
        setInventory(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: "20px" }}>Loading inventory...</p>;
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
      <h2>Inventory Management</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#7F8CAA", color: "#fff" }}>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Product</th>
            <th style={styles.th}>Current Stock</th>
            <th style={styles.th}>Reorder Point</th>
            <th style={styles.th}>Max Stock</th>
            <th style={styles.th}>Cost/Unit</th>
            <th style={styles.th}>Last Restock</th>
            <th style={styles.th}>Last Updated</th>
            <th style={styles.th}>Location</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item.id} style={{ borderBottom: "1px solid #ccc" }}>
              <td style={styles.td}>{item.id}</td>
              <td style={styles.td}>{item.productName}</td>
              <td style={styles.td}>{item.currentStock}</td>
              <td style={styles.td}>{item.reorderPoint}</td>
              <td style={styles.td}>{item.maxStock}</td>
              <td style={styles.td}>{item.costPerUnit}</td>
              <td style={styles.td}>
                {item.lastRestockDate ? new Date(item.lastRestockDate).toLocaleDateString() : "-"}
              </td>
              <td style={styles.td}>
                {item.lastUpdated ? new Date(item.lastUpdated).toLocaleDateString() : "-"}
              </td>
              <td style={styles.td}>{item.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  th: { padding: "10px", textAlign: "left" },
  td: { padding: "10px" },
};

export default InventoryManagement;
