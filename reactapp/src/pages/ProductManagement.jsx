// // import React, { useEffect, useState } from "react";

// // const ProductManagement = () => {
// //   const [snacks, setSnacks] = useState([]);
// //   const [statusFilter, setStatusFilter] = useState(null);
// //   const [counts, setCounts] = useState({ APPROVED: 0, REJECTED: 0, PENDING_APPROVAL: 0 });
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     fetchAllSnacks();
// //     fetchCounts();
// //   }, []);

// //   const fetchAllSnacks = () => {
// //     fetch("http://localhost:8080/snacks/getAllVeganSnacks")
// //       .then(res => res.json())
// //       .then(data => setSnacks(data))
// //       .catch(err => setError(err.message));
// //   };

// //   const fetchCounts = () => {
// //     const statuses = ["APPROVED", "REJECTED", "PENDING_APPROVAL"];
// //     statuses.forEach(status => {
// //       fetch(`http://localhost:8080/snacks/countByStatus?status=${status}`)
// //         .then(res => res.json())
// //         .then(count => setCounts(prev => ({ ...prev, [status]: count })))
// //         .catch(err => console.error(err));
// //     });
// //   };

// //   const handleApprove = (snackId) => {
// //     const adminId = 1; 
// //     fetch(`http://localhost:8080/snacks/approve/${snackId}?approvedByUserId=${adminId}`, { method: "PUT" })
// //       .then(res => res.json())
// //       .then(() => {
// //         alert("Snack approved successfully");
// //         fetchAllSnacks();
// //         fetchCounts();
// //       })
// //       .catch(err => alert(err.message));
// //   };

// //   const handleReject = (snackId) => {
// //     const adminId = 1; 
// //     const notes = "Not meeting quality standards";
// //     fetch(`http://localhost:8080/snacks/reject/${snackId}?approvedByUserId=${adminId}&notes=${encodeURIComponent(notes)}`, { method: "PUT" })
// //       .then(res => res.json())
// //       .then(() => {
// //         alert("Snack rejected");
// //         fetchAllSnacks();
// //         fetchCounts();
// //       })
// //       .catch(err => alert(err.message));
// //   };

// //   const filteredSnacks = statusFilter ? snacks.filter(snack => snack.status === statusFilter) : snacks;

// //   return (
// //     <div style={{ padding: "30px" }}>
// //       <h2>Product Management</h2>
// //       {error && <p style={{ color: "red" }}>{error}</p>}

// //       {/* Status Count Cards */}
// //       <div style={{ display: "flex", gap: "20px", margin: "20px 0", flexWrap: "wrap" }}>
// //         <StatusCard title="Approved" count={counts.APPROVED} color="#28B463" onClick={() => setStatusFilter("APPROVED")} />
// //         <StatusCard title="Rejected" count={counts.REJECTED} color="#FF6B6B" onClick={() => setStatusFilter("REJECTED")} />
// //         <StatusCard title="Pending" count={counts.PENDING_APPROVAL} color="#F1C40F" onClick={() => setStatusFilter("PENDING_APPROVAL")} />
// //         <StatusCard title="All" count={snacks.length} color="#5D6D7E" onClick={() => setStatusFilter(null)} />
// //       </div>

// //       {/* Snacks Table */}
// //       <table style={{ width: "100%", borderCollapse: "collapse" }}>
// //         <thead>
// //           <tr style={{ backgroundColor: "#7F8CAA", color: "#fff" }}>
// //             <th style={styles.th}>ID</th>
// //             <th style={styles.th}>Vendor</th>
// //             <th style={styles.th}>Name</th>
// //             <th style={styles.th}>Type</th>
// //             <th style={styles.th}>Status</th>
// //             <th style={styles.th}>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {filteredSnacks.map(snack => (
// //             <tr key={snack.id} style={{ borderBottom: "1px solid #ccc" }}>
// //               <td style={styles.td}>{snack.id}</td>
// //               <td style={styles.td}>{snack.vendorName}</td>
// //               <td style={styles.td}>{snack.snackName}</td>
// //               <td style={styles.td}>{snack.snackType}</td>
// //               <td style={styles.td}>{snack.status}</td>
// //               <td style={styles.td}>
// //                 <button style={styles.button} onClick={() => handleApprove(snack.id)}>Approve</button>
// //                 <button style={{ ...styles.button, backgroundColor: "#FF6B6B" }} onClick={() => handleReject(snack.id)}>Reject</button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // // Reusable Status Card
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
// //   th: { padding: "10px", textAlign: "left" },
// //   td: { padding: "10px" },
// //   button: {
// //     padding: "6px 12px",
// //     marginRight: "8px",
// //     border: "none",
// //     borderRadius: "6px",
// //     backgroundColor: "#7F8CAA",
// //     color: "#fff",
// //     cursor: "pointer",
// //     fontWeight: "600",
// //   },
// // };

// // export default ProductManagement;
// import React, { useEffect, useState } from "react";

// const ProductManagement = () => {
//   const [snacks, setSnacks] = useState([]);
//   const [statusFilter, setStatusFilter] = useState(null);
//   const [counts, setCounts] = useState({ APPROVED: 0, REJECTED: 0, PENDING_APPROVAL: 0 });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token"); // store token after login
//   const userRole = localStorage.getItem("role"); // store role after login

//   useEffect(() => {
//     if (userRole !== "ADMIN") {
//       setError("Unauthorized access. Only Admins can view this page.");
//       setLoading(false);
//       return;
//     }
//     fetchAllSnacks();
//     fetchCounts();
//   }, []);

//   const fetchAllSnacks = () => {
//     setLoading(true);
//     fetch("http://localhost:8080/snacks/getAllVeganSnacks", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch snacks");
//         return res.json();
//       })
//       .then((data) => {
//         setSnacks(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   };

//   const fetchCounts = () => {
//     const statuses = ["APPROVED", "REJECTED", "PENDING_APPROVAL"];
//     statuses.forEach((status) => {
//       fetch(`http://localhost:8080/snacks/countByStatus?status=${status}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//         .then((res) => res.json())
//         .then((count) => setCounts((prev) => ({ ...prev, [status]: count })))
//         .catch((err) => console.error(err));
//     });
//   };

//   const handleApprove = (snackId) => {
//     const adminId = localStorage.getItem("userId");
//     fetch(
//       `http://localhost:8080/snacks/approve/${snackId}?approvedByUserId=${adminId}`,
//       {
//         method: "PUT",
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     )
//       .then((res) => {
//         if (!res.ok) throw new Error("Approval failed");
//         return res.json();
//       })
//       .then(() => {
//         alert("Snack approved successfully ✅");
//         fetchAllSnacks();
//         fetchCounts();
//       })
//       .catch((err) => alert(err.message));
//   };

//   const handleReject = (snackId) => {
//     const adminId = localStorage.getItem("userId");
//     const notes = "Not meeting quality standards";
//     fetch(
//       `http://localhost:8080/snacks/reject/${snackId}?approvedByUserId=${adminId}&notes=${encodeURIComponent(
//         notes
//       )}`,
//       {
//         method: "PUT",
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     )
//       .then((res) => {
//         if (!res.ok) throw new Error("Rejection failed");
//         return res.json();
//       })
//       .then(() => {
//         alert("Snack rejected ❌");
//         fetchAllSnacks();
//         fetchCounts();
//       })
//       .catch((err) => alert(err.message));
//   };

//   const filteredSnacks = statusFilter
//     ? snacks.filter((snack) => snack.status === statusFilter)
//     : snacks;

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div style={{ padding: "30px" }}>
//       <h2>Product Management</h2>

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
//           title="Pending"
//           count={counts.PENDING_APPROVAL}
//           color="#F1C40F"
//           onClick={() => setStatusFilter("PENDING_APPROVAL")}
//         />
//         <StatusCard
//           title="All"
//           count={snacks.length}
//           color="#5D6D7E"
//           onClick={() => setStatusFilter(null)}
//         />
//       </div>

//       {/* Snacks Table */}
//       <table style={{ width: "100%", borderCollapse: "collapse" }}>
//         <thead>
//           <tr style={{ backgroundColor: "#7F8CAA", color: "#fff" }}>
//             <th style={styles.th}>ID</th>
//             <th style={styles.th}>Vendor</th>
//             <th style={styles.th}>Name</th>
//             <th style={styles.th}>Type</th>
//             <th style={styles.th}>Status</th>
//             {userRole === "ADMIN" && <th style={styles.th}>Actions</th>}
//           </tr>
//         </thead>
//         <tbody>
//           {filteredSnacks.map((snack) => (
//             <tr key={snack.id} style={{ borderBottom: "1px solid #ccc" }}>
//               <td style={styles.td}>{snack.id}</td>
//               <td style={styles.td}>{snack.vendorName}</td>
//               <td style={styles.td}>{snack.snackName}</td>
//               <td style={styles.td}>{snack.snackType}</td>
//               <td style={styles.td}>{snack.status}</td>
//               {userRole === "ADMIN" && (
//                 <td style={styles.td}>
//                   <button
//                     style={styles.button}
//                     onClick={() => handleApprove(snack.id)}
//                   >
//                     Approve
//                   </button>
//                   <button
//                     style={{ ...styles.button, backgroundColor: "#FF6B6B" }}
//                     onClick={() => handleReject(snack.id)}
//                   >
//                     Reject
//                   </button>
//                 </td>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// // Reusable Status Card
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
//   th: { padding: "10px", textAlign: "left" },
//   td: { padding: "10px" },
//   button: {
//     padding: "6px 12px",
//     marginRight: "8px",
//     border: "none",
//     borderRadius: "6px",
//     backgroundColor: "#7F8CAA",
//     color: "#fff",
//     cursor: "pointer",
//     fontWeight: "600",
//   },
// };

// export default ProductManagement;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductManagement = () => {
  const [snacks, setSnacks] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null);
  const [search, setSearch] = useState("");
  const [counts, setCounts] = useState({
    APPROVED: 0,
    REJECTED: 0,
    PENDING_APPROVAL: 0,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token"); // store token after login
  const userRole = localStorage.getItem("role"); // store role after login
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole !== "ADMIN") {
      setError("Unauthorized access. Only Admins can view this page.");
      setLoading(false);
      return;
    }
    fetchAllSnacks();
    fetchCounts();
  }, []);

  const fetchAllSnacks = () => {
    setLoading(true);
    fetch("http://localhost:8080/snacks/getAllVeganSnacks", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch snacks");
        return res.json();
      })
      .then((data) => {
        setSnacks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const fetchCounts = () => {
    const statuses = ["APPROVED", "REJECTED", "PENDING_APPROVAL"];
    statuses.forEach((status) => {
      fetch(`http://localhost:8080/snacks/countByStatus?status=${status}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((count) =>
          setCounts((prev) => ({ ...prev, [status]: count }))
        )
        .catch((err) => console.error(err));
    });
  };

  const handleApprove = (snackId) => {
    const adminId = localStorage.getItem("userId");
    fetch(
      `http://localhost:8080/snacks/approve/${snackId}?approvedByUserId=${adminId}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Approval failed");
        return res.json();
      })
      .then(() => {
        alert("Snack approved successfully ✅");
        fetchAllSnacks();
        fetchCounts();
      })
      .catch((err) => alert(err.message));
  };

  const handleReject = (snackId) => {
    const adminId = localStorage.getItem("userId");
    const notes = "Not meeting quality standards";
    fetch(
      `http://localhost:8080/snacks/reject/${snackId}?approvedByUserId=${adminId}&notes=${encodeURIComponent(
        notes
      )}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Rejection failed");
        return res.json();
      })
      .then(() => {
        alert("Snack rejected ❌");
        fetchAllSnacks();
        fetchCounts();
      })
      .catch((err) => alert(err.message));
  };

  // Apply filters
  const filteredSnacks = snacks
    .filter((snack) =>
      statusFilter ? snack.status === statusFilter : true
    )
    .filter((snack) =>
      snack.snackName.toLowerCase().includes(search.toLowerCase())
    );

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "30px" }}>
      {/* Three-lines Hamburger Button */}
      <button
        onClick={() => navigate("/admin")}
        style={{
          background: "transparent",
          border: "none",
          fontSize: "28px",
          cursor: "pointer",
          marginBottom: "15px",
        }}
      >
        ☰
      </button>

      <h2>Product Management</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by product name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          margin: "15px 0",
          width: "100%",
          maxWidth: "300px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

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
          title="Pending"
          count={counts.PENDING_APPROVAL}
          color="#F1C40F"
          onClick={() => setStatusFilter("PENDING_APPROVAL")}
        />
        <StatusCard
          title="All"
          count={snacks.length}
          color="#5D6D7E"
          onClick={() => setStatusFilter(null)}
        />
      </div>

      {/* Snacks Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#7F8CAA", color: "#fff" }}>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Vendor</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Status</th>
            {userRole === "ADMIN" && <th style={styles.th}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredSnacks.map((snack) => (
            <tr key={snack.id} style={{ borderBottom: "1px solid #ccc" }}>
              <td style={styles.td}>{snack.id}</td>
              <td style={styles.td}>{snack.vendorName}</td>
              <td style={styles.td}>{snack.snackName}</td>
              <td style={styles.td}>{snack.snackType}</td>
              <td style={styles.td}>{snack.status}</td>
              {userRole === "ADMIN" && (
                <td style={styles.td}>
                  <button
                    style={styles.button}
                    onClick={() => handleApprove(snack.id)}
                  >
                    Approve
                  </button>
                  <button
                    style={{ ...styles.button, backgroundColor: "#FF6B6B" }}
                    onClick={() => handleReject(snack.id)}
                  >
                    Reject
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Reusable Status Card
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
  th: { padding: "10px", textAlign: "left" },
  td: { padding: "10px" },
  button: {
    padding: "6px 12px",
    marginRight: "8px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#7F8CAA",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default ProductManagement;
