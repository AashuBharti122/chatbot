// src/services/gemini.service.js
import { GoogleGenerativeAI } from "@google/generative-ai";
export async function getGeminiReply(prompt) {
  // Safety check - prevent empty/undefined key
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing in environment variables");
    return "Sorry, Gemini service is not configured properly right now.";
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",           // You can also use: gemini-1.5-flash-8b, gemini-2.0-flash
      // Optional: tune these as needed
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
      // Optional: safety settings (recommended)
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return response.text();
  } 
  catch (error) {
    console.error("Gemini API Error:", error.message);
    
    // More helpful error messages for common cases
    if (error.message?.includes("API_KEY")) {
      return "Invalid or blocked Gemini API key. Please generate a new one.";
    }
    if (error.status === 429) {
      return "Rate limit reached. Please try again in a few minutes.";
    }
    
    return "Sorry, I'm having trouble connecting to Gemini right now... Please try again later.";
  }
}