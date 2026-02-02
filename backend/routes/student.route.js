const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/role.middleware");
const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../controllers/student.controller");

const router = express.Router();

// Create student (Admin only)
router.post("/", authMiddleware, isAdmin, createStudent);

// Get all students (Admin + User)
router.get("/", authMiddleware, getStudents);

// Get student by ID (Admin + User)
router.get("/:id", authMiddleware, getStudentById);

// Update student (Admin only)
router.put("/:id", authMiddleware, isAdmin, updateStudent);

// Delete student (Admin only)
router.delete("/:id", authMiddleware, isAdmin, deleteStudent);

module.exports = router;
