const Enquiry = require("../models/Enquiry");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

exports.submitEnquiry = async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    await enquiry.save();
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to save enquiry" });
  }
};

exports.getEnquiries = async (req, res) => {
  try {
    const data = await Enquiry.find().sort({ createdAt: -1 });
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch" });
  }
};

// Export CSV
exports.exportCSV = async (req, res) => {
  try {
    const enquiries = await Enquiry.find();

    const csvWriter = createCsvWriter({
      path: "enquiries.csv",
      header: [
        { id: "name", title: "Name" },
        { id: "phone", title: "Phone" },
        { id: "email", title: "Email" },
        { id: "message", title: "Message" },
        { id: "createdAt", title: "Date" },
      ],
    });

    await csvWriter.writeRecords(enquiries);
    res.download("enquiries.csv");
  } catch {
    res.status(500).json({ error: "Failed to export" });
  }
};
