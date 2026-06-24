// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Container, Navbar, Nav } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { motion } from "framer-motion";
// import logo from "./photosvideos/icon.png";

// const ProductManagerHome = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // Product Manager features (subset of Admin)
//   const features = [
//     { title: "View Products", desc: "See all products", det: "View Products", link: "/product-manager-vegansnacks" },
//     { title: "Product Management", desc: "Approve/reject products & QC", det: "Manage Product", link: "/product-manager-product" },
//     { title: "Inventory Management", desc: "Track and update stock levels", det: "View Inventory", link: "/product-manager-inventory" },
//     { title: "Notifications", desc: "Check important alerts", det: "View Notifications", link: "/product-manager-notification" },
//     { title: "Marketing Campaigns", desc: "Manage campaigns", det: "Manage Campaigns", link: "/admin-camp" },
//     { title: "Feedback", desc: "View customer feedback", det: "View Feedback", link: "/product-manager-feedback" },
//     { title: "Reports & Analytics", desc: "Sales & vendor performance reports", det: "View Analysis", link: "/product-manager-report" },
//     { title: "Certificates", desc: "View and manage certifications", det: "View Certificates", link: "/product-manager-certificate" }
    
//   ];

//   return (
//     <div className="pm-home">
//       {/* Navbar */}
//       <Navbar expand="lg" style={{ backgroundColor: "#2E3A59" }} variant="dark" sticky="top">
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
//           backgroundColor: "#4A5B7E",
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

//         <h3 className="fw-bold mb-4 text-center">PM Menu</h3>
//         <ul className="list-unstyled">
//           {features.map((feature, idx) => (
//             <li key={idx} className="mb-3">
//               <Link
//                 to={feature.link}
//                 className="d-block px-3 py-2"
//                 style={{
//                   textDecoration: "none",
//                   color: "#fff",
//                   backgroundColor: "#2E3A59",
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
//           backgroundImage: `url(${require("./photosvideos/snacks3.jpg")})`,
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
//           <h1 className="display-3 fw-bold mb-3">Welcome, Product Manager!</h1>
//           <p className="lead fs-4 w-75 mx-auto">
//             Manage products, inventory, and compliance. Focused tools to keep VeganVibe running smoothly.
//           </p>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="container my-5 py-5">
//         <h2 className="text-center mb-5 fw-bold">Product Manager Functionalities</h2>
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
//           backgroundColor: "#4A5B7E",
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
//     <footer className="text-center py-4 mt-5" style={{ backgroundColor: "#2E3A59", color: "#fff" }}>
//       <p className="mb-0 fs-6">© 2025 Vegan Snacks. Product Manager Dashboard.</p>
//     </footer>
//   );
// }

// export default ProductManagerHome;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import logo from "./photosvideos/icon.png";
import { FaUserCircle, FaSignOutAlt, FaHome } from "react-icons/fa";

const ProductManagerHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Product Manager features (subset of Admin)
  const features = [
    { title: "View Products", desc: "See all products", det: "View Products", link: "/product-manager-vegansnacks" },
    { title: "Product Management", desc: "Approve/reject products & QC", det: "Manage Product", link: "/product-manager-product" },
    { title: "Inventory Management", desc: "Track and update stock levels", det: "View Inventory", link: "/product-manager-inventory" },
    { title: "Notifications", desc: "Check important alerts", det: "View Notifications", link: "/product-manager-notification" },
    { title: "Marketing Campaigns", desc: "Manage campaigns", det: "Manage Campaigns", link: "/admin-camp" },
    { title: "Feedback", desc: "View customer feedback", det: "View Feedback", link: "/product-manager-feedback" },
    { title: "Reports & Analytics", desc: "Sales & vendor performance reports", det: "View Analysis", link: "/product-manager-report" },
    { title: "Certificates", desc: "View and manage certifications", det: "View Certificates", link: "/product-manager-certificate" }
    
  ];

  return (
    <div className="pm-home">
      {/* Navbar */}
      <Navbar expand="lg" style={{ backgroundColor: "#2E3A59" }} variant="dark" sticky="top">
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
            <Nav className="ms-auto align-items-center">
              {/* Sidebar Toggle Button */}
              <Link to="/product-manager-profile" className="text-white fs-4">
                              <FaUserCircle />
              </Link>
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
          backgroundColor: "#4A5B7E",
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

        <h3 className="fw-bold mb-4 text-center">PM Menu</h3>
        <ul className="list-unstyled">
          {features.map((feature, idx) => (
            <li key={idx} className="mb-3">
              <Link
                to={feature.link}
                className="d-block px-3 py-2"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  backgroundColor: "#2E3A59",
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
          backgroundImage: `url(${require("./photosvideos/snacks3.jpg")})`,
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
          <h1 className="display-3 fw-bold mb-3">Welcome, Product Manager!</h1>
          <p className="lead fs-4 w-75 mx-auto">
            Manage products, inventory, and compliance. Focused tools to keep VeganVibe running smoothly.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container my-5 py-5">
        <h2 className="text-center mb-5 fw-bold">Product Manager Functionalities</h2>
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

// Feature Card Component
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
          backgroundColor: "#4A5B7E",
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

// Footer Component
function Footer() {
  return (
    <footer className="text-center py-4 mt-5" style={{ backgroundColor: "#2E3A59", color: "#fff" }}>
      <p className="mb-0 fs-6">© 2025 Vegan Snacks. Product Manager Dashboard.</p>
    </footer>
  );
}

export default ProductManagerHome;
