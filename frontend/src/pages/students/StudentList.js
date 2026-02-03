import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import StudentModal from "./StudentModal";
import ViewStudentModal from "./ViewStudentModal";
import "./StudentList.css";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const API_URL = `${process.env.REACT_APP_BASE_URL}/api/students`;

const StudentList = () => {
  const { user } = useAuth();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [deleteId, setDeleteId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const res = await axios.get(API_URL, {
        params: {
          search,
          page,
          limit: 5,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(res.data.students);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setError("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleSubmitStudent = async (data) => {
    try {
      const token = localStorage.getItem("token");

      if (selectedStudent) {
        // EDIT
        await axios.put(`${API_URL}/${selectedStudent._id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // CREATE
        await axios.post(API_URL, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setIsModalOpen(false);
      fetchStudents();
    } catch (error) {
      alert("Operation failed");
    }
  };

  const handleDeleteStudent = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDeleteId(null);
      fetchStudents();
    } catch (error) {
      setError("Failed to delete student");
    }
  };

  const handleViewStudent = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setViewStudent(res.data);
      setIsViewOpen(true);
    } catch (error) {
      alert("Failed to fetch student details");
    }
  };

  return (
    <>
      <Navbar />

      <div className="student-page">
        <div className="student-header">
          <h2>Students</h2>

          <input
            type="text"
            className="search-input"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />

          {user.role === "admin" && (
            <button
              className="btn btn-primary"
              onClick={() => {
                setSelectedStudent(null);
                setIsModalOpen(true);
              }}
            >
              + Create Student
            </button>
          )}
        </div>

        {error && <p className="error-text">{error}</p>}

        <div className="table-card desktop-only">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Course</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {students.length === 0 ? (
                    <tr>
                      <td colSpan="6">No students found</td>
                    </tr>
                  ) : (
                    students.map((student) => (
                      <tr key={student._id}>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.age}</td>
                        <td>{student.course}</td>
                        <td>
                          <span
                            className={`status ${
                              student.status === "Active"
                                ? "active"
                                : "inactive"
                            }`}
                          >
                            {student.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="btn btn-outline btn-sm"
                              onClick={() => handleViewStudent(student._id)}
                            >
                              View
                            </button>

                            {user.role === "admin" && (
                              <>
                                <button
                                  className="btn btn-primary btn-sm"
                                  onClick={() => {
                                    setSelectedStudent(student);
                                    setIsModalOpen(true);
                                  }}
                                >
                                  Edit
                                </button>

                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => setDeleteId(student._id)}
                                >
                                  Delete
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ===== MOBILE CARDS ===== */}
        <div className="mobile-cards">
          {loading ? (
            <p>Loading...</p>
          ) : students.length === 0 ? (
            <p>No students found</p>
          ) : (
            students.map((student) => (
              <div key={student._id} className="student-card">
                <div className="card-header">
                  <h4>{student.name}</h4>
                  <span
                    className={`status ${
                      student.status === "Active" ? "active" : "inactive"
                    }`}
                  >
                    {student.status}
                  </span>
                </div>

                <p>
                  <strong>Email:</strong> {student.email}
                </p>
                <p>
                  <strong>Age:</strong> {student.age}
                </p>
                <p>
                  <strong>Course:</strong> {student.course}
                </p>

                <div className="card-actions">
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => handleViewStudent(student._id)}
                  >
                    View
                  </button>

                  {user.role === "admin" && (
                    <>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          setSelectedStudent(student);
                          setIsModalOpen(true);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteStudent(student._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pagination">
          <button
            className="btn btn-outline btn-sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            className="btn btn-outline btn-sm"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>

      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitStudent}
        initialData={selectedStudent}
      />

      <ViewStudentModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        student={viewStudent}
      />

      <ConfirmDeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteStudent}
      />
    </>
  );
};

export default StudentList;
