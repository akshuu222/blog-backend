import mongoose from "mongoose";

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected db");
  } catch (error) {
    process.exit(1);
  }
}

export default connectDb;
