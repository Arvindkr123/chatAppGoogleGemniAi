import { validationResult } from 'express-validator';
import UserModel from './../models/user.models.js';
import { createProjectService } from './../services/project.service.js';

export const createProjectController = async (req, res) => {
    try {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        // Extract project details and logged-in user
        const { name } = req.body;
        const { email } = req.user;

        // Fetch logged-in user's ID
        const loggedInUser = await UserModel.findOne({ email });
        if (!loggedInUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const userId = loggedInUser._id;

        // Create the project
        const newProject = await createProjectService({ name, userId });

        // Respond with the newly created project
        return res.status(201).json(newProject);

    } catch (error) {
        console.error("Error creating project:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
