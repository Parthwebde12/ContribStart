const express = require("express");
const axios   = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { language, topic } = req.query;

    let q = "label:good-first-issue+state:open";
    if (language) q += `+language:${language}`;
    if (topic)    q += `+label:${topic}`;

    const response = await axios.get(
      `https://api.github.com/search/issues?q=${q}&sort=created&order=desc&per_page=12`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    res.json(response.data.items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch issues", error: err.message });
  }
});

module.exports = router;