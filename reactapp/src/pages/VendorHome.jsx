// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Container, Navbar, Nav } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FaUserCircle } from "react-icons/fa";
// import logo from "./photosvideos/icon.png";

// function VendorHome() {
//   const navigate = useNavigate();

//   return (
//     <div className="vendor-home">
//       {/* Navbar */}
//       <Navbar
//         expand="lg"
//         style={{ backgroundColor: "#333446" }}
//         variant="dark"
//         sticky="top"
//       >
//         <Container>
//           <Navbar.Brand
//             href="/"
//             style={{ fontWeight: "bold", fontSize: "1.8rem" }}
//           >
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
//               {/* Profile Icon */}
//               <Link to="/vendor-profile" className="nav-link text-white me-3">
//                 <FaUserCircle size={32} />
//               </Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       {/* Welcome Section */}
//       <section
//         className="text-center d-flex flex-column justify-content-center text-white"
//         style={{
//           minHeight: "70vh",
//           padding: "80px 20px",
//           backgroundImage: `url(${require("./photosvideos/snacks10.jpg")})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           position: "relative",
//         }}
//       >
//         {/* Dark Overlay */}
//         <div
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             zIndex: 1,
//           }}
//         ></div>

//         {/* Animated Content */}
//         <div className="welcome-text" style={{ position: "relative", zIndex: 2 }}>
//           <h1 className="mb-4 display-3 fw-bold animated-text">
//             Welcome, Vendor! <span role="img" aria-label="leaf">🌿</span>
//           </h1>
//           <p className="lead fs-4 w-75 mx-auto animated-subtext">
//             Manage your vegan snacks, update inventory, and track your
//             performance with ease.  
//             Your one-stop portal for growing your VeganVibe journey!
//           </p>
//         </div>
//       </section>

//       {/* Functionalities Section */}
//       <section className="container my-5 py-5">
//         <h2 className="text-center mb-5 fw-bold">Vendor Functionalities</h2>
//         <div className="row g-5">
//           <div className="col-md-4">
//             <Card
//               title="Add New Snack"
//               text="Submit your vegan snack details for approval."
//               link="/apply"
//               btnText="Add Snack"
//               btnClass="btn"
//               btnStyle={{ backgroundColor: "#7F8CAA", color: "#fff" }}
//             />
//           </div>
//           <div className="col-md-4">
//             <Card
//               title="View My Snacks"
//               text="Check and manage your listed vegan snacks."
//               link="/snacks"
//               btnText="View Snacks"
//               btnClass="btn"
//               btnStyle={{ backgroundColor: "#333446", color: "#fff" }}
//             />
//           </div>
//           <div className="col-md-4">
//             <Card
//               title="Add Inventory"
//               text="Add stock details and update inventory levels."
//               link="/add-inventory"
//               btnText="Add Inventory"
//               btnClass="btn"
//               btnStyle={{ backgroundColor: "#B8CFCE", color: "#000" }}
//             />
//           </div>
//           <div className="col-md-6">
//             <Card
//               title="Manage Inventory"
//               text="Track, edit, and manage your inventory records."
//               link="/inventory"
//               btnText="Manage Inventory"
//               btnClass="btn"
//               btnStyle={{ backgroundColor: "#7F8CAA", color: "#fff" }}
//             />
//           </div>
//           <div className="col-md-6">
//             <Card
//               title="View Feedback"
//               text="Read customer feedback and improve your offerings."
//               link="/feedback"
//               btnText="View Feedback"
//               btnClass="btn"
//               btnStyle={{ backgroundColor: "#333446", color: "#fff" }}
//             />
//           </div>
//           {/* New Feature: Add Certificate */}
//           <div className="col-md-6">
//             <Card
//               title="Add Certificate"
//               text="Upload certifications to build customer trust."
//               link="/add-certificate"
//               btnText="Add Certificate"
//               btnClass="btn"
//               btnStyle={{ backgroundColor: "#7F8CAA", color: "#fff" }}
//             />
//           </div>
//           {/* New Feature: View Certificates */}
//           <div className="col-md-6">
//             <Card
//               title="View My Certificates"
//               text="Check and manage your uploaded certifications."
//               link="/vendor-certificates"
//               btnText="View Certificates"
//               btnClass="btn"
//               btnStyle={{ backgroundColor: "#B8CFCE", color: "#000" }}
//             />
//           </div>
//          <div className="col-md-6">
//   <Card
//     title="📊 View My Sales Analysis"
//     text="Track your revenue, units sold, and top-performing products."
//     link="/sales"
//     btnText="View Sales Analysis"
//     btnClass="btn"
//     btnStyle={{ backgroundColor: "#B8CFCE", color: "#000" }}
//   />
// </div>

//         </div>
//       </section>

//       {/* Footer */}
//       <Footer />

//       {/* Inline CSS for Animations */}
//       <style>
//         {`
//           .animated-text {
//             opacity: 0;
//             transform: translateY(-50px);
//             animation: fadeSlideDown 1.5s ease forwards;
//           }

//           .animated-subtext {
//             opacity: 0;
//             transform: translateY(30px);
//             animation: fadeSlideUp 2s ease forwards;
//             animation-delay: 0.5s;
//           }

//           @keyframes fadeSlideDown {
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }

//           @keyframes fadeSlideUp {
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// }

// // Reusable Card Component
// function Card({ title, text, link, btnText, btnClass, btnStyle }) {
//   return (
//     <div
//       className="card shadow-lg h-100 text-center p-4"
//       style={{ minHeight: "280px" }}
//     >
//       <div className="card-body d-flex flex-column">
//         <h4 className="card-title mb-3 fw-bold">{title}</h4>
//         <p className="card-text flex-grow-1 fs-5">{text}</p>
//         <Link
//           to={link}
//           className={`${btnClass} mt-auto px-4 py-2 fw-semibold`}
//           style={btnStyle}
//         >
//           {btnText}
//         </Link>
//       </div>
//     </div>
//   );
// }

// function Footer() {
//   return (
//     <footer className="text-center py-4 mt-5" style={{ backgroundColor: "#333446", color: "#fff" }}>
//       <p className="mb-0 fs-6">© 2025 Vegan Snacks. All rights reserved.</p>
//     </footer>
//   );
// }

// export default VendorHome;
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaUserCircle,
  FaPlusCircle,
  FaUtensils,
  FaWarehouse,
  FaClipboardList,
  FaComments,
  FaCertificate,
  FaChartLine,
} from "react-icons/fa";
import logo from "./photosvideos/icon.png";
function VendorHome() {
  const navigate = useNavigate();
  return (
    <div className="vendor-home">
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
            <Nav className="ms-auto align-items-center">
              <Link to="/vendor-profile" className="nav-link text-white me-3">
                <FaUserCircle size={32} />
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section
        className="text-center d-flex flex-column justify-content-center text-white"
        style={{
          minHeight: "70vh",
          padding: "80px 20px",
          backgroundImage: `url(${require("./photosvideos/snacks10.jpg")})`,
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
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        ></div>
        <div className="welcome-text" style={{ position: "relative", zIndex: 2 }}>
          <h1 className="mb-4 display-3 fw-bold animated-text">
            Welcome, Vendor! <span role="img" aria-label="leaf">🌿</span>
          </h1>
          <p className="lead fs-4 w-75 mx-auto animated-subtext">
            Manage your vegan snacks, update inventory, and track your
            performance with ease.  
            Your one-stop portal for growing your VeganVibe journey!
          </p>
        </div>
      </section>
      <section className="py-5" style={{ backgroundColor: "#F7F9FA" }}>
        <Container>
          <h2 className="text-center mb-5 fw-bold" style={{ color: "#333446" }}>
            Vendor Functionalities
          </h2>
          <div className="row g-4">
            <div className="col-md-3">
              <FeatureCard
                icon={<FaPlusCircle size={28} />}
                title="Add New Snack"
                text="Submit your vegan snack details for approval."
                link="/apply"
                btnText="Add Snack"
              />
            </div>
            <div className="col-md-3">
              <FeatureCard
                icon={<FaUtensils size={28} />}
                title="View My Snacks"
                text="Check and manage your listed vegan snacks."
                link="/snacks"
                btnText="View Snacks"
              />
            </div>
            <div className="col-md-3">
              <FeatureCard
                icon={<FaWarehouse size={28} />}
                title="Add Inventory"
                text="Add stock details and update inventory levels."
                link="/add-inventory"
                btnText="Add Inventory"
              />
            </div>
            <div className="col-md-3">
              <FeatureCard
                icon={<FaClipboardList size={28} />}
                title="Manage Inventory"
                text="Track, edit, and manage your inventory records."
                link="/inventory"
                btnText="Manage Inventory"
              />
            </div>
            <div className="col-md-3">
              <FeatureCard
                icon={<FaComments size={28} />}
                title="View Feedback"
                text="Read customer feedback and improve your offerings."
                link="/feedback"
                btnText="View Feedback"
              />
            </div>
            <div className="col-md-3">
              <FeatureCard
                icon={<FaCertificate size={28} />}
                title="Add Certificate"
                text="Upload certifications to build customer trust."
                link="/add-certificate"
                btnText="Add Certificate"
              />
            </div>
            <div className="col-md-3">
              <FeatureCard
                icon={<FaCertificate size={28} />}
                title="My Certificates"
                text="Check and manage your uploaded certifications."
                link="/vendor-certificates"
                btnText="View Certificates"
              />
            </div>
            <div className="col-md-3">
              <FeatureCard
                icon={<FaChartLine size={28} />}
                title="Sales Analysis"
                text="Track your revenue, units sold, and top products."
                link="/sales"
                btnText="View Analysis"
              />
            </div>
          </div>
        </Container>
      </section>
      <Footer />
      <style>
        {`
          .animated-text {
            opacity: 0;
            transform: translateY(-50px);
            animation: fadeSlideDown 1.5s ease forwards;
          }

          .animated-subtext {
            opacity: 0;
            transform: translateY(30px);
            animation: fadeSlideUp 2s ease forwards;
            animation-delay: 0.5s;
          }

          @keyframes fadeSlideDown {
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes fadeSlideUp {
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
function FeatureCard({ icon, title, text, link, btnText }) {
  return (
    <div
      className="card shadow-lg border-0 h-100 text-center p-4 feature-card"
      style={{
        borderRadius: "20px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div className="card-body d-flex flex-column align-items-center">
        <div
          className="icon-circle mb-3"
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            backgroundColor: "#E1E7F5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#333446",
          }}
        >
          {icon}
        </div>
        <h5 className="fw-bold mb-3" style={{ color: "#333446" }}>{title}</h5>
        <p className="text-muted flex-grow-1">{text}</p>
        <Link
          to={link}
          className="btn mt-auto px-4 py-2 fw-semibold"
          style={{
            backgroundColor: "#7F8CAA",
            color: "#fff",
            borderRadius: "10px",
          }}
        >
          {btnText}
        </Link>
      </div>
      <style>
        {`
          .feature-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          }
        `}
      </style>
    </div>
  );
}
function Footer() {
  return (
    <footer className="text-center py-4 mt-5" style={{ backgroundColor: "#333446", color: "#fff" }}>
      <p className="mb-0 fs-6">© 2025 Vegan Snacks. All rights reserved.</p>
    </footer>
  );
}
export default VendorHome;
