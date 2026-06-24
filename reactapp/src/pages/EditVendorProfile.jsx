// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// function EditVendorProfile() {
//   const [vendor, setVendor] = useState(null);
//   const [formData, setFormData] = useState({});
//   const navigate = useNavigate();
//   const { id } = useParams(); // vendor ID

//   useEffect(() => {
//     fetch(`http://localhost:8080/vendor/get/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setVendor(data);
//         setFormData(data); // populate form
//       })
//       .catch((err) => console.error("Error fetching vendor:", err));
//   }, [id]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     fetch(`http://localhost:8080/vendor/update/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to update profile");
//         return res.json();
//       })
//       .then((data) => {
//         alert("Profile updated successfully!");
//         navigate("/vendor-profile");
//       })
//       .catch((err) => {
//         console.error("Error updating vendor:", err);
//         alert("Failed to update profile. Please try again.");
//       });
//   };

//   if (!vendor) 
//     return <div className="text-center mt-5" style={{ color: "#333446" }}>Loading vendor profile...</div>;

//   return (
//     <div
//       className="min-vh-100 d-flex flex-column align-items-center py-5"
//       style={{ backgroundColor: "#EAEFEF", padding: "50px 20px" }}
//     >
//       <h2 className="mb-4 text-center fw-bold" style={{ color: "#333446" }}>
//         Edit Vendor Profile
//       </h2>

//       <div
//         className="card shadow-lg p-5"
//         style={{
//           maxWidth: "750px",
//           width: "100%",
//           borderRadius: "20px",
//           backgroundColor: "#fff",
//           color: "#333446",
//         }}
//       >
//         <form onSubmit={handleSubmit}>
//           {[
//             { label: "Business Name", name: "businessName" },
//             { label: "Business License Number", name: "businessLicenseNumber" },
//             { label: "Tax ID", name: "taxId" },
//             { label: "Business Address", name: "businessAddress" },
//             { label: "Phone", name: "businessPhone" },
//             { label: "Email", name: "businessEmail" },
//             { label: "Years of Experience", name: "yearsOfExperience" },
//             { label: "Target Market", name: "targetMarket" },
//             { label: "Business Description", name: "businessDescription" },
//             { label: "HACCP Cert. Number", name: "haccpCertificationNumber" },
//             { label: "FDA Reg. Number", name: "fdaRegistrationNumber" },
//           ].map((field) => (
//             <div className="mb-4" key={field.name}>
//               <label className="form-label fw-semibold" style={{ color: "#333446" }}>
//                 {field.label}
//               </label>
//               <input
//                 type="text"
//                 name={field.name}
//                 className="form-control"
//                 value={formData[field.name] || ""}
//                 onChange={handleChange}
//                 style={{
//                   borderRadius: "10px",
//                   border: "1px solid #ccc",
//                   padding: "10px",
//                   fontSize: "1rem",
//                 }}
//                 required
//               />
//             </div>
//           ))}

//           <div className="d-flex justify-content-between mt-5">
//             <button
//               type="button"
//               className="px-5 py-2 fw-bold"
//               style={{
//                 backgroundColor: "#7F8CAA",
//                 color: "#EAEFEF",
//                 border: "none",
//                 borderRadius: "10px",
//                 transition: "0.3s",
//               }}
//               onMouseOver={(e) => (e.target.style.backgroundColor = "#B8CFCE")}
//               onMouseOut={(e) => (e.target.style.backgroundColor = "#7F8CAA")}
//               onClick={() => navigate("/vendor-profile")}
//             >
//               Back
//             </button>

//             <button
//               type="submit"
//               className="px-5 py-2 fw-bold"
//               style={{
//                 backgroundColor: "#333446",
//                 color: "#EAEFEF",
//                 border: "none",
//                 borderRadius: "10px",
//                 transition: "0.3s",
//               }}
//               onMouseOver={(e) => (e.target.style.backgroundColor = "#7F8CAA")}
//               onMouseOut={(e) => (e.target.style.backgroundColor = "#333446")}
//             >
//               Update Profile
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EditVendorProfile;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditVendorProfile() {
  const [vendor, setVendor] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams(); // vendor ID

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");

    // Authorization: only VENDOR can access
    if (!token || role !== "VENDOR" || !userId) {
      alert("You must be logged in as a vendor to access this page.");
      navigate("/login");
      return;
    }

    // Fetch vendor profile securely
    fetch(`http://localhost:8080/vendor/get/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            alert("Session expired or unauthorized. Please log in again.");
            localStorage.clear();
            navigate("/login");
          }
          throw new Error("Failed to fetch vendor profile");
        }
        return res.json();
      })
      .then((data) => {
        setVendor(data);
        setFormData(data); // populate form
      })
      .catch((err) => {
        console.error("Error fetching vendor:", err);
        alert("Error fetching vendor profile.");
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/vendor/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            alert("Session expired or unauthorized. Please log in again.");
            localStorage.clear();
            navigate("/login");
          }
          throw new Error("Failed to update profile");
        }
        return res.json();
      })
      .then(() => {
        alert("Profile updated successfully!");
        navigate("/vendor-profile");
      })
      .catch((err) => {
        console.error("Error updating vendor:", err);
        alert("Failed to update profile. Please try again.");
      });
  };

  if (!vendor)
    return (
      <div className="text-center mt-5" style={{ color: "#333446" }}>
        Loading vendor profile...
      </div>
    );

  return (
    <div
      className="min-vh-100 d-flex flex-column align-items-center py-5"
      style={{ backgroundColor: "#EAEFEF", padding: "50px 20px" }}
    >
       <button
          onClick={() => navigate("/vendor-profile")}
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
      <h2 className="mb-4 text-center fw-bold" style={{ color: "#333446" }}>
        Edit Vendor Profile
      </h2>

      <div
        className="card shadow-lg p-5"
        style={{
          maxWidth: "750px",
          width: "100%",
          borderRadius: "20px",
          backgroundColor: "#fff",
          color: "#333446",
        }}
      >
        <form onSubmit={handleSubmit}>
          {[
            { label: "Business Name", name: "businessName" },
            { label: "Business License Number", name: "businessLicenseNumber" },
            { label: "Tax ID", name: "taxId" },
            { label: "Business Address", name: "businessAddress" },
            { label: "Phone", name: "businessPhone" },
            { label: "Email", name: "businessEmail" },
            { label: "Years of Experience", name: "yearsOfExperience" },
            { label: "Target Market", name: "targetMarket" },
            { label: "Business Description", name: "businessDescription" },
            { label: "HACCP Cert. Number", name: "haccpCertificationNumber" },
            { label: "FDA Reg. Number", name: "fdaRegistrationNumber" },
          ].map((field) => (
            <div className="mb-4" key={field.name}>
              <label className="form-label fw-semibold" style={{ color: "#333446" }}>
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                className="form-control"
                value={formData[field.name] || ""}
                onChange={handleChange}
                style={{
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  padding: "10px",
                  fontSize: "1rem",
                }}
                required
              />
            </div>
          ))}

          <div className="d-flex justify-content-between mt-5">
            <button
              type="button"
              className="px-5 py-2 fw-bold"
              style={{
                backgroundColor: "#7F8CAA",
                color: "#EAEFEF",
                border: "none",
                borderRadius: "10px",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#B8CFCE")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#7F8CAA")}
              onClick={() => navigate("/vendor-profile")}
            >
              Back
            </button>

            <button
              type="submit"
              className="px-5 py-2 fw-bold"
              style={{
                backgroundColor: "#333446",
                color: "#EAEFEF",
                border: "none",
                borderRadius: "10px",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#7F8CAA")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#333446")}
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditVendorProfile;

