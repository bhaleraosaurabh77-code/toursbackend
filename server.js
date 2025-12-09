// server.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://toursfrontend.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Routes
app.use("/api/enquiry", require("./routes/enquiryRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// Hidden admin panel route (optional)
app.get("/amit-admin-2025-96", (req, res) => {
  res.json({ message: "Admin panel active" });
});

// Root test route
app.get("/", (req, res) => {
  res.send("Backend is running ✔");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

