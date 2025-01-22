import { body, validationResult } from "express-validator";
import { createProjectController } from './../controllers/project.controllers.js';
import { authUser } from "../middlewares/auth.middlewares.js";
import { Router } from "express";

const router = Router();
router.post("/create",
    authUser,
    body('name').isString().withMessage('name is required'),
    createProjectController
);


export default router;