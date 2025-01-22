
import ProjectModels from '../models/projects.models.js';

export const createProjectService = async ({ name, userId }) => {
    if (!name) {
        throw new Error('Name is required');
    }

    if (!userId) {
        throw new Error('User Id is required');
    }

    const project = await ProjectModels.create({
        name,
        users: [userId]

    })

    return project;
}

