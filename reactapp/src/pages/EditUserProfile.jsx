// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function EditUserProfile() {
//   const [user, setUser] = useState(null);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     phoneNumber: "",
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     if (!userId) return;

//     fetch(`http://localhost:8080/user/getbyid/${userId}`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + localStorage.getItem("token"),
//       },
//     })
//       .then(res => {
//         if (!res.ok) throw new Error("User not found");
//         return res.json();
//       })
//       .then(data => {
//         setUser(data);
//         setFormData({
//           username: data.username || "",
//           email: data.email || "",
//           phoneNumber: data.phoneNumber || "",
//         });
//       })
//       .catch(err => console.error("Error fetching user profile:", err));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.username || !formData.email) {
//       alert("Username and Email are required!");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:8080/user/update/${user.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + localStorage.getItem("token"),
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) throw new Error("Failed to update profile");

//       const updatedUser = await response.json();
//       alert("Profile updated successfully!");
//       navigate("/my-user-profile"); // back to profile page
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       alert("Failed to update profile. Please try again.");
//     }
//   };

//   if (!user) return <div className="text-center mt-5">Loading...</div>;

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

//       {/* Form Card */}
//       <div className="container" style={{ position: "relative", zIndex: 2 }}>
//         <h2 className="mb-4 text-center fw-bold" style={{ color: "#EAEFEF" }}>
//           Edit Profile
//         </h2>

//         <form
//           className="card shadow-lg p-4"
//           style={{
//             backgroundColor: "#EAEFEF",
//             borderRadius: "20px",
//             color: "#333446",
//             maxWidth: "500px",
//             margin: "0 auto",
//           }}
//           onSubmit={handleSubmit}
//         >
//           <div className="mb-3">
//             <label className="form-label fw-bold">Username</label>
//             <input
//               type="text"
//               className="form-control"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label fw-bold">Email</label>
//             <input
//               type="email"
//               className="form-control"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label fw-bold">Phone Number</label>
//             <input
//               type="text"
//               className="form-control"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="d-flex justify-content-center gap-3 mt-4">
//             <button
//               type="submit"
//               className="px-4 py-2 fw-bold"
//               style={{
//                 backgroundColor: "#333446",
//                 color: "#EAEFEF",
//                 border: "none",
//                 borderRadius: "10px",
//               }}
//             >
//               Save Changes
//             </button>

//             <button
//               type="button"
//               className="px-4 py-2 fw-bold"
//               style={{
//                 backgroundColor: "#7F8CAA",
//                 color: "#EAEFEF",
//                 border: "none",
//                 borderRadius: "10px",
//               }}
//               onClick={() => navigate("/my-user-profile")}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EditUserProfile;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditUserProfile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId || !token) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:8080/user/getbyid/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            alert("Session expired. Please login again.");
            localStorage.removeItem("token");
            navigate("/login");
          }
          throw new Error("User not found");
        }

        const data = await res.json();
        setUser(data);
        setFormData({
          username: data.username || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
        });
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUser();
  }, [userId, token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email) {
      alert("Username and Email are required!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/user/update/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      await res.json();
      alert("Profile updated successfully!");
      navigate("/my-user-profile");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (!user) return <div className="text-center mt-5">Loading...</div>;

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
            Edit Profile
          </h2>

          <form
            className="card shadow-lg p-4"
            style={{
              backgroundColor: "#EAEFEF",
              borderRadius: "20px",
              color: "#333446",
              maxWidth: "500px",
              margin: "0 auto",
            }}
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <label className="form-label fw-bold">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Phone Number</label>
              <input
                type="text"
                className="form-control"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button
                type="submit"
                className="px-4 py-2 fw-bold"
                style={{
                  backgroundColor: "#333446",
                  color: "#EAEFEF",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                Save Changes
              </button>

              <button
                type="button"
                className="px-4 py-2 fw-bold"
                style={{
                  backgroundColor: "#7F8CAA",
                  color: "#EAEFEF",
                  border: "none",
                  borderRadius: "10px",
                }}
                onClick={() => navigate("/my-user-profile")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}

export default EditUserProfile;
