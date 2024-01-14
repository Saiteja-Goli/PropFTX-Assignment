const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  title: String,
  year: String,
  image: String,
});

const movieModel = mongoose.model("Movie", movieSchema);

module.exports = movieModel;
