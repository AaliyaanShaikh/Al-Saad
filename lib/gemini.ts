import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.NEXT_PUBLIC_VITE_GEMINI_API_KEY || '';

export const getPortfolioAdvice = async (
  userPrompt: string,
  history: { role: string; content: string }[]
): Promise<string> => {
  try {
    if (!API_KEY || API_KEY === 'your_actual_api_key_here') {
      return 'API key is not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY in your .env.local file and restart the server.';
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction:
        "You are Al-Saad's AI chat assistant. Al-Saad (Muhd Saad Patel) is a Mumbai real estate advisor focused on the western suburbs: Bandra, Khar, Santacruz, Andheri, Versova, and Jogeshwari. Help with property questions, market context, buying/selling/investing, and listings. Be friendly, professional, and concise. Useful local context: Bandra West is the premium apex of this corridor (lifestyle, BKC access, sea-facing pockets); Khar and Santacruz are strong premium/redevelopment markets with good connectivity; Andheri and Versova offer a wider range of mid-to-premium options with metro and coastal connectivity upside (including the Versova–Bandra Sea Link corridor); Jogeshwari remains an important value and growth micro-market within the same western belt. Do not invent specific prices or project guarantees—when unsure, suggest speaking with Al-Saad directly. When asked for contact details, always provide: Phone: +91 87960 28980, Email: muhdsaadpatel786@gmail.com",
    });

    const formattedHistory: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
    let lastRole: 'user' | 'model' | null = null;

    for (const msg of history) {
      const role = msg.role === 'user' ? 'user' : 'model';
      if (formattedHistory.length === 0 && role === 'model') continue;
      if (lastRole !== role) {
        formattedHistory.push({ role, parts: [{ text: msg.content }] });
        lastRole = role;
      }
    }

    const chatConfig: { history?: typeof formattedHistory } = {};
    if (formattedHistory.length > 0) chatConfig.history = formattedHistory;

    const chat = model.startChat(chatConfig);
    const result = await chat.sendMessage(userPrompt);
    const text = result.response.text();
    if (!text) return "I apologize, I'm currently unable to process that inquiry. Please try again.";
    return text;
  } catch (error: unknown) {
    const err = error as { message?: string; status?: number };
    if (process.env.NODE_ENV === 'development') console.error('Gemini API Error:', error);
    if (err?.message?.includes('API_KEY') || err?.message?.includes('API key')) {
      return 'Invalid API key. Please check NEXT_PUBLIC_GEMINI_API_KEY in .env.local.';
    }
    if (err?.status === 429) return 'API quota exceeded. Please try again later.';
    return `I'm temporarily unavailable. Please email muhdsaadpatel786@gmail.com or call +91 87960 28980.`;
  }
};
