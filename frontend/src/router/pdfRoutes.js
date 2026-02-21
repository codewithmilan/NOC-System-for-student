const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const Application = require("../models/Application");

router.get("/generate/:id", async (req, res) => {

    try {

        const app = await Application.findById(req.params.id);

        if (!app) {
            return res.status(404).send("Application not found");
        }

        if (app.status !== "Approved") {
            return res.status(400).send("NOC not approved yet");
        }

        const doc = new PDFDocument();

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=NOC.pdf"
        );

        res.setHeader("Content-Type", "application/pdf");

        doc.pipe(res);

        // ===== PDF CONTENT =====
        doc.fontSize(20).text("NO OBJECTION CERTIFICATE", {
            align: "center",
        });

        doc.moveDown();

        doc.fontSize(12).text(
            `This is to certify that the student has been granted permission to pursue internship.`);

        doc.moveDown();

        doc.text(`Company: ${app.companyName}`);
        doc.text(`Role: ${app.role}`);
        doc.text(`Start Date: ${app.startDate}`);
        doc.text(`End Date: ${app.endDate}`);

        doc.moveDown(3);

        doc.text("Authorized Signature", {
            align: "right",
        });

        doc.end();

    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
