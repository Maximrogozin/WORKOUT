const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String, required: true },
    img: [String],
    category: { type: String },
    description: [String],
    price: Number,
    count: Number,
    characteristics: [String],
    equipment: [String],
    proportions: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Catalog", schema);
