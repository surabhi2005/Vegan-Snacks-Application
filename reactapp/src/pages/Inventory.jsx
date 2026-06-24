// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// function Inventory() {
//   const [inventoryList, setInventoryList] = useState([]);

//   useEffect(() => {
//     fetchInventory();
//   }, []);

//   const fetchInventory = () => {
//     fetch('http://localhost:8080/inventory/all')
//       .then(res => res.json())
//       .then(data => {
//         if (Array.isArray(data)) {
//           setInventoryList(data);
//         } else {
//           console.error('Expected array but got:', data);
//           setInventoryList([]);
//         }
//       })
//       .catch(err => console.error(err));
//   };

//   return (
//     <div className="container my-5 p-4" style={{ backgroundColor: "white", borderRadius: "12px" }}>
//       <h2 className="text-center mb-5 fw-bold" style={{ color: "#333446" }}>Inventory</h2>

//       <div className="row">
//         {inventoryList.length === 0 ? (
//           <p className="text-center text-muted">No inventory items found.</p>
//         ) : (
//           inventoryList.map((item) => (
//             <div className="col-md-6 col-lg-4 mb-4" key={item.id}>
//               <div
//                 className="card h-100 border-0 shadow-sm"
//                 style={{
//                   borderRadius: "16px",
//                   backgroundColor: "#7F8CAA",
//                   transition: "transform 0.2s ease-in-out, box-shadow 0.2s",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.transform = "translateY(-6px)";
//                   e.currentTarget.style.boxShadow = "0 8px 20px rgba(51,52,70,0.25)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.transform = "translateY(0)";
//                   e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
//                 }}
//               >
//                 <div className="card-body">
//                   <h5 className="card-title mb-3 fw-bold" style={{ color: "#EAEFEF" }}>
//                     {item.productName || "Unnamed Product"}
//                   </h5>

//                   <p className="card-text"><strong style={{ color: "#333446" }}>Current Stock:</strong> {item.currentStock}</p>
//                   <p className="card-text"><strong style={{ color: "#333446" }}>Reorder Point:</strong> {item.reorderPoint}</p>
//                   <p className="card-text"><strong style={{ color: "#333446" }}>Max Stock:</strong> {item.maxStock}</p>
//                   <p className="card-text"><strong style={{ color: "#333446" }}>Cost per Unit:</strong> ₹{item.costPerUnit}</p>
//                   <p className="card-text"><strong style={{ color: "#333446" }}>Last Restock:</strong> {item.lastRestockDate || "N/A"}</p>
//                   <p className="card-text"><strong style={{ color: "#333446" }}>Location:</strong> {item.location}</p>

//                   <div className="d-flex gap-2 mt-3 flex-wrap">
//                     <Link
//                       to={`/edit-inventory/${item.id}`}
//                       className="btn w-50"
//                       style={{
//                         backgroundColor: "#333446",
//                         color: "white",
//                         borderRadius: "10px",
//                         fontWeight: "bold",
//                         transition: "background-color 0.2s",
//                       }}
//                       onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#222233"}
//                       onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#333446"}
//                     >
//                       Edit
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       <div className="mt-5 text-center">
//         {/* <Link
//           to="/vendor-home"
//           className="btn"
//           style={{
//             backgroundColor: "#B8CFCE",
//             color: "#333446",
//             fontWeight: "bold",
//             borderRadius: "10px",
//             padding: "10px 22px",
//             transition: "all 0.2s ease-in-out",
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.backgroundColor = "#7F8CAA";
//             e.currentTarget.style.color = "white";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.backgroundColor = "#B8CFCE";
//             e.currentTarget.style.color = "#333446";
//           }}
//         >
//           Back to Vendor Home
//         </Link> */}
//       </div>
//     </div>
//   );
// }

// export default Inventory;
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Inventory() {
  const [inventoryList, setInventoryList] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    // Vendor access check
    if (!token || userRole !== "VENDOR") {
      alert("Unauthorized access! Please login as a vendor.");
      navigate("/login");
      return;
    }

    fetchInventory();
  }, [token, userRole, navigate]);

  const fetchInventory = () => {
    fetch('http://localhost:8080/inventory/all', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            alert("Session expired or unauthorized. Please login again.");
            localStorage.removeItem("token");
            navigate("/login");
          }
          throw new Error("Failed to fetch inventory");
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setInventoryList(data);
        } else {
          console.error('Expected array but got:', data);
          setInventoryList([]);
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container my-5 p-4" style={{ backgroundColor: "white", borderRadius: "12px" }}>
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
      <h2 className="text-center mb-5 fw-bold" style={{ color: "#333446" }}>Inventory</h2>

      <div className="row">
        {inventoryList.length === 0 ? (
          <p className="text-center text-muted">No inventory items found.</p>
        ) : (
          inventoryList.map((item) => (
            <div className="col-md-6 col-lg-4 mb-4" key={item.id}>
              <div
                className="card h-100 border-0 shadow-sm"
                style={{
                  borderRadius: "16px",
                  backgroundColor: "#7F8CAA",
                  transition: "transform 0.2s ease-in-out, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(51,52,70,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                }}
              >
                <div className="card-body">
                  <h5 className="card-title mb-3 fw-bold" style={{ color: "#EAEFEF" }}>
                    {item.productName || "Unnamed Product"}
                  </h5>

                  <p className="card-text"><strong style={{ color: "#333446" }}>Current Stock:</strong> {item.currentStock}</p>
                  <p className="card-text"><strong style={{ color: "#333446" }}>Reorder Point:</strong> {item.reorderPoint}</p>
                  <p className="card-text"><strong style={{ color: "#333446" }}>Max Stock:</strong> {item.maxStock}</p>
                  <p className="card-text"><strong style={{ color: "#333446" }}>Cost per Unit:</strong> ₹{item.costPerUnit}</p>
                  <p className="card-text"><strong style={{ color: "#333446" }}>Last Restock:</strong> {item.lastRestockDate || "N/A"}</p>
                  <p className="card-text"><strong style={{ color: "#333446" }}>Location:</strong> {item.location}</p>

                  <div className="d-flex gap-2 mt-3 flex-wrap">
                    <Link
                      to={`/edit-inventory/${item.id}`}
                      className="btn w-50"
                      style={{
                        backgroundColor: "#333446",
                        color: "white",
                        borderRadius: "10px",
                        fontWeight: "bold",
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#222233"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#333446"}
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
