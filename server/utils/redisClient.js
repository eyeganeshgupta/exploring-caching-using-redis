const redis = require("redis");
const dotenv = require("dotenv");

dotenv.config();

console.log("Attempting to connect to redis...");

// ! Create a Redis client with configuration from environment variables
const client = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_SOCKET_HOST,
    port: process.env.REDIS_SOCKET_PORT,
  },
});

// ! Connect to redis
client.on("connect", () => {
  console.log("Connected to Redis successfully");
});

client.on("error", (error) => {
  console.log("Failed to connect to Redis:", error);
});

client.connect();

module.exports = client;
