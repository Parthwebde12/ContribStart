const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
require("dotenv").config({ path: ".env.local" });

const authRouter    = require("./routes/auth");
const issuesRouter  = require("./routes/issues");
const trackerRouter = require("./routes/tracker");
const profileRouter = require("./routes/profile");

const app  = express();
const PORT = process.env.PORT || 5000;


const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((url) => url.trim());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
}));

app.use(express.json());

// Routes
app.use("/api/auth",    authRouter);
app.use("/api/issues",  issuesRouter);
app.use("/api/tracker", trackerRouter);
app.use("/api/profile", profileRouter);

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