import "dotenv/config";
import { createApp } from "./src/app.js";
import { connectDB } from "./src/config/db.js";

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await connectDB();

    const app = createApp();
    app.listen(PORT, () => {
      console.log(`AI Scam Shield backend listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
}

start();
