// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const CertificateVendor = () => {
//   const [certificates, setCertificates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const vendorId = localStorage.getItem("vendorId");
//   const navigate = useNavigate();

//   // Fetch certificates
//   const fetchCertificates = () => {
//     if (!vendorId) {
//       alert("Vendor ID not found. Please login again.");
//       navigate("/login");
//       return;
//     }

//     setLoading(true);
//     fetch(`http://localhost:8080/certifications/vendor/${vendorId}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch certificates");
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
//   };

//   useEffect(() => {
//     fetchCertificates();
//   }, [vendorId, navigate]);

//   // Delete certificate
//   const handleDelete = (id) => {
//     if (!window.confirm("Are you sure you want to delete this certificate?")) return;

//     fetch(`http://localhost:8080/certifications/delete/${id}`, {
//       method: "DELETE"
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to delete certificate");
//         alert("Certificate deleted successfully!");
//         fetchCertificates(); // Refresh the list
//       })
//       .catch((err) => {
//         console.error("Error deleting certificate:", err);
//         alert("Failed to delete certificate. Please try again.");
//       });
//   };

//   return (
//     <Container className="mt-5">
//       <h2 className="text-center mb-5" style={{ color: "#333446", fontWeight: "700" }}>
//         My Certifications
//       </h2>

//       {loading ? (
//         <div className="text-center">
//           <Spinner animation="border" style={{ color: "#7F8CAA" }} />
//           <p style={{ color: "#7F8CAA" }}>Loading certificates...</p>
//         </div>
//       ) : certificates.length === 0 ? (
//         <div className="text-center text-muted">
//           <p style={{ fontSize: "1.1rem" }}>No certifications found.</p>
//           <Button
//             style={{
//               backgroundColor: "#7F8CAA",
//               border: "none",
//               borderRadius: "12px",
//               padding: "10px 20px",
//               fontWeight: "500"
//             }}
//             onClick={() => navigate("/add-certificate")}
//           >
//             Add Certification
//           </Button>
//         </div>
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
//                   color: "#333446"
//                 }}
//               >
//                 <Card.Body>
//                   <Card.Title style={{ fontWeight: "600", fontSize: "1.2rem" }}>
//                     {cert.certificateName}
//                   </Card.Title>
//                   <Card.Text style={{ lineHeight: "1.6" }}>
//                     <strong>Certification No:</strong> {cert.certificateNumber} <br />
//                     <strong>Type:</strong> {cert.certificationType} <br />
//                     <strong>Issued:</strong> {cert.issueDate} <br />
//                     <strong>Expiry:</strong> {cert.expiryDate ? cert.expiryDate : "N/A"} <br />
//                   </Card.Text>

//                   <div className="d-flex justify-content-between mt-3">
//                     <Button
//                       style={{
//                         backgroundColor: "#333446",
//                         border: "none",
//                         borderRadius: "12px",
//                         padding: "6px 12px",
//                         fontWeight: "500"
//                       }}
//                       onClick={() => navigate(`/edit-certificate/${cert.id}`)}
//                     >
//                       Edit
//                     </Button>

//                     <Button
//                       style={{
//                         backgroundColor: "#E63946",
//                         border: "none",
//                         borderRadius: "12px",
//                         padding: "6px 12px",
//                         fontWeight: "500"
//                       }}
//                       onClick={() => handleDelete(cert.id)}
//                     >
//                       Delete
//                     </Button>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       )}

//       <div className="text-center mt-4">
//         {/* <Button
//           style={{
//             backgroundColor: "#333446",
//             border: "none",
//             borderRadius: "12px",
//             padding: "10px 25px",
//             fontWeight: "500"
//           }}
//           onClick={() => navigate("/vendor-home")}
//         >
//           Back to Home
//         </Button> */}
//       </div>
//     </Container>
//   );
// };

// export default CertificateVendor;
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CertificateVendor = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const vendorId = localStorage.getItem("vendorId");

  // Fetch certificates securely
  const fetchCertificates = async () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Authorization check
    if (!vendorId || !token || role !== "VENDOR") {
      alert("You must be logged in as a vendor to view certifications.");
      localStorage.clear();
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/certifications/vendor/${vendorId}`, {
        headers: { "Authorization": `Bearer ${token}` },
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          alert("Session expired or unauthorized. Please login again.");
          localStorage.clear();
          navigate("/login");
        } else {
          throw new Error("Failed to fetch certificates");
        }
      }

      const data = await res.json();
      setCertificates(data);
    } catch (err) {
      console.error("Error fetching certificates:", err);
      alert("Error fetching certificates.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, [vendorId, navigate]);

  // Delete certificate securely
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this certificate?")) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:8080/certifications/delete/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          alert("Session expired or unauthorized. Please login again.");
          localStorage.clear();
          navigate("/login");
        } else {
          throw new Error("Failed to delete certificate");
        }
      } else {
        alert("Certificate deleted successfully!");
        fetchCertificates(); // Refresh the list
      }
    } catch (err) {
      console.error("Error deleting certificate:", err);
      alert("Failed to delete certificate. Please try again.");
    }
  };

  return (
    <Container className="mt-5">
       <button
          onClick={() => navigate("/vendor-home")}
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
        My Certifications
      </h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" style={{ color: "#7F8CAA" }} />
          <p style={{ color: "#7F8CAA" }}>Loading certificates...</p>
        </div>
      ) : certificates.length === 0 ? (
        <div className="text-center text-muted">
          <p style={{ fontSize: "1.1rem" }}>No certifications found.</p>
          <Button
            style={{
              backgroundColor: "#7F8CAA",
              border: "none",
              borderRadius: "12px",
              padding: "10px 20px",
              fontWeight: "500"
            }}
            onClick={() => navigate("/add-certificate")}
          >
            Add Certification
          </Button>
        </div>
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
                  color: "#333446"
                }}
              >
                <Card.Body>
                  <Card.Title style={{ fontWeight: "600", fontSize: "1.2rem" }}>
                    {cert.certificateName}
                  </Card.Title>
                  <Card.Text style={{ lineHeight: "1.6" }}>
                    <strong>Certification No:</strong> {cert.certificateNumber} <br />
                    <strong>Type:</strong> {cert.certificationType} <br />
                    <strong>Issued:</strong> {cert.issueDate} <br />
                    <strong>Expiry:</strong> {cert.expiryDate ? cert.expiryDate : "N/A"} <br />
                  </Card.Text>

                  <div className="d-flex justify-content-between mt-3">
                    <Button
                      style={{
                        backgroundColor: "#333446",
                        border: "none",
                        borderRadius: "12px",
                        padding: "6px 12px",
                        fontWeight: "500"
                      }}
                      onClick={() => navigate(`/edit-certificate/${cert.id}`)}
                    >
                      Edit
                    </Button>

                    <Button
                      style={{
                        backgroundColor: "#E63946",
                        border: "none",
                        borderRadius: "12px",
                        padding: "6px 12px",
                        fontWeight: "500"
                      }}
                      onClick={() => handleDelete(cert.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <div className="text-center mt-4">
        <Button
          style={{
            backgroundColor: "#333446",
            border: "none",
            borderRadius: "12px",
            padding: "10px 25px",
            fontWeight: "500"
          }}
          onClick={() => navigate("/vendor-home")}
        >
          Back to Home
        </Button>
      </div>
    </Container>
  );
};

export default CertificateVendor;
