import mongoose from "mongoose";

const indicatorSchema = new mongoose.Schema(
  {
    id: String,
    label: String,
    tip: String,
    weight: Number,
  },
  { _id: false }
);

const scanHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    scanType: {
      type: String,
      enum: ["text", "url"],
      required: true,
    },
    // The raw input the user submitted (message text, or the URL string)
    input: {
      type: String,
      required: true,
    },
    // Normalized fields, populated differently depending on scanType
    hostname: String,
    verdict: {
      type: String,
      enum: ["Safe", "Suspicious", "Scam", "Dangerous"],
      required: true,
    },
    score: { type: Number, required: true },
    confidence: Number, // text scans
    trustScore: Number, // url scans
    indicators: [indicatorSchema],
    recommendations: [String],
    explanation: String,
  },
  { timestamps: true }
);

scanHistorySchema.index({ user: 1, createdAt: -1 });

const ScanHistory = mongoose.model("ScanHistory", scanHistorySchema);

export default ScanHistory;
