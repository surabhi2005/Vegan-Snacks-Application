// // import React, { useState, useEffect } from "react";

// // const SendNotification = () => {
// //   const [users, setUsers] = useState([]);
// //   const [selectedUser, setSelectedUser] = useState("");
// //   const [message, setMessage] = useState("");
// //   const [type, setType] = useState("SYSTEM");
// //   const [priority, setPriority] = useState("MEDIUM");
// //   const [success, setSuccess] = useState("");

// //   const notificationTypes = ["STOCK_ALERT", "ORDER", "EXPIRY", "SYSTEM", "MARKETING"];
// //   const priorities = ["LOW", "MEDIUM", "HIGH"];

// //   useEffect(() => {
// //     fetch("http://localhost:8080/user/getdata")
// //       .then(res => res.json())
// //       .then(data => setUsers(data))
// //       .catch(err => console.error(err));
// //   }, []);

// //   const handleSend = () => {
// //     if (!selectedUser || !message) {
// //       alert("Select user and enter a message");
// //       return;
// //     }

// //     const payload = {
// //       user: { id: selectedUser },
// //       message,
// //       type,
// //       priority
// //     };

// //     fetch("http://localhost:8080/notifications/add", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(payload),
// //     })
// //       .then(res => {
// //         if (!res.ok) throw new Error("Failed to send notification");
// //         return res.json();
// //       })
// //       .then(data => {
// //         setSuccess(`Notification sent to ${data.username} successfully!`);
// //         setMessage("");
// //       })
// //       .catch(err => alert(err.message));
// //   };

// //   return (
// //     <div style={{ padding: "40px", backgroundColor: "#EAEFEF", minHeight: "100vh" }}>
// //       <h2 style={{ textAlign: "center", color: "#333446", marginBottom: "30px" }}>Send Notification</h2>

// //       {success && <p style={{ color: "#28A745", textAlign: "center", fontWeight: "600" }}>{success}</p>}

// //       <div style={styles.card}>
// //         <div style={styles.field}>
// //           <label>User:</label>
// //           <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)} style={styles.select}>
// //             <option value="">Select a user</option>
// //             {users.map(u => (
// //               <option key={u.id} value={u.id}>{u.username} ({u.email})</option>
// //             ))}
// //           </select>
// //         </div>

// //         <div style={styles.field}>
// //           <label>Message:</label>
// //           <textarea
// //             value={message}
// //             onChange={e => setMessage(e.target.value)}
// //             rows={4}
// //             style={styles.textarea}
// //           />
// //         </div>

// //         <div style={styles.field}>
// //           <label>Type:</label>
// //           <select value={type} onChange={e => setType(e.target.value)} style={styles.select}>
// //             {notificationTypes.map(t => (
// //               <option key={t} value={t}>{t}</option>
// //             ))}
// //           </select>
// //         </div>

// //         <div style={styles.field}>
// //           <label>Priority:</label>
// //           <select value={priority} onChange={e => setPriority(e.target.value)} style={styles.select}>
// //             {priorities.map(p => (
// //               <option key={p} value={p}>{p}</option>
// //             ))}
// //           </select>
// //         </div>

// //         <button onClick={handleSend} style={styles.button}>Send Notification</button>
// //       </div>
// //     </div>
// //   );
// // };

// // const styles = {
// //   card: {
// //     backgroundColor: "#fff",
// //     padding: "30px",
// //     borderRadius: "12px",
// //     boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
// //     maxWidth: "600px",
// //     margin: "0 auto"
// //   },
// //   field: {
// //     display: "flex",
// //     flexDirection: "column",
// //     marginBottom: "20px"
// //   },
// //   select: {
// //     padding: "10px",
// //     fontSize: "16px",
// //     borderRadius: "6px",
// //     border: "1px solid #ccc",
// //     marginTop: "5px"
// //   },
// //   textarea: {
// //     padding: "10px",
// //     fontSize: "16px",
// //     borderRadius: "6px",
// //     border: "1px solid #ccc",
// //     marginTop: "5px",
// //     resize: "vertical"
// //   },
// //   button: {
// //     padding: "12px 20px",
// //     backgroundColor: "#333446",
// //     color: "#fff",
// //     border: "none",
// //     borderRadius: "8px",
// //     fontSize: "16px",
// //     fontWeight: "600",
// //     cursor: "pointer",
// //     marginTop: "10px"
// //   }
// // };

// // export default SendNotification;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const SendNotification = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState("");
//   const [message, setMessage] = useState("");
//   const [type, setType] = useState("SYSTEM");
//   const [priority, setPriority] = useState("MEDIUM");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   const notificationTypes = ["STOCK_ALERT", "ORDER", "EXPIRY", "SYSTEM", "MARKETING"];
//   const priorities = ["LOW", "MEDIUM", "HIGH"];

//   // ✅ Check auth on mount
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("You must log in to access this page.");
//       navigate("/login");
//       return;
//     }

//     fetch("http://localhost:8080/user/getdata", {
//       headers: {
//         Authorization: `Bearer ${token}`, // 🔑 Attach JWT token
//       },
//     })
//       .then(res => {
//         if (res.status === 401) {
//           alert("Session expired. Please log in again.");
//           navigate("/login");
//         }
//         return res.json();
//       })
//       .then(data => setUsers(data))
//       .catch(err => console.error(err));
//   }, [navigate]);

//   const handleSend = () => {
//     const token = localStorage.getItem("token");

//     if (!selectedUser || !message) {
//       alert("Select user and enter a message");
//       return;
//     }

//     const payload = {
//       user: { id: selectedUser },
//       message,
//       type,
//       priority,
//     };

//     fetch("http://localhost:8080/notifications/add", {
//       method: "POST",
//       headers: { 
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`, // 🔑 Attach JWT token
//       },
//       body: JSON.stringify(payload),
//     })
//       .then(res => {
//         if (res.status === 401) {
//           alert("Unauthorized! Please log in again.");
//           navigate("/login");
//           return;
//         }
//         if (!res.ok) throw new Error("Failed to send notification");
//         return res.json();
//       })
//       .then(data => {
//         setSuccess(`Notification sent successfully!`);
//         setMessage("");
//       })
//       .catch(err => alert(err.message));
//   };

//   return (
//     <div style={{ padding: "40px", backgroundColor: "#EAEFEF", minHeight: "100vh" }}>
//       <h2 style={{ textAlign: "center", color: "#333446", marginBottom: "30px" }}>
//         Send Notification
//       </h2>

//       {success && (
//         <p style={{ color: "#28A745", textAlign: "center", fontWeight: "600" }}>{success}</p>
//       )}

//       <div style={styles.card}>
//         <div style={styles.field}>
//           <label>User:</label>
//           <select
//             value={selectedUser}
//             onChange={e => setSelectedUser(e.target.value)}
//             style={styles.select}
//           >
//             <option value="">Select a user</option>
//             {users.map(u => (
//               <option key={u.id} value={u.id}>
//                 {u.username} ({u.email})
//               </option>
//             ))}
//           </select>
//         </div>

//         <div style={styles.field}>
//           <label>Message:</label>
//           <textarea
//             value={message}
//             onChange={e => setMessage(e.target.value)}
//             rows={4}
//             style={styles.textarea}
//           />
//         </div>

//         <div style={styles.field}>
//           <label>Type:</label>
//           <select value={type} onChange={e => setType(e.target.value)} style={styles.select}>
//             {notificationTypes.map(t => (
//               <option key={t} value={t}>
//                 {t}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div style={styles.field}>
//           <label>Priority:</label>
//           <select value={priority} onChange={e => setPriority(e.target.value)} style={styles.select}>
//             {priorities.map(p => (
//               <option key={p} value={p}>
//                 {p}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button onClick={handleSend} style={styles.button}>
//           Send Notification
//         </button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   card: {
//     backgroundColor: "#fff",
//     padding: "30px",
//     borderRadius: "12px",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//     maxWidth: "600px",
//     margin: "0 auto",
//   },
//   field: {
//     display: "flex",
//     flexDirection: "column",
//     marginBottom: "20px",
//   },
//   select: {
//     padding: "10px",
//     fontSize: "16px",
//     borderRadius: "6px",
//     border: "1px solid #ccc",
//     marginTop: "5px",
//   },
//   textarea: {
//     padding: "10px",
//     fontSize: "16px",
//     borderRadius: "6px",
//     border: "1px solid #ccc",
//     marginTop: "5px",
//     resize: "vertical",
//   },
//   button: {
//     padding: "12px 20px",
//     backgroundColor: "#333446",
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     fontSize: "16px",
//     fontWeight: "600",
//     cursor: "pointer",
//     marginTop: "10px",
//   },
// };

// export default SendNotification;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SendNotification = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("SYSTEM");
  const [priority, setPriority] = useState("MEDIUM");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const notificationTypes = ["STOCK_ALERT", "ORDER", "EXPIRY", "SYSTEM", "MARKETING"];
  const priorities = ["LOW", "MEDIUM", "HIGH"];

  // ✅ Check auth on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must log in to access this page.");
      navigate("/login");
      return;
    }

    fetch("http://localhost:8080/user/getdata", {
      headers: {
        Authorization: `Bearer ${token}`, // 🔑 Attach JWT token
      },
    })
      .then(res => {
        if (res.status === 401) {
          alert("Session expired. Please log in again.");
          navigate("/login");
        }
        return res.json();
      })
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, [navigate]);

  const handleSend = () => {
    const token = localStorage.getItem("token");

    if (!selectedUser || !message) {
      alert("Select user and enter a message");
      return;
    }

    const payload = {
      user: { id: selectedUser },
      message,
      type,
      priority,
    };

    fetch("http://localhost:8080/notifications/add", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 🔑 Attach JWT token
      },
      body: JSON.stringify(payload),
    })
      .then(res => {
        if (res.status === 401) {
          alert("Unauthorized! Please log in again.");
          navigate("/login");
          return;
        }
        if (!res.ok) throw new Error("Failed to send notification");
        return res.json();
      })
      .then(data => {
        setSuccess(`Notification sent successfully!`);
        setMessage("");
      })
      .catch(err => alert(err.message));
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#EAEFEF", minHeight: "100vh" }}>
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
      <h2 style={{ textAlign: "center", color: "#333446", marginBottom: "30px" }}>
        Send Notification
      </h2>

      {success && (
        <p style={{ color: "#28A745", textAlign: "center", fontWeight: "600" }}>{success}</p>
      )}

      <div style={styles.card}>
        <div style={styles.field}>
          <label>User:</label>
          <select
            value={selectedUser}
            onChange={e => setSelectedUser(e.target.value)}
            style={styles.select}
          >
            <option value="">Select a user</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>
                {u.username} ({u.email})
              </option>
            ))}
          </select>
        </div>

        <div style={styles.field}>
          <label>Message:</label>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={4}
            style={styles.textarea}
          />
        </div>

        <div style={styles.field}>
          <label>Type:</label>
          <select value={type} onChange={e => setType(e.target.value)} style={styles.select}>
            {notificationTypes.map(t => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.field}>
          <label>Priority:</label>
          <select value={priority} onChange={e => setPriority(e.target.value)} style={styles.select}>
            {priorities.map(p => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleSend} style={styles.button}>
          Send Notification
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    maxWidth: "600px",
    margin: "0 auto",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginTop: "5px",
  },
  textarea: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginTop: "5px",
    resize: "vertical",
  },
  button: {
    padding: "12px 20px",
    backgroundColor: "#333446",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default SendNotification;

