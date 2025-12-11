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

// Required for Render (proxy)
app.set("trust proxy", 1);

// Parse JSON body
app.use(express.json());

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://toursfrontend.onrender.com",
  "https://amittoursandtravels.com",
  "https://www.amittoursandtravels.com"
];

// CORS Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow curl, Postman

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn("❌ Blocked by CORS:", origin);
      return callback(new Error("CORS blocked for origin: " + origin));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// Preflight request handler
app.options("*", (req, res) => {
  res.sendStatus(204);
});

// ROUTES
app.use("/api/enquiry", require("./routes/enquiryRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// Hidden admin route (optional)
app.get("/amit-admin-2025-96", (req, res) => {
  res.json({ message: "Admin panel active" });
});

// Root test route
app.get("/", (req, res) => {
  res.send("Backend is running ✔");
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    uptime: process.uptime(),
    time: new Date().toISOString()
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.message || err);

  if (err.message && err.message.startsWith("CORS")) {
    return res.status(403).json({
      error: "CORS Error",
      message: err.message
    });
  }

  res.status(500).json({
    error: "Server Error",
    message: err.message || "Something went wrong"
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


