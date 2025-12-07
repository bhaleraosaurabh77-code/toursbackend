const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
require("dotenv").config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    const username = "amitAdmin";
    const password = "Admin@2025";

    const hashed = await bcrypt.hash(password, 10);

    await Admin.deleteMany({}); // remove all admins
    await Admin.create({ username, password: hashed });

    console.log("Admin reset successful!");
    console.log("Username:", username);
    console.log("Password:", password);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
