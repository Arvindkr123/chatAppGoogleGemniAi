import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: [6, 'Email must be at least 6 characters long'],
        maxlength: [50, 'Email must not exceed 50 characters'],
    },
    password: {
        type: String,
        required: true,
        select: false, // Exclude password from queries by default
        minlength: [6, 'Password must be at least 6 characters long'],
    },
});

// Instance method to hash a password
userSchema.methods.hashPassword = async function (password) {
    return await bcryptjs.hash(password, 10);
};

// Instance method to compare passwords
userSchema.methods.isValidPassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
};

// Instance method to generate JWT
userSchema.methods.generateJWT = function () {
    return jwt.sign(
        { email: this.email, id: this._id },
        process.env.JWT_SECRET, // Use a secret key from environment variables
        { expiresIn: '24h' } // Set an expiration time
    );
};

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
