import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: String,
  name: String,
  preferences: [String],
  tone: String,
  conversationSummary: String,
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("User", userSchema);
