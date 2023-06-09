const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema(
  {
    filmCertificate: String,
    filmTitle: String,
    filmDescription: String,
    filmImage: String,
    filmPrice: Number,
    filmReview: Number,
    releaseDate: Date,
  },
  { collection: "filmsCollection" } // Specify the collection name
);

const Film = mongoose.model("Film", filmSchema);

module.exports = Film;
