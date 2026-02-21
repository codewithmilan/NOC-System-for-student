const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  rollNo: String,
  password: String,

  role: {
    type: String,
    default: "student",
  },

  feePaid: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Student", studentSchema);