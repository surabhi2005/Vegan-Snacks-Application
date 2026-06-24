// // import React, { useState } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import bgImage from "./photosvideos/snacks8.jpg"; // <-- add your background image inside src/assets

// // function Register() {
// //   const [formData, setFormData] = useState({
// //     username: "",
// //     email: "",
// //     phoneNumber: "",
// //     password: "",
// //     role: "CUSTOMER",
// //   });
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const payload = {
// //       username: formData.username,
// //       email: formData.email,
// //       phoneNumber: formData.phoneNumber,
// //       password_hash: formData.password,
// //       role: formData.role,
// //     };

// //     try {
// //       const response = await fetch("http://localhost:8080/user/signup", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });

// //       if (response.ok) {
// //         navigate("/login");
// //       } else {
// //         alert("Registration failed");
// //       }
// //     } catch (err) {
// //       console.error("Error:", err);
// //     }
// //   };

// //   return (
// //     <div
// //       className="d-flex justify-content-center align-items-center vh-100"
// //       style={{
// //         backgroundImage: `url(${bgImage})`,
// //         backgroundSize: "cover",
// //         backgroundPosition: "center",
// //       }}
// //     >
// //       <div className="card p-4 shadow" style={{ width: "400px", background: "rgba(255,255,255,0.9)" }}>
// //         <h2 className="mb-4 text-center">Register</h2>
// //         <form onSubmit={handleSubmit}>
// //           <div className="mb-3">
// //             <label className="form-label">Username</label>
// //             <input
// //               type="text"
// //               className="form-control"
// //               name="username"
// //               value={formData.username}
// //               onChange={handleChange}
// //               required
// //             />
// //           </div>

// //           <div className="mb-3">
// //             <label className="form-label">Email</label>
// //             <input
// //               type="email"
// //               className="form-control"
// //               name="email"
// //               value={formData.email}
// //               onChange={handleChange}
// //               required
// //             />
// //           </div>

// //           <div className="mb-3">
// //             <label className="form-label">Phone Number</label>
// //             <input
// //               type="text"
// //               className="form-control"
// //               name="phoneNumber"
// //               value={formData.phoneNumber}
// //               onChange={handleChange}
// //             />
// //           </div>

// //           <div className="mb-3">
// //             <label className="form-label">Password</label>
// //             <input
// //               type="password"
// //               className="form-control"
// //               name="password"
// //               value={formData.password}
// //               onChange={handleChange}
// //               required
// //             />
// //           </div>

// //           <div className="mb-3">
// //             <label className="form-label">Role</label>
// //             <select
// //               className="form-select"
// //               name="role"
// //               value={formData.role}
// //               onChange={handleChange}
// //             >
// //               <option value="CUSTOMER">Customer</option>
// //               <option value="VENDOR">Vendor</option>
// //             </select>
// //           </div>

// //           <button type="submit" className="btn btn-primary w-100 mb-3" style={{ backgroundColor: "#7F8CAA", color: "#fff" }}>
// //             Register
// //           </button>

// //           <p className="text-center">
// //             Already have an account?{" "}
// //             <Link to="/login" className="text-decoration-none" style={{ color: "#333446", fontWeight: "bold" }}>
// //               Login here
// //             </Link>
// //           </p>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Register;
// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import bgImage from "./photosvideos/snacks8.jpg"; // <-- add your background image inside src/assets

// function Register() {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     role: "CUSTOMER",
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       username: formData.username,
//       email: formData.email,
//       phoneNumber: formData.phoneNumber,
//       password_hash: formData.password,
//       role: formData.role,
//     };

//     try {
//       const response = await fetch("http://localhost:8080/user/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         navigate("/login");
//       } else {
//         alert("Registration failed");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//     }
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center vh-100"
//       style={{
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="card p-4 shadow" style={{ width: "400px", background: "rgba(255,255,255,0.9)" }}>
//         <h2 className="mb-4 text-center">Register</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Username</label>
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
//             <label className="form-label">Email</label>
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
//             <label className="form-label">Phone Number</label>
//             <input
//               type="text"
//               className="form-control"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Role</label>
//             <select
//               className="form-select"
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//             >
//               <option value="CUSTOMER">Customer</option>
//               <option value="VENDOR">Vendor</option>
//               <option value="ADMIN">Admin</option>
              
//             </select>
//           </div>

//           <button type="submit" className="btn btn-primary w-100 mb-3" style={{ backgroundColor: "#7F8CAA", color: "#fff" }}>
//             Register
//           </button>

//           <p className="text-center">
//             Already have an account?{" "}
//             <Link to="/login" className="text-decoration-none" style={{ color: "#333446", fontWeight: "bold" }}>
//               Login here
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Register;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import bgImage from "./photosvideos/snacks8.jpg"; // <-- add your background image inside src/assets

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "CUSTOMER",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      username: formData.username,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password_hash: formData.password,
      role: formData.role,
    };

    try {
      const response = await fetch("http://localhost:8080/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        alert("Registration failed");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="card p-4 shadow" style={{ width: "400px", background: "rgba(255,255,255,0.9)" }}>
        <h2 className="mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
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
            <label className="form-label">Email</label>
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
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="CUSTOMER">Customer</option>
              <option value="VENDOR">Vendor</option>
              <option value="PRODUCT_MANAGER">Product Manager</option>
              <option value="ADMIN">Admin</option>
              
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3" style={{ backgroundColor: "#7F8CAA", color: "#fff" }}>
            Register
          </button>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none" style={{ color: "#333446", fontWeight: "bold" }}>
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;

