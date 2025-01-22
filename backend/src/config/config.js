import dotenv from "dotenv"
import path from "path"

const __dirname = path.resolve();

dotenv.config({
    path: path.join(__dirname, '.env')
})

export const config = {
    MONGODB_URL: process.env.MONGODB_URL,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET
}