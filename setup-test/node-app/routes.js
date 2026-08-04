const express = require("express");
const router = express.Router();
const { processVectorData } = require("./dataProcessor");

router.post("/process", (req, res) => {
  const rawData = req.body.data;

  if (!rawData || !Array.isArray(rawData)) {
    return res.status(400).json({ error: "Missing or invalid data array" });
  }

  // Set Breakpoint #1 here!
  const processedResult = processVectorData(rawData);

  res.json({ success: true, result: processedResult });
});

module.exports = router;
