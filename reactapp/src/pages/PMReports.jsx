import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar
} from "recharts";
import { useNavigate } from "react-router-dom";

const PMReports = () => {
  const [orders, setOrders] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [summary, setSummary] = useState({ totalOrders: 0, totalRevenue: 0, totalItems: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); 

    if (!token) {
      setError("Unauthorized! Please login first.");
      setLoading(false);
      return;
    }

    fetch("http://localhost:8080/orders/all", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 401) throw new Error("Unauthorized. Please login again.");
        if (res.status === 403) throw new Error("Forbidden. You don’t have access.");
        return res.json();
      })
      .then(data => {
        setOrders(data);

        // Calculate summary
        let totalRevenue = 0, totalItems = 0;
        data.forEach(order => {
          totalRevenue += order.totalAmount;
          order.orderItems?.forEach(item => {
            totalItems += item.quantity;
          });
        });

        setSummary({
          totalOrders: data.length,
          totalRevenue,
          totalItems
        });

        // Prepare revenue trends for charts
        const dailyRevenue = {};
        data.forEach(order => {
          const date = new Date(order.orderDate).toLocaleDateString();
          if (!dailyRevenue[date]) dailyRevenue[date] = 0;
          dailyRevenue[date] += order.totalAmount;
        });

        const chartData = Object.keys(dailyRevenue).map(date => ({
          date,
          revenue: dailyRevenue[date]
        }));
        setRevenueData(chartData);

        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: "20px" }}>Loading analytics...</p>;
  if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "30px", backgroundColor: "#EAEFEF", minHeight: "100vh" }}>
       <button
        onClick={() => navigate("/product-manager-home")}
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
      <h2 style={{ color: "#333446", marginBottom: "20px" }}>Reports & Analytics</h2>

      {/* Summary Cards */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "40px", flexWrap: "wrap" }}>
        <div style={styles.card}>
          <h3>Total Orders</h3>
          <p style={styles.cardNumber}>{summary.totalOrders}</p>
        </div>
        <div style={styles.card}>
          <h3>Total Revenue</h3>
          <p style={styles.cardNumber}>Rs.{summary.totalRevenue.toFixed(2)}</p>
        </div>
        <div style={styles.card}>
          <h3>Total Items Sold</h3>
          <p style={styles.cardNumber}>{summary.totalItems}</p>
        </div>
      </div>

      {/* Revenue Trend */}
      <h3>Revenue Trends</h3>
      <LineChart width={800} height={300} data={revenueData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
      </LineChart>

      {/* Orders Bar Chart */}
      <h3 style={{ marginTop: 40 }}>Orders by Date</h3>
      <BarChart width={800} height={300} data={revenueData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="#82ca9d" />
      </BarChart>

      {/* Orders Table */}
      <h3 style={{ marginTop: 40 }}>Orders Table</h3>
      <table style={styles.table}>
        <thead>
          <tr style={styles.trHeader}>
            <th style={styles.th}>Order ID</th>
            <th style={styles.th}>Customer</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} style={styles.tr}>
              <td style={styles.td}>{order.id}</td>
              <td style={styles.td}>{order.customerUsername || order.customerName}</td>
              <td style={styles.td}>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td style={styles.td}>{order.orderStatus || order.status}</td>
              <td style={styles.td}>{order.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  card: { backgroundColor: "#fff", padding: "20px", borderRadius: "12px", flex: 1, minWidth: "200px", textAlign: "center", boxShadow: "0 4px 12px rgba(51, 52, 70, 0.1)" },
  cardNumber: { fontSize: "28px", fontWeight: "bold", marginTop: "10px" },
  table: { width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", borderRadius: "10px", overflow: "hidden" },
  th: { padding: "12px", textAlign: "left" },
  td: { padding: "12px" },
  trHeader: { backgroundColor: "#7F8CAA", color: "#fff" },
  tr: { borderBottom: "1px solid #ccc" }
};

export default PMReports;
