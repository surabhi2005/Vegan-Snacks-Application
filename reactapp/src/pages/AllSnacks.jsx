// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";

// // export default function AllSnacks() {
// //   const [snacks, setSnacks] = useState([]);
// //   const [imagesMap, setImagesMap] = useState({});
// //   const [selectedSnack, setSelectedSnack] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchSnacks = async () => {
// //       const token = localStorage.getItem("token");
// //       if (!token) {
// //         navigate("/login");
// //         return;
// //       }

// //       try {
// //         const res = await fetch("http://localhost:8080/snacks/getAllVeganSnacks", {
// //           headers: {
// //             "Authorization": `Bearer ${token}`,
// //             "Content-Type": "application/json",
// //           },
// //         });
// //         if (!res.ok) {
// //           if (res.status === 401 || res.status === 403) {
// //             alert("Session expired. Please login again.");
// //             localStorage.removeItem("token");
// //             navigate("/login");
// //           }
// //           throw new Error(`HTTP error! status: ${res.status}`);
// //         }
// //         const data = await res.json();
// //         setSnacks(Array.isArray(data) ? data : []);
// //         const imagePromises = data.map(async (snack) => {
// //           const imgRes = await fetch(
// //             `http://localhost:8080/product-images/product/${snack.id}`,
// //             { headers: { "Authorization": `Bearer ${token}` } }
// //           );
// //           if (!imgRes.ok) return [];
// //           return imgRes.json();
// //         });
// //         const imagesArr = await Promise.all(imagePromises);
// //         const map = {};
// //         data.forEach((snack, i) => { map[snack.id] = imagesArr[i]; });
// //         setImagesMap(map);
// //       } catch (err) {
// //         console.error("Error fetching snacks:", err.message);
// //       }
// //     };

// //     fetchSnacks();
// //   }, [navigate]);

// //   const handleAddToCart = (snack) => {
// //     const cart = JSON.parse(localStorage.getItem("cart")) || [];
// //     const existing = cart.find(item => item.id === snack.id);
// //     if (existing) existing.quantity += 1;
// //     else cart.push({ ...snack, quantity: 1 });
// //     localStorage.setItem("cart", JSON.stringify(cart));
// //     alert(`"${snack.snackName}" added to cart!`);
// //   };

// //   const handleGiveFeedback = (snack) => navigate(`/addfeedback/${snack.id}`);
// //   const filteredSnacks = snacks.filter(snack =>
// //     snack.snackName.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   const renderImages = (snackId) => (imagesMap[snackId] || []).map(img => (
// //     <img key={img.id} src={img.imageUrl} alt={img.altText || ""} style={{
// //       width: "100%", maxHeight: "200px", objectFit: "cover",
// //       borderRadius: "8px", marginBottom: "10px"
// //     }} />
// //   ));

// //   if (selectedSnack) {
// //     return (
// //       <div className="min-vh-100 py-5 d-flex flex-column align-items-center" style={{ backgroundColor: "#EAEFEF", padding: "50px 20px" }}>
// //         <div className="container" style={{ maxWidth: "700px" }}>
// //           <h2 className="text-center mb-4 fw-bold" style={{ color: "#333446" }}>{selectedSnack.snackName}</h2>
// //           <div className="card p-4 shadow-lg" style={{ borderRadius: "15px", backgroundColor: "#fff", color: "#333446" }}>
// //             {renderImages(selectedSnack.id)}
// //             <p><strong>Type:</strong> {selectedSnack.snackType}</p>
// //             <p><strong>Description:</strong> {selectedSnack.description}</p>
// //             <p><strong>Ingredients:</strong> {selectedSnack.ingredients}</p>
// //             <p><strong>Quantity:</strong> {selectedSnack.quantity}</p>
// //             <p><strong>Price:</strong> ₹{selectedSnack.price}</p>
// //             <p><strong>Expiry (Months):</strong> {selectedSnack.expiryInMonths}</p>
// //             <p><strong>SKU:</strong> {selectedSnack.sku}</p>
// //             <p><strong>Status:</strong> {selectedSnack.status}</p>
// //             <p><strong>Created Date:</strong> {new Date(selectedSnack.createdDate).toLocaleDateString()}</p>
// //             <p><strong>Vendor Name:</strong> {selectedSnack.vendorName}</p>
// //           </div>

// //           <div className="d-flex gap-3 mt-4 justify-content-center flex-wrap">
// //             <button className="px-4 py-2 fw-bold" style={{ backgroundColor: "#7F8CAA", color: "#fff", border: "none", borderRadius: "10px" }}
// //               onClick={() => handleAddToCart(selectedSnack)}>Add to Cart</button>
// //             <button className="px-4 py-2 fw-bold" style={{ backgroundColor: "#333446", color: "#fff", border: "none", borderRadius: "10px" }}
// //               onClick={() => handleGiveFeedback(selectedSnack)}>Give Feedback</button>
// //             <button className="px-4 py-2 fw-bold" style={{ backgroundColor: "#EAEFEF", color: "#333446", border: "2px solid #7F8CAA", borderRadius: "10px" }}
// //               onClick={() => setSelectedSnack(null)}>Back to All Snacks</button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="container my-5">
// //       <h2 className="text-center mb-4 fw-bold" style={{ color: "#333446" }}>All Vegan Snacks</h2>
// //       <div className="d-flex justify-content-center mb-4">
// //         <input type="text" placeholder="Search snacks by name..." className="form-control" style={{ maxWidth: "400px", borderRadius: "10px", border: "2px solid #7F8CAA" }}
// //           value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
// //       </div>

// //       <div className="row g-4">
// //         {filteredSnacks.length > 0 ? filteredSnacks.map(snack => (
// //           <div className="col-md-6" key={snack.id}>
// //             <div className="card p-3 shadow-sm h-100" style={{ borderRadius: "15px", backgroundColor: "#EAEFEF", color: "#333446" }}>
// //               {renderImages(snack.id)}
// //               <h5 className="fw-bold">{snack.snackName}</h5>
// //               <p><strong>Type:</strong> {snack.snackType}</p>
// //               <p><strong>Price:</strong> ₹{snack.price}</p>
// //               <p><strong>Status:</strong> {snack.status}</p>
// //               <div className="d-flex flex-wrap gap-2 mt-2">
// //                 <button onClick={() => setSelectedSnack(snack)} className="px-3 py-1 fw-bold" style={{ backgroundColor: "#EAEFEF", border: "2px solid #7F8CAA", color: "#333446", borderRadius: "10px" }}>More Details</button>
// //                 <button onClick={() => handleAddToCart(snack)} className="px-3 py-1 fw-bold" style={{ backgroundColor: "#7F8CAA", color: "#fff", border: "none", borderRadius: "10px" }}>Add to Cart</button>
// //                 <button onClick={() => handleGiveFeedback(snack)} className="px-3 py-1 fw-bold" style={{ backgroundColor: "#333446", color: "#fff", border: "none", borderRadius: "10px" }}>Give Feedback</button>
// //               </div>
// //             </div>
// //           </div>
// //         )) : <p className="text-center text-muted">No snacks match your search.</p>}
// //       </div>
// //     </div>
// //   );
// // // }


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AllSnacks() {
//   const [snacks, setSnacks] = useState([]);
//   const [imagesMap, setImagesMap] = useState({});
//   const [selectedSnack, setSelectedSnack] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedType, setSelectedType] = useState("All"); // NEW STATE
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSnacks = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       try {
//         const res = await fetch("http://localhost:8080/snacks/getAllVeganSnacks", {
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });
//         if (!res.ok) {
//           if (res.status === 401 || res.status === 403) {
//             alert("Session expired. Please login again.");
//             localStorage.removeItem("token");
//             navigate("/login");
//           }
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         const data = await res.json();
//         setSnacks(Array.isArray(data) ? data : []);

//         const imagePromises = data.map(async (snack) => {
//           const imgRes = await fetch(
//             `http://localhost:8080/product-images/product/${snack.id}`,
//             { headers: { "Authorization": `Bearer ${token}` } }
//           );
//           if (!imgRes.ok) return [];
//           return imgRes.json();
//         });
//         const imagesArr = await Promise.all(imagePromises);
//         const map = {};
//         data.forEach((snack, i) => { map[snack.id] = imagesArr[i]; });
//         setImagesMap(map);
//       } catch (err) {
//         console.error("Error fetching snacks:", err.message);
//       }
//     };

//     fetchSnacks();
//   }, [navigate]);

//   const handleAddToCart = (snack) => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existing = cart.find(item => item.id === snack.id);
//     if (existing) existing.quantity += 1;
//     else cart.push({ ...snack, quantity: 1 });
//     localStorage.setItem("cart", JSON.stringify(cart));
//     alert(`"${snack.snackName}" added to cart!`);
//   };

//   const handleGiveFeedback = (snack) => navigate(`/addfeedback/${snack.id}`);

//   // ✅ Combined Search + Type Filtering
//   const filteredSnacks = snacks.filter(snack =>
//     snack.snackName.toLowerCase().includes(searchTerm.toLowerCase()) &&
//     (selectedType === "All" || snack.snackType === selectedType)
//   );

//   const renderImages = (snackId) => (imagesMap[snackId] || []).map(img => (
//     <img key={img.id} src={img.imageUrl} alt={img.altText || ""} style={{
//       width: "100%", maxHeight: "200px", objectFit: "cover",
//       borderRadius: "8px", marginBottom: "10px"
//     }} />
//   ));

//   // ✅ Collect all snack types dynamically
//   const snackTypes = ["All", ...new Set(snacks.map(snack => snack.snackType))];

//   if (selectedSnack) {
//     return (
//       <div className="min-vh-100 py-5 d-flex flex-column align-items-center" style={{ backgroundColor: "#EAEFEF", padding: "50px 20px" }}>
//         <div className="container" style={{ maxWidth: "700px" }}>
          
//           <h2 className="text-center mb-4 fw-bold" style={{ color: "#333446" }}>{selectedSnack.snackName}</h2>
//           <div className="card p-4 shadow-lg" style={{ borderRadius: "15px", backgroundColor: "#fff", color: "#333446" }}>
//             {renderImages(selectedSnack.id)}
//             <p><strong>Type:</strong> {selectedSnack.snackType}</p>
//             <p><strong>Description:</strong> {selectedSnack.description}</p>
//             <p><strong>Ingredients:</strong> {selectedSnack.ingredients}</p>
//             <p><strong>Quantity:</strong> {selectedSnack.quantity}</p>
//             <p><strong>Price:</strong> ₹{selectedSnack.price}</p>
//             <p><strong>Expiry (Months):</strong> {selectedSnack.expiryInMonths}</p>
//             <p><strong>SKU:</strong> {selectedSnack.sku}</p>
//             <p><strong>Status:</strong> {selectedSnack.status}</p>
//             <p><strong>Created Date:</strong> {new Date(selectedSnack.createdDate).toLocaleDateString()}</p>
//             <p><strong>Vendor Name:</strong> {selectedSnack.vendorName}</p>
//           </div>

//           <div className="d-flex gap-3 mt-4 justify-content-center flex-wrap">
//             <button className="px-4 py-2 fw-bold" style={{ backgroundColor: "#7F8CAA", color: "#fff", border: "none", borderRadius: "10px" }}
//               onClick={() => handleAddToCart(selectedSnack)}>Add to Cart</button>
//             <button className="px-4 py-2 fw-bold" style={{ backgroundColor: "#333446", color: "#fff", border: "none", borderRadius: "10px" }}
//               onClick={() => handleGiveFeedback(selectedSnack)}>Give Feedback</button>
//             <button className="px-4 py-2 fw-bold" style={{ backgroundColor: "#EAEFEF", color: "#333446", border: "2px solid #7F8CAA", borderRadius: "10px" }}
//               onClick={() => setSelectedSnack(null)}>Back to All Snacks</button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container my-5">
//       <h2 className="text-center mb-4 fw-bold" style={{ color: "#333446" }}>All Vegan Snacks</h2>

//       {/* ✅ Search + Type Filter Controls */}
//       <div className="d-flex flex-wrap justify-content-center mb-4 gap-3">
//         <input type="text" placeholder="Search snacks by name..." className="form-control"
//           style={{ maxWidth: "400px", borderRadius: "10px", border: "2px solid #7F8CAA" }}
//           value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />

//         <select className="form-select" style={{ maxWidth: "200px", borderRadius: "10px", border: "2px solid #7F8CAA" }}
//           value={selectedType} onChange={e => setSelectedType(e.target.value)}>
//           {snackTypes.map(type => <option key={type} value={type}>{type}</option>)}
//         </select>
//       </div>

//       <div className="row g-4">
//         {filteredSnacks.length > 0 ? filteredSnacks.map(snack => (
//           <div className="col-md-6" key={snack.id}>
//             <div className="card p-3 shadow-sm h-100" style={{ borderRadius: "15px", backgroundColor: "#EAEFEF", color: "#333446" }}>
//               {renderImages(snack.id)}
//               <h5 className="fw-bold">{snack.snackName}</h5>
//               <p><strong>Type:</strong> {snack.snackType}</p>
//               <p><strong>Price:</strong> ₹{snack.price}</p>
//               <p><strong>Status:</strong> {snack.status}</p>
//               <div className="d-flex flex-wrap gap-2 mt-2">
//                 <button onClick={() => setSelectedSnack(snack)} className="px-3 py-1 fw-bold" style={{ backgroundColor: "#EAEFEF", border: "2px solid #7F8CAA", color: "#333446", borderRadius: "10px" }}>More Details</button>
//                 <button onClick={() => handleAddToCart(snack)} className="px-3 py-1 fw-bold" style={{ backgroundColor: "#7F8CAA", color: "#fff", border: "none", borderRadius: "10px" }}>Add to Cart</button>
//                 <button onClick={() => handleGiveFeedback(snack)} className="px-3 py-1 fw-bold" style={{ backgroundColor: "#333446", color: "#fff", border: "none", borderRadius: "10px" }}>Give Feedback</button>
//               </div>
//             </div>
//           </div>
//         )) : <p className="text-center text-muted">No snacks match your search.</p>}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AllSnacks() {
  const [snacks, setSnacks] = useState([]);
  const [imagesMap, setImagesMap] = useState({});
  const [selectedSnack, setSelectedSnack] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All"); // NEW STATE
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSnacks = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/snacks/getAllVeganSnacks", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            alert("Session expired. Please login again.");
            localStorage.removeItem("token");
            navigate("/login");
          }
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setSnacks(Array.isArray(data) ? data : []);

        const imagePromises = data.map(async (snack) => {
          const imgRes = await fetch(
            `http://localhost:8080/product-images/product/${snack.id}`,
            { headers: { "Authorization": `Bearer ${token}` } }
          );
          if (!imgRes.ok) return [];
          return imgRes.json();
        });
        const imagesArr = await Promise.all(imagePromises);
        const map = {};
        data.forEach((snack, i) => { map[snack.id] = imagesArr[i]; });
        setImagesMap(map);
      } catch (err) {
        console.error("Error fetching snacks:", err.message);
      }
    };

    fetchSnacks();
  }, [navigate]);

  const handleAddToCart = (snack) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.id === snack.id);
    if (existing) existing.quantity += 1;
    else cart.push({ ...snack, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`"${snack.snackName}" added to cart!`);
  };

  const handleGiveFeedback = (snack) => navigate(`/addfeedback/${snack.id}`);

  // ✅ Combined Search + Type Filtering
  const filteredSnacks = snacks.filter(snack =>
    snack.snackName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedType === "All" || snack.snackType === selectedType)
  );

  const renderImages = (snackId) => (imagesMap[snackId] || []).map(img => (
    <img key={img.id} src={img.imageUrl} alt={img.altText || ""} style={{
      width: "100%", maxHeight: "200px", objectFit: "cover",
      borderRadius: "8px", marginBottom: "10px"
    }} />
  ));

  // ✅ Collect all snack types dynamically
  const snackTypes = ["All", ...new Set(snacks.map(snack => snack.snackType))];

  if (selectedSnack) {
    return (
      <div className="min-vh-100 py-5 d-flex flex-column align-items-center" style={{ backgroundColor: "#EAEFEF", padding: "50px 20px" }}>
        <div className="container" style={{ maxWidth: "700px" }}>
          
          <h2 className="text-center mb-4 fw-bold" style={{ color: "#333446" }}>{selectedSnack.snackName}</h2>
          <div className="card p-4 shadow-lg" style={{ borderRadius: "15px", backgroundColor: "#fff", color: "#333446" }}>
            {renderImages(selectedSnack.id)}
            <p><strong>Type:</strong> {selectedSnack.snackType}</p>
            <p><strong>Description:</strong> {selectedSnack.description}</p>
            <p><strong>Ingredients:</strong> {selectedSnack.ingredients}</p>
            <p><strong>Quantity:</strong> {selectedSnack.quantity}</p>
            <p><strong>Price:</strong> ₹{selectedSnack.price}</p>
            <p><strong>Expiry (Months):</strong> {selectedSnack.expiryInMonths}</p>
            <p><strong>SKU:</strong> {selectedSnack.sku}</p>
            <p><strong>Status:</strong> {selectedSnack.status}</p>
            <p><strong>Created Date:</strong> {new Date(selectedSnack.createdDate).toLocaleDateString()}</p>
            <p><strong>Vendor Name:</strong> {selectedSnack.vendorName}</p>
          </div>

          <div className="d-flex gap-3 mt-4 justify-content-center flex-wrap">
            <button className="px-4 py-2 fw-bold" style={{ backgroundColor: "#7F8CAA", color: "#fff", border: "none", borderRadius: "10px" }}
              onClick={() => handleAddToCart(selectedSnack)}>Add to Cart</button>
            <button className="px-4 py-2 fw-bold" style={{ backgroundColor: "#333446", color: "#fff", border: "none", borderRadius: "10px" }}
              onClick={() => handleGiveFeedback(selectedSnack)}>Give Feedback</button>
            <button className="px-4 py-2 fw-bold" style={{ backgroundColor: "#EAEFEF", color: "#333446", border: "2px solid #7F8CAA", borderRadius: "10px" }}
              onClick={() => setSelectedSnack(null)}>Back to All Snacks</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
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
      <h2 className="text-center mb-4 fw-bold" style={{ color: "#333446" }}>All Vegan Snacks</h2>

      {/* ✅ Search + Type Filter Controls */}
      <div className="d-flex flex-wrap justify-content-center mb-4 gap-3">
        <input type="text" placeholder="Search snacks by name..." className="form-control"
          style={{ maxWidth: "400px", borderRadius: "10px", border: "2px solid #7F8CAA" }}
          value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />

        <select className="form-select" style={{ maxWidth: "200px", borderRadius: "10px", border: "2px solid #7F8CAA" }}
          value={selectedType} onChange={e => setSelectedType(e.target.value)}>
          {snackTypes.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
      </div>

      <div className="row g-4">
        {filteredSnacks.length > 0 ? filteredSnacks.map(snack => (
          <div className="col-md-6" key={snack.id}>
            <div className="card p-3 shadow-sm h-100" style={{ borderRadius: "15px", backgroundColor: "#EAEFEF", color: "#333446" }}>
              {renderImages(snack.id)}
              <h5 className="fw-bold">{snack.snackName}</h5>
              <p><strong>Type:</strong> {snack.snackType}</p>
              <p><strong>Price:</strong> ₹{snack.price}</p>
              <p><strong>Status:</strong> {snack.status}</p>
              <div className="d-flex flex-wrap gap-2 mt-2">
                <button onClick={() => setSelectedSnack(snack)} className="px-3 py-1 fw-bold" style={{ backgroundColor: "#EAEFEF", border: "2px solid #7F8CAA", color: "#333446", borderRadius: "10px" }}>More Details</button>
                <button onClick={() => handleAddToCart(snack)} className="px-3 py-1 fw-bold" style={{ backgroundColor: "#7F8CAA", color: "#fff", border: "none", borderRadius: "10px" }}>Add to Cart</button>
                <button onClick={() => handleGiveFeedback(snack)} className="px-3 py-1 fw-bold" style={{ backgroundColor: "#333446", color: "#fff", border: "none", borderRadius: "10px" }}>Give Feedback</button>
              </div>
            </div>
          </div>
        )) : <p className="text-center text-muted">No snacks match your search.</p>}
      </div>
    </div>
  );
}
