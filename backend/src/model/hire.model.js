import mongoose from "mongoose";

const hireMeSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  websiteUrl: {
    type: String,
    required: true,
  },
  chooseSkills: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const HireMe = mongoose.model("HireMe", hireMeSchema);

export default HireMe;
