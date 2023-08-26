const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String },
    email: { type: String, require: true, unique: true },
    password: { type: String },
    rootAdmin: { type: Boolean },
    rootManager: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Users", schema);
