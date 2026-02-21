const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  studentId: String,
  companyName: String,
  role: String,
  startDate: String,
  endDate: String,
  offerLetter: String,
  feeReceipt: String,
  status: {
    type: String,
    default: "Pending",
  },
});

module.exports = mongoose.model("Application", ApplicationSchema);
