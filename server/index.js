const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connection = require("./Configs/db");
const movie_router = require("./Router/movieRouter");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "This is Backend" });
});

app.use("/movies", movie_router);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to db");
    console.log("Server Is Running");
  } catch (error) {
    console.log(error);
  }
});
