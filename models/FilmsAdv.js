const mongoose = require("mongoose");
const Actor = require("../models/Actor");

const filmSchema = new mongoose.Schema(
  {
    filmCertificate: String,
    filmTitle: String,
    filmDescription: String,
    filmImage: String,
    filmPrice: Number,
    filmReview: Number,
    releaseDate: Date,
    actors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Actor'
  }],
  },
  { collection: "favFilms" } // Specify the collection name
);

const FilmAdv = mongoose.model("FilmAdv", filmSchema);

module.exports = FilmAdv;
