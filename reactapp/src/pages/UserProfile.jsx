// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function UserProfile() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     if (!userId) {
//       console.error("No userId found in localStorage");
//       return;
//     }

//     fetch(`http://localhost:8080/user/getbyid/${userId}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + localStorage.getItem("token"),
//       },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("User not found");
//         return res.json();
//       })
//       .then((data) => setUser(data))
//       .catch((err) => console.error("Error fetching user profile:", err));
//   }, []);

//   // Logout function
//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   if (!user) {
//     return <div className="text-center mt-5 text-white">Loading user profile...</div>;
//   }

//   return (
//     <div
//       className="min-vh-100 d-flex flex-column justify-content-center align-items-center"
//       style={{
//         backgroundImage: `url(${require("./photosvideos/snacks9.jpg")})`,
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
//           backgroundColor: "rgba(51, 52, 70, 0.8)",
//           zIndex: 1,
//         }}
//       ></div>

//       {/* Profile Card */}
//       <div className="container" style={{ position: "relative", zIndex: 2 }}>
//         <h2 className="mb-4 text-center fw-bold" style={{ color: "#EAEFEF" }}>
//           User Profile
//         </h2>
//         <div
//           className="card shadow-lg p-4"
//           style={{
//             backgroundColor: "#EAEFEF",
//             borderRadius: "20px",
//             color: "#333446",
//           }}
//         >
//           <h4 className="mb-3 fw-bold">{user.username}</h4>

//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>Phone:</strong> {user.phoneNumber || "Not Provided"}</p>
//           <p><strong>Role:</strong> {user.role}</p>
//           <p><strong>Account Created:</strong> {new Date(user.createdDate).toLocaleString()}</p>
//           <p><strong>Last Login:</strong> {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}</p>
//           <p><strong>Email Verified:</strong> {user.emailVerified ? "Yes" : "No"}</p>
//           <p><strong>Active Account:</strong> {user.isActive ? "Yes" : "No"}</p>
//         </div>

// {/* Buttons */}
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
//     onClick={() => navigate('/customer-home')}
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

//   {/* ✅ Edit Profile Button */}
//   <button
//     className="px-4 py-2 fw-bold"
//     style={{
//       backgroundColor: "#B8CFCE",
//       color: "#333446",
//       border: "none",
//       borderRadius: "10px",
//       transition: "0.3s",
//     }}
//     onMouseOver={(e) => (e.target.style.backgroundColor = "#7F8CAA")}
//     onMouseOut={(e) => (e.target.style.backgroundColor = "#B8CFCE")}
//     onClick={() => navigate("/edit-user-profile")}
//   >
//     Edit Profile
//   </button>
// </div>

//       </div>
//     </div>
//   );
// }

// export default UserProfile;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    // Extra safety check in case userId or token is missing
    if (!userId || !token) {
      navigate("/login");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`http://localhost:8080/user/getbyid/${userId}`, {
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

        if (!res.ok) throw new Error("Failed to fetch user profile");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user) {
    return <div className="text-center mt-5 text-white">Loading user profile...</div>;
  }

  return (
    <div
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${require("./photosvideos/snacks9.jpg")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        padding: "50px 20px",
      }}
    >
      <button
  onClick={() => navigate("/customer-home")}
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
          User Profile
        </h2>

        <div
          className="card shadow-lg p-4"
          style={{
            backgroundColor: "#EAEFEF",
            borderRadius: "20px",
            color: "#333446",
          }}
        >
          <h4 className="mb-3 fw-bold">{user.username}</h4>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phoneNumber || "Not Provided"}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Account Created:</strong> {new Date(user.createdDate).toLocaleString()}</p>
          <p><strong>Last Login:</strong> {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}</p>
          <p><strong>Email Verified:</strong> {user.emailVerified ? "Yes" : "No"}</p>
          <p><strong>Active Account:</strong> {user.isActive ? "Yes" : "No"}</p>
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

          <button
            className="px-4 py-2 fw-bold"
            style={{
              backgroundColor: "#B8CFCE",
              color: "#333446",
              border: "none",
              borderRadius: "10px",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#7F8CAA")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#B8CFCE")}
            onClick={() => navigate("/edit-user-profile")}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
