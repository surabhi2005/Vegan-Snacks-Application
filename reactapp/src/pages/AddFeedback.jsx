// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// export default function AddFeedback() {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const customerId = localStorage.getItem("userId");

//   const [formData, setFormData] = useState({
//     rating: "",
//     reviewTitle: "",
//     reviewText: "",
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     let errs = {};
//     if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
//       errs.rating = "Rating must be between 1 and 5";
//     }
//     if (!formData.reviewTitle.trim()) {
//       errs.reviewTitle = "Title is required";
//     }
//     if (!formData.reviewText.trim()) {
//       errs.reviewText = "Review text is required";
//     }
//     return errs;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     const payload = {
//       product: { id: productId },
//       customer: { id: customerId },
//       rating: formData.rating,
//       reviewTitle: formData.reviewTitle,
//       reviewText: formData.reviewText,
//       reviewDate: new Date().toISOString(),
//       isVerifiedPurchase: false,
//       helpfulVotes: 0,
//       isApproved: false,
//     };

//     try {
//       const res = await fetch("http://localhost:8080/product-reviews/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         alert("Feedback submitted successfully!");
//         navigate("/my-feedbacks");
//       } else {
//         const msg = await res.text();
//         alert("Error submitting feedback: " + msg);
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Server error while submitting feedback.");
//     }
//   };

//   return (
//     <div
//       className="min-vh-100 d-flex justify-content-center align-items-start py-5"
//       style={{ backgroundColor: "#EAEFEF" }}
//     >
//       <div
//         className="card p-4 shadow-lg"
//         style={{ maxWidth: "600px", width: "100%", borderRadius: "15px", backgroundColor: "#fff", color: "#333446" }}
//       >
//         <h2 className="text-center mb-4 fw-bold" style={{ color: "#333446" }}>
//           Add Feedback
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label fw-semibold">Rating (1-5)</label>
//             <input
//               type="number"
//               className="form-control"
//               name="rating"
//               value={formData.rating}
//               onChange={handleChange}
//               style={{ borderRadius: "8px", border: "1px solid #ccc" }}
//             />
//             {errors.rating && <small className="text-danger">{errors.rating}</small>}
//           </div>

//           <div className="mb-3">
//             <label className="form-label fw-semibold">Review Title</label>
//             <input
//               type="text"
//               className="form-control"
//               name="reviewTitle"
//               value={formData.reviewTitle}
//               onChange={handleChange}
//               style={{ borderRadius: "8px", border: "1px solid #ccc" }}
//             />
//             {errors.reviewTitle && <small className="text-danger">{errors.reviewTitle}</small>}
//           </div>

//           <div className="mb-3">
//             <label className="form-label fw-semibold">Review Text</label>
//             <textarea
//               className="form-control"
//               name="reviewText"
//               rows="4"
//               value={formData.reviewText}
//               onChange={handleChange}
//               style={{ borderRadius: "8px", border: "1px solid #ccc" }}
//             ></textarea>
//             {errors.reviewText && <small className="text-danger">{errors.reviewText}</small>}
//           </div>

//           <div className="d-flex justify-content-between mt-4 flex-wrap gap-2">
//             <button
//               type="submit"
//               className="px-4 py-2 fw-bold"
//               style={{
//                 backgroundColor: "#7F8CAA",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "10px",
//                 transition: "0.3s",
//               }}
//               onMouseOver={(e) => (e.target.style.backgroundColor = "#B8CFCE")}
//               onMouseOut={(e) => (e.target.style.backgroundColor = "#7F8CAA")}
//             >
//               Submit Feedback
//             </button>

//             <button
//               type="button"
//               className="px-4 py-2 fw-bold"
//               style={{
//                 backgroundColor: "#333446",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "10px",
//                 transition: "0.3s",
//               }}
//               onMouseOver={(e) => (e.target.style.backgroundColor = "#7F8CAA")}
//               onMouseOut={(e) => (e.target.style.backgroundColor = "#333446")}
//               onClick={() => navigate("/all-products")}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AddFeedback() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const customerId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    rating: "",
    reviewTitle: "",
    reviewText: "",
  });

  const [errors, setErrors] = useState({});

  // Check authentication on mount
  useEffect(() => {
    if (!customerId || !token) {
      alert("You must log in to add a feedback.");
      navigate("/login");
    }
  }, [customerId, token, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errs = {};
    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      errs.rating = "Rating must be between 1 and 5";
    }
    if (!formData.reviewTitle.trim()) {
      errs.reviewTitle = "Title is required";
    }
    if (!formData.reviewText.trim()) {
      errs.reviewText = "Review text is required";
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      product: { id: productId },
      customer: { id: customerId },
      rating: formData.rating,
      reviewTitle: formData.reviewTitle,
      reviewText: formData.reviewText,
      reviewDate: new Date().toISOString(),
      isVerifiedPurchase: false,
      helpfulVotes: 0,
      isApproved: false,
    };

    try {
      const res = await fetch("http://localhost:8080/product-reviews/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // protected route
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 401 || res.status === 403) {
        alert("You are not authorized to add feedback. Please login again.");
        navigate("/login");
        return;
      }

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to submit feedback");
      }

      alert("Feedback submitted successfully!");
      navigate("/my-feedbacks");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Server error while submitting feedback.");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-start py-5"
      style={{ backgroundColor: "#EAEFEF" }}
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
      <div
        className="card p-4 shadow-lg"
        style={{ maxWidth: "600px", width: "100%", borderRadius: "15px", backgroundColor: "#fff", color: "#333446" }}
      >
        <h2 className="text-center mb-4 fw-bold" style={{ color: "#333446" }}>
          Add Feedback
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Rating (1-5)</label>
            <input
              type="number"
              className="form-control"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              style={{ borderRadius: "8px", border: "1px solid #ccc" }}
            />
            {errors.rating && <small className="text-danger">{errors.rating}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Review Title</label>
            <input
              type="text"
              className="form-control"
              name="reviewTitle"
              value={formData.reviewTitle}
              onChange={handleChange}
              style={{ borderRadius: "8px", border: "1px solid #ccc" }}
            />
            {errors.reviewTitle && <small className="text-danger">{errors.reviewTitle}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Review Text</label>
            <textarea
              className="form-control"
              name="reviewText"
              rows="4"
              value={formData.reviewText}
              onChange={handleChange}
              style={{ borderRadius: "8px", border: "1px solid #ccc" }}
            ></textarea>
            {errors.reviewText && <small className="text-danger">{errors.reviewText}</small>}
          </div>

          <div className="d-flex justify-content-between mt-4 flex-wrap gap-2">
            <button
              type="submit"
              className="px-4 py-2 fw-bold"
              style={{
                backgroundColor: "#7F8CAA",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#B8CFCE")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#7F8CAA")}
            >
              Submit Feedback
            </button>

            <button
              type="button"
              className="px-4 py-2 fw-bold"
              style={{
                backgroundColor: "#333446",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#7F8CAA")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#333446")}
              onClick={() => navigate("/all-products")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
