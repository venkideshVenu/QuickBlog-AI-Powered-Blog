import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("MongoDB connected successfully")
    );
    await mongoose.connect(`${process.env.MONGODB_URI}/quickblog`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;