const express = require("express");

const {
    register,
    login,
    getProfile
} = require("../controllers/auth.controller");

const { isAuthenticated } = require("../middlewares/auth.middleware");

const router = express.Router();

// Public Routes
router.post("/register", register);
router.post("/login", login);

// Protected Route
router.get("/profile", isAuthenticated, getProfile);

module.exports = router;