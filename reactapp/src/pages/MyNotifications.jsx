// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const MyNotifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [selectedNotification, setSelectedNotification] = useState(null);
//   const userId = localStorage.getItem("userId"); // ✅ Logged-in userId
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (userId) {
//       fetch(`http://localhost:8080/notifications/user/${userId}`)
//         .then((res) => res.json())
//         .then((data) => setNotifications(data))
//         .catch((err) => console.error("Error fetching notifications:", err));
//     }
//   }, [userId]);

//   const handleSelect = (notification) => {
//     setSelectedNotification(notification);

//     // Mark as read locally
//     setNotifications((prev) =>
//       prev.map((n) =>
//         n.id === notification.id ? { ...n, isRead: true } : n
//       )
//     );

//     // Call backend to mark as read
//     fetch(`http://localhost:8080/notifications/${notification.id}/read`, {
//       method: "PUT",
//     }).catch((err) => console.error("Error marking notification as read:", err));
//   };

//   const handleBack = () => {
//     setSelectedNotification(null);
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4 text-center fw-bold" style={{ color: "#333446" }}>
//         My Notifications
//       </h2>

//       {/* Detail View */}
//       {selectedNotification ? (
//         <div className="card shadow-lg p-4 border-0" style={{ borderRadius: "16px" }}>
//           <h4 className="fw-bold mb-3" style={{ color: "#333446" }}>
//             {selectedNotification.type}
//           </h4>
//           <p style={{ fontSize: "1.1rem" }}>{selectedNotification.message}</p>
//           <small className="text-muted">
//             {new Date(selectedNotification.createdDate).toLocaleString()} | Priority:{" "}
//             <span className="fw-semibold">{selectedNotification.priority}</span>
//           </small>
//           <br />
//           <div className="mt-4 d-flex gap-3">
//             <button className="btn btn-dark px-4" onClick={handleBack}>
//               ← Back
//             </button>
//             <button
//               className="btn btn-secondary px-4"
//               onClick={() => navigate("/customer-home")}
//             >
//               Back to Home
//             </button>
//           </div>
//         </div>
//       ) : (
//         // List View
//         <>
//           <div className="row g-4">
//             {notifications.length === 0 ? (
//               <p className="text-center text-muted">No notifications found.</p>
//             ) : (
//               notifications.map((n) => (
//                 <div className="col-md-6" key={n.id}>
//                   <div
//                     className="card shadow-sm p-4 border-0 h-100"
//                     style={{
//                       borderRadius: "16px",
//                       cursor: "pointer",
//                       backgroundColor: n.isRead ? "#f0f0f0" : "#333446",
//                       color: n.isRead ? "#333" : "#fff",
//                       transition: "all 0.3s ease",
//                     }}
//                     onClick={() => handleSelect(n)}
//                   >
//                     <h5
//                       className="fw-bold mb-2"
//                       style={{
//                         fontSize: "1.3rem",
//                         letterSpacing: "0.5px",
//                       }}
//                     >
//                       {n.type}
//                     </h5>
//                     <small className={n.isRead ? "text-muted" : "text-light"}>
//                       {new Date(n.createdDate).toLocaleDateString()}
//                     </small>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//           <div className="text-center mt-4">
//             <button
//               className="btn btn-secondary px-4"
//               onClick={() => navigate("/customer-home")}
//             >
//               Back to Home
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default MyNotifications;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId || !token) return;

    const fetchNotifications = async () => {
      try {
        const res = await fetch(`http://localhost:8080/notifications/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            alert("Session expired. Please login again.");
            localStorage.removeItem("token");
            navigate("/login");
          }
          throw new Error("Failed to fetch notifications");
        }
        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();
  }, [userId, token, navigate]);

  const handleSelect = async (notification) => {
    setSelectedNotification(notification);

    // Mark as read locally
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notification.id ? { ...n, isRead: true } : n
      )
    );

    // Mark as read on backend
    try {
      await fetch(`http://localhost:8080/notifications/${notification.id}/read`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const handleBack = () => setSelectedNotification(null);

  return (
      <div className="container mt-4">
        <h2 className="mb-4 text-center fw-bold" style={{ color: "#333446" }}>
          My Notifications
        </h2>

        {selectedNotification ? (
          <div className="card shadow-lg p-4 border-0" style={{ borderRadius: "16px" }}>
            <h4 className="fw-bold mb-3" style={{ color: "#333446" }}>
              {selectedNotification.type}
            </h4>
            <p style={{ fontSize: "1.1rem" }}>{selectedNotification.message}</p>
            <small className="text-muted">
              {new Date(selectedNotification.createdDate).toLocaleString()} | Priority:{" "}
              <span className="fw-semibold">{selectedNotification.priority}</span>
            </small>
            <br />
            <div className="mt-4 d-flex gap-3">
              <button className="btn btn-dark px-4" onClick={handleBack}>
                ← Back
              </button>
              <button className="btn btn-secondary px-4" onClick={() => navigate("/customer-home")}>
                Back to Home
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="row g-4">
              {notifications.length === 0 ? (
                <p className="text-center text-muted">No notifications found.</p>
              ) : (
                notifications.map((n) => (
                  <div className="col-md-6" key={n.id}>
                    <div
                      className="card shadow-sm p-4 border-0 h-100"
                      style={{
                        borderRadius: "16px",
                        cursor: "pointer",
                        backgroundColor: n.isRead ? "#f0f0f0" : "#333446",
                        color: n.isRead ? "#333" : "#fff",
                        transition: "all 0.3s ease",
                      }}
                      onClick={() => handleSelect(n)}
                    >
                      <h5
                        className="fw-bold mb-2"
                        style={{ fontSize: "1.3rem", letterSpacing: "0.5px" }}
                      >
                        {n.type}
                      </h5>
                      <small className={n.isRead ? "text-muted" : "text-light"}>
                        {new Date(n.createdDate).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="text-center mt-4">
              <button className="btn btn-secondary px-4" onClick={() => navigate("/customer-home")}>
                Back to Home
              </button>
            </div>
          </>
        )}
      </div>
  );
};

export default MyNotifications;
