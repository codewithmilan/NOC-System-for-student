const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ================= REGISTER =================
exports.registerStudent = async (req, res) => {
  try {
    const { name, email, rollNo, password } = req.body;

    const existing = await Student.findOne({ email });

    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await Student.create({
      name,
      email,
      rollNo,
      password: hashedPassword,
      role: "student", // default role
    });

    res.json({ message: "Register success" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= LOGIN =================
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Student.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(400).json({ message: "Wrong password" });

    // ✅ create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "SECRETKEY",
      { expiresIn: "1d" }
    );

    // ✅ send proper data
    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,   // ⭐ FIXED
      },
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};