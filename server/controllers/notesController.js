const Note = require("../models/note");

const fetchAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.json({ notes });
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

const fetchNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const note = await Note.findOne({ _id: noteId, user: req.user._id });
    res.json({ note });
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

const createNote = async (req, res) => {
  try {
    const title = req.body.title;
    const body = req.body.body;
    const note = await Note.create({
      title: title,
      body: body,
      user: req.user._id,
    });
    res.json({ note: note });
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

const updateNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const { title, body } = req.body;
    await Note.findOneAndUpdate({ _id: noteId, user: req.user._id }, { title, body });
    const note = await Note.findById(noteId);
    res.json({ note });
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    await Note.deleteOne({ _id: noteId, user: req.user._id });
    const notes = await Note.find();
    res.json({ notes, message: "deleted success" });
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

module.exports = {
  createNote,
  fetchAllNotes,
  fetchNote,
  updateNote,
  deleteNote,
};
