const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
require("dotenv").config();

const authRouter = require("./routes/auth");

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.use("/api/auth", authRouter);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ContribStart API running " });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" MongoDB connected");
    app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error(" MongoDB connection failed:", err.message);
    process.exit(1);
  });