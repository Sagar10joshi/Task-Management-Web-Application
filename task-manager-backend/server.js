import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

import dbConnect from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config({ path: "./.env" });

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many requests, try again later"
});


const app = express();

/* ---------------- Database Connection ---------------- */
dbConnect();


//  CORS 
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());//for security in http headers

/* ---------------- TEST ROUTE ---------------- */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Task Manager API Running"
  });
});

app.get("/whoami", (req, res) => {
  res.json({
    server: "CURRENT TASK MANAGER BACKEND",
    time: Date.now()
  });
});


/* ---------------- ROUTES ---------------- */
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

/* ---------------- ERROR HANDLERS ---------------- */
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});