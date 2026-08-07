
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import chatRouter from "./routes/chat.routes.js";

const app = express();

// ES Module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// React frontend path
const frontendPath = path.join(__dirname, "../public/dist");

// ===============================
// Middleware
// ===============================

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cookieParser());

app.use(morgan("dev"));

// ===============================
// CORS
// ===============================

app.use(
    cors({
        origin: "https://perplexity-yvl7.onrender.com",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

// ===============================
// Serve React static files
// ===============================

app.use(express.static(frontendPath));

// ===============================
// API Routes
// ===============================

app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);

// ===============================
// Health Check
// ===============================

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
    });
});

// ===============================
// React SPA fallback
// Express 5 syntax
// ===============================

app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// ===============================
// Export
// ===============================

export default app;

