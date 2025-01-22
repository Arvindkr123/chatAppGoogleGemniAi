import { Router } from "express";
import { userRegisterController, userLoginController, userProfileController, userLogoutController } from "../controllers/user.controllers.js";
import { body } from "express-validator";
import { authUser } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post(
    "/register",
    [
        body('email')
            .isEmail()
            .withMessage('Email must be a valid email address'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
    ],
    userRegisterController
);


router.post(
    "/login",
    [
        body('email')
            .isEmail()
            .withMessage('Email must be a valid email address'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
    ],
    userLoginController
);


router.post(
    "/profile",
    authUser,
    userProfileController
);


router.get(
    "/logout",
    authUser,
    userLogoutController
);

export default router;
