const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: ".env.local" });

const authRouter = require("./routes/auth");
const issuesRouter = require("./routes/Issues");
const trackerRouter = require("./routes/tracker");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://contrib-start-drab.vercel.app",
    ],
    credentials: true,
  })
);

// JSON body parser (IMPORTANT)
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/Issues", issuesRouter);
app.use("/api/tracker", trackerRouter);

// Health check route
app.get("/", (req, res) => {
  res.json({ status: "ContribStart API running" });
});

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });