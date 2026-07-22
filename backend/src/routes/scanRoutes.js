import { Router } from "express";
import {
  scanTextMessage,
  scanUrl,
  getHistory,
  getScanById,
  deleteScan,
  getStats,
} from "../controllers/scanController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

// Every scan route requires a logged-in user
router.use(protect);

router.post("/text", scanTextMessage);
router.post("/url", scanUrl);
router.get("/stats/summary", getStats);
router.get("/", getHistory);
router.get("/:id", getScanById);
router.delete("/:id", deleteScan);

export default router;
