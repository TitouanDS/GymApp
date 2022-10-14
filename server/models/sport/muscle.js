const mongoose = require("mongoose");

const muscleSchema = new mongoose.Schema({
  title: String,
  bodyZone: { type: mongoose.Schema.Types.ObjectId, ref: "BodyZone" },
});

const Muscle = mongoose.model("Muscle", muscleSchema);

module.exports = Muscle;
