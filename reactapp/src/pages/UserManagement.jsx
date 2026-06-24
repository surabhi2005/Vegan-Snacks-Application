// // import React, { useEffect, useState } from "react";

// // const UsersManagement = () => {
// //   const [users, setUsers] = useState([]);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     fetchUsers();
// //   }, []);

// //   const fetchUsers = () => {
// //     fetch("http://localhost:8080/user/getdata")
// //       .then((res) => {
// //         if (!res.ok) throw new Error("Failed to fetch users");
// //         return res.json();
// //       })
// //       .then((data) => setUsers(data))
// //       .catch((err) => setError(err.message));
// //   };

// //   const handleDelete = (userId) => {
// //     if (!window.confirm("Are you sure you want to delete this user?")) return;

// //     fetch(`http://localhost:8080/user/delete/${userId}`, { method: "DELETE" })
// //       .then(() => {
// //         alert("User deleted successfully");
// //         setUsers(users.filter((u) => u.id !== userId));
// //       })
// //       .catch((err) => alert(err.message));
// //   };

// //   const toggleUserActive = (userId, activate) => {
// //     const action = activate ? "activate" : "deactivate";
// //     if (!window.confirm(`Are you sure you want to ${action} this user?`)) return;

// //     fetch(`http://localhost:8080/user/${action}/${userId}`, { method: "PUT" })
// //   .then((res) => {
// //     if (!res.ok) throw new Error(`Failed to ${action} user`);
// //     return res.text(); 
// //   })
// //   .then((message) => {
// //     alert(message);
// //     setUsers(users.map(u => u.id === userId ? { ...u, isActive: activate } : u));
// //   })
// //   .catch((err) => alert(err.message));

// //   };

// //   return (
// //     <div style={{ padding: "30px" }}>
// //       <h2>Users Management</h2>
// //       {error && <p style={{ color: "red" }}>{error}</p>}

// //       <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
// //         <thead>
// //           <tr style={{ backgroundColor: "#7F8CAA", color: "#fff" }}>
// //             <th style={styles.th}>ID</th>
// //             <th style={styles.th}>Username</th>
// //             <th style={styles.th}>Email</th>
// //             <th style={styles.th}>Role</th>
// //             <th style={styles.th}>Active</th>
// //             <th style={styles.th}>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {users.map((user) => (
// //             <tr key={user.id} style={{ borderBottom: "1px solid #ccc" }}>
// //               <td style={styles.td}>{user.id}</td>
// //               <td style={styles.td}>{user.username}</td>
// //               <td style={styles.td}>{user.email}</td>
// //               <td style={styles.td}>{user.role}</td>
// //               <td style={styles.td}>{user.isActive ? "Yes" : "No"}</td>
// //               <td style={styles.td}>
// //                 <button style={styles.button} onClick={() => handleDelete(user.id)}>
// //                   Delete
// //                 </button>
// //                 {user.isActive ? (
// //                   <button
// //                     style={{ ...styles.button, backgroundColor: "#FF6B6B" }}
// //                     onClick={() => toggleUserActive(user.id, false)}
// //                   >
// //                     Deactivate
// //                   </button>
// //                 ) : (
// //                   <button
// //                     style={{ ...styles.button, backgroundColor: "#28A745" }}
// //                     onClick={() => toggleUserActive(user.id, true)}
// //                   >
// //                     Activate
// //                   </button>
// //                 )}
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

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

// // export default UsersManagement;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const UsersManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   useEffect(() => {
//     if (!token) {
//       alert("You must log in to access this page.");
//       navigate("/login");
//       return;
//     }
//     if (role !== "ADMIN") {
//       alert("You are not authorized to access this page.");
//       navigate("/");
//       return;
//     }
//     fetchUsers();
//   }, [navigate, token, role]);

//   const fetchUsers = () => {
//     fetch("http://localhost:8080/user/getdata", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         if (res.status === 401) throw new Error("Unauthorized! Please log in again.");
//         if (!res.ok) throw new Error("Failed to fetch users");
//         return res.json();
//       })
//       .then((data) => setUsers(data))
//       .catch((err) => setError(err.message));
//   };

//   const handleDelete = (userId) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;

//     fetch(`http://localhost:8080/user/delete/${userId}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to delete user");
//         alert("User deleted successfully");
//         setUsers(users.filter((u) => u.id !== userId));
//       })
//       .catch((err) => alert(err.message));
//   };

//   const toggleUserActive = (userId, activate) => {
//     const action = activate ? "activate" : "deactivate";
//     if (!window.confirm(`Are you sure you want to ${action} this user?`)) return;

//     fetch(`http://localhost:8080/user/${action}/${userId}`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error(`Failed to ${action} user`);
//         return res.text();
//       })
//       .then((message) => {
//         alert(message);
//         setUsers(users.map((u) => (u.id === userId ? { ...u, isActive: activate } : u)));
//       })
//       .catch((err) => alert(err.message));
//   };

//   return (
//     <div style={{ padding: "30px" }}>
//       <h2>Users Management (Admin Only)</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
//         <thead>
//           <tr style={{ backgroundColor: "#7F8CAA", color: "#fff" }}>
//             <th style={styles.th}>ID</th>
//             <th style={styles.th}>Username</th>
//             <th style={styles.th}>Email</th>
//             <th style={styles.th}>Role</th>
//             <th style={styles.th}>Active</th>
//             <th style={styles.th}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id} style={{ borderBottom: "1px solid #ccc" }}>
//               <td style={styles.td}>{user.id}</td>
//               <td style={styles.td}>{user.username}</td>
//               <td style={styles.td}>{user.email}</td>
//               <td style={styles.td}>{user.role}</td>
//               <td style={styles.td}>{user.isActive ? "Yes" : "No"}</td>
//               <td style={styles.td}>
//                 <button style={styles.button} onClick={() => handleDelete(user.id)}>
//                   Delete
//                 </button>
//                 {user.isActive ? (
//                   <button
//                     style={{ ...styles.button, backgroundColor: "#FF6B6B" }}
//                     onClick={() => toggleUserActive(user.id, false)}
//                   >
//                     Deactivate
//                   </button>
//                 ) : (
//                   <button
//                     style={{ ...styles.button, backgroundColor: "#28A745" }}
//                     onClick={() => toggleUserActive(user.id, true)}
//                   >
//                     Activate
//                   </button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

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

// export default UsersManagement;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(""); // 🔹 filter state
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token) {
      alert("You must log in to access this page.");
      navigate("/login");
      return;
    }
    if (role !== "ADMIN") {
      alert("You are not authorized to access this page.");
      navigate("/");
      return;
    }
    fetchUsers();
  }, [navigate, token, role]);

  const fetchUsers = () => {
    fetch("http://localhost:8080/user/getdata", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized! Please log in again.");
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message));
  };

  const handleDelete = (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    fetch(`http://localhost:8080/user/delete/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete user");
        alert("User deleted successfully");
        setUsers(users.filter((u) => u.id !== userId));
      })
      .catch((err) => alert(err.message));
  };

  const toggleUserActive = (userId, activate) => {
    const action = activate ? "activate" : "deactivate";
    if (!window.confirm(`Are you sure you want to ${action} this user?`)) return;

    fetch(`http://localhost:8080/user/${action}/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to ${action} user`);
        return res.text();
      })
      .then((message) => {
        alert(message);
        setUsers(users.map((u) => (u.id === userId ? { ...u, isActive: activate } : u)));
      })
      .catch((err) => alert(err.message));
  };

  // 🔹 Filter users by username, email, or role
  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "30px" }}>
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
      <h2>Users Management (Admin Only)</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 🔹 Search Filter */}
      <input
        type="text"
        placeholder="Search by username, email, or role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          width: "300px",
          marginBottom: "15px",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      />

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr style={{ backgroundColor: "#7F8CAA", color: "#fff" }}>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Username</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Active</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={styles.td}>{user.id}</td>
                <td style={styles.td}>{user.username}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.role}</td>
                <td style={styles.td}>{user.isActive ? "Yes" : "No"}</td>
                <td style={styles.td}>
                  <button style={styles.button} onClick={() => handleDelete(user.id)}>
                    Delete
                  </button>
                  {user.isActive ? (
                    <button
                      style={{ ...styles.button, backgroundColor: "#FF6B6B" }}
                      onClick={() => toggleUserActive(user.id, false)}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      style={{ ...styles.button, backgroundColor: "#28A745" }}
                      onClick={() => toggleUserActive(user.id, true)}
                    >
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "15px" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

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

export default UsersManagement;
