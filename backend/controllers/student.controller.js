const Student = require("../models/student.model");

// CREATE
const createStudent = async (req, res) => {
  try {
    const { name, email, age, course, status } = req.body;

    if (!name || !email || !course) {
      return res.status(400).json({
        message: "Name, email and course are required",
      });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(409).json({
        message: "Student with this email already exists",
      });
    }

    const student = await Student.create({
      name,
      email,
      age,
      course,
      status,
    });

    res.status(201).json({
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    console.error("Create student error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// READ ALL
const getStudents = async (req, res) => {
  try {
    let { search = "", page = 1, limit = 5 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };

    const totalStudents = await Student.countDocuments(query);

    const students = await Student.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      total: totalStudents,
      page,
      limit,
      totalPages: Math.ceil(totalStudents / limit),
      students,
    });
  } catch (error) {
    console.error("Pagination error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// READ ONE
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
