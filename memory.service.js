import User from "../models/user.model.js";

export async function getUserMemory(userId) {
  let user = await User.findOne({ userId });

  if (!user) {
    user = await User.create({
      userId,
      name: null,
      preferences: [],
      tone: "friendly",
      conversationSummary: ""
    });
  }

  return user;
}

export async function updateUserMemory(userId, message, reply, tone) {
  const user = await User.findOne({ userId });

  // Simple memory extraction
  if (message.toLowerCase().includes("my name is")) {
    user.name = message.split("my name is")[1]?.trim();
  }

  if (message.toLowerCase().includes("i like")) {
    user.preferences.push(message.split("i like")[1]?.trim());
  }

  user.tone = tone;
  user.conversationSummary += ` User: ${message} Bot: ${reply}`;

  await user.save();
}
