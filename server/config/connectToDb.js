const mongoose = require("mongoose");

async function connectToDb() {
  console.log("hello");

  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectToDb;
