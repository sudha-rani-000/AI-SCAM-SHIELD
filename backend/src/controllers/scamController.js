import { analyzeScamRisk } from "../lib/gemini.js";

// POST /api/scam/check
export async function checkScam(req, res, next) {
  try {
    const { text } = req.body;

    if (!text || text.trim().length < 5) {
      return res.status(400).json({ message: "Please provide the message text to analyze" });
    }

    const analysis = await analyzeScamRisk(text);
    res.json(analysis);
  } catch (err) {
    next(err);
  }
}
