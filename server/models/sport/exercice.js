const mongoose = require("mongoose");

const exerciceSchema = new mongoose.Schema({
  title: String,
  bodyZone: { type: mongoose.Schema.Types.ObjectId, ref: "BodyZone" },
  muscles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Muscle" }],
});

const Exercice = mongoose.model("Exercice", exerciceSchema);

module.exports = Exercice;
