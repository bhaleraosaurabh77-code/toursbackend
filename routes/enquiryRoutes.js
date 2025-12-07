const express = require("express");
const router = express.Router();
const { submitEnquiry, getEnquiries, exportCSV } = require("../controllers/enquiryController");
const auth = require("../middleware/auth");

router.post("/submit", submitEnquiry);
router.get("/all", auth, getEnquiries);
router.get("/export", auth, exportCSV);

module.exports = router;
