export function detectTone(message) {
  const msg = message.toLowerCase();

  if (msg.includes("sad") || msg.includes("low")) return "empathetic";
  if (msg.includes("roast") || msg.includes("joke")) return "playful";
  if (msg.includes("angry")) return "calm";

  return "friendly";
}
