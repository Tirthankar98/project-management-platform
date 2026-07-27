const mongoose = require("mongoose");
const logger = require("./logger");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        logger.info("MongoDB Connected");
    } catch (error) {
        console.error(error);
    console.error(error.stack);
    next(error);
        //logger.error(error.message);
       // process.exit(1);
    }
};

module.exports = connectDB;