const User = require("../model/User");

// ! Create user
const createUser = async (request, response) => {
  try {
    const { fullName, email } = request.body;

    const user = await User.create({ fullName, email });

    response.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    response
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// ! Fetch all users
const fetchAllUsers = async (request, response) => {
  try {
    const userList = await User.find();

    if (userList.length === 0) {
      return response.status(404).json({ message: "No users found" });
    }

    response.status(200).json({
      message: "User list retrieved successfully",
      users: userList,
    });
  } catch (error) {
    console.error("Error fetching user list:", error);
    response
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createUser,
  fetchAllUsers,
};
