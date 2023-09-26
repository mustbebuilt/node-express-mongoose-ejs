const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema({
  actorName: String,
  birthDate: Date,
  nationality: String,
},
  { collection: "actors" } // Specify the collection name);

);

const Actor = mongoose.model("Actor", actorSchema);

module.exports = Actor;
