import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
console.log("AUTH ROUTES LOADED");

/**
 * Public routes
 */
// router.post("/register", registerUser);
// console.log("AUTH ROUTES FILE VERSION 2");
router.post("/register", registerUser);

router.post("/login", loginUser);
router.post("/logout", logoutUser);

/**
 * Protected route
 */
router.get("/me", protect, getMe);

export default router;