
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getPortfolioAdvice = async (userPrompt: string, history: {role: string, content: string}[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.content }] })),
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        systemInstruction: "You are Al-Saad's portfolio assistant. You help answer questions about design work, creative process, collaborations, and projects. You're friendly, professional, and knowledgeable about design, branding, and digital experiences. Keep responses concise, helpful, and personable. If asked about specific projects, refer to the portfolio work shown on the website.",
        temperature: 0.7,
      },
    });

    return response.text || "I'm having trouble connecting right now. Please try again in a moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm temporarily unavailable. Feel free to reach out via email at hello@al-saad.com";
  }
};
