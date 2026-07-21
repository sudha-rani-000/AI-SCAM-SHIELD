import express from "express";
import { checkScam } from "../controllers/scamController.js";

const router = express.Router();

// Open for now — add `protect` middleware here if you want to require login
router.post("/check", checkScam);

export default router;
