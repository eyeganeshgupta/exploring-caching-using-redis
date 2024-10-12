// Import necessary modules
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnect = require("./config/dbConnect");

// ! Load environment variables from .env file
dotenv.config();

const app = express();

// ! Connect to the database
dbConnect();

// ! Enable CORS for all origins (consider restricting this in production)
app.use(cors());

// ! Middleware for parsing JSON requests
app.use(express.json());

// ! Define the port for the server
const PORT = process.env.PORT || 9093;

// ! Start the server and log the status
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
