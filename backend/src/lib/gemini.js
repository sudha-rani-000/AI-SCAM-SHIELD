import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function analyzeScamRisk(text) {
  const prompt = `You are a scam detection assistant. Analyze the following message and determine if it is likely a scam.

Respond ONLY with valid JSON, no markdown, no code fences, using exactly this structure:
{
  "isScam": true or false,
  "riskLevel": "low" | "medium" | "high",
  "reasons": ["short reason 1", "short reason 2"],
  "summary": "one sentence explanation"
}

Message to analyze:
"""
${text}
"""`;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();

  // Defensive cleanup in case Gemini wraps the JSON in code fences
  const cleaned = responseText.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error("Failed to parse Gemini response as JSON: " + responseText);
  }
}
