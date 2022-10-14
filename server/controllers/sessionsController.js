const Session = require("../models/sport/session");

const fetchAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find();
    res.json({ sessions });
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

const fetchSession = async (_id) => {
  try {
    const currentSessionId = req.params.currentSessionId;
    const currentSession = await Session.findOne({ _id: currentSessionId });
    res.json({ currentSession });
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

const initSession = async (req, res) => {
  try {
    const { date } = req.body;
    const currentSession = await Session.create({
      status: true,
      date: date,
      exercices: [],
      user: req.user,
    });
    res.json({ currentSession: currentSession });
    return console.log(currentSession);
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

const addExercice = async (req, res) => {
  try {
    return console.log(req.body);
    const sessionId = req.params.sessionId;
    const { exercice, status } = req.body;
    await Session.findOneAndUpdate({ _id: sessionId }, { status });

    await Session.updateMany({ _id: sessionId }, { exercices: exercice });

    const currentSession = await Session.findById(sessionId);
    console.log(currentSession);

    res.json({ currentSession });
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

const updateSession = async (req, res) => {
  try {
    console.log("updateSession");
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

const deleteSession = async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    await Session.deleteOne({ _id: sessionId });
    const sessions = await Session.find();
    res.json({ sessions, message: "deleted success" });
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

const closeSession = async (req, res) => {
  try {
    console.log("closeSession");
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

module.exports = {
  fetchAllSessions,
  fetchSession,
  initSession,
  updateSession,
  deleteSession,
  closeSession,
  addExercice,
};
