const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
require("dotenv").config();
const authRouter    = require("./routes/auth");
const issuesRouter  = require("./routes/Issues");
const trackerRouter = require("./routes/tracker");

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://contrib-start-drab.vercel.app"
  ],
  credentials: true
}));

app.use("/api/auth",    authRouter);
app.use("/api/Issues",  issuesRouter);
app.use("/api/tracker", trackerRouter);

app.get("/", (req, res) => {
  res.json({ status: "ContribStart API running " });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error(" MongoDB connection failed:", err.message);
    process.exit(1);
  });

  