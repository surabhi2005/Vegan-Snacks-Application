// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// function AddSnackImages() {
//   const { snackId } = useParams();
//   const navigate = useNavigate();

//   const [image, setImage] = useState({
//     imageUrl: "",
//     imageType: "PRIMARY",
//     altText: "",
//   });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setImage({ ...image, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const payload = {
//         ...image,
//         product: { id: parseInt(snackId, 10) },
//       };

//       const response = await fetch("http://localhost:8080/product-images/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         alert("Image uploaded successfully!");
//         navigate("/vendor-home");
//       } else {
//         const errData = await response.json();
//         setError(errData.message || "Failed to upload image.");
//       }
//     } catch (err) {
//       console.error("Error uploading image:", err);
//       setError("Server error occurred.");
//     }
//   };

//   const styles = {
//     page: { backgroundColor: "white", minHeight: "100vh", padding: "120px" },
//     card: {
//       backgroundColor: "#E6EBF2",
//       border: "1px solid #7F8CAA",
//       borderRadius: "12px",
//     },
//     header: { color: "#333446", fontWeight: "bold" },
//     btnPrimary: { backgroundColor: "#333446", border: "none" },
//     btnSecondary: { backgroundColor: "#7F8CAA", border: "none" },
//   };

//   return (
//     <div style={styles.page} className="container py-5">
//       <h2 className="text-center mb-4" style={styles.header}>
//         Upload Product Image
//       </h2>

//       <div className="card shadow p-4" style={styles.card}>
//         {error && <div className="alert alert-danger">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Image URL</label>
//             <input
//               type="text"
//               className="form-control"
//               name="imageUrl"
//               value={image.imageUrl}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Image Type</label>
//             <select
//               className="form-select"
//               name="imageType"
//               value={image.imageType}
//               onChange={handleChange}
//             >
//               <option value="PRIMARY">Primary</option>
//               <option value="SECONDARY">Secondary</option>
//               <option value="INGREDIENT">Ingredient</option>
//               <option value="NUTRITIONAL">Nutritional</option>
//             </select>
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Alt Text</label>
//             <input
//               type="text"
//               className="form-control"
//               name="altText"
//               value={image.altText}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="d-flex justify-content-between">
//             <button type="submit" className="btn text-white" style={styles.btnPrimary}>
//               Save Image
//             </button>
//             <button
//               type="button"
//               className="btn text-white"
//               style={styles.btnSecondary}
//               onClick={() => navigate("/vendor-home")}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddSnackImages;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AddSnackImages() {
  const { snackId } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState({
    imageUrl: "",
    imageType: "PRIMARY",
    altText: "",
  });
  const [error, setError] = useState("");

  // Authorization check
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const vendorId = localStorage.getItem("vendorId");

    if (!token || role !== "VENDOR" || !vendorId) {
      alert("You must be logged in as a vendor to upload images.");
      localStorage.clear();
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setImage({ ...image, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!image.imageUrl.trim()) {
      setError("Image URL is required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const payload = {
        ...image,
        product: { id: parseInt(snackId, 10) },
      };

      const response = await fetch("http://localhost:8080/product-images/add", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Image uploaded successfully!");
        navigate("/vendor-home");
      } else {
        const errData = await response.json();
        setError(errData.message || "Failed to upload image.");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      setError("Server error occurred.");
    }
  };

  const styles = {
    page: { backgroundColor: "#EAEFEF", minHeight: "100vh", padding: "100px 0" },
    card: { backgroundColor: "#B8CFCE", borderRadius: "12px", padding: "30px" },
    header: { color: "#333446", fontWeight: "700" },
    btnPrimary: { backgroundColor: "#333446", border: "none", borderRadius: "8px" },
    btnSecondary: { backgroundColor: "#7F8CAA", border: "none", borderRadius: "8px" },
  };

  return (
    <div style={styles.page} className="container">
      <h2 className="text-center mb-4" style={styles.header}>
        Upload Product Image
      </h2>

      <div className="card shadow" style={styles.card}>
        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ color: "#333446" }}>Image URL *</label>
            <input
              type="text"
              className="form-control"
              name="imageUrl"
              value={image.imageUrl}
              onChange={handleChange}
              required
              style={{ borderRadius: "8px" }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ color: "#333446" }}>Image Type</label>
            <select
              className="form-select"
              name="imageType"
              value={image.imageType}
              onChange={handleChange}
            >
              <option value="PRIMARY">Primary</option>
              <option value="SECONDARY">Secondary</option>
              <option value="INGREDIENT">Ingredient</option>
              <option value="NUTRITIONAL">Nutritional</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ color: "#333446" }}>Alt Text</label>
            <input
              type="text"
              className="form-control"
              name="altText"
              value={image.altText}
              onChange={handleChange}
              style={{ borderRadius: "8px" }}
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn text-white px-4" style={styles.btnPrimary}>
              Save Image
            </button>
            <button
              type="button"
              className="btn text-white px-4"
              style={styles.btnSecondary}
              onClick={() => navigate("/vendor-home")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSnackImages;
