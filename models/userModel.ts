import mongoose from "mongoose";
import validator from "validator";

export interface Users extends mongoose.Document {
  name: string;
  email: string;
  id: string;
  subscriptions: Array<string>;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Provide a valid email"],
    required: [true, "You must provide an email id"],
  },
  id: {
    type: String,
  },
  subscriptions: {
    type: [String],
    default: [],
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
