
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getRealEstateAdvice = async (userPrompt: string, history: {role: string, content: string}[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.content }] })),
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        systemInstruction: "You are the Elysian Estates Concierge. You are a highly sophisticated, polite, and knowledgeable luxury real estate agent. Help users find their dream home, explain market trends, or discuss property features. You represent a multi-billion dollar real estate group. Keep responses concise, elegant, and professional.",
        temperature: 0.7,
      },
    });

    return response.text || "I apologize, I'm having trouble connecting to my network. How else can I assist you today?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The concierge is momentarily unavailable. Please try again in a few moments.";
  }
};
