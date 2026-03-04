
import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const createAssociateChat = (): Chat => {
  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      topP: 0.95,
      thinkingConfig: { thinkingBudget: 4000 }
    },
  });
};

export const getStockIntelligence = async (ticker: string): Promise<{ text: string; sources: any[] }> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze ${ticker} for a Senior Capital Markets Associate. 
    1. Identify the TOP 3 RECENT CATALYSTS (earnings, acquisitions, macro shifts) within the last 72 hours.
    2. Provide 3 specific news snippets from reputable sources with their impact analysis.
    3. Conclude with a 'Institutional Take' on the stock's current risk/reward profile.
    Keep the tone professional and succinct.`,
    config: {
      systemInstruction: "You are a Senior Capital Markets Associate. Focus on actionable catalysts and data-driven news snippets. Always use Google Search for the most recent data.",
      tools: [{ googleSearch: {} }]
    },
  });

  const text = response.text || "No intelligence found.";
  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  
  return { text, sources };
};

export const generateAnalysis = async (prompt: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      thinkingConfig: { thinkingBudget: 8000 }
    },
  });
  return response.text || "Error generating analysis.";
};
