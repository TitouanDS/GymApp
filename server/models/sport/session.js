const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  date: Date,
  status: Boolean,
  exercices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercice",
      weight: String,
      timer: String,
      status: Boolean,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const session = mongoose.model("session", sessionSchema);

module.exports = session;
