const mongoose = require("mongoose");

const RecommendSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recommend", RecommendSchema);
