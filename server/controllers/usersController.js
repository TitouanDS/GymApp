const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const User = require("../models/user");

const signup = async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 8);

  const user = await User.create({
    email,
    password: hashedPassword,
    role: "user",
  });

  res.sendStatus(200);
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.sendStatus(401);

    const passwordMatch = bcrypt.hashSync(password, user.password);

    if (!passwordMatch) return res.sendStatus(401);

    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

function logout(req, res) {
  try {
    res.cookie("Authorization", "", { expires: new Date() });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

function checkAuth(req, res) {
  try {
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

const fetchUserData = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById({ _id: userId });

    res.json({ user });
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

const updatePseudo = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.user._id;
    const { pseudo } = req.body;
    await User.findOneAndUpdate({ _id: userId }, { pseudo });
    const user = await User.findById(userId);
    res.json({ user });
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.json({ users });
  } catch (error) {
    console.log(error), res.sendStatus(400);
  }
};

module.exports = {
  signup,
  login,
  logout,
  checkAuth,
  fetchUserData,
  updatePseudo,
  fetchAllUsers,
};
