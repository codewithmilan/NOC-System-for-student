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

       doc.rect(30, 30, 550, 750).stroke();

doc.fontSize(22)
   .text("QUANTUM UNIVERSITY", { align: "center" });

doc.moveDown();

doc.fontSize(18)
   .text("NO OBJECTION CERTIFICATE", {
      align: "center",
      underline: true,
   });

doc.moveDown(2);

doc.fontSize(12).text(
`This is to certify that the student is hereby granted permission to pursue an internship as per the details below:`
);

doc.moveDown();

doc.text(`Company Name : ${app.companyName}`);
doc.text(`Role          : ${app.role}`);
doc.text(`Start Date    : ${app.startDate}`);
doc.text(`End Date      : ${app.endDate}`);

doc.moveDown(4);

doc.text("We wish the student success in their internship.", {
   align: "left",
});

doc.moveDown(5);

doc.text("Authorized Signature", {
   align: "right",
});

doc.text("Training & Placement Cell", {
   align: "right",
});



     doc.end();

    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
