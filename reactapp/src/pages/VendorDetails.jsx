// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function VendorDetails() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const userId = location.state?.userId || localStorage.getItem("userId");

//   const [formData, setFormData] = useState({
//     businessName: "",
//     businessLicenseNumber: "",
//     taxId: "",
//     businessAddress: "",
//     businessPhone: "",
//     businessEmail: "",
//     establishedYear: "",
//     yearsOfExperience: "",
//     targetMarket: "",
//     businessDescription: "",
//     haccpCertificationNumber: "",
//     fdaRegistrationNumber: "",
//   });

//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.businessName || !formData.businessEmail || !formData.businessPhone) {
//       setError("Please fill in all required fields.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:8080/vendor/post", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, ...formData }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         alert("Vendor details saved successfully!");
//         navigate("/vendor-home", { state: { vendorId: data.id, userId } });
//       } else {
//         const errText = await response.text();
//         setError(errText || "Failed to save vendor details.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("An error occurred while saving vendor details.");
//     }
//   };

//   return (
//     <div
//       className="min-vh-100 py-5"
//       style={{ backgroundColor: "#EAEFEF", padding: "50px 20px" }}
//     >
//       <div className="container" style={{ maxWidth: "900px" }}>
//         <h2 className="text-center mb-4 fw-bold" style={{ color: "#333446" }}>
//           Vendor Details
//         </h2>

//         {error && (
//           <div className="alert alert-danger shadow-sm" style={{ borderRadius: "10px" }}>
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="row g-3">
//           {[
//             { label: "Business Name *", name: "businessName", type: "text" },
//             { label: "Business License Number", name: "businessLicenseNumber", type: "text" },
//             { label: "Tax ID", name: "taxId", type: "text" },
//             { label: "Business Address", name: "businessAddress", type: "text" },
//             { label: "Business Phone *", name: "businessPhone", type: "text" },
//             { label: "Business Email *", name: "businessEmail", type: "email" },
//             { label: "Established Year", name: "establishedYear", type: "number" },
//             { label: "Years of Experience", name: "yearsOfExperience", type: "number" },
//             { label: "Target Market", name: "targetMarket", type: "text" },
//             { label: "HACCP Certification Number", name: "haccpCertificationNumber", type: "text" },
//             { label: "FDA Registration Number", name: "fdaRegistrationNumber", type: "text" },
//           ].map((field) => (
//             <div className="col-md-6" key={field.name}>
//               <label className="form-label fw-bold" style={{ color: "#333446" }}>{field.label}</label>
//               <input
//                 type={field.type}
//                 className="form-control shadow-sm"
//                 name={field.name}
//                 value={formData[field.name]}
//                 onChange={handleChange}
//                 style={{ borderRadius: "10px", border: "1px solid #7F8CAA" }}
//               />
//             </div>
//           ))}

//           <div className="col-12">
//             <label className="form-label fw-bold" style={{ color: "#333446" }}>Business Description</label>
//             <textarea
//               className="form-control shadow-sm"
//               name="businessDescription"
//               value={formData.businessDescription}
//               onChange={handleChange}
//               rows="3"
//               style={{ borderRadius: "10px", border: "1px solid #7F8CAA" }}
//             ></textarea>
//           </div>

//           <div className="col-12 d-flex justify-content-center mt-4">
//             <button
//               type="submit"
//               className="px-5 py-2 fw-bold"
//               style={{
//                 backgroundColor: "#7F8CAA",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "10px",
//                 transition: "0.3s"
//               }}
//               onMouseOver={(e) => (e.target.style.backgroundColor = "#B8CFCE")}
//               onMouseOut={(e) => (e.target.style.backgroundColor = "#7F8CAA")}
//             >
//               Save Vendor Details
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function VendorDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId || localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    businessName: "",
    businessLicenseNumber: "",
    taxId: "",
    businessAddress: "",
    businessPhone: "",
    businessEmail: "",
    establishedYear: "",
    yearsOfExperience: "",
    targetMarket: "",
    businessDescription: "",
    haccpCertificationNumber: "",
    fdaRegistrationNumber: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      alert("Please login to access vendor details.");
      navigate("/login");
      return;
    }
  }, [navigate, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.businessName || !formData.businessEmail || !formData.businessPhone) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/vendor/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, ...formData }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Vendor details saved successfully!");
        navigate("/vendor-home", { state: { vendorId: data.id, userId } });
      } else if (response.status === 401 || response.status === 403) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        const errText = await response.text();
        setError(errText || "Failed to save vendor details.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while saving vendor details.");
    }
  };

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: "#EAEFEF", padding: "50px 20px" }}>
      <div className="container" style={{ maxWidth: "900px" }}>
        <h2 className="text-center mb-4 fw-bold" style={{ color: "#333446" }}>Vendor Details</h2>

        {error && (
          <div className="alert alert-danger shadow-sm" style={{ borderRadius: "10px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="row g-3">
          {[
            { label: "Business Name *", name: "businessName", type: "text" },
            { label: "Business License Number", name: "businessLicenseNumber", type: "text" },
            { label: "Tax ID", name: "taxId", type: "text" },
            { label: "Business Address", name: "businessAddress", type: "text" },
            { label: "Business Phone *", name: "businessPhone", type: "text" },
            { label: "Business Email *", name: "businessEmail", type: "email" },
            { label: "Established Year", name: "establishedYear", type: "number" },
            { label: "Years of Experience", name: "yearsOfExperience", type: "number" },
            { label: "Target Market", name: "targetMarket", type: "text" },
            { label: "HACCP Certification Number", name: "haccpCertificationNumber", type: "text" },
            { label: "FDA Registration Number", name: "fdaRegistrationNumber", type: "text" },
          ].map((field) => (
            <div className="col-md-6" key={field.name}>
              <label className="form-label fw-bold" style={{ color: "#333446" }}>{field.label}</label>
              <input
                type={field.type}
                className="form-control shadow-sm"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                style={{ borderRadius: "10px", border: "1px solid #7F8CAA" }}
              />
            </div>
          ))}

          <div className="col-12">
            <label className="form-label fw-bold" style={{ color: "#333446" }}>Business Description</label>
            <textarea
              className="form-control shadow-sm"
              name="businessDescription"
              value={formData.businessDescription}
              onChange={handleChange}
              rows="3"
              style={{ borderRadius: "10px", border: "1px solid #7F8CAA" }}
            ></textarea>
          </div>

          <div className="col-12 d-flex justify-content-center mt-4">
            <button
              type="submit"
              className="px-5 py-2 fw-bold"
              style={{
                backgroundColor: "#7F8CAA",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                transition: "0.3s"
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#B8CFCE")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#7F8CAA")}
            >
              Save Vendor Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
