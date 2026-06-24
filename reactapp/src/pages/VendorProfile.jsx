// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function VendorProfile() {
//   const [vendor, setVendor] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     if (!userId) {
//       console.error("No userId found in localStorage");
//       return;
//     }
//     fetch(`http://localhost:8080/vendor/get/byuser/${userId}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Vendor not found");
//         return res.json();
//       })
//       .then((data) => setVendor(data))
//       .catch((err) => console.error("Error fetching vendor:", err));
//   }, []);
//   console.log(vendor);

//   // Logout function
//   const handleLogout = () => {
//     localStorage.clear(); // remove all stored data
//     navigate("/"); // redirect to login/homepage
//   };

//   if (!vendor) {
//     return <div className="text-center mt-5 text-white">Loading vendor profile...</div>;
//   }

//   return (
//     <div
//       className="min-vh-100 d-flex flex-column justify-content-center align-items-center"
//       style={{
//         backgroundImage: `url(${require("./photosvideos/snacks2.jpg")})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         position: "relative",
//         padding: "50px 20px",
//       }}
//     >
//       {/* Dark overlay */}
//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundColor: "rgba(51, 52, 70, 0.8)", // #333446 overlay
//           zIndex: 1,
//         }}
//       ></div>

//       {/* Profile Card */}
//       <div className="container" style={{ position: "relative", zIndex: 2 }}>
//         <h2 className="mb-4 text-center fw-bold" style={{ color: "#EAEFEF" }}>
//           Vendor Profile
//         </h2>
//         <div
//           className="card shadow-lg p-4"
//           style={{
//             backgroundColor: "#EAEFEF",
//             borderRadius: "20px",
//             color: "#333446",
//           }}
//         >
//           <h4 className="mb-3 fw-bold" style={{ color: "#333446" }}>
//             {vendor.businessName}
//           </h4>

//           <p><strong>Business License Number:</strong> {vendor.businessLicenseNumber}</p>
//           <p><strong>Tax ID:</strong> {vendor.taxId}</p>
//           <p><strong>Business Address:</strong> {vendor.businessAddress}</p>
//           <p><strong>Phone:</strong> {vendor.businessPhone}</p>
//           <p><strong>Email:</strong> {vendor.businessEmail}</p>
//           <p><strong>Established Year:</strong> {vendor.establishedYear}</p>
//           <p><strong>Years of Experience:</strong> {vendor.yearsOfExperience}</p>
//           <p><strong>Target Market:</strong> {vendor.targetMarket}</p>
//           <p><strong>Business Description:</strong> {vendor.businessDescription}</p>
//           <p><strong>HACCP Cert. Number:</strong> {vendor.haccpCertificationNumber}</p>
//           <p><strong>FDA Reg. Number:</strong> {vendor.fdaRegistrationNumber}</p>
//           <p><strong>Approval Status:</strong> {vendor.approvalStatus}</p>
//           <p><strong>Approval Notes:</strong> {vendor.approvalNotes}</p>
//           <p><strong>Approval Date:</strong> {vendor.approvalDate ? new Date(vendor.approvalDate).toLocaleDateString() : 'N/A'}</p>
//         </div>
// <div className="text-center d-flex justify-content-center gap-3 mt-4">
//   {/* <button
//     className="px-4 py-2 fw-bold"
//     style={{
//       backgroundColor: "#7F8CAA",
//       color: "#EAEFEF",
//       border: "none",
//       borderRadius: "10px",
//       transition: "0.3s",
//     }}
//     onMouseOver={(e) => (e.target.style.backgroundColor = "#B8CFCE")}
//     onMouseOut={(e) => (e.target.style.backgroundColor = "#7F8CAA")}
//     onClick={() => navigate("/vendor-home")}
//   >
//     Back to Home
//   </button> */}

//   <button
//     className="px-4 py-2 fw-bold"
//     style={{
//       backgroundColor: "#333446",
//       color: "#EAEFEF",
//       border: "none",
//       borderRadius: "10px",
//       transition: "0.3s",
//     }}
//     onMouseOver={(e) => (e.target.style.backgroundColor = "#7F8CAA")}
//     onMouseOut={(e) => (e.target.style.backgroundColor = "#333446")}
//     onClick={handleLogout}
//   >
//     Logout
//   </button>

//   <button
//     className="px-4 py-2 fw-bold"
//     style={{
//       backgroundColor: "#7F8CAA",
//       color: "#EAEFEF",
//       border: "none",
//       borderRadius: "10px",
//       transition: "0.3s",
//     }}
//     onMouseOver={(e) => (e.target.style.backgroundColor = "#B8CFCE")}
//     onMouseOut={(e) => (e.target.style.backgroundColor = "#7F8CAA")}
//     onClick={() => navigate(`/edit-vendor-profile/${vendor.id}`)}
//   >
//     Edit Profile
//   </button>
// </div>

//       </div>
//     </div>
//   );
// }

// export default VendorProfile;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function VendorProfile() {
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    // Authorization: only VENDOR allowed
    if (!token || !userId || role !== "VENDOR") {
      alert("You must be logged in as a vendor to access this page.");
      navigate("/login");
      return;
    }

    fetch(`http://localhost:8080/vendor/get/byuser/${userId}`, {
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then(res => {
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
      .then(data => setVendor(data))
      .catch(err => {
        console.error("Error fetching vendor:", err);
        alert("Error fetching vendor profile.");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) return <div className="text-center mt-5 text-white">Loading vendor profile...</div>;
  if (!vendor) return <div className="text-center mt-5 text-white">Vendor profile not available.</div>;

  return (
    <div
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${require("./photosvideos/snacks2.jpg")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        padding: "50px 20px",
      }}
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
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(51, 52, 70, 0.8)",
          zIndex: 1,
        }}
      ></div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <h2 className="mb-4 text-center fw-bold" style={{ color: "#EAEFEF" }}>
          Vendor Profile
        </h2>

        <div
          className="card shadow-lg p-4"
          style={{
            backgroundColor: "#EAEFEF",
            borderRadius: "20px",
            color: "#333446",
          }}
        >
          <h4 className="mb-3 fw-bold">{vendor.businessName}</h4>

          <p><strong>Business License Number:</strong> {vendor.businessLicenseNumber}</p>
          <p><strong>Tax ID:</strong> {vendor.taxId}</p>
          <p><strong>Business Address:</strong> {vendor.businessAddress}</p>
          <p><strong>Phone:</strong> {vendor.businessPhone}</p>
          <p><strong>Email:</strong> {vendor.businessEmail}</p>
          <p><strong>Established Year:</strong> {vendor.establishedYear}</p>
          <p><strong>Years of Experience:</strong> {vendor.yearsOfExperience}</p>
          <p><strong>Target Market:</strong> {vendor.targetMarket}</p>
          <p><strong>Business Description:</strong> {vendor.businessDescription}</p>
          <p><strong>HACCP Cert. Number:</strong> {vendor.haccpCertificationNumber}</p>
          <p><strong>FDA Reg. Number:</strong> {vendor.fdaRegistrationNumber}</p>
          <p><strong>Approval Status:</strong> {vendor.approvalStatus}</p>
          <p><strong>Approval Notes:</strong> {vendor.approvalNotes}</p>
          <p>
            <strong>Approval Date:</strong>{" "}
            {vendor.approvalDate ? new Date(vendor.approvalDate).toLocaleDateString() : "N/A"}
          </p>
        </div>

        <div className="text-center d-flex justify-content-center gap-3 mt-4">
          <button
            className="px-4 py-2 fw-bold"
            style={{ backgroundColor: "#333446", color: "#EAEFEF", border: "none", borderRadius: "10px" }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#7F8CAA")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#333446")}
            onClick={handleLogout}
          >
            Logout
          </button>

          <button
            className="px-4 py-2 fw-bold"
            style={{ backgroundColor: "#7F8CAA", color: "#EAEFEF", border: "none", borderRadius: "10px" }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#B8CFCE")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#7F8CAA")}
            onClick={() => navigate(`/edit-vendor-profile/${vendor.id}`)}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default VendorProfile;
