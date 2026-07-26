require("dotenv").config();
console.log(process.env.MONGO_URI);

const app = require("./app");
const logger = require("./config/logger");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
    // logger.info("Application started");
    // logger.warn("This route is deprecated");
    // logger.error("Database connection failed");
});
};
startServer();