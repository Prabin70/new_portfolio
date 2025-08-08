import mongoose from "mongoose";

const UsuserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UsuserSchema);

export default User;
