import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // make sure .env is loaded

export const connectDB = async () => {
  const dbURI = process.env.MONGODB_URI;

  if (!dbURI) {
    console.error(
      "❌ MONGODB_URI is not defined in your environment variables."
    );
    return;
  }

  console.log("🔌 Attempting MongoDB connection to:", dbURI);

  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // wait 10s then timeout
    });

    console.log("✅ MongoDB connected successfully.");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB.");
    console.error("🔍 Error name:", error.name);
    console.error("🔍 Error message:", error.message);
    process.exit(1); // kill the server so you don't get stuck
  }
};
