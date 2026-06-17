const express  = require("express");
const User     = require("../models/User");
const Progress = require("../models/Progress");

const router = express.Router();

router.get("/:username", async (req, res) => {
  try {
    const username = req.params.username.toLowerCase();

    const user = await User.findOne({ username }).select("name username createdAt");
    if (!user) return res.status(404).json({ message: "User not found" });

    const progress = await Progress.findOne({ user: user._id });

    res.json({
      name: user.name,
      username: user.username,
      memberSince: user.createdAt,
      issuesExplored: progress?.issues.length || 0,
      prsSubmitted: progress?.prs.length || 0,
    });
  } catch (err) {
    console.error("PROFILE ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;