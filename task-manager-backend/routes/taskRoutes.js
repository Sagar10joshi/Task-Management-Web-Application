import express from "express";

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  toggleTaskStatus
} from "../controllers/taskController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


//   All task routes are protected

router.use(protect);


  // CRUD + extra features
 
router.post("/", createTask);
router.get("/", getTasks);
// router.get("/", (req, res) => {
//   console.log("ROUTE HIT");

//   res.json({
//     test: true
//   });
// });
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);


  // Toggle task status (pending <-> completed)
 
router.patch("/:id/toggle", toggleTaskStatus);

export default router;