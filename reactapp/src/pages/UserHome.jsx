// import React from "react";
// import { Link } from "react-router-dom";
// import { Container, Navbar, Nav } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
// import logo from "./photosvideos/icon.png";
// import { FaBell } from "react-icons/fa"; 


// function UserHome() {
//   return (
//     <div className="user-home">
//       {/* Navbar */}
//       <Navbar expand="lg" style={{ backgroundColor: "#333446" }} variant="dark" sticky="top">
//   <Container>
//     <Navbar.Brand href="/" style={{ fontWeight: "bold", fontSize: "1.8rem" }}>
//       <img
//         src={logo}
//         alt="VeganVibe Logo"
//         style={{
//           width: "60px",
//           height: "60px",
//           marginRight: "12px",
//           borderRadius: "50%",
//           border: "2px solid white",
//         }}
//       />
//       VeganVibe
//     </Navbar.Brand>
//     <Navbar.Toggle aria-controls="navbar-nav" />
//     <Navbar.Collapse id="navbar-nav">
//       <Nav className="ms-auto align-items-center">
//         {/* Profile Icon */}
//         <Link to="/my-user-profile" className="nav-link text-white me-3">
//           <FaUserCircle size={28} />
//         </Link>

//         {/* Notification Bell with badge */}
//         <div className="position-relative me-3">
//           <Link to="/my-notifications" className="nav-link text-white">
//             <FaBell size={26} />
//             {3 > 0 && (
//               <span
//                 className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
//                 style={{ fontSize: "0.65rem" }}
//               >
                
//               </span>
//             )}
//           </Link>
//         </div>

//         {/* Cart Icon */}
//         <Link to="/my-cart" className="nav-link text-white">
//           <FaShoppingCart size={28} />
//         </Link>
//       </Nav>
//     </Navbar.Collapse>
//   </Container>
// </Navbar>


//       {/* Hero Section */}
//       <section
//         className="text-center d-flex flex-column justify-content-center text-white"
//         style={{
//           minHeight: "70vh",
//           padding: "80px 20px",
//           backgroundImage: `url(${require("./photosvideos/snacks7.jpg")})`,
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
//             backgroundColor: "rgba(0, 0, 0, 0.6)",
//             zIndex: 1,
//           }}
//         ></div>

//         {/* Content */}
//         <div style={{ position: "relative", zIndex: 2 }}>
//           <h1 className="mb-4 display-3 fw-bold animated-text">
//             Welcome to VeganVibe! <span role="img" aria-label="leaf">🌿</span>
//           </h1>
//           <p className="lead fs-4 w-75 mx-auto animated-subtext">
//             Discover delicious vegan snacks and manage your account with ease.  
//             Your one-stop portal for a healthy lifestyle!
//           </p>
//         </div>
//       </section>

//       {/* Products Section */}
//       <section className="py-5" style={{ backgroundColor: "#EAEFEF" }}>
//         <Container>
//           <h2 className="text-center mb-5 fw-bold" style={{ color: "#333446" }}>
//             Featured Products
//           </h2>
//           <div className="row g-4">
//             <div className="col-md-4">
//               <ProductCard
//                 title="Vegan Bar"
//                 text="Nutritious oats, seeds & dried fruits."
//                 img={require("./photosvideos/veganbar.jpg")}
//               />
//             </div>
//             <div className="col-md-4">
//               <ProductCard
//                 title="Vegan Chips"
//                 text="Crispy, crunchy and guilt-free snacks."
//                 img={require("./photosvideos/veganchip.jpg")}
//               />
//             </div>
//             <div className="col-md-4">
//               <ProductCard
//                 title="Vegan Cookies"
//                 text="Packed with plant-based energy goodness."
//                 img={require("./photosvideos/vegancookies.jpg")}
//               />
//             </div>
//           </div>
//           <div className="text-center mt-4">
//             <Link to="/all-products" className="btn px-4 py-2 fw-semibold" style={{ backgroundColor: "#7F8CAA", color: "#fff" }}>
//               More Products
//             </Link>
//           </div>
//         </Container>
//       </section>

//       {/* Functionalities Section */}
//       <section className="py-5" style={{ backgroundColor: "#B8CFCE" }}>
//         <Container>
//           <h2 className="text-center mb-5 fw-bold" style={{ color: "#333446" }}>
//             Customer Functionalities
//           </h2>
//           <div className="row g-4">
//             <div className="col-md-4">
//               <Card
//                 title="All Products"
//                 text="Browse our wide variety of vegan snacks."
//                 link="/all-products"
//                 btnText="View Products"
//                 btnStyle={{ backgroundColor: "#7F8CAA", color: "#fff" }}
//               />
//             </div>
//             <div className="col-md-4">
//               <Card
//                 title="My Orders"
//                 text="Track and manage your past orders."
//                 link="/my-orders"
//                 btnText="My Orders"
//                 btnStyle={{ backgroundColor: "#333446", color: "#fff" }}
//               />
//             </div>
//             <div className="col-md-4">
//               <Card
//                 title="My Feedbacks"
//                 text="Give feedback and check your reviews."
//                 link="/my-feedbacks"
//                 btnText="My Feedbacks"
//                 btnStyle={{ backgroundColor: "#7F8CAA", color: "#fff" }}
//               />
//             </div>
//             <div className="col-md-4">
//            <Card
//             title="All Certificates"
//             text="Check certifications of all vendors."
//               link="/all-certificate"
//              btnText="View Certificates"
//              btnStyle={{ backgroundColor: "#7F8CAA", color: "#fff" }}
//             />
//          </div>

//           </div>
//         </Container>
//       </section>

//       {/* Footer */}
//       <Footer />

//       {/* Inline CSS Animations */}
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
//             to { opacity: 1; transform: translateY(0); }
//           }
//           @keyframes fadeSlideUp {
//             to { opacity: 1; transform: translateY(0); }
//           }
//         `}
//       </style>
//     </div>
//   );
// }

// // Reusable Card Component
// function Card({ title, text, link, btnText, btnStyle }) {
//   return (
//     <div className="card shadow h-100 text-center p-4" style={{ minHeight: "250px" }}>
//       <div className="card-body d-flex flex-column">
//         <h4 className="card-title mb-3 fw-bold" style={{ color: "#333446" }}>{title}</h4>
//         <p className="card-text flex-grow-1 fs-6">{text}</p>
//         <Link to={link} className="btn mt-auto px-4 py-2 fw-semibold" style={btnStyle}>
//           {btnText}
//         </Link>
//       </div>
//     </div>
//   );
// }

// // Product Card Component
// function ProductCard({ title, text, img }) {
//   return (
//     <div className="card shadow h-100 text-center">
//       <img src={img} alt={title} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
//       <div className="card-body d-flex flex-column p-3">
//         <h5 className="card-title fw-bold" style={{ color: "#333446" }}>{title}</h5>
//         <p className="card-text flex-grow-1">{text}</p>
//       </div>
//     </div>
//   );
// }

// // Footer
// function Footer() {
//   return (
//     <footer className="text-center py-4 mt-5" style={{ backgroundColor: "#333446", color: "#fff" }}>
//       <p className="mb-0 fs-6">© 2025 Vegan Snacks. All rights reserved.</p>
//     </footer>
//   );
// }

// export default UserHome;
import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import logo from "./photosvideos/icon.png";
import { FaBell } from "react-icons/fa"; 


function UserHome() {
  return (
    <div className="user-home">
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
      <Nav className="ms-auto align-items-center">
        {/* Profile Icon */}
        <Link to="/my-user-profile" className="nav-link text-white me-3">
          <FaUserCircle size={28} />
        </Link>

        {/* Notification Bell with badge */}
        <div className="position-relative me-3">
          <Link to="/my-notifications" className="nav-link text-white">
            <FaBell size={26} />
            {3 > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.65rem" }}
              >
                
              </span>
            )}
          </Link>
        </div>

        {/* Cart Icon */}
        <Link to="/my-cart" className="nav-link text-white">
          <FaShoppingCart size={28} />
        </Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>


      {/* Hero Section */}
      <section
        className="text-center d-flex flex-column justify-content-center text-white"
        style={{
          minHeight: "70vh",
          padding: "80px 20px",
          backgroundImage: `url(${require("./photosvideos/snacks7.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        {/* Dark Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1,
          }}
        ></div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 className="mb-4 display-3 fw-bold animated-text">
            Welcome to VeganVibe! <span role="img" aria-label="leaf">🌿</span>
          </h1>
          <p className="lead fs-4 w-75 mx-auto animated-subtext">
            Discover delicious vegan snacks and manage your account with ease.  
            Your one-stop portal for a healthy lifestyle!
          </p>
        </div>
      </section>

     {/* Functionalities Section */}
<section className="py-5" style={{ backgroundColor: "#F7F9FA" }}>
  <Container>
    <h2 className="text-center mb-5 fw-bold" style={{ color: "#333446" }}>
      Customer Functionalities
    </h2>
    <div className="row g-4">

      <div className="col-md-3">
        <FeatureCard
          icon="🛍️"
          title="All Products"
          text="Browse our wide variety of vegan snacks and find your favorites."
          link="/all-products"
          btnText="View Products"
        />
      </div>

      <div className="col-md-3">
        <FeatureCard
          icon="📦"
          title="My Orders"
          text="Easily track your past and current orders in one place."
          link="/my-orders"
          btnText="My Orders"
        />
      </div>

      <div className="col-md-3">
        <FeatureCard
          icon="💬"
          title="My Feedbacks"
          text="Share your thoughts and check feedback you’ve submitted."
          link="/my-feedbacks"
          btnText="My Feedbacks"
        />
      </div>

      <div className="col-md-3">
        <FeatureCard
          icon="📜"
          title="All Certificates"
          text="View certifications of all registered vendors for trust & quality."
          link="/all-certificate"
          btnText="View Certificates"
        />
      </div>

    </div>
  </Container>
</section>


      {/* Footer */}
      <Footer />

      {/* Inline CSS Animations */}
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

// Reusable Card Component
function Card({ title, text, link, btnText, btnStyle }) {
  return (
    <div className="card shadow h-100 text-center p-4" style={{ minHeight: "250px" }}>
      <div className="card-body d-flex flex-column">
        <h4 className="card-title mb-3 fw-bold" style={{ color: "#333446" }}>{title}</h4>
        <p className="card-text flex-grow-1 fs-6">{text}</p>
        <Link to={link} className="btn mt-auto px-4 py-2 fw-semibold" style={btnStyle}>
          {btnText}
        </Link>
      </div>
    </div>
  );
}
// Professional Feature Card Component
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
            fontSize: "2rem",
          }}
        >
          {icon}
        </div>
        <h5 className="fw-bold mb-3" style={{ color: "#333446" }}>
          {title}
        </h5>
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

      {/* Hover Effect */}
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

// Product Card Component
function ProductCard({ title, text, img }) {
  return (
    <div className="card shadow h-100 text-center">
      <img src={img} alt={title} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
      <div className="card-body d-flex flex-column p-3">
        <h5 className="card-title fw-bold" style={{ color: "#333446" }}>{title}</h5>
        <p className="card-text flex-grow-1">{text}</p>
      </div>
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

export default UserHome;
