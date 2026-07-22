import ScanHistory from "../models/ScanHistory.js";
import { scanText as runTextScan } from "../lib/scamDetector.js";
import { analyzeUrl } from "../lib/urlAnalyzer.js";

// POST /api/scans/text  (protected)
export async function scanTextMessage(req, res, next) {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Provide a message to scan." });
    }

    const result = runTextScan(text);

    const record = await ScanHistory.create({
      user: req.user._id,
      scanType: "text",
      input: text,
      verdict: result.verdict,
      score: result.score,
      confidence: result.confidence,
      indicators: result.indicators,
      recommendations: result.recommendations,
      explanation: result.explanation,
    });

    res.status(201).json({ result, scanId: record._id });
  } catch (err) {
    next(err);
  }
}

// POST /api/scans/url  (protected)
export async function scanUrl(req, res, next) {
  try {
    const { url } = req.body;

    if (!url || !url.trim()) {
      return res.status(400).json({ message: "Provide a URL to scan." });
    }

    const result = analyzeUrl(url);

    if (!result.valid) {
      return res.status(400).json({ message: result.reason });
    }

    const record = await ScanHistory.create({
      user: req.user._id,
      scanType: "url",
      input: url,
      hostname: result.hostname,
      verdict: result.verdict,
      score: result.score,
      trustScore: result.trustScore,
      indicators: result.indicators,
      recommendations: result.recommendations,
      explanation: result.explanation,
    });

    res.status(201).json({ result, scanId: record._id });
  } catch (err) {
    next(err);
  }
}

// GET /api/scans?type=text|url&limit=20&page=1  (protected)
export async function getHistory(req, res, next) {
  try {
    const { type, limit = 20, page = 1 } = req.query;

    const filter = { user: req.user._id };
    if (type === "text" || type === "url") filter.scanType = type;

    const perPage = Math.min(100, Number(limit) || 20);
    const skip = (Math.max(1, Number(page) || 1) - 1) * perPage;

    const [items, total] = await Promise.all([
      ScanHistory.find(filter).sort({ createdAt: -1 }).skip(skip).limit(perPage),
      ScanHistory.countDocuments(filter),
    ]);

    res.json({ items, total, page: Number(page), perPage });
  } catch (err) {
    next(err);
  }
}

// GET /api/scans/:id  (protected)
export async function getScanById(req, res, next) {
  try {
    const scan = await ScanHistory.findOne({ _id: req.params.id, user: req.user._id });
    if (!scan) return res.status(404).json({ message: "Scan not found" });
    res.json({ scan });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/scans/:id  (protected)
export async function deleteScan(req, res, next) {
  try {
    const scan = await ScanHistory.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!scan) return res.status(404).json({ message: "Scan not found" });
    res.json({ message: "Scan deleted" });
  } catch (err) {
    next(err);
  }
}

// GET /api/scans/stats/summary  (protected) — powers the dashboard cards/charts
export async function getStats(req, res, next) {
  try {
    const userId = req.user._id;

    const [totalScans, verdictBreakdown, last7Days] = await Promise.all([
      ScanHistory.countDocuments({ user: userId }),

      ScanHistory.aggregate([
        { $match: { user: userId } },
        { $group: { _id: "$verdict", count: { $sum: 1 } } },
      ]),

      ScanHistory.aggregate([
        {
          $match: {
            user: userId,
            createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
    ]);

    const byVerdict = verdictBreakdown.reduce((acc, v) => {
      acc[v._id] = v.count;
      return acc;
    }, {});

    res.json({
      totalScans,
      safe: byVerdict.Safe || 0,
      suspicious: byVerdict.Suspicious || 0,
      scam: byVerdict.Scam || 0,
      dangerous: byVerdict.Dangerous || 0,
      dailyVolume: last7Days.map((d) => ({ date: d._id, count: d.count })),
    });
  } catch (err) {
    next(err);
  }
}
