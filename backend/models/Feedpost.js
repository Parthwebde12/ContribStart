const mongoose = require("mongoose");

const feedPostSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["pr", "milestone"], required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.FeedPost || mongoose.model("FeedPost", feedPostSchema);