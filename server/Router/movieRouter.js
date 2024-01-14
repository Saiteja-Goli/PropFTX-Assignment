const express = require("express");

const movieModel = require("../Models/moviesModel");
require("dotenv").config();

const movie_router = express.Router();


// Get All Movies from Database
movie_router.get("/", async (req, res) => {
  try {
    const movies = await movieModel.find();
    // console.log("Movies", movies);
    res
      .status(200)
      .json({ message: "All Movies Fetched Successfully", movies: movies });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



// Add Movie to the Database
movie_router.post("/addmovie", async (req, res) => {
  try {
    const { title, year, image } = req.body;
    console.log(req.body);
    const new_movie = new movieModel({ title, year, image });
    await new_movie.save();
    res
      .status(200)
      .json({ message: "Movie Added Successfully", movie: new_movie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



//Delete thr Movie from Database
movie_router.delete("/delete/:id", async (req, res) => {
  try {
    const movie = await movieModel.findOneAndDelete({
      _id: req.params.id,
    });
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = movie_router;
