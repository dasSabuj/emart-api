require("dotenv").config();
const mongoose = require("mongoose");
const connection = process.env.CONNECTION_STRING;
const connect = async () => {
  try {
    await mongoose.connect(connection);
    console.log("database connected");
  } catch (error) {
    console.error(error.message);
  }
};
module.exports = connect;
