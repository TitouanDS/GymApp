const mongoose = require("mongoose");

const bodyZoneSchema = new mongoose.Schema({
  title: String,
  muscles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Muscle" }],
});

const BodyZone = mongoose.model("BodyZone", bodyZoneSchema);

module.exports = BodyZone;
