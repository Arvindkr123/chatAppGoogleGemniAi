import express from 'express'
import usersRoutes from './routes/user.routes.js';
import cookieParser from "cookie-parser"
import { redisClient } from './services/redis.services.js';
import cors from "cors"


const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

redisClient.on("connect", () => {
    console.log("Connected to Redis!");
});

app.use("/users", usersRoutes)

export default app;