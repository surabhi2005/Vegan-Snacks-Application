// import React, { useState, useEffect } from "react";

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:8080/orders/all")
//       .then(res => {
//         if (!res.ok) throw new Error("Failed to fetch orders");
//         return res.json();
//       })
//       .then(data => {
//         setOrders(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p style={{ padding: "20px" }}>Loading orders...</p>;
//   if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;

//   return (
//     <div style={{ padding: "30px", backgroundColor: "#EAEFEF", minHeight: "100vh" }}>
//       <h2 style={{ color: "#333446", marginBottom: "20px" }}>All Orders</h2>

//       {orders.map(order => (
//         <div key={order.id} style={{ marginBottom: "30px", backgroundColor: "#fff", padding: "15px", borderRadius: "10px" }}>
//           <h3>Order #{order.id}</h3>
//           <p><strong>Customer:</strong> {order.customerUsername} (ID: {order.customerId})</p>
//           <p><strong>Order Date:</strong> {order.orderDate ? new Date(order.orderDate).toLocaleString() : "-"}</p>
//           <p><strong>Status:</strong> {order.orderStatus} | <strong>Payment:</strong> {order.paymentStatus}</p>
//           <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>

//           <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
//             <thead>
//               <tr style={{ backgroundColor: "#7F8CAA", color: "#fff" }}>
//                 <th style={styles.th}>Product Name</th>
//                 <th style={styles.th}>Quantity</th>
//                 <th style={styles.th}>Unit Price</th>
//                 <th style={styles.th}>Total Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               {order.orderItems.map(item => (
//                 <tr key={item.id} style={{ borderBottom: "1px solid #ccc" }}>
//                   <td style={styles.td}>{item.productName}</td>
//                   <td style={styles.td}>{item.quantity}</td>
//                   <td style={styles.td}>₹{item.unitPrice}</td>
//                   <td style={styles.td}>₹{item.totalPrice}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ))}
//     </div>
//   );
// };

// const styles = {
//   th: { padding: "12px", textAlign: "left" },
//   td: { padding: "12px" },
// };

// export default AdminOrders;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // If no token, redirect to login
      navigate("/login");
      return;
    }

    fetch("http://localhost:8080/orders/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          throw new Error("Unauthorized. Please login again.");
        }
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <p style={{ padding: "20px" }}>Loading orders...</p>;
  if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "30px", backgroundColor: "#EAEFEF", minHeight: "100vh" }}>
      <button
        onClick={() => navigate("/admin")}
        style={{
          fontSize: "24px",
          background: "none",
          border: "none",
          cursor: "pointer",
          marginBottom: "15px",
        }}
      >
        ☰
      </button>
      <h2 style={{ color: "#333446", marginBottom: "20px" }}>All Orders</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          style={{ marginBottom: "30px", backgroundColor: "#fff", padding: "15px", borderRadius: "10px" }}
        >
          <h3>Order #{order.id}</h3>
          <p>
            <strong>Customer:</strong> {order.customerUsername} (ID: {order.customerId})
          </p>
          <p>
            <strong>Order Date:</strong>{" "}
            {order.orderDate ? new Date(order.orderDate).toLocaleString() : "-"}
          </p>
          <p>
            <strong>Status:</strong> {order.orderStatus} | <strong>Payment:</strong> {order.paymentStatus}
          </p>
          <p>
            <strong>Total Amount:</strong> ₹{order.totalAmount}
          </p>

          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
            <thead>
              <tr style={{ backgroundColor: "#7F8CAA", color: "#fff" }}>
                <th style={styles.th}>Product Name</th>
                <th style={styles.th}>Quantity</th>
                <th style={styles.th}>Unit Price</th>
                <th style={styles.th}>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #ccc" }}>
                  <td style={styles.td}>{item.productName}</td>
                  <td style={styles.td}>{item.quantity}</td>
                  <td style={styles.td}>₹{item.unitPrice}</td>
                  <td style={styles.td}>₹{item.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

const styles = {
  th: { padding: "12px", textAlign: "left" },
  td: { padding: "12px" },
};

export default AdminOrders;

