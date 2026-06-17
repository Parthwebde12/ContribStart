const express  = require("express");
const FeedPost = require("../models/FeedPost");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await FeedPost.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("user", "name username");

    const valid = posts.filter((p) => p.user);

    res.json(valid);
  } catch (err) {
    console.error("FEED FETCH ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;