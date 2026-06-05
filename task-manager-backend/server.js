// import express from "express"
// import mongoose from "mongoose";
// import dbConnect from "./config/db.js";
// import dotenv from "dotenv";


// dotenv.config({
//     path: "./.env"
// })
// const app = express();

// // app.use(cookieParser());

// // CORS middleware configuration
// // const corsOptions = {
// //   origin: 'https://himalayan-picks.vercel.app',  // Allow only your frontend domain
// //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
// //   credentials: true , // Allow cookies or credentials if needed
// //   allowedHeaders: ['Content-Type', 'Authorization'],
// // };

// // // Apply CORS middleware to all routes
// // app.use(cors(corsOptions));

// // app.use(cors({}));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }))


// dbConnect()

// app.get("/", (req, res) => {
//     res.send("API is running");
// });


// // export default app;// Export the app instance

// app.listen(process.env.PORT, () => {
//     console.log(`Server running on port ${process.env.PORT}`);
// });








import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import dbConnect from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config({
    path: "./.env"
})

dbConnect();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Task Manager API Running"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});