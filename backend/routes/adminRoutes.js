const express = require("express");
const router = express.Router();

const Application = require("../models/Application");
const User = require("../models/Student"); // ✅ tumhara existing model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ================= ADMIN LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({
      email,
      role: "admin",
    });

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      "secret",
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: admin,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= VIEW ALL APPLICATIONS =================
router.get("/applications", async (req, res) => {
  try {
    const apps = await Application
      .find()
      .populate("studentId", "name email rollNo");

    res.json(apps);
  } catch (err) {
    res.status(500).json(err);
  }
});


// ================= APPROVE =================
router.put("/approve/:id", async (req, res) => {
  try {
    await Application.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" }
    );

    res.json("Application Approved");
  } catch (err) {
    res.status(500).json(err);
  }
});


// ================= REJECT =================
router.put("/reject/:id", async (req, res) => {
  try {
    await Application.findByIdAndUpdate(
      req.params.id,
      { status: "Rejected" }
    );

    res.json("Application Rejected");
  } catch (err) {
    res.status(500).json(err);
  }
});


// ✅ VERY IMPORTANT (THIS WAS MISSING)
module.exports = router;