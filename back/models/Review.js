const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    comment: String,
    lessor: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    raiting: Number
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "update_at"
    }
  }
);

module.exports = mongoose.model("Review", reviewSchema);
