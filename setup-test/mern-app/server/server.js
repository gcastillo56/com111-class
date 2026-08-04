// server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

// Enable CORS so the Next.js frontend on Port 3000 can make requests here
app.use(cors());
app.use(express.json());

// Replace this with your actual Atlas connection string when ready
const MONGO_URI =
  "mongodb+srv://<username>:<password>@cluster.mongodb.net/testdb";

app.get("/api/data", async (req, res) => {
  try {
    // BACKEND BREAKPOINT: Set a red dot on the line below!
    const isConnected = mongoose.connection.readyState === 1;
    const dbStatus = isConnected
      ? "Connected to Atlas"
      : "Atlas Not Connected (Mock Mode)";

    // Simulating a database fetch
    const simulatedData = {
      name: "Vector Analysis Result",
      value: Math.random().toFixed(4),
      dbStatus,
    };

    res.json({ success: true, data: simulatedData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, async () => {
  console.log(`Express API listening on port ${PORT}`);

  // Uncomment the lines below when you are ready to test your Atlas connection
  /*
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Successfully connected to MongoDB Atlas");
  } catch (err) {
    console.error("MongoDB Atlas connection error:", err);
  }
  */
});
