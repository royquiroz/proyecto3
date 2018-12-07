const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["STORAGE", "ACOOMMODATION"]
    },
    name: String,
    size: Number,
    price: Number,
    photos: String,
    dimensions: Number,
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review"
      }
    ],
    address: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("Place", placeSchema);
