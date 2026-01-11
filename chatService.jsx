export async function sendMessageToBot(userId, message) {
  const response = await fetch("http://localhost:5000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, message }),
  });

  const data = await response.json();
  return data.reply;
}
