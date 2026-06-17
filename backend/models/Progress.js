const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  text:  { type: String, required: true },
  notes: { type: String, default: "" },
  date:  { type: Date, default: Date.now },
});

const progressSchema = new mongoose.Schema(
  {
    user:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    issues: [entrySchema],
    prs:    [entrySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Progress", progressSchema);