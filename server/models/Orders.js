const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: { type: String, required: true },
  img: [String],
  category: { type: String },
  price: Number,
  count: Number,
});

const schema = new Schema(
  {
    _id: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String },
    product: [productSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Orders", schema);
