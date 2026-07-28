const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isAuthenticated = async (req, res, next) => {
    try {
        
        const authHeader = req.headers.authorization;

        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. No token provided."
            });
        }

      
        const token = authHeader.split(" ")[1];
        console.log("Received Token:", token);

        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found."
            });
        }

        
        req.user = user;

        return next();

    } catch (error) {
        console.log("JWT ERROR:", error);
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};