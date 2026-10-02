const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Register user
async function registerUser(req, res) {
    try {
        const { name, email, password, role = "user" } = req.body;

        const isAlreadyExists = await userModel.findOne({
            $or: [{ name }, { email }]
        });

        if (isAlreadyExists) {
            return res.status(409).json({
                message: "User already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (err) {
        res.status(500).json({
            message: "Failed to register user.",
            error: err.message
        });
    }
}


// Login user
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required."
            });
        }

        const user = await userModel
            .findOne({ email })
            .select("+password");

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials."
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials."
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET
        );

        // for production, set secure: true and sameSite: "none" for cross-site cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "User logged in successfully.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        res.status(500).json({
            message: "Failed to login user.",
            error: err.message
        });
    }
}


// Get current user
async function getMe(req, res) {
    try {
        const user = await userModel
            .findById(req.user.userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        res.status(200).json({
            message: "Current user fetched successfully.",
            user
        });

    } catch (err) {
        res.status(500).json({
            message: "Failed to get current user.",
            error: err.message
        });
    }
}


module.exports = {
    registerUser,
    loginUser,
    getMe
};