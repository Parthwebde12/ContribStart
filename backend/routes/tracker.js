const express  = require("express");
const Progress = require("../models/Progress");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.get("/", async (req, res) => {
  try {
    let progress = await Progress.findOne({ user: req.user._id });
    if (!progress) {
      progress = await Progress.create({ user: req.user._id, issues: [], prs: [] });
    }
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/issues", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required" });

    let progress = await Progress.findOne({ user: req.user._id });
    if (!progress) progress = new Progress({ user: req.user._id, issues: [], prs: [] });

    progress.issues.push({ text });
    await progress.save();

    res.status(201).json(progress);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/prs", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required" });

    let progress = await Progress.findOne({ user: req.user._id });
    if (!progress) progress = new Progress({ user: req.user._id, issues: [], prs: [] });

    progress.prs.push({ text });
    await progress.save();

    res.status(201).json(progress);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.delete("/issues/:id", async (req, res) => {
  try {
    const progress = await Progress.findOne({ user: req.user._id });
    if (!progress) return res.status(404).json({ message: "Progress not found" });

    progress.issues = progress.issues.filter(
      (item) => item._id.toString() !== req.params.id
    );
    await progress.save();
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.delete("/prs/:id", async (req, res) => {
  try {
    const progress = await Progress.findOne({ user: req.user._id });
    if (!progress) return res.status(404).json({ message: "Progress not found" });

    progress.prs = progress.prs.filter(
      (item) => item._id.toString() !== req.params.id
    );
    await progress.save();
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;