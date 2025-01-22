import { validationResult } from "express-validator"
import { createUser, } from './../services/user.service.js';
import UserModel from "../models/user.models.js";
import { redisClient } from "../services/redis.services.js";

export const userRegisterController = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }


        const user = await createUser(req.body);

        const token = user.generateJWT()

        res.status(201).json({
            user,
            token
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


export const userLoginController = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const { email, password } = req.body;

        const user = await UserModel.findOne({
            email
        }).select("+password")

        if (!user) {
            return res.status(401).json({
                errors: 'Invalid credentials'
            })
        }

        const isMatch = await user.isValidPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                errors: 'Invalid credentials'
            })
        }


        const token = await user.generateJWT();


        res.status(200).json({
            user,
            token
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


export const userProfileController = async (req, res) => {
    try {
        res.status(200).json({
            user: req.user
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const userLogoutController = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorizations.split(" ")[2];

        redisClient.set(token, 'logout', 'EX', 60 * 60 * 24);
        res.status(200).json(
            {
                message: 'logout successfully'
            }
        )

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}