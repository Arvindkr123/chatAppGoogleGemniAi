import Redis from "ioredis";

export const redisClient = new Redis({
    host: 'localhost', // Redis server hostname
    port: 6379,        // Redis server port (must be a number)
});

// Test the connection


// redisClient.on("error", (err) => {
//     console.error("Redis connection error:", err);
// });

// Example command
// (async () => {
//     try {
//         await redisClient.set("key", "value");
//         const value = await redisClient.get("key");
//         console.log("Value:", value);
//     } catch (error) {
//         console.error("Error:", error);
//     } finally {
//         redisClient.disconnect();
//     }
// })();
