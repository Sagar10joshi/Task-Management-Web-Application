
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import dbConnect from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config({ path: "./.env" });

const app = express();

/* ---------------- DB FIRST ---------------- */
dbConnect();

/* ---------------- MIDDLEWARE ORDER FIXED ---------------- */

// 1. CORS FIRST (VERY IMPORTANT)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://task-management-web-application-delta.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);


// 3. Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

// console.log("SERVER STARTED");

/* ---------------- ROUTES ---------------- */
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

/* ---------------- ERROR HANDLERS ---------------- */
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

export default app;// Export the app instance




//Only in development
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });