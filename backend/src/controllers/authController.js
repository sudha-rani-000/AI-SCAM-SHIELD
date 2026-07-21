import User from "../models/User.js";
import { generateToken } from "../lib/generateToken.js";

const EMAIL_RE = /^\S+@\S+\.\S+$/;

// POST /api/auth/register
export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || name.trim().length < 2) {
      return res.status(400).json({ message: "Enter your full name" });
    }
    if (!email || !EMAIL_RE.test(email)) {
      return res.status(400).json({ message: "Enter a valid email address" });
    }
    if (!password || password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "An account with that email already exists" });
    }

    const user = await User.create({ name: name.trim(), email, password });
    const token = generateToken(user.id);

    res.status(201).json({ user: user.toSafeObject(), token });
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/login
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user.id);
    res.json({ user: user.toSafeObject(), token });
  } catch (err) {
    next(err);
  }
}

// GET /api/auth/me (protected)
export async function getMe(req, res) {
  res.json({ user: req.user.toSafeObject() });
}
