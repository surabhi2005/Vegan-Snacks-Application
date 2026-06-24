// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function AdminProfile() {
//   const [admin, setAdmin] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const adminId = localStorage.getItem("userId"); // assuming admin logged in stores same key
//     const token = localStorage.getItem("token");

//     if (!adminId || !token) {
//       navigate("/login");
//       return;
//     }

//     const fetchAdminProfile = async () => {
//       try {
//         const res = await fetch(`http://localhost:8080/user/getbyid/${adminId}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (res.status === 401 || res.status === 403) {
//           alert("You are not authorized to view this profile.");
//           navigate("/login");
//           return;
//         }

//         if (!res.ok) throw new Error("Failed to fetch admin profile");

//         const data = await res.json();
//         setAdmin(data);
//       } catch (err) {
//         console.error("Error fetching admin profile:", err);
//         navigate("/login");
//       }
//     };

//     fetchAdminProfile();
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   if (!admin) {
//     return <div className="text-center mt-5 text-white">Loading admin profile...</div>;
//   }

//   return (
//     <div
//       className="min-vh-100 d-flex flex-column justify-content-center align-items-center"
//       style={{
//         backgroundImage: `url(${require("./photosvideos/snacks4.jpg")})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         position: "relative",
//         padding: "50px 20px",
//       }}
//     >
//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundColor: "rgba(51, 52, 70, 0.8)",
//           zIndex: 1,
//         }}
//       ></div>
      

//       <div className="container" style={{ position: "relative", zIndex: 2 }}>
//         <h2 className="mb-4 text-center fw-bold" style={{ color: "#EAEFEF" }}>
//           Admin Profile
//         </h2>

//         <div
//           className="card shadow-lg p-4"
//           style={{
//             backgroundColor: "#EAEFEF",
//             borderRadius: "20px",
//             color: "#333446",
//           }}
//         >
//           <h4 className="mb-3 fw-bold">{admin.username}</h4>
//           <p><strong>Email:</strong> {admin.email}</p>
//           <p><strong>Phone:</strong> {admin.phoneNumber || "Not Provided"}</p>
//           <p><strong>Role:</strong> {admin.role}</p>
//           <p><strong>Account Created:</strong> {new Date(admin.createdDate).toLocaleString()}</p>
//           <p><strong>Last Login:</strong> {admin.lastLogin ? new Date(admin.lastLogin).toLocaleString() : "Never"}</p>
//           <p><strong>Email Verified:</strong> {admin.emailVerified ? "Yes" : "No"}</p>
//           <p><strong>Active Account:</strong> {admin.isActive ? "Yes" : "No"}</p>
//         </div>

//         <div className="text-center d-flex justify-content-center gap-3 mt-4">
//           <button
//             className="px-4 py-2 fw-bold"
//             style={{
//               backgroundColor: "#333446",
//               color: "#EAEFEF",
//               border: "none",
//               borderRadius: "10px",
//               transition: "0.3s",
//             }}
//             onMouseOver={(e) => (e.target.style.backgroundColor = "#7F8CAA")}
//             onMouseOut={(e) => (e.target.style.backgroundColor = "#333446")}
//             onClick={handleLogout}
//           >
//             Logout
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminProfile;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const adminId = localStorage.getItem("userId"); // assuming admin logged in stores same key
    const token = localStorage.getItem("token");

    if (!adminId || !token) {
      navigate("/login");
      return;
    }

    const fetchAdminProfile = async () => {
      try {
        const res = await fetch(`http://localhost:8080/user/getbyid/${adminId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401 || res.status === 403) {
          alert("You are not authorized to view this profile.");
          navigate("/login");
          return;
        }

        if (!res.ok) throw new Error("Failed to fetch admin profile");

        const data = await res.json();
        setAdmin(data);
      } catch (err) {
        console.error("Error fetching admin profile:", err);
        navigate("/login");
      }
    };

    fetchAdminProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!admin) {
    return <div className="text-center mt-5 text-white">Loading admin profile...</div>;
  }

  return (
    <div
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${require("./photosvideos/snacks4.jpg")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        padding: "50px 20px",
      }}
    >
      <button
  onClick={() => navigate("/admin")}
  style={{
    position: "absolute",   // fix at top-left corner
    top: "20px",
    left: "20px",
    fontSize: "22px",
    backgroundColor: "#fff", // white box
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "6px 12px",
    cursor: "pointer",
    zIndex: 3, // above overlay
  }}
>
  ☰
</button>

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
          Admin Profile
        </h2>

        <div
          className="card shadow-lg p-4"
          style={{
            backgroundColor: "#EAEFEF",
            borderRadius: "20px",
            color: "#333446",
          }}
        >
          <h4 className="mb-3 fw-bold">{admin.username}</h4>
          <p><strong>Email:</strong> {admin.email}</p>
          <p><strong>Phone:</strong> {admin.phoneNumber || "Not Provided"}</p>
          <p><strong>Role:</strong> {admin.role}</p>
          <p><strong>Account Created:</strong> {new Date(admin.createdDate).toLocaleString()}</p>
          <p><strong>Last Login:</strong> {admin.lastLogin ? new Date(admin.lastLogin).toLocaleString() : "Never"}</p>
          <p><strong>Email Verified:</strong> {admin.emailVerified ? "Yes" : "No"}</p>
          <p><strong>Active Account:</strong> {admin.isActive ? "Yes" : "No"}</p>
        </div>

        <div className="text-center d-flex justify-content-center gap-3 mt-4">
          <button
            className="px-4 py-2 fw-bold"
            style={{
              backgroundColor: "#333446",
              color: "#EAEFEF",
              border: "none",
              borderRadius: "10px",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#7F8CAA")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#333446")}
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
