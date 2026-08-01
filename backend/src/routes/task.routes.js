const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

const { isAuthenticated } = require("../middlewares/auth.middleware");

router.post("/", isAuthenticated, createTask);

router.get("/", isAuthenticated, getTasks);

router.get("/:id", isAuthenticated, getTask);

router.put("/:id", isAuthenticated, updateTask);

router.delete("/:id", isAuthenticated, deleteTask);

module.exports = router;