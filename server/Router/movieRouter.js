const express = require("express");
const movieModel = require("../Models/moviesModel");
require("dotenv").config();
const movie_router = express.Router();

// Get All Movies from Database
movie_router.get("/", async (req, res) => {
  try {
    const movies = await movieModel.find();
    res.status(200).json({ message: "All Movies Fetched Successfully", movies: movies });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Add Movie to the Database
movie_router.post("/addmovie", async (req, res) => {
  try {
    const { title, year, image } = req.body;
    const new_movie = new movieModel({ title, year, image });
    await new_movie.save();
    res.status(200).json({ message: "Movie Added Successfully", movie: new_movie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Edit Movie in the Database
movie_router.put("/edit/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const { title, year, image } = req.body;

    // Find the movie by ID
    const existingMovie = await movieModel.findById(movieId);

    if (!existingMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Update the movie details
    existingMovie.title = title;
    existingMovie.year = year;
    existingMovie.image = image;

    // Save the updated movie
    const updatedMovie = await existingMovie.save();

    res.status(200).json({ message: "Movie updated successfully", movie: updatedMovie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete Movie from Database
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
