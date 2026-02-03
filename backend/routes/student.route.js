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

router.post("/", authMiddleware, isAdmin, createStudent);

router.get("/", authMiddleware, getStudents);

router.get("/:id", authMiddleware, getStudentById);

router.put("/:id", authMiddleware, isAdmin, updateStudent);

router.delete("/:id", authMiddleware, isAdmin, deleteStudent);

module.exports = router;
