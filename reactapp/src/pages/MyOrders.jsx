// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // function MyOrders() {
// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();

// //   const customerId = localStorage.getItem("userId");

// //   useEffect(() => {
// //     if (!customerId) {
// //       console.error("No userId found in localStorage");
// //       setLoading(false);
// //       return;
// //     }

// //     fetch(`http://localhost:8080/orders/bycustomer/${customerId}`)
// //       .then((res) => res.json())
// //       .then((data) => {
// //         if (Array.isArray(data)) setOrders(data);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         console.error("Error fetching orders:", err);
// //         setLoading(false);
// //       });
// //   }, [customerId]);

// //   if (loading) {
// //     return <div className="text-center mt-5" style={{ color: "#333446" }}>Loading your orders...</div>;
// //   }

// //   if (orders.length === 0) {
// //     return <div className="text-center mt-5" style={{ color: "#333446" }}>You have not placed any orders yet.</div>;
// //   }

// //   return (
// //     <div
// //       className="min-vh-100 py-5"
// //       style={{ backgroundColor: "#EAEFEF", padding: "50px 20px" }}
// //     >
// //       <div className="container">
// //         <h2 className="text-center mb-4 fw-bold" style={{ color: "#333446" }}>My Orders</h2>
// //         <div className="row g-4">
// //           {orders.map((order) => (
// //             <div className="col-md-12" key={order.id}>
// //               <div
// //                 className="card p-4 shadow-lg"
// //                 style={{ borderRadius: "15px", backgroundColor: "#fff", color: "#333446" }}
// //               >
// //                 <h5 className="fw-bold">Order ID: {order.id}</h5>
// //                 <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
// //                 <p><strong>Order Status:</strong> {order.orderStatus}</p>
// //                 <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
// //                 <p><strong>Total Amount:</strong> ₹{order.totalAmount.toFixed(2)}</p>
                
// //                 <h6 className="mt-3 fw-bold">Items:</h6>
// //                 <ul style={{ paddingLeft: "20px" }}>
// //                   {order.orderItems?.map((item) => (
// //                     <li key={item.id}>
// //                       {item.productName} - Qty: {item.quantity} - ₹{item.totalPrice.toFixed(2)}
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         <div className="text-center mt-4">
// //           {/* <button
// //             className="px-4 py-2 fw-bold"
// //             style={{
// //               backgroundColor: "#7F8CAA",
// //               color: "#fff",
// //               border: "none",
// //               borderRadius: "10px",
// //             }}
// //             onClick={() => navigate("/customer-home")}
// //           >
// //             Back to Home
// //           </button> */}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default MyOrders;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const customerId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!customerId || !token) {
      alert("Please log in to view your orders.");
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:8080/orders/bycustomer/${customerId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401 || res.status === 403) {
          alert("You are not authorized. Please login again.");
          navigate("/login");
          return;
        }

        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();
        if (Array.isArray(data)) setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        alert("Error fetching your orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerId, token, navigate]);

  if (loading) {
    return <div className="text-center mt-5" style={{ color: "#333446" }}>Loading your orders...</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center mt-5" style={{ color: "#333446" }}>You have not placed any orders yet.</div>;
  }

  return (
    <div
      className="min-vh-100 py-5"
      style={{ backgroundColor: "#EAEFEF", padding: "50px 20px" }}
    >
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
      <div className="container">
        <h2 className="text-center mb-4 fw-bold" style={{ color: "#333446" }}>My Orders</h2>
        <div className="row g-4">
          {orders.map((order) => (
            <div className="col-md-12" key={order.id}>
              <div
                className="card p-4 shadow-lg"
                style={{ borderRadius: "15px", backgroundColor: "#fff", color: "#333446" }}
              >
                <h5 className="fw-bold">Order ID: {order.id}</h5>
                <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                <p><strong>Order Status:</strong> {order.orderStatus}</p>
                <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
                <p><strong>Total Amount:</strong> ₹{order.totalAmount.toFixed(2)}</p>

                <h6 className="mt-3 fw-bold">Items:</h6>
                <ul style={{ paddingLeft: "20px" }}>
                  {order.orderItems?.map((item) => (
                    <li key={item.id}>
                      {item.productName} - Qty: {item.quantity} - ₹{item.totalPrice.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          {/* <button
            className="px-4 py-2 fw-bold"
            style={{
              backgroundColor: "#7F8CAA",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
            }}
            onClick={() => navigate("/customer-home")}
          >
            Back to Home
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default MyOrders;