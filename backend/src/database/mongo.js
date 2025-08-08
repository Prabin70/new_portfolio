import mongoose from "mongoose";
import { mongoUri } from "../config/env.js";

export const connectMongo = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Mongo connected successfully");
  } catch (error) {
    console.log(error.message);
  }
};
