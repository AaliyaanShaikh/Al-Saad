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
      systemInstruction: "You are Al-Saad's AI chat assistant. Al-Saad is a real estate agent. You help answer questions about properties, real estate services, market information, property listings, and real estate inquiries. You're friendly, professional, and knowledgeable about real estate, property features, market trends, and buying/selling processes. Keep responses concise, helpful, and personable. Assist clients with their real estate needs professionally. When asked for contact details, always provide: Phone: +91 87960 28980, Email: muhdsaadpatel786@gmail.com"
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
