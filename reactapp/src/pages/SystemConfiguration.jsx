// import React, { useState } from "react";

// const SystemConfiguration = () => {
//   const [appName, setAppName] = useState("Vegan Snacks App");
//   const [logo, setLogo] = useState(null);
//   const [theme, setTheme] = useState("light");

//   const handleLogoChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setLogo(URL.createObjectURL(e.target.files[0]));
//     }
//   };

//   const handleThemeToggle = () => {
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));
//   };

//   const handleSave = () => {
//     alert(`Settings Saved!\nApp Name: ${appName}\nTheme: ${theme}`);
//     // Here you can call backend API to persist settings
//   };

//   return (
//     <div
//       style={{
//         padding: "40px",
//         minHeight: "100vh",
//         backgroundColor: theme === "light" ? "#EAEFEF" : "#333446",
//         color: theme === "light" ? "#333446" : "#fff",
//         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//       }}
//     >
//       <h2 style={{ marginBottom: "30px", textAlign: "center" }}>System Configuration</h2>

//       {/* App Name Card */}
//       <div style={styles.card}>
//         <h3 style={styles.cardTitle}>App Name</h3>
//         <input
//           type="text"
//           value={appName}
//           onChange={(e) => setAppName(e.target.value)}
//           style={styles.input}
//           placeholder="Enter App Name"
//         />
//       </div>

//       {/* Logo Card */}
//       <div style={styles.card}>
//         <h3 style={styles.cardTitle}>App Logo</h3>
//         <input type="file" accept="image/*" onChange={handleLogoChange} />
//         {logo && (
//           <div style={{ marginTop: "15px" }}>
//             <img
//               src={logo}
//               alt="Logo Preview"
//               style={{
//                 height: "100px",
//                 borderRadius: "12px",
//                 border: "2px solid #7F8CAA",
//               }}
//             />
//           </div>
//         )}
//       </div>

//       {/* Theme Card */}
//       <div style={styles.card}>
//         <h3 style={styles.cardTitle}>Theme</h3>
//         <button onClick={handleThemeToggle} style={{ ...styles.button, backgroundColor: "#7F8CAA" }}>
//           Toggle Theme (Current: {theme})
//         </button>
//       </div>

//       {/* Save Button */}
//       <div style={{ textAlign: "center", marginTop: "30px" }}>
//         <button
//           onClick={handleSave}
//           style={{
//             ...styles.button,
//             backgroundColor: "#333446",
//             color: "#fff",
//             fontSize: "18px",
//             padding: "12px 30px",
//           }}
//         >
//           Save Settings
//         </button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: "12px",
//     padding: "25px",
//     marginBottom: "25px",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//   },
//   cardTitle: { marginBottom: "15px", color: "#333446" },
//   input: {
//     padding: "10px",
//     fontSize: "16px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//     width: "100%",
//   },
//   button: {
//     padding: "10px 20px",
//     fontSize: "16px",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     transition: "0.3s",
//   },
// };

// export default SystemConfiguration;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SystemConfiguration = () => {
  const [appName, setAppName] = useState("Vegan Snacks App");
  const [logo, setLogo] = useState(null);
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();


  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleSave = () => {
    alert(`Settings Saved!\nApp Name: ${appName}\nTheme: ${theme}`);
    // Here you can call backend API to persist settings
  };

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        backgroundColor: theme === "light" ? "#EAEFEF" : "#333446",
        color: theme === "light" ? "#333446" : "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <button
        onClick={() => navigate("/admin")}
        style={{
          fontSize: "24px",
          background: "none",
          border: "none",
          cursor: "pointer",
          marginBottom: "15px",
        }}
      >
        ☰
      </button>
      <h2 style={{ marginBottom: "30px", textAlign: "center" }}>System Configuration</h2>

      {/* App Name Card */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>App Name</h3>
        <input
          type="text"
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
          style={styles.input}
          placeholder="Enter App Name"
        />
      </div>

      {/* Logo Card */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>App Logo</h3>
        <input type="file" accept="image/*" onChange={handleLogoChange} />
        {logo && (
          <div style={{ marginTop: "15px" }}>
            <img
              src={logo}
              alt="Logo Preview"
              style={{
                height: "100px",
                borderRadius: "12px",
                border: "2px solid #7F8CAA",
              }}
            />
          </div>
        )}
      </div>

      {/* Theme Card */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Theme</h3>
        <button onClick={handleThemeToggle} style={{ ...styles.button, backgroundColor: "#7F8CAA" }}>
          Toggle Theme (Current: {theme})
        </button>
      </div>

      {/* Save Button */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={handleSave}
          style={{
            ...styles.button,
            backgroundColor: "#333446",
            color: "#fff",
            fontSize: "18px",
            padding: "12px 30px",
          }}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "25px",
    marginBottom: "25px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  cardTitle: { marginBottom: "15px", color: "#333446" },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "100%",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default SystemConfiguration;

