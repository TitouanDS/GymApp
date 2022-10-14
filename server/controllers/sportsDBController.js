const Exercice = require("../models/sport/exercice");
const BodyZone = require("../models/sport/bodyZone");
const Muscle = require("../models/sport/muscle");

const fetchAllExercices = async (req, res) => {
  try {
    const exercices = await Exercice.find();
    res.json({ exercices });
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

const fetchExercice = async (req, res) => {
  try {
    const exerciceId = req.params.exerciceId;
    const exercice = await Exercice.findOne({ _id: exerciceId });
    res.json({ exercice });
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

const createExercice = async (req, res) => {
  try {
    const { title, bodyZone, muscles } = req.body;
    const exercice = await Exercice.create({
      title: title,
      bodyZone: bodyZone,
      muscles: muscles,
    });
    res.json({ exercice: exercice });
    return console.log(exercice);
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

const updateExercice = async (req, res) => {
  try {
    const exerciceId = req.params.exerciceId;
    const { title, bodyZone, muscles } = req.body;
    await Exercice.findOneAndUpdate(
      { _id: exerciceId },
      { title, bodyZone, muscles }
    );
    const exercice = await Exercice.findById(exerciceId);
    res.json({ exercice });
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

const deleteExercice = async (req, res) => {
  try {
    const exerciceId = req.params.exerciceId;
    await Exercice.deleteOne({ _id: exerciceId });
    const exercices = await Exercice.find();
    res.json({ exercices, message: "deleted success" });
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

/////////////////////BZONES////////////////////////////

const fetchAllBodyZones = async (req, res) => {
  try {
    const bodyZones = await BodyZone.find();
    res.json({ bodyZones });
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

const fetchBodyZone = async (req, res) => {
  try {
    const bodyZoneId = req.params.bodyZoneId;
    const bodyZone = await BodyZone.findOne({ _id: exerciceId });
    res.json({ bodyZone });
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

const createBodyZone = async (req, res) => {
  try {
    const title = req.body.title;

    const bodyZone = await BodyZone.create({
      title: title,
    });
    res.json({ bodyZone: bodyZone });
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

const updateBodyZone = async (req, res) => {
  try {
    const bodyZoneId = req.params.bodyZId;
    const { title } = req.body;
    await BodyZone.findOneAndUpdate({ _id: bodyZoneId }, { title });
    const bodyZone = await BodyZone.findById(bodyZoneId);
    res.json({ bodyZone });
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};
const deleteBodyZone = async (req, res) => {
  try {
    const bodyZoneId = req.params.bodyZId;
    await BodyZone.deleteOne({ _id: bodyZoneId });
    const bodyZones = await BodyZone.find();
    res.json({ bodyZones, message: "deleted success" });
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

//////////////////////////////MUSCLES/////////////////////////////////////////
const fetchAllMuscles = async (req, res) => {
  try {
    const muscles = await Muscle.find();
    res.json({ muscles });
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

const fetchMuscle = async (req, res) => {
  try {
    const exerciceId = req.params.exerciceId;
    const muscle = await Muscle.findOne({ _id: exerciceId });
    res.json({ muscle });
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

const createMuscle = async (req, res) => {
  try {
    const title = req.body.title;
    const bodyZone = req.body.bodyZone;

    const muscle = await Muscle.create({
      title: title,
      bodyZone: bodyZone,
    });
    res.json({ muscle: muscle });
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};
const updateMuscle = async (req, res) => {
  try {
    const musclceId = req.params.musclceId;
    const { title, bodyZone } = req.body;
    await Muscle.findOneAndUpdate({ _id: musclceId }, { title, bodyZone });
    const muscle = await Muscle.findById(musclceId);
    res.json({ muscle });
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

const deleteMuscle = async (req, res) => {
  try {
    const musclceId = req.params.musclceId;
    await Muscle.deleteOne({ _id: musclceId });
    const msucles = await Muscle.find();
    res.json({ msucles, message: "deleted success" });
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

module.exports = {
  fetchAllExercices,
  fetchExercice,
  createExercice,
  updateExercice,
  deleteExercice,

  fetchAllBodyZones,
  fetchBodyZone,
  createBodyZone,
  updateBodyZone,
  deleteBodyZone,

  fetchAllMuscles,
  fetchMuscle,
  createMuscle,
  updateMuscle,
  deleteMuscle,
};
