const express = require("express");
const { createUser, fetchAllUsers } = require("../controllers/userController");
const router = express.Router();

// Create user route
router.post("/create", createUser);

// Fetch all users route
router.get("/lists", fetchAllUsers);

module.exports = router;
