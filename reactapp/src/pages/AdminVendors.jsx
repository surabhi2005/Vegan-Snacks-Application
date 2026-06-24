// import React, { useState, useEffect } from "react";

// const AdminVendors = () => {
//   const [vendors, setVendors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:8080/vendor/all") // Fetch all vendors
//       .then(res => {
//         if (!res.ok) throw new Error("Failed to fetch vendors");
//         return res.json();
//       })
//       .then(data => {
//         setVendors(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p style={{ padding: "20px" }}>Loading vendors...</p>;
//   if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;

//   return (
//     <div style={{ padding: "30px", backgroundColor: "#EAEFEF", minHeight: "100vh" }}>
//       <h2 style={{ color: "#333446", marginBottom: "20px" }}>All Vendors</h2>

//       <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", borderRadius: "10px", overflow: "hidden" }}>
//         <thead>
//           <tr style={{ backgroundColor: "#7F8CAA", color: "#fff" }}>
//             <th style={styles.th}>ID</th>
//             <th style={styles.th}>Username</th>
//             <th style={styles.th}>Business Name</th>
//             <th style={styles.th}>Email</th>
//             <th style={styles.th}>Phone</th>
//             <th style={styles.th}>Status</th>
//             <th style={styles.th}>Business Address</th>
//             <th style={styles.th}>Description</th>
//             <th style={styles.th}>License Number</th>
//             <th style={styles.th}>Established Year</th>
//             <th style={styles.th}>FDA Number</th>
//             <th style={styles.th}>HACCP Number</th>
//             <th style={styles.th}>Target Market</th>
//             <th style={styles.th}>Years of Experience</th>
//           </tr>
//         </thead>
//         <tbody>
//           {vendors.map(vendor => (
//             <tr key={vendor.id} style={{ borderBottom: "1px solid #ccc" }}>
//               <td style={styles.td}>{vendor.id}</td>
//               <td style={styles.td}>{vendor.username}</td>
//               <td style={styles.td}>{vendor.businessName}</td>
//               <td style={styles.td}>{vendor.businessEmail}</td>
//               <td style={styles.td}>{vendor.businessPhone}</td>
//               <td style={styles.td}>{vendor.approvalStatus}</td>
//               <td style={styles.td}>{vendor.businessAddress}</td>
//               <td style={styles.td}>{vendor.businessDescription}</td>
//               <td style={styles.td}>{vendor.businessLicenseNumber}</td>
//               <td style={styles.td}>{vendor.establishedYear}</td>
//               <td style={styles.td}>{vendor.fdaRegistrationNumber}</td>
//               <td style={styles.td}>{vendor.haccpCertificationNumber}</td>
//               <td style={styles.td}>{vendor.targetMarket}</td>
//               <td style={styles.td}>{vendor.yearsOfExperience}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const styles = {
//   th: { padding: "12px", textAlign: "left" },
//   td: { padding: "12px" },
// };

// export default AdminVendors;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token"); // ✅ Get token from localStorage

    fetch("http://localhost:8080/vendor/all", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, // ✅ Attach token
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        if (res.status === 401) throw new Error("Unauthorized. Please login again.");
        if (!res.ok) throw new Error("Failed to fetch vendors");
        return res.json();
      })
      .then(data => {
        setVendors(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: "20px" }}>Loading vendors...</p>;
  if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;
  if (vendors.length === 0) return <p style={{ padding: "20px" }}>No vendors found.</p>;

  return (
    <div style={{ padding: "30px", backgroundColor: "#EAEFEF", minHeight: "100vh" }}>
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
      <h2 style={{ color: "#333446", marginBottom: "20px" }}>All Vendors</h2>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", borderRadius: "10px", overflow: "hidden" }}>
          <thead>
            <tr style={{ backgroundColor: "#7F8CAA", color: "#fff" }}>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Username</th>
              <th style={styles.th}>Business Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Business Address</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>License Number</th>
              <th style={styles.th}>Established Year</th>
              <th style={styles.th}>FDA Number</th>
              <th style={styles.th}>HACCP Number</th>
              <th style={styles.th}>Target Market</th>
              <th style={styles.th}>Experience</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map(vendor => (
              <tr key={vendor.id} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={styles.td}>{vendor.id}</td>
                <td style={styles.td}>{vendor.username}</td>
                <td style={styles.td}>{vendor.businessName}</td>
                <td style={styles.td}>{vendor.businessEmail}</td>
                <td style={styles.td}>{vendor.businessPhone}</td>
                <td style={styles.td}>{vendor.approvalStatus}</td>
                <td style={styles.td}>{vendor.businessAddress}</td>
                <td style={styles.td}>{vendor.businessDescription}</td>
                <td style={styles.td}>{vendor.businessLicenseNumber}</td>
                <td style={styles.td}>{vendor.establishedYear}</td>
                <td style={styles.td}>{vendor.fdaRegistrationNumber}</td>
                <td style={styles.td}>{vendor.haccpCertificationNumber}</td>
                <td style={styles.td}>{vendor.targetMarket}</td>
                <td style={styles.td}>{vendor.yearsOfExperience}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  th: { padding: "12px", textAlign: "left", whiteSpace: "nowrap" },
  td: { padding: "12px", verticalAlign: "top" },
};

export default AdminVendors;
