// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const EditInventory = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [inventory, setInventory] = useState({
//     productId: "",
//     productName: "",
//     currentStock: "",
//     reorderPoint: "",
//     maxStock: "",
//     costPerUnit: "",
//     lastRestockDate: "",
//     lastUpdated: "",
//     location: ""
//   });

//   const [error, setError] = useState("");

//   // Format date for <input type="date">
//   const formatDateForInput = (dateString) => {
//     return dateString ? dateString.split("T")[0] : "";
//   };

//  const formatDateForBackend = (dateString) => {
//   return dateString ? `${dateString}T00:00:00` : null;
// };


//   useEffect(() => {
//     fetch(`http://localhost:8080/inventory/get/${id}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch inventory details.");
//         return res.json();
//       })
//       .then((data) => {
//         setInventory({
//           productId: data.productId,
//           productName: data.productName,
//           currentStock: data.currentStock,
//           reorderPoint: data.reorderPoint,
//           maxStock: data.maxStock,
//           costPerUnit: data.costPerUnit,
//           lastRestockDate: formatDateForInput(data.lastRestockDate),
//           lastUpdated: formatDateForInput(data.lastUpdated),
//           location: data.location
//         });
//       })
//       .catch((err) => setError(err.message));
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInventory({ ...inventory, [name]: value });
//   };

  
//   const handleSubmit = (e) => {
//   e.preventDefault();

//   const updatedInventory = {
//     product: {
//       id: inventory.productId,
//     },
//     currentStock: Number(inventory.currentStock),
//     reorderPoint: Number(inventory.reorderPoint),
//     maxStock: Number(inventory.maxStock),
//     costPerUnit: Number(inventory.costPerUnit),
//     lastRestockDate: formatDateForBackend(inventory.lastRestockDate),
//     lastUpdated: formatDateForBackend(inventory.lastUpdated), // will now include T00:00:00
//     location: inventory.location
//   };

//   console.log(updatedInventory);

//   fetch(`http://localhost:8080/inventory/update/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(updatedInventory)
//   })
//     .then((res) => {
//       if (!res.ok) throw new Error("Update failed.");
//       return res.json();
//     })
//     .then(() => {
//       alert("Inventory updated successfully!");
//       navigate("/inventory");
//     })
//     .catch((err) => setError(err.message));
// };


//   return (
//     <div style={styles.page}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>Edit Inventory</h2>
//         {error && <div style={styles.error}>{error}</div>}

//         <form onSubmit={handleSubmit}>
//           <div style={styles.row}>
//             <div style={styles.col}>
//               <label style={styles.label}>Product ID</label>
//               <p style={styles.readonly}>{inventory.productId}</p>
//             </div>
//             <div style={styles.col}>
//               <label style={styles.label}>Product Name</label>
//               <p style={styles.readonly}>{inventory.productName}</p>
//             </div>
//           </div>

//           <div style={styles.row}>
//             <div style={styles.col}>
//               <label style={styles.label}>Current Stock</label>
//               <input
//                 type="number"
//                 name="currentStock"
//                 value={inventory.currentStock}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               />
//             </div>
//             <div style={styles.col}>
//               <label style={styles.label}>Reorder Point</label>
//               <input
//                 type="number"
//                 name="reorderPoint"
//                 value={inventory.reorderPoint}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               />
//             </div>
//             <div style={styles.col}>
//               <label style={styles.label}>Max Stock</label>
//               <input
//                 type="number"
//                 name="maxStock"
//                 value={inventory.maxStock}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               />
//             </div>
//           </div>

//           <div style={styles.row}>
//             <div style={styles.col}>
//               <label style={styles.label}>Cost per Unit</label>
//               <input
//                 type="number"
//                 step="0.01"
//                 name="costPerUnit"
//                 value={inventory.costPerUnit}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               />
//             </div>
//             <div style={styles.col}>
//               <label style={styles.label}>Location</label>
//               <input
//                 type="text"
//                 name="location"
//                 value={inventory.location}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               />
//             </div>
//           </div>

//           <div style={styles.row}>
//             <div style={styles.col}>
//               <label style={styles.label}>Last Restock Date</label>
//               <input
//                 type="date"
//                 name="lastRestockDate"
//                 value={inventory.lastRestockDate}
//                 onChange={handleChange}
//                 style={styles.input}
//               />
//             </div>
//             <div style={styles.col}>
//               <label style={styles.label}>Last Updated</label>
//               <input
//                 type="date"
//                 name="lastUpdated"
//                 value={inventory.lastUpdated}
//                 onChange={handleChange}
//                 style={styles.input}
//               />
//             </div>
//           </div>

//           <div style={{ display: "flex", justifyContent: "flex-end", gap: "15px", marginTop: "20px", flexWrap: "wrap" }}>
//             <button type="button" style={styles.cancelButton} onClick={() => navigate("/inventory")}>Cancel</button>
//             <button type="submit" style={styles.updateButton}>Update Inventory</button>

//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   page: { backgroundColor: "#EAEFEF", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "30px" },
//   card: { backgroundColor: "#FFFFFF", padding: "30px", borderRadius: "12px", boxShadow: "0 6px 15px rgba(51, 52, 70, 0.15)", width: "80%", maxWidth: "900px" },
//   title: { color: "#333446", marginBottom: "20px", textAlign: "center" },
//   error: { backgroundColor: "#ffdddd", color: "#b30000", padding: "10px", borderRadius: "5px", marginBottom: "15px" },
//   row: { display: "flex", gap: "20px", marginBottom: "15px", flexWrap: "wrap" },
//   col: { flex: 1, minWidth: "200px" },
//   label: { display: "block", marginBottom: "6px", fontWeight: "600", color: "#333446" },
//   input: { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #B8CFCE", backgroundColor: "#EAEFEF", color: "#333446", fontSize: "14px" },
//   readonly: { padding: "10px", backgroundColor: "#B8CFCE", borderRadius: "6px", color: "#333446", fontWeight: "500" },
//   updateButton: { backgroundColor: "#7F8CAA", color: "#fff", border: "none", padding: "12px 25px", borderRadius: "8px", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "0.3s" },
//   cancelButton: { backgroundColor: "#B8CFCE", color: "#333446", border: "none", padding: "12px 25px", borderRadius: "8px", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "0.3s" },
//   deleteButton: { backgroundColor: "#FF6B6B", color: "#fff", border: "none", padding: "12px 25px", borderRadius: "8px", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "0.3s" }
// };

// export default EditInventory;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditInventory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  const [inventory, setInventory] = useState({
    productId: "",
    productName: "",
    currentStock: "",
    reorderPoint: "",
    maxStock: "",
    costPerUnit: "",
    lastRestockDate: "",
    lastUpdated: "",
    location: ""
  });

  const [error, setError] = useState("");

  // Format date for <input type="date">
  const formatDateForInput = (dateString) => dateString ? dateString.split("T")[0] : "";
  const formatDateForBackend = (dateString) => dateString ? `${dateString}T00:00:00` : null;

  // Fetch inventory details with protected route check
  useEffect(() => {
    if (!token || userRole !== "VENDOR") {
      alert("Unauthorized access! Please login as a vendor.");
      navigate("/login");
      return;
    }

    fetch(`http://localhost:8080/inventory/get/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            alert("Session expired or unauthorized. Please login again.");
            localStorage.removeItem("token");
            navigate("/login");
          }
          throw new Error("Failed to fetch inventory details.");
        }
        return res.json();
      })
      .then((data) => {
        setInventory({
          productId: data.productId,
          productName: data.productName,
          currentStock: data.currentStock,
          reorderPoint: data.reorderPoint,
          maxStock: data.maxStock,
          costPerUnit: data.costPerUnit,
          lastRestockDate: formatDateForInput(data.lastRestockDate),
          lastUpdated: formatDateForInput(data.lastUpdated),
          location: data.location
        });
      })
      .catch((err) => setError(err.message));
  }, [id, token, userRole, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInventory({ ...inventory, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedInventory = {
      product: { id: inventory.productId },
      currentStock: Number(inventory.currentStock),
      reorderPoint: Number(inventory.reorderPoint),
      maxStock: Number(inventory.maxStock),
      costPerUnit: Number(inventory.costPerUnit),
      lastRestockDate: formatDateForBackend(inventory.lastRestockDate),
      lastUpdated: formatDateForBackend(inventory.lastUpdated),
      location: inventory.location
    };

    fetch(`http://localhost:8080/inventory/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedInventory)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed.");
        return res.json();
      })
      .then(() => {
        alert("Inventory updated successfully!");
        navigate("/inventory");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div style={styles.page}>
       <button
          onClick={() => navigate("/inventory")}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            fontSize: "22px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "6px 12px",
            cursor: "pointer",
            zIndex: 3,
          }}
        >
          ☰
        </button>
      <div style={styles.card}>
        <h2 style={styles.title}>Edit Inventory</h2>
        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.row}>
            <div style={styles.col}>
              <label style={styles.label}>Product ID</label>
              <p style={styles.readonly}>{inventory.productId}</p>
            </div>
            <div style={styles.col}>
              <label style={styles.label}>Product Name</label>
              <p style={styles.readonly}>{inventory.productName}</p>
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.col}>
              <label style={styles.label}>Current Stock</label>
              <input
                type="number"
                name="currentStock"
                value={inventory.currentStock}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.col}>
              <label style={styles.label}>Reorder Point</label>
              <input
                type="number"
                name="reorderPoint"
                value={inventory.reorderPoint}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.col}>
              <label style={styles.label}>Max Stock</label>
              <input
                type="number"
                name="maxStock"
                value={inventory.maxStock}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.col}>
              <label style={styles.label}>Cost per Unit</label>
              <input
                type="number"
                step="0.01"
                name="costPerUnit"
                value={inventory.costPerUnit}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.col}>
              <label style={styles.label}>Location</label>
              <input
                type="text"
                name="location"
                value={inventory.location}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.col}>
              <label style={styles.label}>Last Restock Date</label>
              <input
                type="date"
                name="lastRestockDate"
                value={inventory.lastRestockDate}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.col}>
              <label style={styles.label}>Last Updated</label>
              <input
                type="date"
                name="lastUpdated"
                value={inventory.lastUpdated}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "15px", marginTop: "20px", flexWrap: "wrap" }}>
            <button type="button" style={styles.cancelButton} onClick={() => navigate("/inventory")}>Cancel</button>
            <button type="submit" style={styles.updateButton}>Update Inventory</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: { backgroundColor: "#EAEFEF", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "30px" },
  card: { backgroundColor: "#FFFFFF", padding: "30px", borderRadius: "12px", boxShadow: "0 6px 15px rgba(51, 52, 70, 0.15)", width: "80%", maxWidth: "900px" },
  title: { color: "#333446", marginBottom: "20px", textAlign: "center" },
  error: { backgroundColor: "#ffdddd", color: "#b30000", padding: "10px", borderRadius: "5px", marginBottom: "15px" },
  row: { display: "flex", gap: "20px", marginBottom: "15px", flexWrap: "wrap" },
  col: { flex: 1, minWidth: "200px" },
  label: { display: "block", marginBottom: "6px", fontWeight: "600", color: "#333446" },
  input: { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #B8CFCE", backgroundColor: "#EAEFEF", color: "#333446", fontSize: "14px" },
  readonly: { padding: "10px", backgroundColor: "#B8CFCE", borderRadius: "6px", color: "#333446", fontWeight: "500" },
  updateButton: { backgroundColor: "#7F8CAA", color: "#fff", border: "none", padding: "12px 25px", borderRadius: "8px", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "0.3s" },
  cancelButton: { backgroundColor: "#B8CFCE", color: "#333446", border: "none", padding: "12px 25px", borderRadius: "8px", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "0.3s" }
};

export default EditInventory;
