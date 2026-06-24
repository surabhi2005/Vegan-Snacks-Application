// // import React, { useEffect, useState } from "react";

// // const VendorManagement = () => {
// //   const [vendors, setVendors] = useState([]);
// //   const [statusFilter, setStatusFilter] = useState(null);
// //   const [counts, setCounts] = useState({ APPROVED: 0, REJECTED: 0, SUSPENDED: 0 });
// //   const [error, setError] = useState("");

// //   // Load all vendors
// //   const loadVendors = () => {
// //     fetch("http://localhost:8080/vendor/all")
// //       .then((res) => {
// //         if (!res.ok) throw new Error("Failed to fetch vendors.");
// //         return res.json();
// //       })
// //       .then((data) => {
// //         setVendors(data);

// //         // Update counts
// //         const approved = data.filter(v => v.approvalStatus === "APPROVED").length;
// //         const rejected = data.filter(v => v.approvalStatus === "REJECTED").length;
// //         const suspended = data.filter(v => v.approvalStatus === "SUSPENDED").length;
// //         setCounts({ APPROVED: approved, REJECTED: rejected, SUSPENDED: suspended });
// //       })
// //       .catch((err) => setError(err.message));
// //   };

// //   useEffect(() => {
// //     loadVendors();
// //   }, []);

// //   // Approve Vendor
// //   const handleApprove = (vendorId) => {
// //     fetch(`http://localhost:8080/vendor/approve/${vendorId}?approvedByUserId=1`, { method: "PUT" })
// //       .then(() => {
// //         alert("Vendor approved");
// //         loadVendors();
// //       })
// //       .catch((err) => alert(err.message));
// //   };

// //   // Reject Vendor
// //   const handleReject = (vendorId) => {
// //     const notes = prompt("Enter rejection reason:");
// //     if (!notes) return;
// //     fetch(`http://localhost:8080/vendor/reject/${vendorId}?approvedByUserId=1&notes=${encodeURIComponent(notes)}`, { method: "PUT" })
// //       .then(() => {
// //         alert("Vendor rejected");
// //         loadVendors();
// //       })
// //       .catch((err) => alert(err.message));
// //   };

// //   // Suspend Vendor
// //   const handleSuspend = (vendorId) => {
// //     const reason = prompt("Enter reason for suspension:");
// //     if (!reason) return;
// //     fetch(`http://localhost:8080/vendor/suspend/${vendorId}?reason=${encodeURIComponent(reason)}`, { method: "PUT" })
// //       .then(() => {
// //         alert("Vendor suspended");
// //         loadVendors();
// //       })
// //       .catch((err) => alert(err.message));
// //   };

// //   const filteredVendors = statusFilter ? vendors.filter(v => v.approvalStatus === statusFilter) : vendors;

// //   return (
// //     <div style={{ padding: "30px", backgroundColor: "#EAEFEF", minHeight: "100vh" }}>
// //       <h2 style={{ marginBottom: "20px" }}>Vendor Management</h2>
// //       {error && <p style={{ color: "red" }}>{error}</p>}

// //       {/* Status Count Cards */}
// //       <div style={{ display: "flex", gap: "20px", margin: "20px 0", flexWrap: "wrap" }}>
// //         <StatusCard title="Approved" count={counts.APPROVED} color="#28B463" onClick={() => setStatusFilter("APPROVED")} />
// //         <StatusCard title="Rejected" count={counts.REJECTED} color="#FF6B6B" onClick={() => setStatusFilter("REJECTED")} />
// //         <StatusCard title="Suspended" count={counts.SUSPENDED} color="#FFA500" onClick={() => setStatusFilter("SUSPENDED")} />
// //         <StatusCard title="All" count={vendors.length} color="#5D6D7E" onClick={() => setStatusFilter(null)} />
// //       </div>

// //       {/* Vendors Table */}
// //       <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px", backgroundColor: "#fff", borderRadius: "8px", overflow: "hidden" }}>
// //         <thead>
// //           <tr style={{ backgroundColor: "#7F8CAA", color: "#fff" }}>
// //             <th style={styles.th}>ID</th>
// //             <th style={styles.th}>Business Name</th>
// //             <th style={styles.th}>Email</th>
// //             <th style={styles.th}>Status</th>
// //             <th style={styles.th}>Compliance</th>
// //             <th style={styles.th}>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {filteredVendors.map((v) => (
// //             <tr key={v.id} style={{ borderBottom: "1px solid #ccc" }}>
// //               <td style={styles.td}>{v.id}</td>
// //               <td style={styles.td}>{v.businessName}</td>
// //               <td style={styles.td}>{v.businessEmail}</td>
// //               <td style={styles.td}>{v.approvalStatus}</td>
// //               <td style={styles.td}>
// //                 {v.approvalStatus === "APPROVED" ? (v.complianceStatus ? "Compliant" : "Non-compliant") : "N/A"}
// //               </td>
// //               <td style={styles.td}>
// //                 <button style={styles.button} onClick={() => handleApprove(v.id)}>Approve</button>
// //                 <button style={{ ...styles.button, backgroundColor: "#FF6B6B" }} onClick={() => handleReject(v.id)}>Reject</button>
// //                 <button style={{ ...styles.button, backgroundColor: "#FFA500" }} onClick={() => handleSuspend(v.id)}>Suspend</button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // // Status Card Component
// // const StatusCard = ({ title, count, color, onClick }) => (
// //   <div
// //     onClick={onClick}
// //     style={{
// //       flex: "1 1 200px",
// //       backgroundColor: "#fff",
// //       borderRadius: "12px",
// //       padding: "20px",
// //       textAlign: "center",
// //       boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
// //       cursor: "pointer",
// //     }}
// //   >
// //     <h3 style={{ color, marginBottom: "10px" }}>{title}</h3>
// //     <p style={{ fontSize: "28px", fontWeight: "bold", color }}>{count}</p>
// //   </div>
// // );

// // const styles = {
// //   th: { padding: "12px", textAlign: "left" },
// //   td: { padding: "12px" },
// //   button: {
// //     padding: "6px 12px",
// //     marginRight: "8px",
// //     marginTop: "4px",
// //     border: "none",
// //     borderRadius: "6px",
// //     backgroundColor: "#7F8CAA",
// //     color: "#fff",
// //     cursor: "pointer",
// //     fontWeight: "600",
// //   },
// // };

// // export default VendorManagement;


// import React, { useEffect, useState } from "react";

// const VendorManagement = () => {
//   const [vendors, setVendors] = useState([]);
//   const [statusFilter, setStatusFilter] = useState(null);
//   const [counts, setCounts] = useState({ APPROVED: 0, REJECTED: 0, SUSPENDED: 0 });
//   const [error, setError] = useState("");

//   const token = localStorage.getItem("token"); // get token for auth

//   // Load all vendors
//   const loadVendors = () => {
//     fetch("http://localhost:8080/vendor/all", {
//       headers: {
//         Authorization: `Bearer ${token}`, // send token
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch vendors.");
//         return res.json();
//       })
//       .then((data) => {
//         setVendors(data);

//         // Update counts
//         const approved = data.filter((v) => v.approvalStatus === "APPROVED").length;
//         const rejected = data.filter((v) => v.approvalStatus === "REJECTED").length;
//         const suspended = data.filter((v) => v.approvalStatus === "SUSPENDED").length;
//         setCounts({ APPROVED: approved, REJECTED: rejected, SUSPENDED: suspended });
//       })
//       .catch((err) => setError(err.message));
//   };

//   useEffect(() => {
//     loadVendors();
//   }, []);

//   // Approve Vendor
//   const handleApprove = (vendorId) => {
//     fetch(`http://localhost:8080/vendor/approve/${vendorId}?approvedByUserId=1`, {
//       method: "PUT",
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then(() => {
//         alert("Vendor approved");
//         loadVendors();
//       })
//       .catch((err) => alert(err.message));
//   };

//   // Reject Vendor
//   const handleReject = (vendorId) => {
//     const notes = prompt("Enter rejection reason:");
//     if (!notes) return;
//     fetch(
//       `http://localhost:8080/vendor/reject/${vendorId}?approvedByUserId=1&notes=${encodeURIComponent(
//         notes
//       )}`,
//       {
//         method: "PUT",
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     )
//       .then(() => {
//         alert("Vendor rejected");
//         loadVendors();
//       })
//       .catch((err) => alert(err.message));
//   };

//   // Suspend Vendor
//   const handleSuspend = (vendorId) => {
//     const reason = prompt("Enter reason for suspension:");
//     if (!reason) return;
//     fetch(
//       `http://localhost:8080/vendor/suspend/${vendorId}?reason=${encodeURIComponent(reason)}`,
//       {
//         method: "PUT",
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     )
//       .then(() => {
//         alert("Vendor suspended");
//         loadVendors();
//       })
//       .catch((err) => alert(err.message));
//   };

//   const filteredVendors = statusFilter
//     ? vendors.filter((v) => v.approvalStatus === statusFilter)
//     : vendors;

//   return (
//     <div style={{ padding: "30px", backgroundColor: "#EAEFEF", minHeight: "100vh" }}>
//       <h2 style={{ marginBottom: "20px" }}>Vendor Management</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* Status Count Cards */}
//       <div
//         style={{
//           display: "flex",
//           gap: "20px",
//           margin: "20px 0",
//           flexWrap: "wrap",
//         }}
//       >
//         <StatusCard
//           title="Approved"
//           count={counts.APPROVED}
//           color="#28B463"
//           onClick={() => setStatusFilter("APPROVED")}
//         />
//         <StatusCard
//           title="Rejected"
//           count={counts.REJECTED}
//           color="#FF6B6B"
//           onClick={() => setStatusFilter("REJECTED")}
//         />
//         <StatusCard
//           title="Suspended"
//           count={counts.SUSPENDED}
//           color="#FFA500"
//           onClick={() => setStatusFilter("SUSPENDED")}
//         />
//         <StatusCard
//           title="All"
//           count={vendors.length}
//           color="#5D6D7E"
//           onClick={() => setStatusFilter(null)}
//         />
//       </div>

//       {/* Vendors Table */}
//       <table
//         style={{
//           width: "100%",
//           borderCollapse: "collapse",
//           marginTop: "20px",
//           backgroundColor: "#fff",
//           borderRadius: "8px",
//           overflow: "hidden",
//         }}
//       >
//         <thead>
//           <tr style={{ backgroundColor: "#7F8CAA", color: "#fff" }}>
//             <th style={styles.th}>ID</th>
//             <th style={styles.th}>Business Name</th>
//             <th style={styles.th}>Email</th>
//             <th style={styles.th}>Status</th>
//             <th style={styles.th}>Compliance</th>
//             <th style={styles.th}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredVendors.map((v) => (
//             <tr key={v.id} style={{ borderBottom: "1px solid #ccc" }}>
//               <td style={styles.td}>{v.id}</td>
//               <td style={styles.td}>{v.businessName}</td>
//               <td style={styles.td}>{v.businessEmail}</td>
//               <td style={styles.td}>{v.approvalStatus}</td>
//               <td style={styles.td}>
//                 {v.approvalStatus === "APPROVED"
//                   ? v.complianceStatus
//                     ? "Compliant"
//                     : "Non-compliant"
//                   : "N/A"}
//               </td>
//               <td style={styles.td}>
//                 <button style={styles.button} onClick={() => handleApprove(v.id)}>
//                   Approve
//                 </button>
//                 <button
//                   style={{ ...styles.button, backgroundColor: "#FF6B6B" }}
//                   onClick={() => handleReject(v.id)}
//                 >
//                   Reject
//                 </button>
//                 <button
//                   style={{ ...styles.button, backgroundColor: "#FFA500" }}
//                   onClick={() => handleSuspend(v.id)}
//                 >
//                   Suspend
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// // Status Card Component
// const StatusCard = ({ title, count, color, onClick }) => (
//   <div
//     onClick={onClick}
//     style={{
//       flex: "1 1 200px",
//       backgroundColor: "#fff",
//       borderRadius: "12px",
//       padding: "20px",
//       textAlign: "center",
//       boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//       cursor: "pointer",
//     }}
//   >
//     <h3 style={{ color, marginBottom: "10px" }}>{title}</h3>
//     <p style={{ fontSize: "28px", fontWeight: "bold", color }}>{count}</p>
//   </div>
// );

// const styles = {
//   th: { padding: "12px", textAlign: "left" },
//   td: { padding: "12px" },
//   button: {
//     padding: "6px 12px",
//     marginRight: "8px",
//     marginTop: "4px",
//     border: "none",
//     borderRadius: "6px",
//     backgroundColor: "#7F8CAA",
//     color: "#fff",
//     cursor: "pointer",
//     fontWeight: "600",
//   },
// };

// export default VendorManagement;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VendorManagement = () => {
  const [vendors, setVendors] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null);
  const [nameFilter, setNameFilter] = useState(""); // 🔍 vendor name filter
  const [counts, setCounts] = useState({ APPROVED: 0, REJECTED: 0, SUSPENDED: 0 });
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Load all vendors
  const loadVendors = () => {
    fetch("http://localhost:8080/vendor/all", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch vendors.");
        return res.json();
      })
      .then((data) => {
        setVendors(data);

        // Update counts
        const approved = data.filter((v) => v.approvalStatus === "APPROVED").length;
        const rejected = data.filter((v) => v.approvalStatus === "REJECTED").length;
        const suspended = data.filter((v) => v.approvalStatus === "SUSPENDED").length;
        setCounts({ APPROVED: approved, REJECTED: rejected, SUSPENDED: suspended });
      })
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    loadVendors();
  }, []);

  // Approve Vendor
  const handleApprove = (vendorId) => {
    fetch(`http://localhost:8080/vendor/approve/${vendorId}?approvedByUserId=1`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        alert("Vendor approved");
        loadVendors();
      })
      .catch((err) => alert(err.message));
  };

  // Reject Vendor
  const handleReject = (vendorId) => {
    const notes = prompt("Enter rejection reason:");
    if (!notes) return;
    fetch(
      `http://localhost:8080/vendor/reject/${vendorId}?approvedByUserId=1&notes=${encodeURIComponent(
        notes
      )}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then(() => {
        alert("Vendor rejected");
        loadVendors();
      })
      .catch((err) => alert(err.message));
  };

  // Suspend Vendor
  const handleSuspend = (vendorId) => {
    const reason = prompt("Enter reason for suspension:");
    if (!reason) return;
    fetch(
      `http://localhost:8080/vendor/suspend/${vendorId}?reason=${encodeURIComponent(reason)}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then(() => {
        alert("Vendor suspended");
        loadVendors();
      })
      .catch((err) => alert(err.message));
  };

  // 🔍 Filtering by status + vendor name
  const filteredVendors = vendors
    .filter((v) => (statusFilter ? v.approvalStatus === statusFilter : true))
    .filter((v) => v.businessName.toLowerCase().includes(nameFilter.toLowerCase()));

  return (
    <div style={{ padding: "30px", backgroundColor: "#EAEFEF", minHeight: "100vh" }}>
      {/* 🔲 Three-lines menu (hamburger) */}
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

      <h2 style={{ marginBottom: "20px" }}>Vendor Management</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 🔍 Search by Vendor Name */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Search by Vendor Name..."
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Status Count Cards */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          margin: "20px 0",
          flexWrap: "wrap",
        }}
      >
        <StatusCard
          title="Approved"
          count={counts.APPROVED}
          color="#28B463"
          onClick={() => setStatusFilter("APPROVED")}
        />
        <StatusCard
          title="Rejected"
          count={counts.REJECTED}
          color="#FF6B6B"
          onClick={() => setStatusFilter("REJECTED")}
        />
        <StatusCard
          title="Suspended"
          count={counts.SUSPENDED}
          color="#FFA500"
          onClick={() => setStatusFilter("SUSPENDED")}
        />
        <StatusCard
          title="All"
          count={vendors.length}
          color="#5D6D7E"
          onClick={() => setStatusFilter(null)}
        />
      </div>

      {/* Vendors Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#7F8CAA", color: "#fff" }}>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Business Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Compliance</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredVendors.map((v) => (
            <tr key={v.id} style={{ borderBottom: "1px solid #ccc" }}>
              <td style={styles.td}>{v.id}</td>
              <td style={styles.td}>{v.businessName}</td>
              <td style={styles.td}>{v.businessEmail}</td>
              <td style={styles.td}>{v.approvalStatus}</td>
              <td style={styles.td}>
                {v.approvalStatus === "APPROVED"
                  ? v.complianceStatus
                    ? "Compliant"
                    : "Non-compliant"
                  : "N/A"}
              </td>
              <td style={styles.td}>
                <button style={styles.button} onClick={() => handleApprove(v.id)}>
                  Approve
                </button>
                <button
                  style={{ ...styles.button, backgroundColor: "#FF6B6B" }}
                  onClick={() => handleReject(v.id)}
                >
                  Reject
                </button>
                <button
                  style={{ ...styles.button, backgroundColor: "#FFA500" }}
                  onClick={() => handleSuspend(v.id)}
                >
                  Suspend
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Status Card Component
const StatusCard = ({ title, count, color, onClick }) => (
  <div
    onClick={onClick}
    style={{
      flex: "1 1 200px",
      backgroundColor: "#fff",
      borderRadius: "12px",
      padding: "20px",
      textAlign: "center",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      cursor: "pointer",
    }}
  >
    <h3 style={{ color, marginBottom: "10px" }}>{title}</h3>
    <p style={{ fontSize: "28px", fontWeight: "bold", color }}>{count}</p>
  </div>
);

const styles = {
  th: { padding: "12px", textAlign: "left" },
  td: { padding: "12px" },
  button: {
    padding: "6px 12px",
    marginRight: "8px",
    marginTop: "4px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#7F8CAA",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default VendorManagement;
