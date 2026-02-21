const Application = require("../models/Application");

// ================= APPLY NOC =================
exports.applyNOC = async (req, res) => {
  try {

    const studentId = req.user.id;

    // ✅ only one pending application allowed
    const existing = await Application.findOne({
      studentId,
      status: "pending",
    });

    if (existing) {
      return res.status(400).json({
        message: "You already have a pending NOC",
      });
    }

    const newApplication = new Application({
      studentId,
      companyName: req.body.companyName,
      role: req.body.role,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      offerLetter: req.files.offerLetter[0].filename,
      feeReceipt: req.files.feeReceipt[0].filename,
    });

    await newApplication.save();

    res.json({ message: "NOC Application Submitted ✅" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= GET STUDENT APPLICATIONS =================
exports.getMyApplications = async (req, res) => {
  try {

    const apps = await Application.find({
      studentId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(apps);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};