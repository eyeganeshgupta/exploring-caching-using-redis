const User = require("../model/User");
const redisClient = require("../utils/redisClient");

const CACHE_KEY = "allUsers";
const CACHE_EXPIRATION = 3600; // 1 hour in seconds

// ! Create user
const createUser = async (request, response) => {
  try {
    const { fullName, email } = request.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.info(`[User Creation] User with email ${email} already exists.`);
      return response
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    const user = await User.create({ fullName, email });

    // * Invalidate cache after creating a user
    await redisClient.del(CACHE_KEY);
    console.info(
      `[User Creation] New user created: ${user._id}. Cache invalidated.`
    );

    response.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(`[User Creation Error] ${error.message}`, {
      stack: error.stack,
    });
    response
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// ! Fetch all users
const fetchAllUsers = async (request, response) => {
  try {
    // ! Check cache
    const cachedUsers = await redisClient.get(CACHE_KEY);
    if (cachedUsers) {
      console.info(`[Cache Hit] Users fetched from Redis. Key: ${CACHE_KEY}`);
      return response.status(200).json({
        message: "User list retrieved successfully",
        users: JSON.parse(cachedUsers),
      });
    }

    // ! Cache miss, query MongoDB
    const userList = await User.find();

    if (userList.length === 0) {
      console.info("[User Fetch] No users found in the database.");
      return response.status(204).json();
    }

    // ! Set cache
    await redisClient.set(
      CACHE_KEY,
      JSON.stringify(userList),
      "EX",
      CACHE_EXPIRATION
    );
    console.info(
      `[Cache Miss] Users fetched from MongoDB and cached. Key: ${CACHE_KEY}, Expiration: ${CACHE_EXPIRATION}s`
    );

    response.status(200).json({
      message: "User list retrieved successfully",
      users: userList,
    });
  } catch (error) {
    console.error(`[User Fetch Error] ${error.message}`, {
      stack: error.stack,
    });
    response
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  createUser,
  fetchAllUsers,
};
