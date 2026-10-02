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
        "You are Al-Saad's AI chat assistant. Al-Saad (Muhd Saad Patel) is a Mumbai real estate advisor focused on the western suburbs: Bandra, Khar, Santacruz, Andheri, Versova, Jogeshwari, Oshiwara, and the JVLR corridor. Be friendly, professional, and concise. Named inventory: The A-List Residences by Multistar Builders, Andheri West – Oshiwara. The Chosen Address of Cinema Icons: ultra-exclusive 3 Bed Premium & Luxe homes, 4 & 5 Bed duplexes, and sky-high penthouses, defined by A-list privacy, star-studded neighborhood covenants, and monolithic scale. Ultra-luxury G+37; basement + ground + 6-level podium parking; amenities on 7th floor; residences 8th–37th; 10-ft passage; 4 high-speed lifts including stretcher; rooftop + 30+ amenities. Typologies (RERA carpet, all incl.): 3 BHK 968.6 sq ft ₹3.80 Cr; 3 BHK Premium 1243.5 ₹4.90 Cr; Sky Mansion 1789.5 ₹7.55 Cr and 2223.5 ₹9.20 Cr; Jodi/Signature Penthouse 2518 ₹9.45 Cr. Floor bands: 8–17, 18–27, 3rd opening soon. MahaRERA PR1180002501853. Tagline: Where Luxury Bears Your Signature. Other listed positions remain location-based until named. Do not invent guarantees. Contact: Phone: +91 87960 28980, Email: muhdsaadpatel786@gmail.com",
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
