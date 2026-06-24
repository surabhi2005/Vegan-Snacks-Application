// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function Cart() {
//   const [cartItems, setCartItems] = useState([]);
//   const [imagesMap, setImagesMap] = useState({}); // { productId: [images] }
//   const shipping = 50; 
//   const packing = 20;
//   const customerId = localStorage.getItem("userId");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartItems(cart);

//     // Fetch images for each product in the cart
//     cart.forEach(item => {
//       fetch(`http://localhost:8080/product-images/product/${item.id}`)
//         .then(res => res.json())
//         .then(images => {
//           setImagesMap(prev => ({ ...prev, [item.id]: images }));
//         })
//         .catch(err => console.error("Error fetching images for product", item.id, err));
//     });
//   }, []);

//   const handleQuantityChange = (id, qty) => {
//     const updatedCart = cartItems.map(item =>
//       item.id === id ? { ...item, quantity: qty } : item
//     );
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const handleDelete = (id) => {
//     const updatedCart = cartItems.filter(item => item.id !== id);
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const gst = subtotal * 0.18;
//   const total = subtotal + gst + shipping + packing;

//   const handlePayment = async () => {
//     if (!customerId) {
//       alert("Please log in to place an order.");
//       return;
//     }

//     const orderPayload = {
//       orderDate: new Date().toISOString(),
//       orderStatus: "PENDING",
//       paymentStatus: "PAID",
//       totalAmount: total,
//       customer: { id: customerId },
//       orderItems: cartItems.map(item => ({
//         product: { id: item.id },
//         quantity: item.quantity,
//         unitPrice: item.price,
//         totalPrice: item.price * item.quantity
//       }))
//     };

//     try {
//       const response = await fetch("http://localhost:8080/orders/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(orderPayload)
//       });

//       if (!response.ok) throw new Error("Failed to place order");

//       const savedOrder = await response.json();
//        //alert(`Payment of ₹${total.toFixed(2)} successful! Order ID: ${savedOrder.id}`);

//       localStorage.removeItem("cart");
//       setCartItems([]);
//     } catch (error) {
//       console.error("Error placing order:", error);
//       alert("Failed to place order. Please try again.");
//     }
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div className="text-center mt-5">
//         <h3>Your cart is empty.</h3>
//         <button
//           className="px-4 py-2 fw-bold mt-3"
//           style={{ backgroundColor: "#7F8CAA", color: "#EAEFEF", border: "none", borderRadius: "10px" }}
//           onClick={() => navigate("/customer-home")}
//         >
//           Back to Home
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-vh-100 py-5" style={{ backgroundColor: "#EAEFEF", padding: "50px 20px" }}>
//       <div className="container">
//         <h2 className="text-center mb-5 fw-bold" style={{ color: "#333446" }}>My Cart</h2>

//         <div className="row g-4">
//           {cartItems.map(item => (
//             <div className="col-md-6" key={item.id}>
//               <div className="card shadow p-3" style={{ borderRadius: "15px", backgroundColor: "#fff" }}>
                
//                 {/* Render first product image */}
//                 {imagesMap[item.id] && imagesMap[item.id].length > 0 && (
//                   <img
//                     src={imagesMap[item.id][0].imageUrl} // first image as thumbnail
//                     alt={imagesMap[item.id][0].altText || item.snackName}
//                     style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px", marginBottom: "12px" }}
//                   />
//                 )}

//                 <h5 className="fw-bold">{item.snackName}</h5>
//                 <p>Price: ₹{item.price}</p>
//                 <p>
//                   Quantity:
//                   <input
//                     type="number"
//                     value={item.quantity}
//                     min="1"
//                     className="ms-2"
//                     style={{ width: "60px" }}
//                     onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
//                   />
//                 </p>
//                 <p>Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</p>
//                 <button
//                   className="btn btn-danger mt-2"
//                   style={{ borderRadius: "10px" }}
//                   onClick={() => handleDelete(item.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-5 p-4 shadow-lg rounded" style={{ backgroundColor: "#fff", borderRadius: "15px" }}>
//           <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
//           <p>GST (18%): ₹{gst.toFixed(2)}</p>
//           <p>Shipping: ₹{shipping.toFixed(2)}</p>
//           <p>Packing: ₹{packing.toFixed(2)}</p>
//           <h4>Total: ₹{total.toFixed(2)}</h4>

//           <div className="d-flex gap-3 mt-3">
//             {/* <button
//               className="px-4 py-2 fw-bold"
//               style={{ backgroundColor: "#7F8CAA", color: "#EAEFEF", border: "none", borderRadius: "10px" }}
//               onClick={() => navigate("/customer-home")}
//             >
//               Back to Home
//             </button> */}

//             <button
//               className="px-4 py-2 fw-bold"
//               style={{ backgroundColor: "#333446", color: "#EAEFEF", border: "none", borderRadius: "10px" }}
//               onClick={handlePayment}
//             >
//               Proceed to Payment
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Cart;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [imagesMap, setImagesMap] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const shipping = 50;
  const packing = 20;
  const navigate = useNavigate();

  const customerId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || !customerId) {
      alert("Please login to access your cart.");
      navigate("/login");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);

    // Fetch images for each product in cart
    cart.forEach(item => {
      fetch(`http://localhost:8080/product-images/product/${item.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.ok ? res.json() : [])
        .then(images => setImagesMap(prev => ({ ...prev, [item.id]: images })))
        .catch(err => console.error("Error fetching images for product", item.id, err));
    });
  }, [navigate, token, customerId]);

  const handleQuantityChange = (id, qty) => {
    const updatedCart = cartItems.map(item => item.id === id ? { ...item, quantity: qty } : item);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDelete = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst + shipping + packing;

  const handlePayment = async () => {
    if (!customerId) {
      alert("Please login to place an order.");
      navigate("/login");
      return;
    }

    const orderPayload = {
      orderDate: new Date().toISOString(),
      orderStatus: "PENDING",
      paymentStatus: "PAID",
      totalAmount: total,
      customer: { id: customerId },
      orderItems: cartItems.map(item => ({
        product: { id: item.id },
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.price * item.quantity
      }))
    };

    try {
      const res = await fetch("http://localhost:8080/orders/add", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(orderPayload)
      });

      if (res.status === 401 || res.status === 403) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!res.ok) throw new Error("Failed to place order");

      const savedOrder = await res.json();
      localStorage.removeItem("cart");
      setCartItems([]);
      alert(`Payment of ₹${total.toFixed(2)} successful! Order ID: ${savedOrder.id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Please try again.");
    }
  };

  const renderImages = (itemId) => (imagesMap[itemId] || []).map(img => (
    <img
      key={img.id}
      src={img.imageUrl}
      alt={img.altText || ""}
      style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }}
    />
  ));

  if (selectedItem) {
    return (
      <div className="min-vh-100 py-5 d-flex flex-column align-items-center" style={{ backgroundColor: "#EAEFEF", padding: "50px 20px" }}>
        
        <div className="container" style={{ maxWidth: "700px" }}>
          <h2 className="text-center mb-4 fw-bold" style={{ color: "#333446" }}>{selectedItem.snackName}</h2>
          <div className="card p-4 shadow-lg" style={{ borderRadius: "15px", backgroundColor: "#fff", color: "#333446" }}>
            {renderImages(selectedItem.id)}
            <p><strong>Price:</strong> ₹{selectedItem.price}</p>
            <p><strong>Quantity:</strong> {selectedItem.quantity}</p>
            <p><strong>Subtotal:</strong> ₹{(selectedItem.price * selectedItem.quantity).toFixed(2)}</p>
          </div>

          <div className="d-flex gap-3 mt-4 justify-content-center flex-wrap">
            <button
              className="px-4 py-2 fw-bold"
              style={{ backgroundColor: "#333446", color: "#fff", border: "none", borderRadius: "10px" }}
              onClick={handlePayment}
            >
              Proceed to Payment
            </button>
            <button
              className="px-4 py-2 fw-bold"
              style={{ backgroundColor: "#EAEFEF", color: "#333446", border: "2px solid #7F8CAA", borderRadius: "10px" }}
              onClick={() => setSelectedItem(null)}
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-5">
        <h3>Your cart is empty.</h3>
        <button
          className="px-4 py-2 fw-bold mt-3"
          style={{ backgroundColor: "#7F8CAA", color: "#EAEFEF", border: "none", borderRadius: "10px" }}
          onClick={() => navigate("/customer-home")}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold" style={{ color: "#333446" }}>My Cart</h2>
      <div className="row g-4">
        {cartItems.map(item => (
          <div className="col-md-6" key={item.id}>
            <div className="card p-3 shadow-sm h-100" style={{ borderRadius: "15px", backgroundColor: "#EAEFEF", color: "#333446" }}>
              {renderImages(item.id)}
              <h5 className="fw-bold">{item.snackName}</h5>
              <p><strong>Price:</strong> ₹{item.price}</p>
              <p>
                Quantity:
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  className="ms-2"
                  style={{ width: "60px" }}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                />
              </p>
              <p><strong>Subtotal:</strong> ₹{(item.price * item.quantity).toFixed(2)}</p>
              <div className="d-flex flex-wrap gap-2 mt-2">
                <button
                  className="px-3 py-1 fw-bold"
                  style={{ backgroundColor: "#7F8CAA", color: "#fff", border: "none", borderRadius: "10px" }}
                  onClick={() => setSelectedItem(item)}
                >
                  View Details
                </button>
                <button
                  className="px-3 py-1 fw-bold btn-danger"
                  style={{ borderRadius: "10px" }}
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 p-4 shadow-lg rounded" style={{ backgroundColor: "#fff", borderRadius: "15px" }}>
        <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
        <p>GST (18%): ₹{gst.toFixed(2)}</p>
        <p>Shipping: ₹{shipping.toFixed(2)}</p>
        <p>Packing: ₹{packing.toFixed(2)}</p>
        <h4>Total: ₹{total.toFixed(2)}</h4>

        <div className="d-flex gap-3 mt-3">
          <button
            className="px-4 py-2 fw-bold"
            style={{ backgroundColor: "#333446", color: "#fff", border: "none", borderRadius: "10px" }}
            onClick={handlePayment}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
