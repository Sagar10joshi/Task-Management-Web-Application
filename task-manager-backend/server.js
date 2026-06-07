import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import csurf from "csurf";

import dbConnect from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config({ path: "./.env" });

const app = express();

// ---------------- Security Headers ---------------- 
app.use(helmet());

// ---------------- CORS ---------------- 
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://task-management-web-application-seven.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------- DB ---------------- 
dbConnect();

// ---------------- Rate Limiter ---------------- 
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many requests, try again later"
});

// ---------------- CSRF ---------------- 
const csrfProtection = csurf({ cookie: true });

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// ---------------- TEST ROUTES ---------------- 
app.get("/", (req, res) => {
  res.json({ success: true, message: "Task Manager API Running" });
});

app.get("/whoami", (req, res) => {
  res.json({ server: "TASK MANAGER BACKEND", time: Date.now() });
});

// ---------------- ROUTES ---------------- 
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/tasks", taskRoutes);


app.use(csrfProtection);

// ---------------- ERROR HANDLERS ---------------- 
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});