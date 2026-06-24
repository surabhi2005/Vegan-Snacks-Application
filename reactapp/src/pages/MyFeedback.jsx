// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function MyFeedback() {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const customerId = localStorage.getItem("userId");

//   useEffect(() => {
//     if (!customerId) return;
//     fetch(`http://localhost:8080/product-reviews/bycustomer/${customerId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) setFeedbacks(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching feedbacks:", err);
//         setLoading(false);
//       });
//   }, [customerId]);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this feedback?")) return;
//     try {
//       const res = await fetch(`http://localhost:8080/product-reviews/delete/${id}`, {
//         method: "DELETE",
//       });
//       if (!res.ok) throw new Error("Failed to delete");
//       setFeedbacks(feedbacks.filter((fb) => fb.id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete feedback");
//     }
//   };

//   if (loading) return <div className="text-center mt-5">Loading your feedbacks...</div>;
//   if (feedbacks.length === 0) return <div className="text-center mt-5">No feedbacks yet.</div>;

//   return (
//     <div className="min-vh-100 py-5" style={{ backgroundColor: "#EAEFEF", padding: "50px 20px" }}>
//       <div className="container">
//         <h2 className="text-center mb-4 fw-bold" style={{ color: "#333446" }}>My Feedbacks</h2>
//         <div className="row g-4">
//           {feedbacks.map((fb) => (
//             <div className="col-md-6" key={fb.id}>
//               <div className="card p-4 shadow-lg h-100" style={{ borderRadius: "15px", backgroundColor: "#fff", color: "#333446" }}>
//                 <h5 className="fw-bold">{fb.productName || "Product"} (ID: {fb.productId})</h5>
//                 <p><strong>Rating:</strong> {fb.rating} / 5</p>
//                 <p><strong>Title:</strong> {fb.reviewTitle}</p>
//                 <p><strong>Review:</strong> {fb.reviewText}</p>
//                 <p><strong>Date:</strong> {new Date(fb.reviewDate).toLocaleDateString()}</p>
//                 <p><strong>Verified Purchase:</strong> {fb.isVerifiedPurchase ? "Yes" : "No"}</p>
//                 <div className="d-flex gap-2 mt-2">
//                   <button
//                     className="btn btn-primary" style={{backgroundColor:"#333446"}}
//                     onClick={() => navigate(`/edit-feedback/${fb.id}`)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="btn btn-danger"
//                     onClick={() => handleDelete(fb.id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="text-center mt-4">
//           {/* <button
//             className="px-4 py-2 fw-bold"
//             style={{ backgroundColor: "#7F8CAA", color: "#fff", border: "none", borderRadius: "10px" }}
//             onClick={() => navigate("/customer-home")}
//           >
//             Back to Home
//           </button> */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MyFeedback;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const customerId = localStorage.getItem("userId");

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Redirect if no userId or token
    if (!customerId || !token) {
      navigate("/login");
      return;
    }

    const fetchFeedbacks = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/product-reviews/bycustomer/${customerId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 401 || res.status === 403) {
          alert("You are not authorized to view your feedbacks.");
          navigate("/login");
          return;
        }

        if (!res.ok) throw new Error("Failed to fetch feedbacks");

        const data = await res.json();
        if (Array.isArray(data)) setFeedbacks(data);
        else console.error("Expected an array but got:", data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
        navigate("/login");
      }
    };

    fetchFeedbacks();
  }, [customerId, navigate]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!window.confirm("Are you sure you want to delete this feedback?")) return;

    try {
      const res = await fetch(`http://localhost:8080/product-reviews/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to delete");
      }

      setFeedbacks(feedbacks.filter((fb) => fb.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete feedback: " + err.message);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading your feedbacks...</div>;
  if (feedbacks.length === 0) return <div className="text-center mt-5">No feedbacks yet.</div>;

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: "#EAEFEF", padding: "50px 20px" }}>
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
        <h2 className="text-center mb-4 fw-bold" style={{ color: "#333446" }}>My Feedbacks</h2>
        <div className="row g-4">
          {feedbacks.map((fb) => (
            <div className="col-md-6" key={fb.id}>
              <div className="card p-4 shadow-lg h-100" style={{ borderRadius: "15px", backgroundColor: "#fff", color: "#333446" }}>
                <h5 className="fw-bold">{fb.productName || "Product"} (ID: {fb.productId})</h5>
                <p><strong>Rating:</strong> {fb.rating} / 5</p>
                <p><strong>Title:</strong> {fb.reviewTitle}</p>
                <p><strong>Review:</strong> {fb.reviewText}</p>
                <p><strong>Date:</strong> {new Date(fb.reviewDate).toLocaleDateString()}</p>
                <p><strong>Verified Purchase:</strong> {fb.isVerifiedPurchase ? "Yes" : "No"}</p>
                <div className="d-flex gap-2 mt-2">
                  <button
                    className="btn btn-primary"
                    style={{ backgroundColor: "#333446" }}
                    onClick={() => navigate(`/edit-feedback/${fb.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(fb.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyFeedback;
