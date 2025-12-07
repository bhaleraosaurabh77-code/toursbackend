const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin.js");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const hashed = await bcrypt.hash("admin123", 10);
  await Admin.create({ username: "amitAdmin", password: hashed });
  console.log("Admin created");
  process.exit();
});



// userName: amitAdmin
// password: Admin@2025