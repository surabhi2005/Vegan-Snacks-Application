// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function ProtectedRoute({ children }) {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("You must log in to access this page");
//       navigate("/login"); // redirect to login if not authenticated
//     }
//   }, [navigate]);

//   const token = localStorage.getItem("token");
//   if (!token) return null; // render nothing until check is complete

//   return children; // render protected content if token exists
// }
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role"); // role set on login

    if (!token) {
      alert("You must log in to access this page.");
      navigate("/login");
    } else if (allowedRoles.length && !allowedRoles.includes(userRole)) {
      alert("You are not authorized to view this page.");
      navigate("/"); // redirect to homepage or another safe page
    }
  }, [navigate, allowedRoles]);

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return null;
  if (allowedRoles.length && !allowedRoles.includes(userRole)) return null;

  return children;
}
