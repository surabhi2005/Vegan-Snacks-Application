// import React, { useState } from "react";

// const MarketCampaigns = () => {
//   const [campaigns, setCampaigns] = useState([
//     { id: 1, name: "Summer Sale", description: "Discounts on all vegan snacks", status: "Active" },
//     { id: 2, name: "Festive Offer", description: "Buy 2 Get 1 Free", status: "Inactive" },
//   ]);

//   const [newCampaign, setNewCampaign] = useState({ name: "", description: "" });

//   const handleAddCampaign = () => {
//     if (!newCampaign.name || !newCampaign.description) {
//       alert("Please fill in all fields");
//       return;
//     }
//     const id = campaigns.length ? campaigns[campaigns.length - 1].id + 1 : 1;
//     setCampaigns([...campaigns, { ...newCampaign, id, status: "Active" }]);
//     setNewCampaign({ name: "", description: "" });
//   };

//   const toggleStatus = (id) => {
//     setCampaigns(
//       campaigns.map(c => c.id === id ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" } : c)
//     );
//   };

//   return (
//     <div style={{ padding: "40px", minHeight: "100vh", backgroundColor: "#EAEFEF" }}>
//       <h2 style={{ textAlign: "center", marginBottom: "40px", color: "#333446" }}>Marketing Campaigns</h2>

//       {/* Add New Campaign */}
//       <div style={styles.addForm}>
//         <input
//           type="text"
//           placeholder="Campaign Name"
//           value={newCampaign.name}
//           onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
//           style={styles.input}
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={newCampaign.description}
//           onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
//           style={styles.input}
//         />
//         <button onClick={handleAddCampaign} style={{ ...styles.button, backgroundColor: "#333446", color: "#fff" }}>
//           Add Campaign
//         </button>
//       </div>

//       {/* Campaigns List */}
//       <div style={styles.campaignGrid}>
//         {campaigns.map(campaign => (
//           <div key={campaign.id} style={styles.card}>
//             <h4 style={styles.cardTitle}>{campaign.name}</h4>
//             <p style={styles.cardDesc}>{campaign.description}</p>
//             <p>Status: <strong style={{ color: campaign.status === "Active" ? "#00C49F" : "#FF6B6B" }}>{campaign.status}</strong></p>
//             <button
//               onClick={() => toggleStatus(campaign.id)}
//               style={{
//                 ...styles.button,
//                 backgroundColor: campaign.status === "Active" ? "#FF6B6B" : "#00C49F",
//                 color: "#fff",
//                 marginTop: "10px",
//               }}
//             >
//               {campaign.status === "Active" ? "Deactivate" : "Activate"}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   addForm: { display: "flex", gap: "10px", marginBottom: "30px", flexWrap: "wrap" },
//   input: { padding: "10px", fontSize: "16px", flex: 1, borderRadius: "8px", border: "1px solid #ccc" },
//   button: {
//     padding: "10px 20px",
//     fontSize: "16px",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     transition: "0.3s",
//   },
//   campaignGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//     gap: "20px",
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: "12px",
//     padding: "20px",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//     textAlign: "center",
//   },
//   cardTitle: { fontSize: "23px", fontWeight: "600", marginBottom: "10px", color: "#333446" },
//   cardDesc: { fontSize: "18px", color: "#555", marginBottom: "10px" },
// };

// export default MarketCampaigns;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MarketCampaigns = () => {
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: "Summer Sale", description: "Discounts on all vegan snacks", status: "Active" },
    { id: 2, name: "Festive Offer", description: "Buy 2 Get 1 Free", status: "Inactive" },
  ]);

  const [newCampaign, setNewCampaign] = useState({ name: "", description: "" });
  const navigate = useNavigate();

  const handleAddCampaign = () => {
    if (!newCampaign.name || !newCampaign.description) {
      alert("Please fill in all fields");
      return;
    }
    const id = campaigns.length ? campaigns[campaigns.length - 1].id + 1 : 1;
    setCampaigns([...campaigns, { ...newCampaign, id, status: "Active" }]);
    setNewCampaign({ name: "", description: "" });
  };

  const toggleStatus = (id) => {
    setCampaigns(
      campaigns.map(c => c.id === id ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" } : c)
    );
  };

  return (
    <div style={{ padding: "40px", minHeight: "100vh", backgroundColor: "#EAEFEF" }}>
      <h2 style={{ textAlign: "center", marginBottom: "40px", color: "#333446" }}>Marketing Campaigns</h2>

      {/* Add New Campaign */}
      <div style={styles.addForm}>
        <input
          type="text"
          placeholder="Campaign Name"
          value={newCampaign.name}
          onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Description"
          value={newCampaign.description}
          onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
          style={styles.input}
        />
        <button onClick={handleAddCampaign} style={{ ...styles.button, backgroundColor: "#333446", color: "#fff" }}>
          Add Campaign
        </button>
      </div>

      {/* Campaigns List */}
      <div style={styles.campaignGrid}>
        {campaigns.map(campaign => (
          <div key={campaign.id} style={styles.card}>
            <h4 style={styles.cardTitle}>{campaign.name}</h4>
            <p style={styles.cardDesc}>{campaign.description}</p>
            <p>Status: <strong style={{ color: campaign.status === "Active" ? "#00C49F" : "#FF6B6B" }}>{campaign.status}</strong></p>
            <button
              onClick={() => toggleStatus(campaign.id)}
              style={{
                ...styles.button,
                backgroundColor: campaign.status === "Active" ? "#FF6B6B" : "#00C49F",
                color: "#fff",
                marginTop: "10px",
              }}
            >
              {campaign.status === "Active" ? "Deactivate" : "Activate"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  addForm: { display: "flex", gap: "10px", marginBottom: "30px", flexWrap: "wrap" },
  input: { padding: "10px", fontSize: "16px", flex: 1, borderRadius: "8px", border: "1px solid #ccc" },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
  },
  campaignGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  cardTitle: { fontSize: "23px", fontWeight: "600", marginBottom: "10px", color: "#333446" },
  cardDesc: { fontSize: "18px", color: "#555", marginBottom: "10px" },
};

export default MarketCampaigns;
