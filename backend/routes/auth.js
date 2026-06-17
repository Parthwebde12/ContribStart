const express = require("express");
const jwt     = require("jsonwebtoken");
const User    = require("../models/User");

const router = express.Router();

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    // username rules: lowercase letters, numbers, underscores only
    const usernameRegex = /^[a-z0-9_]{3,20}$/;
    const cleanUsername = username.trim().toLowerCase();
    if (!usernameRegex.test(cleanUsername))
      return res.status(400).json({
        message: "Username must be 3-20 characters: lowercase letters, numbers, underscores only",
      });

    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.status(400).json({ message: "Email already registered" });

    const usernameExists = await User.findOne({ username: cleanUsername });
    if (usernameExists)
      return res.status(400).json({ message: "Username already taken" });

    const user  = await User.create({ name, username: cleanUsername, email, password });
    const token = signToken(user._id);

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: "Invalid email or password" });

    const token = signToken(user._id);

    res.json({
      token,
      user: { id: user._id, name: user.name, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/auth/me
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user    = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user: { id: user._id, name: user.name, username: user.username, email: user.email } });
  } catch (err) {
    console.error("ME ERROR:", err);
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
