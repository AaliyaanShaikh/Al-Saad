import { GoogleGenerativeAI } from "@google/generative-ai";

// Get API key from environment variables
const API_KEY = (import.meta.env.VITE_GEMINI_API_KEY as string) || '';

export const getPortfolioAdvice = async (userPrompt: string, history: {role: string, content: string}[]): Promise<string> => {
  try {
    // Check if API key is configured
    if (!API_KEY || API_KEY === 'your_actual_api_key_here') {
      return "API key is not configured. Please set VITE_GEMINI_API_KEY in your .env.local file and restart the dev server.";
    }

    // Initialize the Gemini API client
    const genAI = new GoogleGenerativeAI(API_KEY);

    // Get the model with system instruction
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: "You are Al-Saad's AI chat assistant. Al-Saad (Muhd Saad Patel) is a Mumbai real estate advisor focused on the western suburbs: Bandra, Khar, Santacruz, Andheri, Versova, and Jogeshwari. Help with property questions, market context, buying/selling/investing, and listings. Be friendly, professional, and concise. Useful local context: Bandra West is the premium apex of this corridor (lifestyle, BKC access, sea-facing pockets); Khar and Santacruz are strong premium/redevelopment markets with good connectivity; Andheri and Versova offer a wider range of mid-to-premium options with metro and coastal connectivity upside (including the Versova–Bandra Sea Link corridor); Jogeshwari remains an important value and growth micro-market within the same western belt. Do not invent specific prices or project guarantees—when unsure, suggest speaking with Al-Saad directly. When asked for contact details, always provide: Phone: +91 87960 28980, Email: muhdsaadpatel786@gmail.com"
    });

    // Filter and format history - ensure it starts with a user message
    const formattedHistory: Array<{role: 'user' | 'model', parts: Array<{text: string}>}> = [];
    let lastRole: 'user' | 'model' | null = null;
    
    for (const msg of history) {
      const role = msg.role === 'user' ? 'user' : 'model';
      
      // Skip initial model message (welcome message)
      if (formattedHistory.length === 0 && role === 'model') {
        continue;
      }
      
      // Only add if it alternates properly
      if (lastRole !== role) {
        formattedHistory.push({
          role,
          parts: [{ text: msg.content }]
        });
        lastRole = role;
      }
    }

    // Start chat with history if available
    const chatConfig: any = {};
    if (formattedHistory.length > 0) {
      chatConfig.history = formattedHistory;
    }
    
    const chat = model.startChat(chatConfig);

    // Generate content
    const result = await chat.sendMessage(userPrompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      return "I apologize, I'm currently unable to process that inquiry. Please try again.";
    }
    
    return text;
  } catch (error: any) {
    if (import.meta.env.DEV) {
      console.error("Gemini API Error:", error);
    }
    
    // Provide specific error messages
    if (error?.message?.includes('API_KEY') || error?.message?.includes('API key')) {
      return "Invalid API key. Please check your VITE_GEMINI_API_KEY in .env.local file.";
    }
    if (error?.status === 429) {
      return "API quota exceeded. Please try again later.";
    }
    if (error?.status === 403) {
      return "API access forbidden. Please check your API key permissions.";
    }
    if (error?.status === 404) {
      return "Model not found. Please check the model name.";
    }
    
    const errorMsg = error?.message || 'Unknown error';
    return `I'm temporarily unavailable. Error: ${errorMsg}. Please try again or reach out via email at muhdsaadpatel786@gmail.com or call +91 87960 28980`;
  }
};
