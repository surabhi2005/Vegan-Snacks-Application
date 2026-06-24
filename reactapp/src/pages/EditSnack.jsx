// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// function EditSnack() {
//   const [snack, setSnack] = useState(null);
//   const [formData, setFormData] = useState({});
//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     fetch(`http://localhost:8080/snacks/getbyvendorid/${localStorage.getItem("vendorId")}`)
//       .then(res => res.json())
//       .then(data => {
//         const snackToEdit = data.find(s => s.id === parseInt(id));
//         if (snackToEdit) {
//           setSnack(snackToEdit);
//           setFormData(snackToEdit);
//         } else {
//           alert("Snack not found");
//           navigate("/snacks");
//         }
//       })
//       .catch(err => console.error("Error fetching snack:", err));
//   }, [id, navigate]);

//   const handleChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     fetch(`http://localhost:8080/snacks/update/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData)
//     })
//       .then(res => {
//         if (!res.ok) throw new Error("Failed to update snack");
//         return res.json();
//       })
//       .then(() => {
//         alert("Snack updated successfully!");
//         navigate("/snacks");
//       })
//       .catch(err => {
//         console.error("Error updating snack:", err);
//         alert("Failed to update snack. Please try again.");
//       });
//   };

//   if (!snack) {
//     return <div className="text-center mt-5" style={{ color: "#2E3B55" }}>Loading snack details...</div>;
//   }

//   const styles = {
//     page: { backgroundColor: "#F4F6F8", minHeight: "100vh", padding: "50px 20px" },
//     container: { maxWidth: "720px", margin: "0 auto", backgroundColor: "#FFFFFF", padding: "30px", borderRadius: "15px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" },
//     header: { color: "#333446", fontWeight: "700", marginBottom: "30px", textAlign: "center" },
//     label: { fontWeight: "600", color: "#333446" },
//     input: { borderRadius: "8px", border: "1px solid #CBD5E0", padding: "10px" },
//     btnPrimary: { backgroundColor: "#7F8CAA", color: "#FFFFFF", border: "none", borderRadius: "8px", padding: "10px 25px", fontWeight: "600", transition: "0.3s" },
//     btnSecondary: { backgroundColor: "#7F8CAA", color: "#FFFFFF", border: "none", borderRadius: "8px", padding: "10px 25px", fontWeight: "600", transition: "0.3s" },
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.container}>
//         <h2 style={styles.header}>Edit Snack</h2>
//         <form onSubmit={handleSubmit}>
//           {[
//             { label: "Snack Name", name: "snackName" },
//             { label: "Snack Type", name: "snackType" },
//             { label: "Description", name: "description" },
//             { label: "Ingredients", name: "ingredients" },
//             { label: "Nutritional Info (JSON)", name: "nutritionalInfo" },
//             { label: "Quantity", name: "quantity" },
//             { label: "Price", name: "price" },
//             { label: "Expiry (Months)", name: "expiryInMonths" },
//             { label: "SKU", name: "sku" },
//             { label: "Status", name: "status" }
//           ].map(field => (
//             <div className="mb-3" key={field.name}>
//               <label style={styles.label} className="form-label">{field.label}</label>
//               <input
//                 type={field.name === "price" || field.name === "expiryInMonths" ? "number" : "text"}
//                 name={field.name}
//                 className="form-control"
//                 value={formData[field.name] || ""}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               />
//             </div>
//           ))}

//           <div className="d-flex justify-content-between mt-4 flex-wrap gap-2">
//             <button
//               type="button"
//               className="btn"
//               style={styles.btnSecondary}
//               onClick={() => navigate("/snacks")}
//               onMouseOver={e => e.target.style.backgroundColor = "#7F8CAA"}
//               onMouseOut={e => e.target.style.backgroundColor = "#333446"}
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className="btn"
//               style={styles.btnPrimary}
//               onMouseOver={e => e.target.style.backgroundColor = "#7F8CAA"}
//               onMouseOut={e => e.target.style.backgroundColor = "#333446"}
//             >
//               Update Snack
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EditSnack;
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditSnack() {
  const [snack, setSnack] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const token = localStorage.getItem("token");
  const vendorId = localStorage.getItem("vendorId");
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    // Vendor authorization check
    if (!token || userRole !== "VENDOR") {
      alert("Unauthorized! Please login as a vendor.");
      navigate("/login");
      return;
    }

    fetch(`http://localhost:8080/snacks/getbyvendorid/${vendorId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        const snackToEdit = data.find(s => s.id === parseInt(id));
        if (snackToEdit) {
          setSnack(snackToEdit);
          setFormData(snackToEdit);
        } else {
          alert("Snack not found");
          navigate("/snacks");
        }
      })
      .catch(err => console.error("Error fetching snack:", err));
  }, [id, navigate, token, vendorId, userRole]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:8080/snacks/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to update snack");
        return res.json();
      })
      .then(() => {
        alert("Snack updated successfully!");
        navigate("/snacks");
      })
      .catch(err => {
        console.error("Error updating snack:", err);
        alert("Failed to update snack. Please try again.");
      });
  };

  if (!snack) {
    return (
      <div className="text-center mt-5" style={{ color: "#2E3B55" }}>
        Loading snack details...
      </div>
    );
  }

  const styles = {
    page: { backgroundColor: "#EAEFEF", minHeight: "100vh", padding: "50px 20px", display: "flex", justifyContent: "center", alignItems: "center" },
    container: { maxWidth: "720px", width: "100%", backgroundColor: "#FFFFFF", padding: "30px", borderRadius: "15px", boxShadow: "0 6px 20px rgba(0,0,0,0.1)" },
    header: { color: "#333446", fontWeight: "700", marginBottom: "30px", textAlign: "center", fontSize: "24px" },
    label: { fontWeight: "600", color: "#333446" },
    input: { borderRadius: "8px", border: "1px solid #B8CFCE", padding: "10px", width: "100%", backgroundColor: "#EAEFEF", color: "#333446" },
    btnPrimary: { backgroundColor: "#7F8CAA", color: "#FFFFFF", border: "none", borderRadius: "8px", padding: "10px 25px", fontWeight: "600", transition: "0.3s", cursor: "pointer" },
    btnSecondary: { backgroundColor: "#B8CFCE", color: "#333446", border: "none", borderRadius: "8px", padding: "10px 25px", fontWeight: "600", transition: "0.3s", cursor: "pointer" },
  };

  return (
    <div style={styles.page}>
       <button
          onClick={() => navigate("/vendor-home")}
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
      <div style={styles.container}>
        <h2 style={styles.header}>Edit Snack</h2>
        <form onSubmit={handleSubmit}>
          {[
            { label: "Snack Name", name: "snackName" },
            { label: "Snack Type", name: "snackType" },
            { label: "Description", name: "description" },
            { label: "Ingredients", name: "ingredients" },
            { label: "Nutritional Info (JSON)", name: "nutritionalInfo" },
            { label: "Quantity", name: "quantity" },
            { label: "Price", name: "price" },
            { label: "Expiry (Months)", name: "expiryInMonths" },
            { label: "SKU", name: "sku" },
            { label: "Status", name: "status" }
          ].map(field => (
            <div className="mb-3" key={field.name}>
              <label style={styles.label} className="form-label">{field.label}</label>
              <input
                type={field.name === "price" || field.name === "expiryInMonths" ? "number" : "text"}
                name={field.name}
                className="form-control"
                value={formData[field.name] || ""}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
          ))}

          <div className="d-flex justify-content-between mt-4 flex-wrap gap-2">
            <button
              type="button"
              className="btn"
              style={styles.btnSecondary}
              onClick={() => navigate("/snacks")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn"
              style={styles.btnPrimary}
            >
              Update Snack
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSnack;
