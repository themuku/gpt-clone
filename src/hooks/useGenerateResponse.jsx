import { GoogleGenerativeAI } from "@google/generative-ai";

export async function useGenerateResponse(req) {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(req);

  return result.response.text();
}
