const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: { type: String, required: true },
  pseudo: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
  sportSession: [{ type: mongoose.Schema.Types.ObjectId, ref: "sportSession" }],

});

const User = mongoose.model("User", userSchema);

module.exports = User;
