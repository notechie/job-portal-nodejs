import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.info(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database Connection Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
