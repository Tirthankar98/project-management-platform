const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");
const logger = require("./config/logger");

//import routes 
const authRoutes = require("./routes/auth.routes");
const workspaceRoutes = require("./routes/workspace.routes");

const errorHandler = require("./middlewares/errorHandler");

require("dotenv").config();

// Connect Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan Logger
app.use(
    morgan("combined", {
        stream: {
            write: (message) => logger.info(message.trim())
        }
    })
);

// register Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/workspaces", workspaceRoutes);

// Health Check Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Project Management Platform API is running"
    });
});

// 404 Handler
app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Global Error Handler
app.use(errorHandler);

/*const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
    console.log(`Server running on port ${PORT}`);
});*/

module.exports = app;