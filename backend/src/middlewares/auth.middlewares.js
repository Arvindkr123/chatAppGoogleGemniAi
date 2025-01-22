import jwt, { decode } from "jsonwebtoken"
import { config } from "../config/config.js";
import { redisClient } from "../services/redis.services.js";


export const authUser = async (req, res, next) => {
    try {

        // console.log(req.headers.authorizations.split(" ")[2])
        const token = req.cookies.token || req.headers.authorizations.split(" ")[2];

        if (!token) {
            return res.status(401).send({
                error: 'unauthorized user'
            })
        }

        const isBlackListed = await redisClient.get('token');

        // console.log("from redis client is black listed", isBlackListed)

        if (isBlackListed) {
            res.cookie('token', '')
            return res.status(401).send({
                error: 'Unauthorized user'
            })
        }

        const decoded = jwt.verify(token, config.JWT_SECRET);

        // console.log(decoded)
        req.user = decoded
        // console.log(req.user);
        next();


    } catch (error) {
        res.status(401).send({
            error: 'please authenticate'
        })
    }

}