const mongoose = require("mongoose");

// ! Define a regular expression for validating email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minlength: [2, "User name must be at least 3 characters long"],
      maxlength: [30, "User name must be at most 30 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [emailRegex, "Please provide a valid email address"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// ! Compile the schema into a model
const User = mongoose.model("User", userSchema);

module.exports = User;
