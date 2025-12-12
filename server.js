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

// -------------------------------
// CORS - allow only trusted origins
// -------------------------------
const allowedOrigins = [
  "https://amittoursandtravels.com",
  "https://www.amittoursandtravels.com",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://toursfrontend.onrender.com" // keep if you used this during testing
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  // Allow requests with no origin (curl, server-to-server)
  if (!origin) {
    return next();
  }
  if (allowedOrigins.includes(origin)) {
    // set CORS headers for allowed origin
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    // If it's a preflight request, send 204
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }
    return next();
  } else {
    console.warn("⛔ CORS blocked origin:", origin);
    return res.status(403).json({ error: "CORS Error: This origin is not allowed" });
  }
});

// If you prefer to use the cors() package directly, you can replace the above with:
// app.use(cors({ origin: allowedOrigins, credentials: true }));

// Handle JSON bodies (limit to avoid very large uploads)
app.use(express.json({ limit: "2mb" }));

// -------------------------------
// Routes
// -------------------------------
app.use("/api/enquiry", require("./routes/enquiryRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// Optional hidden admin panel check
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





