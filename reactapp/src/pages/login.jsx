// // // import React, { useState } from "react";
// // // import { useNavigate, Link } from "react-router-dom";
// // // import "bootstrap/dist/css/bootstrap.min.css";
// // // import loginBg from "./photosvideos/snacks6.jpg"; // background image

// // // function Login() {
// // //   const [formData, setFormData] = useState({
// // //     username: "",
// // //     password: "",
// // //     role: "CUSTOMER",
// // //   });

// // //   const [errors, setErrors] = useState({});
// // //   const navigate = useNavigate();

// // //   const handleChange = (e) => {
// // //     setFormData({ ...formData, [e.target.name]: e.target.value });
// // //     setErrors({ ...errors, [e.target.name]: "" });
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     let newErrors = {};
// // //     if (!formData.username.trim()) newErrors.username = "Username is required";
// // //     if (!formData.password.trim()) newErrors.password = "Password is required";
// // //     if (!formData.role) newErrors.role = "Please select a role";

// // //     if (Object.keys(newErrors).length > 0) {
// // //       setErrors(newErrors);
// // //       return;
// // //     }

// // //     const payload = {
// // //       username: formData.username,
// // //       password_hash: formData.password,
// // //       role: formData.role,
// // //     };

// // //     try {
// // //       const response = await fetch("http://localhost:8080/user/login", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify(payload),
// // //       });

// // //       const contentType = response.headers.get("content-type");
// // //       let data;

// // //       if (contentType && contentType.includes("application/json")) {
// // //         data = await response.json();
// // //       } else {
// // //         data = await response.text();
// // //       }

// // //       if (response.ok) {
// // //         if (data && data.username && data.role) {
// // //           localStorage.setItem("token", data.token || "");
// // //           localStorage.setItem("role", data.role);
// // //           localStorage.setItem("userId", data.id);
// // //           localStorage.setItem("vendorId", data.vendorId || "");


// // //           if (data.role === "VENDOR") {
// // //             if (!data.vendorId) {
// // //               navigate("/vendor-details", { state: { userId: data.id } });
// // //             } else {
// // //               navigate("/vendor-home", {
// // //                 state: { userId: data.id, vendorId: data.vendorId },
// // //               });
// // //             }
// // //           } else if (data.role === "CUSTOMER") {
// // //             navigate("/customer-home", { state: { userId: data.id } });
// // //           }
// // //         } else {
// // //           setErrors({
// // //             general:
// // //               typeof data === "string"
// // //                 ? data
// // //                 : "Invalid credentials or role",
// // //           });
// // //         }
// // //       } else {
// // //         setErrors({
// // //           general:
// // //             typeof data === "string"
// // //               ? data
// // //               : data.message || "Invalid username, password, or role",
// // //         });
// // //       }
// // //     } catch (err) {
// // //       console.error("Error:", err);
// // //       setErrors({ general: "Server error. Please try again later." });
// // //     }
// // //   };

// // //   return (
// // //     <div
// // //       className="d-flex align-items-center justify-content-center vh-100"
// // //       style={{
// // //         backgroundImage: `url(${loginBg})`,
// // //         backgroundSize: "cover",
// // //         backgroundPosition: "center",
// // //       }}
// // //     >
// // //       <div
// // //         className="p-5 rounded shadow-lg"
// // //         style={{
// // //           width: "100%",
// // //           maxWidth: "450px",
// // //           backgroundColor: "rgba(255,255,255,0.9)",
// // //         }}
// // //       >
// // //         <h2 className="mb-4 text-center" style={{ color: "#333446" }}>
// // //           Login
// // //         </h2>
// // //         <form onSubmit={handleSubmit}>
// // //           {/* Username */}
// // //           <div className="mb-3">
// // //             <label className="form-label">Username</label>
// // //             <input
// // //               type="text"
// // //               className={`form-control ${errors.username ? "is-invalid" : ""}`}
// // //               name="username"
// // //               value={formData.username}
// // //               onChange={handleChange}
// // //             />
// // //             {errors.username && (
// // //               <div className="invalid-feedback">{errors.username}</div>
// // //             )}
// // //           </div>

// // //           {/* Password */}
// // //           <div className="mb-3">
// // //             <label className="form-label">Password</label>
// // //             <input
// // //               type="password"
// // //               className={`form-control ${errors.password ? "is-invalid" : ""}`}
// // //               name="password"
// // //               value={formData.password}
// // //               onChange={handleChange}
// // //             />
// // //             {errors.password && (
// // //               <div className="invalid-feedback">{errors.password}</div>
// // //             )}
// // //           </div>

// // //           {/* Role */}
// // //           <div className="mb-3">
// // //             <label className="form-label">Role</label>
// // //             <select
// // //               className={`form-select ${errors.role ? "is-invalid" : ""}`}
// // //               name="role"
// // //               value={formData.role}
// // //               onChange={handleChange}
// // //             >
// // //               <option value="CUSTOMER">Customer</option>
// // //               <option value="VENDOR">Vendor</option>
// // //             </select>
// // //             {errors.role && (
// // //               <div className="invalid-feedback">{errors.role}</div>
// // //             )}
// // //           </div>

// // //           {/* General error */}
// // //           {errors.general && (
// // //             <div className="alert alert-danger py-2">{errors.general}</div>
// // //           )}

// // //           {/* Submit */}
// // //           <button
// // //             type="submit"
// // //             className="btn w-100 mb-3"
// // //             style={{ backgroundColor: "#7F8CAA", color: "#fff" }}
// // //           >
// // //             Login
// // //           </button>
// // //         </form>

// // //         {/* Register link */}
// // //         <p className="text-center mt-3">
// // //           New Account?{" "}
// // //           <Link to="/signup" style={{ color: "#333446", fontWeight: "bold" }}>
// // //             Register here
// // //           </Link>
// // //         </p>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default Login;
// // import React, { useState } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import loginBg from "./photosvideos/snacks6.jpg"; // background image

// // function Login() {
// //   const [formData, setFormData] = useState({
// //     username: "",
// //     password: "",
// //     role: "CUSTOMER",
// //   });

// //   const [errors, setErrors] = useState({});
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //     setErrors({ ...errors, [e.target.name]: "" });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     // Basic form validation
// //     const newErrors = {};
// //     if (!formData.username.trim()) newErrors.username = "Username is required";
// //     if (!formData.password.trim()) newErrors.password = "Password is required";
// //     if (!formData.role) newErrors.role = "Please select a role";

// //     if (Object.keys(newErrors).length > 0) {
// //       setErrors(newErrors);
// //       return;
// //     }

// //     const payload = {
// //       username: formData.username,
// //       password_hash: formData.password,
// //       role: formData.role,
// //     };

// //     try {
// //       const response = await fetch("http://localhost:8080/user/login", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload), 
// //       });

// //       // const data = await response.json();
// //       let data;
// // try {
// //   data = await response.json();
// // } catch (err) {
// //   data = { error: "Invalid server response" };
// // }

// //       if (response.ok) {
// //         // Store JWT token and user info
// //         localStorage.setItem("token", data.token);
// //         console.log(data.token);
// //         localStorage.setItem("role", data.role);
// //         localStorage.setItem("userId", data.id);
// //         localStorage.setItem("vendorId", data.vendorId || "");

// //         // Navigate based on role
// //         if (data.role === "VENDOR") {
// //           if (!data.vendorId) {
// //             navigate("/vendor-details", { state: { userId: data.id } });
// //           } else {
// //             navigate("/vendor-home", { state: { userId: data.id, vendorId: data.vendorId } });
// //           }
// //         } else if (data.role === "CUSTOMER") {
// //           navigate("/customer-home", { state: { userId: data.id } });
// //         }
        
// //       } else {
// //         // Show backend error message
// //         setErrors({ general: data.message || "Invalid username, password, or role" });
// //       }
// //     } catch (err) {
// //       console.error("Error:", err);
// //       setErrors({ general: "Server error. Please try again later." });
// //     }
// //   };

// //   return (
// //     <div
// //       className="d-flex align-items-center justify-content-center vh-100"
// //       style={{
// //         backgroundImage: `url(${loginBg})`,
// //         backgroundSize: "cover",
// //         backgroundPosition: "center",
// //       }}
// //     >
// //       <div
// //         className="p-5 rounded shadow-lg"
// //         style={{
// //           width: "100%",
// //           maxWidth: "450px",
// //           backgroundColor: "rgba(255,255,255,0.9)",
// //         }}
// //       >
// //         <h2 className="mb-4 text-center" style={{ color: "#333446" }}>
// //           Login
// //         </h2>
// //         <form onSubmit={handleSubmit}>
// //           {/* Username */}
// //           <div className="mb-3">
// //             <label className="form-label">Username</label>
// //             <input
// //               type="text"
// //               className={`form-control ${errors.username ? "is-invalid" : ""}`}
// //               name="username"
// //               value={formData.username}
// //               onChange={handleChange}
// //             />
// //             {errors.username && <div className="invalid-feedback">{errors.username}</div>}
// //           </div>

// //           {/* Password */}
// //           <div className="mb-3">
// //             <label className="form-label">Password</label>
// //             <input
// //               type="password"
// //               className={`form-control ${errors.password ? "is-invalid" : ""}`}
// //               name="password"
// //               value={formData.password}
// //               onChange={handleChange}
// //             />
// //             {errors.password && <div className="invalid-feedback">{errors.password}</div>}
// //           </div>

// //           {/* Role */}
// //           <div className="mb-3">
// //             <label className="form-label">Role</label>
// //             <select
// //               className={`form-select ${errors.role ? "is-invalid" : ""}`}
// //               name="role"
// //               value={formData.role}
// //               onChange={handleChange}
// //             >
// //               <option value="CUSTOMER">Customer</option>
// //               <option value="VENDOR">Vendor</option>
// //             </select>
// //             {errors.role && <div className="invalid-feedback">{errors.role}</div>}
// //           </div>

// //           {/* General error */}
// //           {errors.general && <div className="alert alert-danger py-2">{errors.general}</div>}

// //           {/* Submit */}
// //           <button
// //             type="submit"
// //             className="btn w-100 mb-3"
// //             style={{ backgroundColor: "#7F8CAA", color: "#fff" }}
// //           >
// //             Login
// //           </button>
// //         </form>

// //         {/* Register link */}
// //         <p className="text-center mt-3">
// //           New Account?{" "}
// //           <Link to="/signup" style={{ color: "#333446", fontWeight: "bold" }}>
// //             Register here
// //           </Link>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;

// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import loginBg from "./photosvideos/snacks6.jpg"; // background image

// function Login() {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     role: "CUSTOMER",
//   });

//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic form validation
//     const newErrors = {};
//     if (!formData.username.trim()) newErrors.username = "Username is required";
//     if (!formData.password.trim()) newErrors.password = "Password is required";
//     if (!formData.role) newErrors.role = "Please select a role";

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     const payload = {
//       username: formData.username,
//       password_hash: formData.password,
//       role: formData.role,
//     };

//     try {
//       const response = await fetch("http://localhost:8080/user/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload), 
//       });

//       // const data = await response.json();
//       let data;
// try {
//   data = await response.json();
// } catch (err) {
//   data = { error: "Invalid server response" };
// }

//       if (response.ok) {
//         // Store JWT token and user info
//         localStorage.setItem("token", data.token);
//         console.log(data.token);
//         localStorage.setItem("role", data.role);
//         localStorage.setItem("userId", data.id);
//         localStorage.setItem("vendorId", data.vendorId || "");

//         // Navigate based on role
//         if (data.role === "VENDOR") {
//           if (!data.vendorId) {
//             navigate("/vendor-details", { state: { userId: data.id } });
//           } else {
//             navigate("/vendor-home", { state: { userId: data.id, vendorId: data.vendorId } });
//           }
//         } else if (data.role === "CUSTOMER") {
//           navigate("/customer-home", { state: { userId: data.id } });
//         }
//         else if (data.role === "ADMIN") {
//           navigate("/admin", { state: { userId: data.id } });
//         }
        
//       } else {
//         // Show backend error message
//         setErrors({ general: data.message || "Invalid username, password, or role" });
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       setErrors({ general: "Server error. Please try again later." });
//     }
//   };

//   return (
//     <div
//       className="d-flex align-items-center justify-content-center vh-100"
//       style={{
//         backgroundImage: `url(${loginBg})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div
//         className="p-5 rounded shadow-lg"
//         style={{
//           width: "100%",
//           maxWidth: "450px",
//           backgroundColor: "rgba(255,255,255,0.9)",
//         }}
//       >
//         <h2 className="mb-4 text-center" style={{ color: "#333446" }}>
//           Login
//         </h2>
//         <form onSubmit={handleSubmit}>
//           {/* Username */}
//           <div className="mb-3">
//             <label className="form-label">Username</label>
//             <input
//               type="text"
//               className={`form-control ${errors.username ? "is-invalid" : ""}`}
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//             />
//             {errors.username && <div className="invalid-feedback">{errors.username}</div>}
//           </div>

//           {/* Password */}
//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               className={`form-control ${errors.password ? "is-invalid" : ""}`}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//             />
//             {errors.password && <div className="invalid-feedback">{errors.password}</div>}
//           </div>

//           {/* Role */}
//           <div className="mb-3">
//             <label className="form-label">Role</label>
//             <select
//               className={`form-select ${errors.role ? "is-invalid" : ""}`}
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//             >
//               <option value="CUSTOMER">Customer</option>
//               <option value="VENDOR">Vendor</option>
//               <option value="ADMIN">Admin</option>
//             </select>
//             {errors.role && <div className="invalid-feedback">{errors.role}</div>}
//           </div>

//           {/* General error */}
//           {errors.general && <div className="alert alert-danger py-2">{errors.general}</div>}

//           {/* Submit */}
//           <button
//             type="submit"
//             className="btn w-100 mb-3"
//             style={{ backgroundColor: "#7F8CAA", color: "#fff" }}
//           >
//             Login
//           </button>
//         </form>

//         {/* Register link */}
//         <p className="text-center mt-3">
//           New Account?{" "}
//           <Link to="/signup" style={{ color: "#333446", fontWeight: "bold" }}>
//             Register here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import loginBg from "./photosvideos/snacks6.jpg"; // background image

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "CUSTOMER",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.role) newErrors.role = "Please select a role";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      username: formData.username,
      password_hash: formData.password,
      role: formData.role,
    };

    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), 
      });
      let data;
      try {
     data = await response.json();
      } catch (err) {
     data = { error: "Invalid server response" };
    }
      if (response.ok) {
        localStorage.setItem("token", data.token);
        console.log(data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("vendorId", data.vendorId || ""); 
        if (data.role === "VENDOR") {
          if (!data.vendorId) {
            navigate("/vendor-details", { state: { userId: data.id } });
          } else {
            navigate("/vendor-home", { state: { userId: data.id, vendorId: data.vendorId } });
          }
        } else if (data.role === "CUSTOMER") {
          navigate("/customer-home", { state: { userId: data.id } });
        }
        else if (data.role === "ADMIN") {
          navigate("/admin", { state: { userId: data.id } });
        }
        else if (data.role === "PRODUCT_MANAGER") {
          navigate("/product-manager-home", { state: { userId: data.id } });
        }
      } else {
        setErrors({ general: data.message || "Invalid username, password, or role" });
      }
    } catch (err) {
      console.error("Error:", err);
      setErrors({ general: "Server error. Please try again later." });
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="p-5 rounded shadow-lg"
        style={{
          width: "100%",
          maxWidth: "450px",
          backgroundColor: "rgba(255,255,255,0.9)",
        }}
      >
        <h2 className="mb-4 text-center" style={{ color: "#333446" }}>
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          {/* Role */}
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              className={`form-select ${errors.role ? "is-invalid" : ""}`}
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="CUSTOMER">Customer</option>
              <option value="VENDOR">Vendor</option>
              <option value="PRODUCT_MANAGER">Product Manager</option>
              <option value="ADMIN">Admin</option>
            </select>
            {errors.role && <div className="invalid-feedback">{errors.role}</div>}
          </div>

          {/* General error */}
          {errors.general && <div className="alert alert-danger py-2">{errors.general}</div>}

          {/* Submit */}
          <button
            type="submit"
            className="btn w-100 mb-3"
            style={{ backgroundColor: "#7F8CAA", color: "#fff" }}
          >
            Login
          </button>
        </form>

        {/* Register link */}
        <p className="text-center mt-3">
          New Account?{" "}
          <Link to="/signup" style={{ color: "#333446", fontWeight: "bold" }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

