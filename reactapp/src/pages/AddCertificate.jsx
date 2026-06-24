// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const AddCertificate = () => {
//   const [formData, setFormData] = useState({
//     certificationType: "",
//     certificateNumber: "",
//     issueDate: "",
//     expiryDate: ""
//   });

//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const vendorId = localStorage.getItem("vendorId"); // ✅ take vendorId from localStorage
//     if (!vendorId) {
//       setMessage("⚠️ Vendor ID not found in localStorage. Please login again.");
//       return;
//     }

//     const payload = { ...formData, vendorId };
//     console.log(payload);

//     try {
//       const response = await fetch("http://localhost:8080/certifications/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         setMessage("Certification added successfully!");
//         setFormData({
//           certificationType: "",
//           certificateNumber: "",
//           issueDate: "",
//           expiryDate: ""
//         });
//       } else {
//         setMessage("Failed to add certification.");
//       }
//     } catch (error) {
//       setMessage("⚠️ Error: " + error.message);
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#EAEFEF" }}>
//       <div className="card shadow-lg p-4" style={{ width: "40rem", borderRadius: "15px", backgroundColor: "#B8CFCE" }}>
//         <h2 className="text-center mb-4" style={{ color: "#333446" }}>
//           Add Certification
//         </h2>

//         {message && <div className="alert alert-info text-center">{message}</div>}

//         <form onSubmit={handleSubmit}>
//           {/* Certification Type */}
//           <div className="mb-3">
//             <label className="form-label fw-bold" style={{ color: "#333446" }}>Certification Type</label>
//             <select
//               className="form-select"
//               name="certificationType"
//               value={formData.certificationType}
//               onChange={handleChange}
//               required
//             >
//               <option value="">-- Select Type --</option>
//               <option value="FSSAI">FSSAI</option>
//               <option value="ISO">ISO</option>
//               <option value="ORGANIC">ORGANIC</option>
//               <option value="VEGAN">VEGAN</option>
//             </select>
//           </div>

//           {/* Certificate Number */}
//           <div className="mb-3">
//             <label className="form-label fw-bold" style={{ color: "#333446" }}>Certificate Number</label>
//             <input
//               type="text"
//               className="form-control"
//               name="certificateNumber"
//               value={formData.certificateNumber}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Issue Date */}
//           <div className="mb-3">
//             <label className="form-label fw-bold" style={{ color: "#333446" }}>Issue Date</label>
//             <input
//               type="date"
//               className="form-control"
//               name="issueDate"
//               value={formData.issueDate}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Expiry Date */}
//           <div className="mb-3">
//             <label className="form-label fw-bold" style={{ color: "#333446" }}>Expiry Date</label>
//             <input
//               type="date"
//               className="form-control"
//               name="expiryDate"
//               value={formData.expiryDate}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Buttons */}
//           <div className="d-flex justify-content-between">
//             {/* <button
//               type="button"
//               className="btn"
//               style={{ backgroundColor: "#7F8CAA", color: "#fff" }}
//               onClick={() => navigate("/vendor-home")}
//             >
//               Back to Home
//             </button> */}
//             <button
//               type="submit"
//               className="btn"
//               style={{ backgroundColor: "#333446", color: "#fff" }}
//             >
//                Add Certificate
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddCertificate;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AddCertificate = () => {
  const [formData, setFormData] = useState({
    certificationType: "",
    certificateNumber: "",
    issueDate: "",
    expiryDate: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Authorization & vendorId check
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const vendorId = localStorage.getItem("vendorId");

    if (!token || role !== "VENDOR" || !vendorId) {
      alert("You must be logged in as a vendor to access this page.");
      localStorage.clear();
      navigate("/login");
    }
  }, [navigate]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const vendorId = localStorage.getItem("vendorId");

    if (!vendorId || !token) {
      setMessage("⚠️ Vendor ID or session token not found. Please login again.");
      return;
    }

    const payload = { ...formData, vendorId };

    try {
      const response = await fetch("http://localhost:8080/certifications/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // ✅ include token
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage("✅ Certification added successfully!");
        setFormData({
          certificationType: "",
          certificateNumber: "",
          issueDate: "",
          expiryDate: "",
        });
      } else if (response.status === 401 || response.status === 403) {
        alert("Session expired or unauthorized. Please login again.");
        localStorage.clear();
        navigate("/login");
      } else {
        setMessage("⚠️ Failed to add certification.");
      }
    } catch (error) {
      setMessage("⚠️ Error: " + error.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#EAEFEF" }}
    >
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
      <div
        className="card shadow-lg p-4"
        style={{ width: "40rem", borderRadius: "15px", backgroundColor: "#B8CFCE" }}
      >
        <h2 className="text-center mb-4" style={{ color: "#333446" }}>
          Add Certification
        </h2>

        {message && <div className="alert alert-info text-center">{message}</div>}

        <form onSubmit={handleSubmit}>
          {/* Certification Type */}
          <div className="mb-3">
            <label className="form-label fw-bold" style={{ color: "#333446" }}>
              Certification Type
            </label>
            <select
              className="form-select"
              name="certificationType"
              value={formData.certificationType}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Type --</option>
              <option value="FSSAI">FSSAI</option>
              <option value="ISO">ISO</option>
              <option value="ORGANIC">ORGANIC</option>
              <option value="VEGAN">VEGAN</option>
            </select>
          </div>

          {/* Certificate Number */}
          <div className="mb-3">
            <label className="form-label fw-bold" style={{ color: "#333446" }}>
              Certificate Number
            </label>
            <input
              type="text"
              className="form-control"
              name="certificateNumber"
              value={formData.certificateNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* Issue Date */}
          <div className="mb-3">
            <label className="form-label fw-bold" style={{ color: "#333446" }}>
              Issue Date
            </label>
            <input
              type="date"
              className="form-control"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Expiry Date */}
          <div className="mb-3">
            <label className="form-label fw-bold" style={{ color: "#333446" }}>
              Expiry Date
            </label>
            <input
              type="date"
              className="form-control"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn"
              style={{ backgroundColor: "#7F8CAA", color: "#fff" }}
              onClick={() => navigate("/vendor-home")}
            >
              Back to Home
            </button>

            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "#333446", color: "#fff" }}
            >
              Add Certificate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCertificate;

