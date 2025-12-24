import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('Gemini API key missing');
}

const genAI = new GoogleGenerativeAI(API_KEY);

const geminiModel = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

export const getCareAdvice = async (prompt) => {
  try {
    const result = await geminiModel.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Gemini Error:', error);
    return 'Sorry, AI service is temporarily unavailable.';
  }
};
