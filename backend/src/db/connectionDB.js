
import mongoose from 'mongoose';
import { config } from '../config/config.js';
const connectionDB = async () => {
    try {
        const res = await mongoose.connect(config.MONGODB_URL);

        console.log("database connection established ", res.connection.host)
    } catch (error) {
        console.log("error while connecting to mongodb database")
        process.exit(1)
    }
}

export default connectionDB