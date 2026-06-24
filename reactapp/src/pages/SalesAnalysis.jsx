// import React, { useEffect, useState } from "react";
// import { Card, Spinner, Alert, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const SalesAnalysis = () => {
//   const vendorId = localStorage.getItem("vendorId"); // ✅ Vendor from localStorage
//   const [revenue, setRevenue] = useState(0);
//   const [unitsSold, setUnitsSold] = useState(0);
//   const [topProducts, setTopProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // 🌍 Detect environment and set API base URL
//   const API_BASE =
//     process.env.NODE_ENV === "development"
//       ? "http://localhost:8080"
//       : ""; // production → relative path

//   // ✅ Fetch total revenue
//   const fetchRevenue = async () => {
//     const response = await fetch(`${API_BASE}/api/analytics/sales/revenue/${vendorId}`);
//     if (!response.ok) throw new Error("Failed to fetch revenue");
//     return response.json();
//   };

//   // ✅ Fetch total units sold
//   const fetchUnitsSold = async () => {
//     const response = await fetch(`${API_BASE}/api/analytics/sales/units-sold/${vendorId}`);
//     if (!response.ok) throw new Error("Failed to fetch units sold");
//     return response.json();
//   };

//   // ✅ Fetch top selling products
//   const fetchTopProducts = async () => {
//     const response = await fetch(`${API_BASE}/api/analytics/sales/top-products/${vendorId}?topN=5`);
//     if (!response.ok) throw new Error("Failed to fetch top products");
//     return response.json();
//   };

//   useEffect(() => {
//     if (!vendorId) return;

//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const [revenueData, unitsData, topData] = await Promise.all([
//           fetchRevenue(),
//           fetchUnitsSold(),
//           fetchTopProducts(),
//         ]);

//         setRevenue(revenueData);
//         setUnitsSold(unitsData);
//         setTopProducts(topData);
//       } catch (err) {
//         console.error(err);
//         setError(err.message || "Something went wrong while fetching data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [vendorId]);

//   return (
//     <div className="p-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="fw-bold">📊 Sales Analysis</h2>
//         <Button variant="secondary" onClick={() => navigate("/vendor-home")}>
//            Back to Home
//         </Button>
//       </div>

//       {!vendorId ? (
//         <Alert variant="danger">⚠️ Vendor not logged in</Alert>
//       ) : loading ? (
//         <div className="text-center my-5">
//           <Spinner animation="border" role="status" />
//           <p className="mt-2">Loading sales data...</p>
//         </div>
//       ) : error ? (
//         <Alert variant="danger">{error}</Alert>
//       ) : (
//         <>
//           {/* Revenue + Units */}
//           <div className="d-flex gap-3 mb-4">
//             <Card className="shadow rounded flex-fill">
//               <Card.Body>
//                 <h5>Total Revenue</h5>
//                 <p className="fs-4 fw-bold text-success">₹{revenue}</p>
//               </Card.Body>
//             </Card>

//             <Card className="shadow rounded flex-fill">
//               <Card.Body>
//                 <h5>Total Units Sold</h5>
//                 <p className="fs-4 fw-bold text-primary">{unitsSold}</p>
//               </Card.Body>
//             </Card>
//           </div>

//           {/* Top Products */}
//           <Card className="shadow rounded">
//             <Card.Body>
//               <h5 className="mb-3">🔥 Top Selling Products</h5>
//               {topProducts.length === 0 ? (
//                 <p className="text-muted">No products sold yet.</p>
//               ) : (
//                 <ul className="list-unstyled">
//                   {topProducts.map((product, index) => (
//                     <li
//                       key={index}
//                       className="d-flex justify-content-between border-bottom py-2"
//                     >
//                       <span>{product.productName}</span>
//                       <span className="text-muted">
//                         {product.quantity} units | ₹{product.totalPrice}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </Card.Body>
//           </Card>
//         </>
//       )}
//     </div>
//   );
// };

// export default SalesAnalysis;
import React, { useEffect, useState } from "react";
import { Card, Spinner, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SalesAnalysis = () => {
  const vendorId = localStorage.getItem("vendorId");
  const [revenue, setRevenue] = useState(0);
  const [unitsSold, setUnitsSold] = useState(0);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // ✅ Auth token
  const API_BASE =
    process.env.NODE_ENV === "development" ? "http://localhost:8080" : "";

  const fetchRevenue = async () => {
    const res = await fetch(`${API_BASE}/api/analytics/sales/revenue/${vendorId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch revenue");
    return res.json();
  };

  const fetchUnitsSold = async () => {
    const res = await fetch(`${API_BASE}/api/analytics/sales/units-sold/${vendorId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch units sold");
    return res.json();
  };

  const fetchTopProducts = async () => {
    const res = await fetch(`${API_BASE}/api/analytics/sales/top-products/${vendorId}?topN=5`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch top products");
    return res.json();
  };

  useEffect(() => {
    if (!vendorId || !token) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [rev, units, top] = await Promise.all([
          fetchRevenue(),
          fetchUnitsSold(),
          fetchTopProducts(),
        ]);

        setRevenue(rev);
        setUnitsSold(units);
        setTopProducts(top);
      } catch (err) {
        console.error(err);
        if (err.message.includes("401") || err.message.includes("403")) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else setError(err.message || "Something went wrong while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [vendorId, token, navigate]);

  return (
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">📊 Sales Analysis</h2>
          <Button variant="secondary" onClick={() => navigate("/vendor-home")}>
            Back to Home
          </Button>
        </div>

        {!vendorId ? (
          <Alert variant="danger">⚠️ Vendor not logged in</Alert>
        ) : loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" role="status" />
            <p className="mt-2">Loading sales data...</p>
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <>
            <div className="d-flex gap-3 mb-4">
              <Card className="shadow rounded flex-fill">
                <Card.Body>
                  <h5>Total Revenue</h5>
                  <p className="fs-4 fw-bold text-success">₹{revenue}</p>
                </Card.Body>
              </Card>

              <Card className="shadow rounded flex-fill">
                <Card.Body>
                  <h5>Total Units Sold</h5>
                  <p className="fs-4 fw-bold text-primary">{unitsSold}</p>
                </Card.Body>
              </Card>
            </div>

            <Card className="shadow rounded">
              <Card.Body>
                <h5 className="mb-3">🔥 Top Selling Products</h5>
                {topProducts.length === 0 ? (
                  <p className="text-muted">No products sold yet.</p>
                ) : (
                  <ul className="list-unstyled">
                    {topProducts.map((product, index) => (
                      <li
                        key={index}
                        className="d-flex justify-content-between border-bottom py-2"
                      >
                        <span>{product.productName}</span>
                        <span className="text-muted">
                          {product.quantity} units | ₹{product.totalPrice}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card.Body>
            </Card>
          </>
        )}
      </div>
  );
};

export default SalesAnalysis;
