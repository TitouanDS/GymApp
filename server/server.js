//Load .env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

//import dependencies
const express = require("express");

const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectToDb = require("./config/connectToDb");
const notesController = require("./controllers/notesController");
const usersController = require("./controllers/usersController");
const sportsDBController = require("./controllers/sportsDBController");
const sessionsController = require("./controllers/sessionsController");

const requireAuth = require("./middleware/requireAuth");

//create express app
const app = express();

//configure express app

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

//connect to databse
connectToDb();

//routing
app.post("/notes", requireAuth, notesController.createNote);
app.get("/notes", requireAuth, notesController.fetchAllNotes);
app.get("/notes/:noteId", requireAuth, notesController.fetchNote);
app.put("/notes/:noteId", requireAuth, notesController.updateNote);
app.delete("/notes/:noteId", requireAuth, notesController.deleteNote);

app.post("/signup", usersController.signup);
app.post("/login", usersController.login);
app.get("/logout", usersController.logout);
app.get("/check-auth", requireAuth, usersController.checkAuth);

app.get("/users", requireAuth, usersController.fetchAllUsers);
app.get("/user", requireAuth, usersController.fetchUserData);
app.put("/user-pseudo", requireAuth, usersController.updatePseudo);

app.post("/exercices", requireAuth, sportsDBController.createExercice);
app.get("/exercices", requireAuth, sportsDBController.fetchAllExercices);
app.get(
  "/exercices/:exerciceId",
  requireAuth,
  sportsDBController.fetchExercice
);
app.put(
  "/exercices/:exerciceId",
  requireAuth,
  sportsDBController.updateExercice
);
app.delete(
  "/exercices/:exerciceId",
  requireAuth,
  sportsDBController.deleteExercice
);

app.post("/bodyZ", requireAuth, sportsDBController.createBodyZone);
app.get("/bodyZ", requireAuth, sportsDBController.fetchAllBodyZones);
app.get("/bodyZ/:bodyZId", requireAuth, sportsDBController.fetchBodyZone);
app.put("/bodyZ/:bodyZId", requireAuth, sportsDBController.updateBodyZone);
app.delete("/bodyZ/:bodyZId", requireAuth, sportsDBController.deleteBodyZone);

app.post("/muscles", requireAuth, sportsDBController.createMuscle);
app.get("/muscles", requireAuth, sportsDBController.fetchAllMuscles);
app.get("/muscles/:musclceId", requireAuth, sportsDBController.fetchMuscle);
app.put("/muscles/:musclceId", requireAuth, sportsDBController.updateMuscle);
app.delete("/muscles/:musclceId", requireAuth, sportsDBController.deleteMuscle);

app.post("/sessions", requireAuth, sessionsController.initSession);
app.get("/sessions", requireAuth, sessionsController.fetchAllSessions);
app.get("/sessions/:sessionId", requireAuth, sessionsController.fetchSession);
app.put("/sessions/:sessionId", requireAuth, sessionsController.addExercice);

app.put("/sessions/:sessionId", requireAuth, sessionsController.updateSession);
app.delete(
  "/sessions/:sessionId",
  requireAuth,
  sessionsController.deleteSession
);

//start the server
app.listen(process.env.PORT);
