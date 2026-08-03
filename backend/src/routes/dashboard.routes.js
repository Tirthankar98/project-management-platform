const express = require("express");
const router = express.Router();

const {
    getDashboardStats,
} = require("../controllers/dashboard.controller");

// GET /api/v1/dashboard
router.get("/", getDashboardStats);

module.exports = router;