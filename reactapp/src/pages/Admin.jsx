// // import React from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { Container, Navbar, Nav } from "react-bootstrap";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import { FaUserCircle } from "react-icons/fa";
// // import logo from "./photosvideos/icon.png";

// // const Admin = () => {
// //   const navigate = useNavigate();

// //   const features = [
// //     { title: "Vendor Management", desc: "Approve, reject, suspend vendors",det:"Manage Vendor", link: "/admin-vendor" },
// //     { title: "Product Management", desc: "Approve/reject products & QC",det:"Manage Product", link: "/admin-product" },
// //     { title: "Reports & Analytics", desc: "Sales & vendor performance reports",det:"View Analysis", link: "/admin-reports" },
// //     { title: "System Configuration", desc: "Update system settings",det:"Manage System", link: "/admin-system" },
// //     { title: "Marketing Campaigns", desc: "Manage campaigns",det:"Manage Campaigns", link: "/admin-camp" },
// //     { title: "User Management", desc: "Manage users", det:"Manage User",link: "/admin-user" },
// //     { title: "Send Notification", desc: "Send messages to users", det:"Send Notification",link: "/admin-notification" },
// //     { title: "All Notifications", desc: "View all notifications", det:"View Notifications",link: "/admin-allnotification" },
// //     { title: "View Vegan Snacks", desc: "See all vegan snack products",det:"View VenganSnacks", link: "/admin-vegan-snacks" },
// //     { title: "Inventory Management", desc: "Manage product inventory",det:"Manage Inventory", link: "/admin-inventory" },
// //     { title: "Certificates", desc: "View and manage certifications", det:"Manage Certificates",link: "/admin-certificates" },
// //     { title: "Feedback", desc: "View customer feedback",det:"Manage Feedback",link: "/admin-feedback" },
// //     { title: "Orders", desc: "View all customer orders", det:"Manage Orders",link: "/admin-orders" },
// //     { title: "Vendors", desc: "View all registered vendors",det:"Manage Vendors", link: "/admin-vendors" },
// //   ];

// //   return (
// //     <div className="admin-home">
// //       {/* Navbar */}
// //       <Navbar expand="lg" style={{ backgroundColor: "#333446" }} variant="dark" sticky="top">
// //         <Container>
// //           <Navbar.Brand href="/" style={{ fontWeight: "bold", fontSize: "1.8rem" }}>
// //             <img
// //               src={logo}
// //               alt="VeganVibe Logo"
// //               style={{ width: "60px", height: "60px", marginRight: "12px", borderRadius: "50%", border: "2px solid white" }}
// //             />
// //             VeganVibe
// //           </Navbar.Brand>
// //           <Navbar.Toggle aria-controls="navbar-nav" />
// //           <Navbar.Collapse id="navbar-nav">
// //             <Nav className="ms-auto align-items-center">
// //               {/* <Link to="/admin-profile" className="nav-link text-white me-3">
// //                 <FaUserCircle size={32} />
// //               </Link> */}
// //             </Nav>
// //           </Navbar.Collapse>
// //         </Container>
// //       </Navbar>

// //       {/* Welcome Section */}
// //       <section
// //         className="text-center d-flex flex-column justify-content-center text-white"
// //         style={{
// //           minHeight: "60vh",
// //           padding: "60px 20px",
// //           backgroundImage: `url(${require("./photosvideos/snacks9.jpg")})`,
// //           backgroundSize: "cover",
// //           backgroundPosition: "center",
// //           backgroundRepeat: "no-repeat",
// //           position: "relative",
// //         }}
// //       >
// //         <div
// //           style={{
// //             position: "absolute",
// //             top: 0,
// //             left: 0,
// //             width: "100%",
// //             height: "100%",
// //             backgroundColor: "rgba(0, 0, 0, 0.5)",
// //             zIndex: 1,
// //           }}
// //         ></div>
// //         <div style={{ position: "relative", zIndex: 2 }}>
// //           <h1 className="display-3 fw-bold mb-3">Welcome, Admin!</h1>
// //           <p className="lead fs-4 w-75 mx-auto">
// //             Manage vendors, products, campaigns, and view reports with ease. Your admin dashboard gives you full control over the VeganVibe ecosystem.
// //           </p>
// //         </div>
// //       </section>

// //       {/* Features Section */}
// //       <section className="container my-5 py-5">
// //         <h2 className="text-center mb-5 fw-bold">Admin Functionalities</h2>
// //         <div className="row g-4">
// //           {features.map((feature, idx) => (
// //             <div className="col-md-4" key={idx}>
// //               <FeatureCard feature={feature} />
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* Footer */}
// //       <Footer />

// //       {/* Optional inline CSS */}
// //       <style>{`
// //         .feature-card {
// //           min-height: 220px;
// //           transition: 0.3s;
// //         }
// //         .feature-card:hover {
// //           transform: translateY(-5px);
// //           box-shadow: 0 8px 20px rgba(0,0,0,0.15);
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // // Feature Card Component
// // function FeatureCard({ feature }) {
// //   return (
// //     <div className="card shadow-lg p-4 text-center feature-card">
// //       <h4 className="fw-bold mb-3">{feature.title}</h4>
// //       <p className="flex-grow-1 fs-6">{feature.desc}</p>
// //       <Link to={feature.link} className="btn mt-3" style={{ backgroundColor: "#7F8CAA", color: "#fff" }}>
// //         {feature.det}
// //       </Link>
// //     </div>
// //   );
// // }

// // // Footer Component
// // function Footer() {
// //   return (
// //     <footer className="text-center py-4 mt-5" style={{ backgroundColor: "#333446", color: "#fff" }}>
// //       <p className="mb-0 fs-6">© 2025 Vegan Snacks. All rights reserved.</p>
// //     </footer>
// //   );
// // }

// // export default Admin;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Container, Navbar, Nav } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { motion } from "framer-motion";
// import logo from "./photosvideos/icon.png";

// const Admin = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const features = [
//     { title: "Vendor Management", desc: "Approve, reject, suspend vendors", det: "Manage Vendor", link: "/admin-vendor" },
//     { title: "Product Management", desc: "Approve/reject products & QC", det: "Manage Product", link: "/admin-product" },
//     { title: "Reports & Analytics", desc: "Sales & vendor performance reports", det: "View Analysis", link: "/admin-reports" },
//     { title: "System Configuration", desc: "Update system settings", det: "Manage System", link: "/admin-system" },
//     { title: "Marketing Campaigns", desc: "Manage campaigns", det: "Manage Campaigns", link: "/admin-camp" },
//     { title: "User Management", desc: "Manage users", det: "Manage User", link: "/admin-user" },
//     { title: "Send Notification", desc: "Send messages to users", det: "Send Notification", link: "/admin-notification" },
//     { title: "All Notifications", desc: "View all notifications", det: "View Notifications", link: "/admin-allnotification" },
//     { title: "View Vegan Snacks", desc: "See all vegan snack products", det: "View VeganSnacks", link: "/admin-vegan-snacks" },
//     { title: "Inventory Management", desc: "Manage product inventory", det: "View Inventory", link: "/admin-inventory" },
//     { title: "Certificates", desc: "View and manage certifications", det: "View Certificates", link: "/admin-certificates" },
//     { title: "Feedback", desc: "View customer feedback", det: "View Feedback", link: "/admin-feedback" },
//     { title: "Orders", desc: "View all customer orders", det: "View Orders", link: "/admin-orders" },
//     { title: "Vendors", desc: "View all registered vendors", det: "View Vendors", link: "/admin-vendors" },
//   ];

//   return (
//     <div className="admin-home">
//       {/* Navbar */}
//       <Navbar expand="lg" style={{ backgroundColor: "#333446" }} variant="dark" sticky="top">
//         <Container>
//           <Navbar.Brand href="/" style={{ fontWeight: "bold", fontSize: "1.8rem" }}>
//             <img
//               src={logo}
//               alt="VeganVibe Logo"
//               style={{
//                 width: "60px",
//                 height: "60px",
//                 marginRight: "12px",
//                 borderRadius: "50%",
//                 border: "2px solid white",
//               }}
//             />
//             VeganVibe
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbar-nav" />
//           <Navbar.Collapse id="navbar-nav">
//             <Nav className="ms-auto align-items-center">
//               {/* Sidebar Toggle Button */}
//               <button
//                 className="btn text-white"
//                 onClick={() => setSidebarOpen(true)}
//                 style={{
//                   fontSize: "1.5rem",
//                   background: "transparent",
//                   border: "none",
//                 }}
//               >
//                 ☰
//               </button>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       {/* Sidebar */}
//       <div
//         className={`sidebar ${sidebarOpen ? "open" : ""}`}
//         style={{
//           position: "fixed",
//           top: 0,
//           right: sidebarOpen ? 0 : "-300px",
//           height: "100%",
//           width: "300px",
//           backgroundColor: "#7F8CAA", // sidebar background
//           color: "#fff",
//           transition: "right 0.3s ease-in-out",
//           zIndex: 2000,
//           padding: "20px",
//           overflowY: "auto",
//         }}
//       >
//         {/* Close Button */}
//         <button
//           className="btn text-white"
//           onClick={() => setSidebarOpen(false)}
//           style={{
//             fontSize: "1.5rem",
//             background: "transparent",
//             border: "none",
//             position: "absolute",
//             top: "15px",
//             left: "15px",
//           }}
//         >
//           ×
//         </button>

//         <h3 className="fw-bold mb-4 text-center">Admin Menu</h3>
//         <ul className="list-unstyled">
//           {features.map((feature, idx) => (
//             <li key={idx} className="mb-3">
//               <Link
//                 to={feature.link}
//                 className="d-block px-3 py-2"
//                 style={{
//                   textDecoration: "none",
//                   color: "#fff",
//                   backgroundColor: "#465270",
//                   borderRadius: "10px",
//                 }}
//                 onClick={() => setSidebarOpen(false)}
//               >
//                 {feature.det}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Welcome Section */}
//       <section
//         className="text-center d-flex flex-column justify-content-center text-white"
//         style={{
//           minHeight: "60vh",
//           padding: "60px 20px",
//           backgroundImage: `url(${require("./photosvideos/snacks9.jpg")})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           position: "relative",
//         }}
//       >
//         <div
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0, 0, 0, 0.55)",
//             zIndex: 1,
//           }}
//         ></div>
//         <div style={{ position: "relative", zIndex: 2 }}>
//           <h1 className="display-3 fw-bold mb-3">Welcome, Admin!</h1>
//           <p className="lead fs-4 w-75 mx-auto">
//             Manage vendors, products, campaigns, and reports. Your dashboard gives you complete control over VeganVibe.
//           </p>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="container my-5 py-5">
//         <h2 className="text-center mb-5 fw-bold">Admin Functionalities</h2>
//         <div className="row g-4">
//           {features.map((feature, idx) => (
//             <motion.div
//               className="col-md-4"
//               key={idx}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.97 }}
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: idx * 0.1 }}
//             >
//               <FeatureCard feature={feature} />
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// // Feature Card Component
// function FeatureCard({ feature }) {
//   return (
//     <div
//       className="card shadow-lg p-4 text-center h-100"
//       style={{ borderRadius: "20px", backgroundColor: "#f8f9fa" }}
//     >
//       <h4 className="fw-bold mb-3">{feature.title}</h4>
//       <p className="flex-grow-1 fs-6 text-muted">{feature.desc}</p>
//       <Link
//         to={feature.link}
//         className="btn mt-3 px-4 py-2"
//         style={{
//           backgroundColor: "#7F8CAA",
//           color: "#fff",
//           borderRadius: "30px",
//           fontWeight: "500",
//         }}
//       >
//         {feature.det}
//       </Link>
//     </div>
//   );
// }

// // Footer Component
// function Footer() {
//   return (
//     <footer className="text-center py-4 mt-5" style={{ backgroundColor: "#333446", color: "#fff" }}>
//       <p className="mb-0 fs-6">© 2025 Vegan Snacks. All rights reserved.</p>
//     </footer>
//   );
// }

// export default Admin;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import logo from "./photosvideos/icon.png";
import { FaUserCircle, FaSignOutAlt, FaHome } from "react-icons/fa"; // ✅ icons

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token
    navigate("/login"); // redirect
  };

  const features = [
    { title: "Vendor Management", desc: "Approve, reject, suspend vendors", det: "Manage Vendor", link: "/admin-vendor" },
    { title: "Product Management", desc: "Approve/reject products & QC", det: "Manage Product", link: "/admin-product" },
    { title: "Reports & Analytics", desc: "Sales & vendor performance reports", det: "View Analysis", link: "/admin-reports" },
    { title: "System Configuration", desc: "Update system settings", det: "Manage System", link: "/admin-system" },
    { title: "Marketing Campaigns", desc: "Manage campaigns", det: "Manage Campaigns", link: "/admin-camp" },
    { title: "User Management", desc: "Manage users", det: "Manage User", link: "/admin-user" },
    { title: "Send Notification", desc: "Send messages to users", det: "Send Notification", link: "/admin-notification" },
    { title: "All Notifications", desc: "View all notifications", det: "View Notifications", link: "/admin-allnotification" },
    { title: "View Vegan Snacks", desc: "See all vegan snack products", det: "View VeganSnacks", link: "/admin-vegan-snacks" },
    { title: "Inventory Management", desc: "Manage product inventory", det: "View Inventory", link: "/admin-inventory" },
    { title: "Certificates", desc: "View and manage certifications", det: "View Certificates", link: "/admin-certificates" },
    { title: "Feedback", desc: "View customer feedback", det: "View Feedback", link: "/admin-feedback" },
    { title: "Orders", desc: "View all customer orders", det: "View Orders", link: "/admin-orders" },
    { title: "Vendors", desc: "View all registered vendors", det: "View Vendors", link: "/admin-vendors" },
  ];

  return (
    <div className="admin-home">
      {/* Navbar */}
      <Navbar expand="lg" style={{ backgroundColor: "#333446" }} variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/" style={{ fontWeight: "bold", fontSize: "1.8rem" }}>
            <img
              src={logo}
              alt="VeganVibe Logo"
              style={{
                width: "60px",
                height: "60px",
                marginRight: "12px",
                borderRadius: "50%",
                border: "2px solid white",
              }}
            />
            VeganVibe
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto align-items-center gap-3">
              {/* Profile Icon */}
              <Link to="/admin-profile" className="text-white fs-4">
                <FaUserCircle />
              </Link>

              {/* Sidebar Toggle */}
              <button
                className="btn text-white"
                onClick={() => setSidebarOpen(true)}
                style={{
                  fontSize: "1.5rem",
                  background: "transparent",
                  border: "none",
                }}
              >
                ☰
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Sidebar */}
      <div
        className={`sidebar ${sidebarOpen ? "open" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          right: sidebarOpen ? 0 : "-300px",
          height: "100%",
          width: "300px",
          backgroundColor: "#7F8CAA",
          color: "#fff",
          transition: "right 0.3s ease-in-out",
          zIndex: 2000,
          padding: "20px",
          overflowY: "auto",
        }}
      >
        {/* Close Button */}
        <button
          className="btn text-white"
          onClick={() => setSidebarOpen(false)}
          style={{
            fontSize: "1.5rem",
            background: "transparent",
            border: "none",
            position: "absolute",
            top: "15px",
            left: "15px",
          }}
        >
          ×
        </button>

        <h3 className="fw-bold mb-4 text-center">Admin Menu</h3>
        <ul className="list-unstyled">
          {features.map((feature, idx) => (
            <li key={idx} className="mb-3">
              <Link
                to={feature.link}
                className="d-block px-3 py-2"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  backgroundColor: "#465270",
                  borderRadius: "10px",
                }}
                onClick={() => setSidebarOpen(false)}
              >
                {feature.det}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Welcome Section */}
      <section
        className="text-center d-flex flex-column justify-content-center text-white"
        style={{
          minHeight: "60vh",
          padding: "60px 20px",
          backgroundImage: `url(${require("./photosvideos/snacks9.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.55)",
            zIndex: 1,
          }}
        ></div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 className="display-3 fw-bold mb-3">Welcome, Admin!</h1>
          <p className="lead fs-4 w-75 mx-auto">
            Manage vendors, products, campaigns, and reports. Your dashboard gives you complete control over VeganVibe.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container my-5 py-5">
        <h2 className="text-center mb-5 fw-bold">Admin Functionalities</h2>
        <div className="row g-4">
          {features.map((feature, idx) => (
            <motion.div
              className="col-md-4"
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <FeatureCard feature={feature} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Feature Card
function FeatureCard({ feature }) {
  return (
    <div
      className="card shadow-lg p-4 text-center h-100"
      style={{ borderRadius: "20px", backgroundColor: "#f8f9fa" }}
    >
      <h4 className="fw-bold mb-3">{feature.title}</h4>
      <p className="flex-grow-1 fs-6 text-muted">{feature.desc}</p>
      <Link
        to={feature.link}
        className="btn mt-3 px-4 py-2"
        style={{
          backgroundColor: "#7F8CAA",
          color: "#fff",
          borderRadius: "30px",
          fontWeight: "500",
        }}
      >
        {feature.det}
      </Link>
    </div>
  );
}

// Footer
function Footer() {
  return (
    <footer className="text-center py-4 mt-5" style={{ backgroundColor: "#333446", color: "#fff" }}>
      <p className="mb-0 fs-6">© 2025 Vegan Snacks. All rights reserved.</p>
    </footer>
  );
}

export default Admin;
