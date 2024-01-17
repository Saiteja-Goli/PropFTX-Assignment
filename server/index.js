const express = require("express");
const cors = require("cors");
const helmet = require("helmet"); // Adding Helmet for security headers
const rateLimit = require("express-rate-limit"); // Adding rate limiting for DDoS protection
const xss = require("xss-clean"); // Adding XSS protection
require("dotenv").config();
const movie_router = require("./Router/movieRouter");

const app = express();
app.use(cors());
app.use(helmet());

// Apply rate limiting middleware to protect against DDoS attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(express.json());

// Add XSS protection
app.use(xss());

app.get("/", (req, res) => {
  const origin = req.get("Origin");
  console.log("Received origin:", origin);
  res.status(200).json({ msg: "This is Backend" });
});

app.use("/movies", movie_router);

if (process.env.mongodb) {
  const connection = require("./Configs/db");
  app.listen(process.env.PORT || 4000, async () => {
    try {
      await connection;
      console.log("connected to db");
      console.log("Server Is Running");
    } catch (error) {
      console.log("Error:", error);
    }
  });
} else {
  console.log("Require MongoDB URL for Starting the server");
}
