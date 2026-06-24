// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function DisplayVeganSnacks() {
//   const [snacks, setSnacks] = useState([]);
//   const [imagesMap, setImagesMap] = useState({});
//   const [selectedSnack, setSelectedSnack] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const vendorId = localStorage.getItem("vendorId");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!vendorId) return;

//     fetch(`http://localhost:8080/snacks/getbyvendorid/${vendorId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setSnacks(data);

//           data.forEach((snack) => {
//             fetch(`http://localhost:8080/product-images/product/${snack.id}`)
//               .then((res) => res.json())
//               .then((images) => {
//                 setImagesMap((prev) => ({ ...prev, [snack.id]: images }));
//               });
//           });
//         } else {
//           console.error("Expected an array but got:", data);
//         }
//       })
//       .catch((err) => console.error("Error fetching snacks:", err));
//   }, [vendorId]);

//   const styles = {
//     page: { backgroundColor: "white", minHeight: "100vh", padding: "20px" },
//     card: { backgroundColor: "#B8CFCE", border: "1px solid #7F8CAA", borderRadius: "12px" },
//     header: { color: "#333446", fontWeight: "bold" },
//     btnPrimary: { backgroundColor: "#333446", border: "none" },
//     btnSecondary: { backgroundColor: "#7F8CAA", border: "none" },
//     btnDanger: { backgroundColor: "#FF5C5C", border: "none" },
//     snackImage: { width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px", marginBottom: "12px" },
//     searchBar: {
//       maxWidth: "400px",
//       margin: "0 auto 20px auto",
//       borderRadius: "10px",
//       border: "2px solid #7F8CAA",
//     },
//   };

//   const renderImages = (snackId) => {
//     const images = imagesMap[snackId] || [];
//     return images.map((img) => (
//       <img key={img.id} src={img.imageUrl} alt={img.altText || ""} style={styles.snackImage} />
//     ));
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this snack?")) {
//       fetch(`http://localhost:8080/snacks/delete/${id}`, { method: "DELETE" })
//         .then((res) => {
//           if (!res.ok) throw new Error("Failed to delete snack");
//           setSnacks((prev) => prev.filter((snack) => snack.id !== id));
//           alert("Snack deleted successfully");
//         })
//         .catch((err) => {
//           console.error("Error deleting snack:", err);
//           alert("Failed to delete snack. Please try again.");
//         });
//     }
//   };

//   const filteredSnacks = snacks.filter((snack) =>
//     snack.snackName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (selectedSnack) {
//     return (
//       <div style={styles.page} className="container py-5">
//         <h2 className="text-center mb-4" style={styles.header}>
//           {selectedSnack.snackName}
//         </h2>
//         <div className="card p-4 shadow" style={styles.card}>
//           {renderImages(selectedSnack.id)}
//           <p><strong>Type:</strong> {selectedSnack.snackType}</p>
//           <p><strong>Description:</strong> {selectedSnack.description}</p>
//           <p><strong>Ingredients:</strong> {selectedSnack.ingredients}</p>
//           <p><strong>Quantity:</strong> {selectedSnack.quantity}</p>
//           <p><strong>Price:</strong> ₹{parseFloat(selectedSnack.price).toFixed(2)}</p>
//           <p><strong>Expiry (Months):</strong> {selectedSnack.expiryInMonths}</p>
//           <p><strong>SKU:</strong> {selectedSnack.sku}</p>
//           <p><strong>Status:</strong> {selectedSnack.status}</p>
//           <p><strong>Created Date:</strong> {new Date(selectedSnack.createdDate).toLocaleDateString()}</p>
//         </div>

//         <div className="d-flex flex-wrap gap-2 mt-4">
//           <button className="btn text-white" style={styles.btnSecondary} onClick={() => setSelectedSnack(null)}>Back to List</button>
//           <button className="btn text-white" style={styles.btnPrimary} onClick={() => navigate("/vendor-home")}>Back to Vendor Home</button>
//           <button
//             className="btn text-white"
//             style={{ ...styles.btnPrimary, backgroundColor: "#7F8CAA" }}
//             onClick={() => navigate(`/edit-snack/${selectedSnack.id}`)}
//           >
//             Edit Snack
//           </button>
//           <button
//             className="btn text-white"
//             style={styles.btnDanger}
//             onClick={() => handleDelete(selectedSnack.id)}
//           >
//             Delete Snack
//           </button>
//           {(!imagesMap[selectedSnack.id] || imagesMap[selectedSnack.id].length === 0) && (
//             <button
//               className="btn text-white mt-2"
//               style={{ ...styles.btnPrimary, backgroundColor: "#7F8CAA" }}
//               onClick={() => navigate(`/add-snack-images/${selectedSnack.id}`)}
//             >
//               Add Photo/Image
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.page} className="container py-5">
//       <h2 className="text-center mb-4" style={styles.header}>My Vegan Snacks</h2>

//       {/* Search Bar */}
//       <div className="d-flex justify-content-center mb-4">
//         <input
//           type="text"
//           placeholder="Search snacks by name..."
//           className="form-control"
//           style={styles.searchBar}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div className="row">
//         {filteredSnacks.length > 0 ? (
//           filteredSnacks.map((snack) => (
//             <div className="col-md-6 mb-4" key={snack.id}>
//               <div className="card p-3 shadow-sm h-100" style={styles.card}>
//                 {renderImages(snack.id)}
//                 <h5 className="card-title">{snack.snackName}</h5>
//                 <p><strong>Type:</strong> {snack.snackType}</p>
//                 <p><strong>Price:</strong> ₹{parseFloat(snack.price).toFixed(2)}</p>
//                 <p><strong>Status:</strong> {snack.status}</p>
//                 <div className="d-flex gap-2 mt-2 flex-wrap">
//                   <button className="btn text-white" style={styles.btnPrimary} onClick={() => setSelectedSnack(snack)}>More Details</button>
//                   <button className="btn text-white" style={{ ...styles.btnPrimary, backgroundColor: "#7F8CAA" }} onClick={() => navigate(`/edit-snack/${snack.id}`)}>Edit</button>
//                   <button className="btn text-white" style={styles.btnDanger} onClick={() => handleDelete(snack.id)}>Delete</button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-muted">No snacks match your search.</p>
//         )}
//       </div>

//       <div className="text-center mt-4">
//         {/* <button className="btn text-white" style={styles.btnPrimary} onClick={() => navigate("/vendor-home")}>
//           Back to Vendor Home
//         </button> */}
//       </div>
//     </div>
//   );
// }

// export default DisplayVeganSnacks;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DisplayVeganSnacks() {
  const [snacks, setSnacks] = useState([]);
  const [imagesMap, setImagesMap] = useState({});
  const [selectedSnack, setSelectedSnack] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const vendorId = localStorage.getItem("vendorId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch snacks for the vendor
  useEffect(() => {
    if (!vendorId || !token) return;

    fetch(`http://localhost:8080/snacks/getbyvendorid/${vendorId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch snacks");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setSnacks(data);

          // Fetch images for each snack
          data.forEach((snack) => {
            fetch(`http://localhost:8080/product-images/product/${snack.id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
              .then((res) => res.json())
              .then((images) => setImagesMap((prev) => ({ ...prev, [snack.id]: images })))
              .catch((err) => console.error("Error fetching images:", err));
          });
        } else {
          console.error("Expected an array but got:", data);
        }
      })
      .catch((err) => console.error("Error fetching snacks:", err));
  }, [vendorId, token]);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this snack?")) return;

    fetch(`http://localhost:8080/snacks/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete snack");
        setSnacks((prev) => prev.filter((snack) => snack.id !== id));
        alert("Snack deleted successfully");
      })
      .catch((err) => alert("Failed to delete snack: " + err.message));
  };

  const styles = {
    page: { backgroundColor: "white", minHeight: "100vh", padding: "20px" },
    card: { backgroundColor: "#B8CFCE", border: "1px solid #7F8CAA", borderRadius: "12px" },
    header: { color: "#333446", fontWeight: "bold" },
    btnPrimary: { backgroundColor: "#333446", border: "none" },
    btnSecondary: { backgroundColor: "#7F8CAA", border: "none" },
    btnDanger: { backgroundColor: "#FF5C5C", border: "none" },
    snackImage: { width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px", marginBottom: "12px" },
    searchBar: { maxWidth: "400px", margin: "0 auto 20px auto", borderRadius: "10px", border: "2px solid #7F8CAA" },
  };

  const renderImages = (snackId) => {
    const images = imagesMap[snackId] || [];
    return images.map((img) => (
      <img key={img.id} src={img.imageUrl} alt={img.altText || ""} style={styles.snackImage} />
    ));
  };

  const filteredSnacks = snacks.filter((snack) =>
    snack.snackName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedSnack) {
    return (
      <div style={styles.page} className="container py-5">
        <h2 className="text-center mb-4" style={styles.header}>{selectedSnack.snackName}</h2>
        <div className="card p-4 shadow" style={styles.card}>
          {renderImages(selectedSnack.id)}
          <p><strong>Type:</strong> {selectedSnack.snackType}</p>
          <p><strong>Description:</strong> {selectedSnack.description}</p>
          <p><strong>Ingredients:</strong> {selectedSnack.ingredients}</p>
          <p><strong>Quantity:</strong> {selectedSnack.quantity}</p>
          <p><strong>Price:</strong> ₹{parseFloat(selectedSnack.price).toFixed(2)}</p>
          <p><strong>Expiry (Months):</strong> {selectedSnack.expiryInMonths}</p>
          <p><strong>SKU:</strong> {selectedSnack.sku}</p>
          <p><strong>Status:</strong> {selectedSnack.status}</p>
          <p><strong>Created Date:</strong> {new Date(selectedSnack.createdDate).toLocaleDateString()}</p>
        </div>
        <div className="d-flex flex-wrap gap-2 mt-4">
          <button className="btn text-white" style={styles.btnSecondary} onClick={() => setSelectedSnack(null)}>Back to List</button>
          <button className="btn text-white" style={styles.btnPrimary} onClick={() => navigate("/vendor-home")}>Back to Vendor Home</button>
          <button className="btn text-white" style={{ ...styles.btnPrimary, backgroundColor: "#7F8CAA" }} onClick={() => navigate(`/edit-snack/${selectedSnack.id}`)}>Edit Snack</button>
          <button className="btn text-white" style={styles.btnDanger} onClick={() => handleDelete(selectedSnack.id)}>Delete Snack</button>
          {(!imagesMap[selectedSnack.id] || imagesMap[selectedSnack.id].length === 0) && (
            <button className="btn text-white mt-2" style={{ ...styles.btnPrimary, backgroundColor: "#7F8CAA" }} onClick={() => navigate(`/add-snack-images/${selectedSnack.id}`)}>
              Add Photo/Image
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page} className="container py-5">
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
      <h2 className="text-center mb-4" style={styles.header}>My Vegan Snacks</h2>

      {/* Search Bar */}
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          placeholder="Search snacks by name..."
          className="form-control"
          style={styles.searchBar}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row">
        {filteredSnacks.length > 0 ? (
          filteredSnacks.map((snack) => (
            <div className="col-md-6 mb-4" key={snack.id}>
              <div className="card p-3 shadow-sm h-100" style={styles.card}>
                {renderImages(snack.id)}
                <h5 className="card-title">{snack.snackName}</h5>
                <p><strong>Type:</strong> {snack.snackType}</p>
                <p><strong>Price:</strong> ₹{parseFloat(snack.price).toFixed(2)}</p>
                <p><strong>Status:</strong> {snack.status}</p>
                <div className="d-flex gap-2 mt-2 flex-wrap">
                  <button className="btn text-white" style={styles.btnPrimary} onClick={() => setSelectedSnack(snack)}>More Details</button>
                  <button className="btn text-white" style={{ ...styles.btnPrimary, backgroundColor: "#7F8CAA" }} onClick={() => navigate(`/edit-snack/${snack.id}`)}>Edit</button>
                  <button className="btn text-white" style={styles.btnDanger} onClick={() => handleDelete(snack.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No snacks match your search.</p>
        )}
      </div>
    </div>
  );
}

export default DisplayVeganSnacks;
