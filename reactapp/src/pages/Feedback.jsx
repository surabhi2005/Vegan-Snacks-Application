// import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";

// function FeedbackPage() {
//   const [reviews, setReviews] = useState([]);
//   const [selectedReview, setSelectedReview] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:8080/product-reviews/all")
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setReviews(data);
//         } else {
//           console.error("Expected array, got:", data);
//         }
//       })
//       .catch((err) => console.error("Error fetching reviews:", err));
//   }, []);

//   if (selectedReview) {
//     return (
//       <div
//         className="min-vh-100 d-flex flex-column align-items-center py-5"
//         style={{ backgroundColor: "#EAEFEF", color: "#333446" }}
//       >
//         <h2 className="mb-4 fw-bold" style={{ color: "#333446" }}>
//           {selectedReview.reviewTitle}
//         </h2>
//         <div
//           className="card p-4 shadow-lg"
//           style={{
//             backgroundColor: "#333446",
//             borderRadius: "15px",
//             color: "#EAEFEF",
//             maxWidth: "700px",
//             width: "100%",
//           }}
//         >
//           <p><strong>Product:</strong> {selectedReview.productName}</p>
//           <p><strong>Customer:</strong> {selectedReview.customerUsername || "Anonymous"}</p>
//           <p><strong>Rating:</strong> {selectedReview.rating} / 5</p>
//           <p><strong>Review:</strong> {selectedReview.reviewText}</p>
//           <p><strong>Date:</strong> {new Date(selectedReview.reviewDate).toLocaleDateString()}</p>
//           <p><strong>Verified Purchase:</strong> {selectedReview.isVerifiedPurchase ? "Yes" : "No"}</p>
//           <p><strong>Helpful Votes:</strong> {selectedReview.helpfulVotes}</p>
//           <p><strong>Approved:</strong> {selectedReview.isApproved ? "Yes" : "No"}</p>
//         </div>

//         <div className="d-flex gap-3 mt-4">
//           <button
//             onClick={() => setSelectedReview(null)}
//             className="btn px-4 py-2"
//             style={{
//               backgroundColor: "#7F8CAA",
//               color: "#fff",
//               borderRadius: "10px",
//               fontWeight: "500",
//             }}
//           >
//             Back to Feedback List
//           </button>

//           <Link
//             to="/vendor-home"
//             className="btn px-4 py-2"
//             style={{
//               backgroundColor: "#B8CFCE",
//               color: "#333446",
//               borderRadius: "10px",
//               fontWeight: "500",
//             }}
//           >
//             Back to Vendor Home
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="min-vh-100 py-5"
//       style={{ backgroundColor: "white", color: "#333446" }}
//     >
//       <div className="container">
//         <h2
//           className="text-center mb-5 fw-bold"
//           style={{ color: "#333446" }}
//         >
//           Customer Feedback
//         </h2>
//         <div className="row">
//           {reviews.map((review) => (
//             <div className="col-md-6 mb-4" key={review.id}>
//               <div
//                 className="card p-4 shadow-sm h-100"
//                 style={{
//                   backgroundColor: "#333446",
//                   borderRadius: "15px",
//                   color: "#EAEFEF",
//                 }}
//               >
//                 <h5 className="card-title fw-bold">{review.reviewTitle}</h5>
//                 <p><strong>Product:</strong> {review.productName}</p>
//                 <p><strong>Rating:</strong> {review.rating} / 5</p>
//                 <p><strong>Customer:</strong> {review.customerUsername || "Anonymous"}</p>
//                 <button
//                   onClick={() => setSelectedReview(review)}
//                   className="btn mt-2 px-3 py-1"
//                   style={{
//                     backgroundColor: "#7F8CAA",
//                     color: "#fff",
//                     borderRadius: "8px",
//                   }}
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Back to Vendor Home button */}
//         <div className="text-center mt-5">
//           {/* <Link
//             to="/vendor-home"
//             className="btn px-4 py-2"
//             style={{
//               backgroundColor: "#B8CFCE",
//               color: "#333446",
//               borderRadius: "10px",
//               fontWeight: "500",
//             }}
//           >
//             Back to Vendor Home
//           </Link> */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FeedbackPage;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

function FeedbackPage() {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    if (!token || userRole !== "VENDOR") {
      // safety fallback in case someone bypasses the route
      navigate("/login");
      return;
    }

    fetch("http://localhost:8080/product-reviews/all", {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
      .then(res => {
        if (res.status === 401) {
          alert("Session expired. Please log in again.");
          navigate("/login");
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) setReviews(data);
        else console.error("Expected array, got:", data);
      })
      .catch(err => console.error("Error fetching reviews:", err));
  }, [navigate, token, userRole]);

  if (selectedReview) {
    return (
      
      <div className="min-vh-100 d-flex flex-column align-items-center py-5" style={{ backgroundColor: "#EAEFEF", color: "#333446" }}>
        <h2 className="mb-4 fw-bold">{selectedReview.reviewTitle}</h2>
        <div className="card p-4 shadow-lg" style={{
          backgroundColor: "#333446",
          borderRadius: "15px",
          color: "#EAEFEF",
          maxWidth: "700px",
          width: "100%",
        }}>
          <p><strong>Product:</strong> {selectedReview.productName}</p>
          <p><strong>Customer:</strong> {selectedReview.customerUsername || "Anonymous"}</p>
          <p><strong>Rating:</strong> {selectedReview.rating} / 5</p>
          <p><strong>Review:</strong> {selectedReview.reviewText}</p>
          <p><strong>Date:</strong> {new Date(selectedReview.reviewDate).toLocaleDateString()}</p>
          <p><strong>Verified Purchase:</strong> {selectedReview.isVerifiedPurchase ? "Yes" : "No"}</p>
          <p><strong>Helpful Votes:</strong> {selectedReview.helpfulVotes}</p>
          <p><strong>Approved:</strong> {selectedReview.isApproved ? "Yes" : "No"}</p>
        </div>

        <div className="d-flex gap-3 mt-4">
          <button onClick={() => setSelectedReview(null)}
            className="btn px-4 py-2"
            style={{ backgroundColor: "#7F8CAA", color: "#fff", borderRadius: "10px", fontWeight: "500" }}>
            Back to Feedback List
          </button>

          <Link to="/vendor-home"
            className="btn px-4 py-2"
            style={{ backgroundColor: "#B8CFCE", color: "#333446", borderRadius: "10px", fontWeight: "500" }}>
            Back to Vendor Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: "white", color: "#333446" }}>
      <div className="container">
        <h2 className="text-center mb-5 fw-bold">Customer Feedback</h2>
        <div className="row">
          {reviews.map((review) => (
            <div className="col-md-6 mb-4" key={review.id}>
              <div className="card p-4 shadow-sm h-100" style={{ backgroundColor: "#333446", borderRadius: "15px", color: "#EAEFEF" }}>
                <h5 className="card-title fw-bold">{review.reviewTitle}</h5>
                <p><strong>Product:</strong> {review.productName}</p>
                <p><strong>Rating:</strong> {review.rating} / 5</p>
                <p><strong>Customer:</strong> {review.customerUsername || "Anonymous"}</p>
                <button onClick={() => setSelectedReview(review)}
                  className="btn mt-2 px-3 py-1"
                  style={{ backgroundColor: "#7F8CAA", color: "#fff", borderRadius: "8px" }}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeedbackPage;

