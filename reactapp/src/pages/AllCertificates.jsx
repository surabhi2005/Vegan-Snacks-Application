// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const AllCertificates = () => {
//   const [certificates, setCertificates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("http://localhost:8080/certifications/all")
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Failed to fetch certifications");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setCertificates(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error:", err);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <Container className="mt-5">
//       {/* Page Title */}
//       <h2
//         className="text-center mb-5"
//         style={{ color: "#333446", fontWeight: "700" }}
//       >
//         All Certifications
//       </h2>

//       {/* Loading */}
//       {loading ? (
//         <div className="text-center">
//           <Spinner animation="border" style={{ color: "#7F8CAA" }} />
//           <p style={{ color: "#7F8CAA" }}>Loading certifications...</p>
//         </div>
//       ) : certificates.length === 0 ? (
//         <p className="text-center text-muted" style={{ fontSize: "1.1rem" }}>
//           No certifications available.
//         </p>
//       ) : (
//         <Row>
//           {certificates.map((cert) => (
//             <Col md={4} sm={6} xs={12} key={cert.id} className="mb-4">
//               <Card
//                 className="shadow-sm h-100"
//                 style={{
//                   border: "none",
//                   borderRadius: "15px",
//                   backgroundColor: "#B8CFCE",
//                   color: "#333446",
//                 }}
//               >
//                 <Card.Body>
//                   <Card.Title
//                     style={{ fontWeight: "600", fontSize: "1.2rem" }}
//                   >
//                     {cert.certificateName}
//                   </Card.Title>
//                   <Card.Text style={{ lineHeight: "1.6" }}>
//                     <strong>Certificate ID:</strong> {cert.id} <br />
//                     <strong>VendorName:</strong> {cert.vendorBusinessName} <br />
//                     <strong>Number:</strong> {cert.certificateNumber} <br />
//                     <strong>Type:</strong> {cert.certificationType} <br />
//                     <strong>Issue Date:</strong> {cert.issueDate} <br />
//                     <strong>Expiry Date:</strong>{" "}
//                     {cert.expiryDate ? cert.expiryDate : "N/A"} <br />
//                     <hr />
//                     <strong>Vendor ID:</strong> {cert.vendorId} <br />
//                   </Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       )}

//       {/* Back Button */}
//       {/* <div className="text-center mt-4">
//         <Button
//           style={{
//             backgroundColor: "#333446",
//             border: "none",
//             borderRadius: "12px",
//             padding: "10px 25px",
//             fontWeight: "500",
//           }}
//           onClick={() => navigate("/customer-home")} // Go back to previous page
//         >
//           Back
//         </Button>
//       </div> */}
//     </Container>
//   );
// };

// export default AllCertificates;

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AllCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:8080/certifications/all", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            alert("Session expired. Please log in again.");
            localStorage.removeItem("token");
            navigate("/login");
          }
          throw new Error("Failed to fetch certifications");
        }
        return res.json();
      })
      .then((data) => {
        setCertificates(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [navigate]);

  return (
      <Container className="mt-5">
         <button
          onClick={() => navigate("/customer-home")}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            fontSize: "22px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "6px 12px",
            cursor: "pointer",
            zIndex: 3,
          }}
        >
          ☰
        </button>
        <h2 className="text-center mb-5" style={{ color: "#333446", fontWeight: "700" }}>
          All Certifications
        </h2>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" style={{ color: "#7F8CAA" }} />
            <p style={{ color: "#7F8CAA" }}>Loading certifications...</p>
          </div>
        ) : certificates.length === 0 ? (
          <p className="text-center text-muted" style={{ fontSize: "1.1rem" }}>
            No certifications available.
          </p>
        ) : (
          <Row>
            {certificates.map((cert) => (
              <Col md={4} sm={6} xs={12} key={cert.id} className="mb-4">
                <Card
                  className="shadow-sm h-100"
                  style={{
                    border: "none",
                    borderRadius: "15px",
                    backgroundColor: "#B8CFCE",
                    color: "#333446",
                  }}
                >
                  <Card.Body>
                    <Card.Title style={{ fontWeight: "600", fontSize: "1.2rem" }}>
                      {cert.certificateName}
                    </Card.Title>
                    <Card.Text style={{ lineHeight: "1.6" }}>
                      <strong>Certificate ID:</strong> {cert.id} <br />
                      <strong>VendorName:</strong> {cert.vendorBusinessName} <br />
                      <strong>Number:</strong> {cert.certificateNumber} <br />
                      <strong>Type:</strong> {cert.certificationType} <br />
                      <strong>Issue Date:</strong> {cert.issueDate} <br />
                      <strong>Expiry Date:</strong> {cert.expiryDate ? cert.expiryDate : "N/A"} <br />
                      <hr />
                      <strong>Vendor ID:</strong> {cert.vendorId} <br />
                       <strong>Vendor Name:</strong> {cert.vendorBusinessName} <br />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
  );
};

export default AllCertificates;
