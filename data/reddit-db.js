/* Mongoose Connection */
const mongoose = require("mongoose");
assert = require("assert");

const url = "mongodb://localhost/reddit-db";
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost/reddit-db",
  { useNewUrlParser: true }
);

mongoose.set("debug", true);

module.exports = mongoose.connection;