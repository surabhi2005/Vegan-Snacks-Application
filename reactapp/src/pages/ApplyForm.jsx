// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function ApplyForm() {
//   const navigate = useNavigate();
//   const vendorId = localStorage.getItem("vendorId"); // vendor ID stored at login

//   const [form, setForm] = useState({
//     snackName: "",
//     snackType: "",
//     description: "",
//     ingredients: "",
//     nutritionalInfo: "",
//     quantity: "",
//     price: "",
//     expiryInMonths: "",
//     sku: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [backendError, setBackendError] = useState("");

//   const validate = () => {
//     const err = {};
//     if (!form.snackName) err.snackName = "Snack Name is required";
//     if (!form.snackType) err.snackType = "Snack Type is required";
//     if (!form.quantity) err.quantity = "Quantity is required";
//     if (!form.price) err.price = "Price is required";
//     else if (parseFloat(form.price) <= 0)
//       err.price = "Price must be a positive number";
//     if (form.expiryInMonths === "" || form.expiryInMonths === null) {
//       err.expiryInMonths = "Expiry in months is required";
//     } else if (parseInt(form.expiryInMonths, 10) < 0) {
//       err.expiryInMonths = "Expiry must be non-negative";
//     }
//     return err;
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setBackendError("");
//     const validationErrors = validate();
//     setErrors(validationErrors);
//     if (Object.keys(validationErrors).length > 0) return;

//     if (!vendorId) {
//       alert("Vendor not logged in!");
//       return;
//     }

//     try {
//       const payload = {
//         ...form,
//         price: parseFloat(form.price),
//         expiryInMonths: parseInt(form.expiryInMonths, 10),
//         vendor: { id: parseInt(vendorId, 10) },
//         nutritionalInfo: form.nutritionalInfo
//           ? JSON.stringify(JSON.parse(form.nutritionalInfo))
//           : null,
//       };

//       const response = await fetch(
//         "http://localhost:8080/snacks/addVeganSnack",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         }
//       );

//       if (response.ok) {
//   const savedSnack = await response.json(); // ✅ get saved snack from backend
//   alert("Snack submitted successfully!");
//   setForm({
//     snackName: "",
//     snackType: "",
//     description: "",
//     ingredients: "",
//     nutritionalInfo: "",
//     quantity: "",
//     price: "",
//     expiryInMonths: "",
//     sku: "",
//   });
//   navigate(`/add-snack-images/${savedSnack.id}`); // ✅ Go to Add Images page
// }
//  else {
//         const errData = await response.json();
//         console.error("Backend error:", errData);
//         setBackendError(errData.message || "Failed to submit snack.");
//       }
//     } catch (err) {
//       console.error("Error submitting form:", err);
//       setBackendError("Server error occurred.");
//     }
//   };
//   const styles = {
//     page: { backgroundColor: "white", minHeight: "100vh", padding: "150px" },
//     card: {
//       backgroundColor: "#B8CFCE",
//       border: "1px solid #7F8CAA",
//       borderRadius: "12px",
//     },
//     header: { color: "#333446", fontWeight: "bold" },
//     btnPrimary: { backgroundColor: "#333446", border: "none" },
//     btnSecondary: { backgroundColor: "#7F8CAA", border: "none" },
//   };

//   return (
//     <div style={styles.page} className="container py-5">
//       <h2 className="text-center mb-4" style={styles.header}>
//         Add a New Vegan Snack
//       </h2>

//       <div className="card shadow p-4" style={styles.card}>
//         {backendError && (
//           <div className="alert alert-danger">{backendError}</div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Snack Name</label>
//             <input
//               type="text"
//               className="form-control"
//               name="snackName"
//               value={form.snackName}
//               onChange={handleChange}
//             />
//             {errors.snackName && (
//               <div className="text-danger">{errors.snackName}</div>
//             )}
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Snack Type</label>
//             <input
//               type="text"
//               className="form-control"
//               name="snackType"
//               value={form.snackType}
//               onChange={handleChange}
//             />
//             {errors.snackType && (
//               <div className="text-danger">{errors.snackType}</div>
//             )}
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Description</label>
//             <textarea
//               className="form-control"
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//             ></textarea>
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Ingredients</label>
//             <textarea
//               className="form-control"
//               name="ingredients"
//               value={form.ingredients}
//               onChange={handleChange}
//             ></textarea>
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Nutritional Info (JSON)</label>
//             <textarea
//               className="form-control"
//               name="nutritionalInfo"
//               value={form.nutritionalInfo}
//               onChange={handleChange}
//             ></textarea>
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Quantity</label>
//             <input
//               type="text"
//               className="form-control"
//               name="quantity"
//               value={form.quantity}
//               onChange={handleChange}
//             />
//             {errors.quantity && (
//               <div className="text-danger">{errors.quantity}</div>
//             )}
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Price</label>
//             <input
//               type="number"
//               className="form-control"
//               name="price"
//               value={form.price}
//               onChange={handleChange}
//             />
//             {errors.price && (
//               <div className="text-danger">{errors.price}</div>
//             )}
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Expiry (in months)</label>
//             <input
//               type="number"
//               className="form-control"
//               name="expiryInMonths"
//               value={form.expiryInMonths}
//               onChange={handleChange}
//             />
//             {errors.expiryInMonths && (
//               <div className="text-danger">{errors.expiryInMonths}</div>
//             )}
//           </div>

//           <div className="mb-3">
//             <label className="form-label">SKU (optional)</label>
//             <input
//               type="text"
//               className="form-control"
//               name="sku"
//               value={form.sku}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="d-flex justify-content-between">
//             <button type="submit" className="btn text-white" style={styles.btnPrimary}>
//               Save
//             </button>
//             {/* <button
//               type="button"
//               className="btn text-white"
//               style={styles.btnSecondary}
//               onClick={() => navigate("/vendor-home")}
//             >
//               Back to Vendor Home
//             </button> */}
//           </div>
//         </form>
//       </div>

//     </div>
//   );
// }

// export default ApplyForm;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ApplyForm() {
  const navigate = useNavigate();
  const vendorId = localStorage.getItem("vendorId");
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // assume role is set as "VENDOR"

  const [form, setForm] = useState({
    snackName: "",
    snackType: "",
    description: "",
    ingredients: "",
    nutritionalInfo: "",
    quantity: "",
    price: "",
    expiryInMonths: "",
    sku: "",
  });

  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState("");

  // Only allow authorized vendors
  useEffect(() => {
    if (!token || !vendorId || userRole !== "VENDOR") {
      alert("Unauthorized access! Please login as a vendor.");
      navigate("/login");
    }
  }, [navigate, token, vendorId, userRole]);

  const validate = () => {
    const err = {};
    if (!form.snackName) err.snackName = "Snack Name is required";
    if (!form.snackType) err.snackType = "Snack Type is required";
    if (!form.quantity) err.quantity = "Quantity is required";
    if (!form.price) err.price = "Price is required";
    else if (parseFloat(form.price) <= 0) err.price = "Price must be a positive number";
    if (form.expiryInMonths === "" || form.expiryInMonths === null) {
      err.expiryInMonths = "Expiry in months is required";
    } else if (parseInt(form.expiryInMonths, 10) < 0) {
      err.expiryInMonths = "Expiry must be non-negative";
    }
    return err;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBackendError("");
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        expiryInMonths: parseInt(form.expiryInMonths, 10),
        vendor: { id: parseInt(vendorId, 10) },
        nutritionalInfo: form.nutritionalInfo
          ? JSON.stringify(JSON.parse(form.nutritionalInfo))
          : null,
      };

      const response = await fetch("http://localhost:8080/snacks/addVeganSnack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const savedSnack = await response.json();
        alert("Snack submitted successfully!");
        setForm({
          snackName: "",
          snackType: "",
          description: "",
          ingredients: "",
          nutritionalInfo: "",
          quantity: "",
          price: "",
          expiryInMonths: "",
          sku: "",
        });
        navigate(`/add-snack-images/${savedSnack.id}`);
      } else if (response.status === 401 || response.status === 403) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        const errData = await response.json();
        setBackendError(errData.message || "Failed to submit snack.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setBackendError("Server error occurred.");
    }
  };

  const styles = {
    page: { backgroundColor: "white", minHeight: "100vh", padding: "150px 20px" },
    card: { backgroundColor: "#B8CFCE", border: "1px solid #7F8CAA", borderRadius: "12px" },
    header: { color: "#333446", fontWeight: "bold" },
    btnPrimary: { backgroundColor: "#333446", border: "none" },
    btnSecondary: { backgroundColor: "#7F8CAA", border: "none" },
  };

  const formFields = [
    { label: "Snack Name", name: "snackName", type: "text" },
    { label: "Snack Type", name: "snackType", type: "text" },
    { label: "Description", name: "description", type: "textarea" },
    { label: "Ingredients", name: "ingredients", type: "textarea" },
    { label: "Nutritional Info (JSON)", name: "nutritionalInfo", type: "textarea" },
    { label: "Quantity", name: "quantity", type: "text" },
    { label: "Price", name: "price", type: "number" },
    { label: "Expiry (in months)", name: "expiryInMonths", type: "number" },
    { label: "SKU (optional)", name: "sku", type: "text" },
  ];

  return (
    <div style={styles.page} className="container py-5">
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
      <h2 className="text-center mb-4" style={styles.header}>Add a New Vegan Snack</h2>

      <div className="card shadow p-4" style={styles.card}>
        {backendError && <div className="alert alert-danger">{backendError}</div>}

        <form onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <div className="mb-3" key={field.name}>
              <label className="form-label">{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  className="form-control"
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type={field.type}
                  className="form-control"
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                />
              )}
              {errors[field.name] && <div className="text-danger">{errors[field.name]}</div>}
            </div>
          ))}

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn text-white" style={styles.btnPrimary}>
              Save
            </button>
            <button
              type="button"
              className="btn text-white"
              style={styles.btnSecondary}
              onClick={() => navigate("/vendor-home")}
            >
              Back to Vendor Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyForm;
