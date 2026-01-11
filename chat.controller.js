import { getGeminiReply } from "../services/gemini.service.js";
import { getUserMemory, updateUserMemory } from "../services/memory.service.js";
import { detectTone } from "../services/tone.service.js";
import systemPrompt from "../prompts/system.prompt.js";

export const chatWithBot = async (req, res) => {
  const { userId, message } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ error: "Missing userId or message" });
  }

  const userMemory = await getUserMemory(userId);
  const tone = detectTone(message);

  const finalPrompt = `
${systemPrompt}

USER PROFILE:
${JSON.stringify(userMemory)}

CURRENT TONE:
${tone}

USER MESSAGE:
${message}
`;

  const reply = await getGeminiReply(finalPrompt);

  await updateUserMemory(userId, message, reply, tone);

  res.json({ reply });
};
