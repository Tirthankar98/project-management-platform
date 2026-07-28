const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// ================= Register =================
exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        console.log("Request Body:", req.body);

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        console.log("Existing User:", existingUser);

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password
        });

        // Remove password from response
        user.password = undefined;

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
};

// ================= Login =================
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate request
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Find user
        const user = await User.findOne({ email });

        // Uncomment while debugging
        // console.log("Login Email:", email);
        // console.log("User:", user);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        // Remove password before sending response
        user.password = undefined;

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
};


exports.getProfile = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Protected Route",
            user: req.user
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
};