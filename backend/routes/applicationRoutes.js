const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");
const upload = require("../middleware/upload");

// ✅ controller import
const {
  applyNOC,
  getMyApplications,
} = require("../controllers/applicationController");


// ================= APPLY NOC =================
router.post(
  "/apply",
  verifyToken,
  upload.fields([
    { name: "offerLetter", maxCount: 1 },
    { name: "feeReceipt", maxCount: 1 },
  ]),
  applyNOC
);


// ================= STUDENT TRACKING =================
router.get("/myApplications", verifyToken, getMyApplications);


module.exports = router;