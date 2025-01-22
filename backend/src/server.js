import app from "./app.js";
import { config } from "./config/config.js";
import connectionDB from "./db/connectionDB.js";


connectionDB().then(() => {
    app.listen(config.PORT, () => {
        console.log("server running port 4000")
    })
}).catch((err) => {
    console.log(err)
})