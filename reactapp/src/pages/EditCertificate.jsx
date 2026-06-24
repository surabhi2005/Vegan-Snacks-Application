// import React, { useEffect, useState } from "react";
// import { Form, Button, Container, Card, Row, Col, Alert } from "react-bootstrap";
// import { useParams, useNavigate } from "react-router-dom";

// const EditCertificate = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [certificate, setCertificate] = useState({
//     certificateNumber: "",
//     certificationType: "",
//     issueDate: "",
//     expiryDate: "",
//   });
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const vendorId = localStorage.getItem("vendorId");
//     if (!vendorId) {
//       alert("Vendor ID not found. Please login again.");
//       navigate("/login");
//       return;
//     }

//     fetch(`http://localhost:8080/certifications/vendor/${vendorId}`)
//       .then(res => {
//         if (!res.ok) throw new Error("Failed to fetch certificates");
//         return res.json();
//       })
//       .then(data => {
//         const certToEdit = data.find(c => c.id === parseInt(id));
//         if (certToEdit) {
//           setCertificate({
//             certificateNumber: certToEdit.certificateNumber || "",
//             certificationType: certToEdit.certificationType || "",
//             issueDate: certToEdit.issueDate || "",
//             expiryDate: certToEdit.expiryDate || "",
//           });
//         } else {
//           alert("Certificate not found");
//           navigate("/vendor-certificates");
//         }
//       })
//       .catch(err => setError(err.message));
//   }, [id, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCertificate({ ...certificate, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const payload = {
//       certificateNumber: certificate.certificateNumber,
//       certificationType: certificate.certificationType,
//       issueDate: certificate.issueDate || null,
//       expiryDate: certificate.expiryDate || null,
//     };

//     fetch(`http://localhost:8080/certifications/update/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     })
//       .then(res => {
//         if (!res.ok) throw new Error("Update failed");
//         return res.json();
//       })
//       .then(() => {
//         alert("Certificate updated successfully!");
//         navigate("/vendor-certificates");
//       })
//       .catch(err => setError(err.message));
//   };

//   return (
//     <Container className="my-5">
//       <Card className="shadow" style={{ borderRadius: "12px" }}>
//         <Card.Body>
//           <h3 className="text-center mb-4" style={{ color: "#333446", fontWeight: "700" }}>
//             Edit Certificate
//           </h3>

//           {error && <Alert variant="danger">{error}</Alert>}

//           <Form onSubmit={handleSubmit}>
//             <Row className="mb-3">
//               <Col>
//                 <Form.Group>
//                   <Form.Label style={{ fontWeight: "600", color: "#333446" }}>Certificate Number</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="certificateNumber"
//                     value={certificate.certificateNumber}
//                     onChange={handleChange}
//                     required
//                     style={{ backgroundColor: "#EAEFEF", borderRadius: "8px", color: "#333446" }}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className="mb-3">
//               <Col>
//                 <Form.Group>
//                   <Form.Label style={{ fontWeight: "600", color: "#333446" }}>Certification Type</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="certificationType"
//                     value={certificate.certificationType}
//                     onChange={handleChange}
//                     required
//                     style={{ backgroundColor: "#EAEFEF", borderRadius: "8px", color: "#333446" }}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col>
//                 <Form.Group>
//                   <Form.Label style={{ fontWeight: "600", color: "#333446" }}>Issue Date</Form.Label>
//                   <Form.Control
//                     type="date"
//                     name="issueDate"
//                     value={certificate.issueDate}
//                     onChange={handleChange}
//                     required
//                     style={{ backgroundColor: "#EAEFEF", borderRadius: "8px", color: "#333446" }}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className="mb-3">
//               <Col>
//                 <Form.Group>
//                   <Form.Label style={{ fontWeight: "600", color: "#333446" }}>Expiry Date</Form.Label>
//                   <Form.Control
//                     type="date"
//                     name="expiryDate"
//                     value={certificate.expiryDate}
//                     onChange={handleChange}
//                     style={{ backgroundColor: "#EAEFEF", borderRadius: "8px", color: "#333446" }}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <div className="d-flex justify-content-between mt-4">
//               <Button
//                 variant="secondary"
//                 onClick={() => navigate("/vendor-certificates")}
//                 style={{ backgroundColor: "#B8CFCE", color: "#333446", fontWeight: "600", borderRadius: "8px" }}
//               >
//                 Cancel
//               </Button>

//               <Button
//                 type="submit"
//                 style={{ backgroundColor: "#7F8CAA", color: "white", fontWeight: "600", borderRadius: "8px" }}
//               >
//                 Update
//               </Button>
//             </div>
//           </Form>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default EditCertificate;
import React, { useEffect, useState } from "react";
import { Form, Button, Container, Card, Row, Col, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const EditCertificate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState({
    certificateNumber: "",
    certificationType: "",
    issueDate: "",
    expiryDate: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const vendorId = localStorage.getItem("vendorId");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Authorization check
    if (!vendorId || !token || role !== "VENDOR") {
      alert("You must be logged in as a vendor to edit certificates.");
      localStorage.clear();
      navigate("/login");
      return;
    }

    const fetchCertificate = async () => {
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
        const certToEdit = data.find(c => c.id === parseInt(id));

        if (certToEdit) {
          setCertificate({
            certificateNumber: certToEdit.certificateNumber || "",
            certificationType: certToEdit.certificationType || "",
            issueDate: certToEdit.issueDate || "",
            expiryDate: certToEdit.expiryDate || "",
          });
        } else {
          alert("Certificate not found.");
          navigate("/vendor-certificates");
        }
      } catch (err) {
        console.error("Error fetching certificate:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCertificate({ ...certificate, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const payload = {
      certificateNumber: certificate.certificateNumber,
      certificationType: certificate.certificationType,
      issueDate: certificate.issueDate || null,
      expiryDate: certificate.expiryDate || null,
    };

    try {
      const res = await fetch(`http://localhost:8080/certifications/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          alert("Session expired or unauthorized. Please login again.");
          localStorage.clear();
          navigate("/login");
        } else {
          throw new Error("Update failed");
        }
      } else {
        alert("Certificate updated successfully!");
        navigate("/vendor-certificates");
      }
    } catch (err) {
      console.error("Error updating certificate:", err);
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="text-center mt-5" style={{ color: "#333446" }}>Loading certificate...</div>;
  }

  return (
    <Container className="my-5">
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
      <Card className="shadow" style={{ borderRadius: "12px" }}>
        <Card.Body>
          <h3 className="text-center mb-4" style={{ color: "#333446", fontWeight: "700" }}>
            Edit Certificate
          </h3>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label style={{ fontWeight: "600", color: "#333446" }}>Certificate Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="certificateNumber"
                    value={certificate.certificateNumber}
                    onChange={handleChange}
                    required
                    style={{ backgroundColor: "#EAEFEF", borderRadius: "8px", color: "#333446" }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label style={{ fontWeight: "600", color: "#333446" }}>Certification Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="certificationType"
                    value={certificate.certificationType}
                    onChange={handleChange}
                    required
                    style={{ backgroundColor: "#EAEFEF", borderRadius: "8px", color: "#333446" }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label style={{ fontWeight: "600", color: "#333446" }}>Issue Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="issueDate"
                    value={certificate.issueDate}
                    onChange={handleChange}
                    required
                    style={{ backgroundColor: "#EAEFEF", borderRadius: "8px", color: "#333446" }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label style={{ fontWeight: "600", color: "#333446" }}>Expiry Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="expiryDate"
                    value={certificate.expiryDate}
                    onChange={handleChange}
                    style={{ backgroundColor: "#EAEFEF", borderRadius: "8px", color: "#333446" }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-between mt-4">
              <Button
                variant="secondary"
                onClick={() => navigate("/vendor-certificates")}
                style={{ backgroundColor: "#B8CFCE", color: "#333446", fontWeight: "600", borderRadius: "8px" }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                style={{ backgroundColor: "#7F8CAA", color: "white", fontWeight: "600", borderRadius: "8px" }}
              >
                Update
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditCertificate;
