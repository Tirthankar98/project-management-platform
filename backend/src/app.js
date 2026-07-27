const express = require("express");
const morgan = require("morgan");
const logger = require("./config/logger");
const errorHandler = require("./middlewares/errorHandler");
const ApiError = require("./utils/ApiError");
const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(express.json());
app.use("/api/auth",authRoutes);

//morgan
app.use(
    morgan("combined", {
        stream: {
            write: (message) => logger.info(message.trim()),
        },
    })
);
//body parser
app.use(express.json());

//routes
app.get("/", (req, res) => {
    res.send("Backend is working!");
});
app.get("/error", (req, res, next) => {
    next(new ApiError(404 , "User not found"));
});

// 404 Middleware
app.use((req, res, next) => {
    next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

//global error handler
app.use(errorHandler);

module.exports = app;