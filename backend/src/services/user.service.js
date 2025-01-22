import UserModels from './../models/user.models.js';

export const createUser = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    // Check if the email is already in use
    const existingUser = await UserModels.findOne({ email });
    if (existingUser) {
        throw new Error('Email is already registered');
    }

    // Hash the password
    const hashedPassword = await UserModels.schema.methods.hashPassword(password);

    // Create the user
    const user = await UserModels.create({
        email,
        password: hashedPassword,
    });

    return user;
};
