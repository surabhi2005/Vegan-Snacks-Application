// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// function EditMyFeedback() {
//   const [feedback, setFeedback] = useState(null);
//   const [rating, setRating] = useState(0);
//   const [reviewTitle, setReviewTitle] = useState("");
//   const [reviewText, setReviewText] = useState("");
//   const navigate = useNavigate();
//   const { id } = useParams(); // review ID from route

//   useEffect(() => {
//     fetch(`http://localhost:8080/product-reviews/bycustomer/${localStorage.getItem("userId")}`)
//       .then((res) => res.json())
//       .then((data) => {
//         const review = data.find((r) => r.id === parseInt(id));
//         if (review) {
//           setFeedback(review);
//           setRating(review.rating);
//           setReviewTitle(review.reviewTitle);
//           setReviewText(review.reviewText);
//         } else {
//           alert("Review not found");
//           navigate("/my-feedbacks");
//         }
//       })
//       .catch((err) => console.error("Error fetching review:", err));
//   }, [id, navigate]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const payload = {
//       rating,
//       reviewTitle,
//       reviewText
//     };

//     fetch(`http://localhost:8080/product-reviews/update/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload)
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to update review");
//         return res.json();
//       })
//       .then((data) => {
//         alert("Feedback updated successfully!");
//         navigate("/my-feedbacks");
//       })
//       .catch((err) => {
//         console.error("Error updating review:", err);
//         alert("Failed to update feedback. Please try again.");
//       });
//   };

//   if (!feedback) 
//     return <div className="text-center mt-5" style={{ color: "#333446" }}>Loading feedback...</div>;

//   return (
//     <div
//       className="min-vh-100 py-5 d-flex justify-content-center align-items-start"
//       style={{ backgroundColor: "#EAEFEF", padding: "50px 20px" }}
//     >
//       <div
//         className="card shadow-lg p-4"
//         style={{ maxWidth: "600px", width: "100%", borderRadius: "20px", backgroundColor: "#fff", color: "#333446" }}
//       >
//         <h2 className="text-center mb-4 fw-bold" style={{ color: "#333446" }}>Edit Feedback</h2>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label fw-semibold">Rating (1-5)</label>
//             <input
//               type="number"
//               className="form-control"
//               min="1"
//               max="5"
//               value={rating}
//               onChange={(e) => setRating(parseInt(e.target.value))}
//               required
//               style={{ borderRadius: "10px" }}
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label fw-semibold">Review Title</label>
//             <input
//               type="text"
//               className="form-control"
//               value={reviewTitle}
//               onChange={(e) => setReviewTitle(e.target.value)}
//               required
//               style={{ borderRadius: "10px" }}
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label fw-semibold">Review Text</label>
//             <textarea
//               className="form-control"
//               rows="5"
//               value={reviewText}
//               onChange={(e) => setReviewText(e.target.value)}
//               required
//               style={{ borderRadius: "10px" }}
//             ></textarea>
//           </div>

//           <div className="d-flex justify-content-between mt-4">
//             <button
//               type="button"
//               className="px-4 py-2 fw-bold"
//               style={{
//                 backgroundColor: "#7F8CAA",
//                 color: "#EAEFEF",
//                 border: "none",
//                 borderRadius: "10px",
//               }}
//               onClick={() => navigate("/my-feedbacks")}
//               onMouseOver={(e) => (e.target.style.backgroundColor = "#B8CFCE")}
//               onMouseOut={(e) => (e.target.style.backgroundColor = "#7F8CAA")}
//             >
//               Back to Feedbacks
//             </button>

//             <button
//               type="submit"
//               className="px-4 py-2 fw-bold"
//               style={{
//                 backgroundColor: "#333446",
//                 color: "#EAEFEF",
//                 border: "none",
//                 borderRadius: "10px",
//               }}
//               onMouseOver={(e) => (e.target.style.backgroundColor = "#7F8CAA")}
//               onMouseOut={(e) => (e.target.style.backgroundColor = "#333446")}
//             >
//               Update Feedback
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EditMyFeedback;
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditMyFeedback() {
  const [feedback, setFeedback] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // review ID from route

  useEffect(() => {
    const token = localStorage.getItem("token");
    const customerId = localStorage.getItem("userId");

    if (!token || !customerId) {
      navigate("/login");
      return;
    }

    const fetchFeedback = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/product-reviews/bycustomer/${customerId}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status === 401 || res.status === 403) {
          alert("You are not authorized to edit this feedback.");
          navigate("/login");
          return;
        }

        if (!res.ok) throw new Error("Failed to fetch reviews");

        const data = await res.json();
        const review = data.find((r) => r.id === parseInt(id));

        if (!review) {
          alert("Review not found");
          navigate("/my-feedbacks");
          return;
        }

        setFeedback(review);
        setRating(review.rating);
        setReviewTitle(review.reviewTitle);
        setReviewText(review.reviewText);
      } catch (err) {
        console.error("Error fetching review:", err);
        navigate("/login");
      }
    };

    fetchFeedback();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const payload = { rating, reviewTitle, reviewText };

    try {
      const res = await fetch(`http://localhost:8080/product-reviews/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 401 || res.status === 403) {
        alert("You are not authorized to update this feedback.");
        navigate("/login");
        return;
      }

      if (!res.ok) throw new Error(`Failed to update review. Status: ${res.status}`);

      alert("Feedback updated successfully!");
      navigate("/my-feedbacks");
    } catch (err) {
      console.error("Error updating review:", err);
      alert("Failed to update feedback. Please try again.");
    }
  };

  if (!feedback) 
    return <div className="text-center mt-5" style={{ color: "#333446" }}>Loading feedback...</div>;

  return (
    <div
      className="min-vh-100 py-5 d-flex justify-content-center align-items-start"
      style={{ backgroundColor: "#EAEFEF", padding: "50px 20px" }}
    >
       <button
          onClick={() => navigate("/my-feedbacks")}
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
        className="card shadow-lg p-4"
        style={{ maxWidth: "600px", width: "100%", borderRadius: "20px", backgroundColor: "#fff", color: "#333446" }}
      >
        <h2 className="text-center mb-4 fw-bold" style={{ color: "#333446" }}>Edit Feedback</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Rating (1-5)</label>
            <input
              type="number"
              className="form-control"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Review Title</label>
            <input
              type="text"
              className="form-control"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Review Text</label>
            <textarea
              className="form-control"
              rows="5"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
              style={{ borderRadius: "10px" }}
            ></textarea>
          </div>

          <div className="d-flex justify-content-between mt-4">
            {/* <button
              type="button"
              className="px-4 py-2 fw-bold"
              style={{
                backgroundColor: "#7F8CAA",
                color: "#EAEFEF",
                border: "none",
                borderRadius: "10px",
              }}
              onClick={() => navigate("/my-feedbacks")}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#B8CFCE")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#7F8CAA")}
            >
              Back to Feedbacks
            </button> */}

            <button
              type="submit"
              className="px-4 py-2 fw-bold"
              style={{
                backgroundColor: "#333446",
                color: "#EAEFEF",
                border: "none",
                borderRadius: "10px",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#7F8CAA")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#333446")}
            >
              Update Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMyFeedback;
