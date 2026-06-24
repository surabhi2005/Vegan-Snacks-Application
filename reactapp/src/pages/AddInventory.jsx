// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AddInventory() {
//   const [products, setProducts] = useState([]);
//   const [form, setForm] = useState({
//     productId: "",
//     currentStock: 0,
//     reorderPoint: 10,
//     maxStock: 1000,
//     costPerUnit: "",
//     lastRestockDate: "",
//     location: "",
//   });

//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   // Fetch products
//   useEffect(() => {
//     fetch("http://localhost:8080/snacks/getAllVeganSnacks")
//       .then((res) => res.json())
//       .then((data) => setProducts(data))
//       .catch((err) => console.error("Error fetching products:", err));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       product: { id: parseInt(form.productId) },
//       currentStock: parseInt(form.currentStock),
//       reorderPoint: parseInt(form.reorderPoint),
//       maxStock: parseInt(form.maxStock),
//       costPerUnit: parseFloat(form.costPerUnit),
//       lastRestockDate: form.lastRestockDate
//         ? new Date(form.lastRestockDate).toISOString()
//         : null,
//       location: form.location,
//     };

//     try {
//       const res = await fetch("http://localhost:8080/inventory/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         setMessage("✅ Inventory added successfully!");
//         setForm({
//           productId: "",
//           currentStock: 0,
//           reorderPoint: 10,
//           maxStock: 1000,
//           costPerUnit: "",
//           lastRestockDate: "",
//           location: "",
//         });
//       } else {
//         const errData = await res.json();
//         console.error("Backend error:", errData);
//         setMessage("❌ Failed to add inventory.");
//       }
//     } catch (err) {
//       console.error("Error submitting form:", err);
//       setMessage("❌ Error submitting inventory.");
//     }
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center"
//       style={{ backgroundColor: "#EAEFEF", minHeight: "100vh", padding: "20px" }}
//     >
//       <div
//         className="card shadow-lg p-4"
//         style={{
//           maxWidth: "600px",
//           width: "100%",
//           borderRadius: "16px",
//           backgroundColor: "#FFFFFF",
//           border: "1px solid #B8CFCE",
//         }}
//       >
//         <h2
//           className="text-center mb-4"
//           style={{ color: "#333446", fontWeight: "700" }}
//         >
//           Add Inventory
//         </h2>

//         {message && (
//           <div
//             className="alert text-center"
//             style={{
//               backgroundColor: "#B8CFCE",
//               color: "#333446",
//               fontWeight: "600",
//               borderRadius: "8px",
//             }}
//           >
//             {message}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           {/* Product */}
//           <div className="mb-3">
//             <label className="form-label" style={{ color: "#333446" }}>
//               Select Product
//             </label>
//             <select
//               name="productId"
//               value={form.productId}
//               onChange={handleChange}
//               className="form-select"
//               required
//               style={{
//                 borderColor: "#7F8CAA",
//                 color: "#333446",
//                 backgroundColor: "#EAEFEF",
//               }}
//             >
//               <option value="">-- Select Product --</option>
//               {products.map((p) => (
//                 <option key={p.id} value={p.id}>
//                   {p.snackName}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Stock Fields */}
//           {[
//             { label: "Current Stock", name: "currentStock", type: "number" },
//             { label: "Reorder Point", name: "reorderPoint", type: "number" },
//             { label: "Max Stock", name: "maxStock", type: "number" },
//             {
//               label: "Cost Per Unit",
//               name: "costPerUnit",
//               type: "number",
//               step: "0.01",
//             },
//           ].map((field, idx) => (
//             <div className="mb-3" key={idx}>
//               <label className="form-label" style={{ color: "#333446" }}>
//                 {field.label}
//               </label>
//               <input
//                 type={field.type}
//                 name={field.name}
//                 step={field.step || ""}
//                 value={form[field.name]}
//                 onChange={handleChange}
//                 className="form-control"
//                 min="0"
//                 style={{
//                   borderColor: "#7F8CAA",
//                   backgroundColor: "#EAEFEF",
//                   color: "#333446",
//                 }}
//                 required
//               />
//             </div>
//           ))}

//           {/* Date */}
//           <div className="mb-3">
//             <label className="form-label" style={{ color: "#333446" }}>
//               Last Restock Date
//             </label>
//             <input
//               type="date"
//               name="lastRestockDate"
//               value={form.lastRestockDate}
//               onChange={handleChange}
//               className="form-control"
//               style={{
//                 borderColor: "#7F8CAA",
//                 backgroundColor: "#EAEFEF",
//                 color: "#333446",
//               }}
//             />
//           </div>

//           {/* Location */}
//           <div className="mb-3">
//             <label className="form-label" style={{ color: "#333446" }}>
//               Location
//             </label>
//             <input
//               type="text"
//               name="location"
//               value={form.location}
//               onChange={handleChange}
//               className="form-control"
//               style={{
//                 borderColor: "#7F8CAA",
//                 backgroundColor: "#EAEFEF",
//                 color: "#333446",
//               }}
//             />
//           </div>

//           <button
//             type="submit"
//             className="btn w-100 mb-3"
//             style={{
//               backgroundColor: "#7F8CAA",
//               color: "#fff",
//               fontWeight: "600",
//               borderRadius: "8px",
//             }}
//           >
//             Add Inventory
//           </button>
//         </form>

//         {/* Back to Home Button */}
//         {/* <button
//           className="btn w-100"
//           style={{
//             backgroundColor: "#333446",
//             color: "#fff",
//             fontWeight: "600",
//             borderRadius: "8px",
//           }}
//           onClick={() => navigate("/vendor-home")}
//         >
//            Back to Home
//         </button> */}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddInventory() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productId: "",
    currentStock: 0,
    reorderPoint: 10,
    maxStock: 1000,
    costPerUnit: "",
    lastRestockDate: "",
    location: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Fetch products
  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8080/snacks/getAllVeganSnacks", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      product: { id: parseInt(form.productId) },
      currentStock: parseInt(form.currentStock),
      reorderPoint: parseInt(form.reorderPoint),
      maxStock: parseInt(form.maxStock),
      costPerUnit: parseFloat(form.costPerUnit),
      lastRestockDate: form.lastRestockDate
        ? new Date(form.lastRestockDate).toISOString()
        : null,
      location: form.location,
    };

    try {
      const res = await fetch("http://localhost:8080/inventory/add", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage("✅ Inventory added successfully!");
        setForm({
          productId: "",
          currentStock: 0,
          reorderPoint: 10,
          maxStock: 1000,
          costPerUnit: "",
          lastRestockDate: "",
          location: "",
        });
      } else {
        const errData = await res.json();
        console.error("Backend error:", errData);
        setMessage("❌ Failed to add inventory.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setMessage("❌ Error submitting inventory.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#EAEFEF", minHeight: "100vh", padding: "20px" }}
    >
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
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "600px",
          width: "100%",
          borderRadius: "16px",
          backgroundColor: "#FFFFFF",
          border: "1px solid #B8CFCE",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{ color: "#333446", fontWeight: "700" }}
        >
          Add Inventory
        </h2>

        {message && (
          <div
            className="alert text-center"
            style={{
              backgroundColor: "#B8CFCE",
              color: "#333446",
              fontWeight: "600",
              borderRadius: "8px",
            }}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Product */}
          <div className="mb-3">
            <label className="form-label" style={{ color: "#333446" }}>
              Select Product
            </label>
            <select
              name="productId"
              value={form.productId}
              onChange={handleChange}
              className="form-select"
              required
              style={{
                borderColor: "#7F8CAA",
                color: "#333446",
                backgroundColor: "#EAEFEF",
              }}
            >
              <option value="">-- Select Product --</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.snackName}
                </option>
              ))}
            </select>
          </div>

          {/* Stock Fields */}
          {[
            { label: "Current Stock", name: "currentStock", type: "number" },
            { label: "Reorder Point", name: "reorderPoint", type: "number" },
            { label: "Max Stock", name: "maxStock", type: "number" },
            { label: "Cost Per Unit", name: "costPerUnit", type: "number", step: "0.01" },
          ].map((field, idx) => (
            <div className="mb-3" key={idx}>
              <label className="form-label" style={{ color: "#333446" }}>
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                step={field.step || ""}
                value={form[field.name]}
                onChange={handleChange}
                className="form-control"
                min="0"
                style={{
                  borderColor: "#7F8CAA",
                  backgroundColor: "#EAEFEF",
                  color: "#333446",
                }}
                required
              />
            </div>
          ))}

          {/* Date */}
          <div className="mb-3">
            <label className="form-label" style={{ color: "#333446" }}>
              Last Restock Date
            </label>
            <input
              type="date"
              name="lastRestockDate"
              value={form.lastRestockDate}
              onChange={handleChange}
              className="form-control"
              style={{
                borderColor: "#7F8CAA",
                backgroundColor: "#EAEFEF",
                color: "#333446",
              }}
            />
          </div>

          {/* Location */}
          <div className="mb-3">
            <label className="form-label" style={{ color: "#333446" }}>
              Location
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="form-control"
              style={{
                borderColor: "#7F8CAA",
                backgroundColor: "#EAEFEF",
                color: "#333446",
              }}
            />
          </div>

          <button
            type="submit"
            className="btn w-100 mb-3"
            style={{
              backgroundColor: "#7F8CAA",
              color: "#fff",
              fontWeight: "600",
              borderRadius: "8px",
            }}
          >
            Add Inventory
          </button>
        </form>
      </div>
    </div>
  );
}
