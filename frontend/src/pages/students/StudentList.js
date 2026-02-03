import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import StudentModal from "./StudentModal";
import ViewStudentModal from "./ViewStudentModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import "./StudentList.css";

const API_URL = `${process.env.REACT_APP_BASE_URL}/api/students`;

const StudentList = () => {
  const { user } = useAuth();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [refresh, setRefresh] = useState(0); // ✅ refetch trigger

  const [deleteId, setDeleteId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);

  // ================= FETCH STUDENTS =================
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const res = await axios.get(API_URL, {
          params: { search, page, limit: 5 },
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
    };

    fetchStudents();
  }, [search, page, refresh]); // ✅ only dependencies

  // ================= CREATE / UPDATE =================
  const handleSubmitStudent = async (data) => {
    try {
      const token = localStorage.getItem("token");

      if (selectedStudent) {
        await axios.put(`${API_URL}/${selectedStudent._id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(API_URL, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setIsModalOpen(false);
      setRefresh((prev) => prev + 1); // ✅ refetch
    } catch {
      alert("Operation failed");
    }
  };

  // ================= DELETE =================
  const handleDeleteStudent = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDeleteId(null);
      setRefresh((prev) => prev + 1); // ✅ refetch
    } catch {
      setError("Failed to delete student");
    }
  };

  // ================= VIEW =================
  const handleViewStudent = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setViewStudent(res.data);
      setIsViewOpen(true);
    } catch {
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

        {/* ===== DESKTOP TABLE ===== */}
        <div className="table-card desktop-only">
          {loading ? (
            <p>Loading...</p>
          ) : (
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
                  students.map((s) => (
                    <tr key={s._id}>
                      <td>{s.name}</td>
                      <td>{s.email}</td>
                      <td>{s.age}</td>
                      <td>{s.course}</td>
                      <td>{s.status}</td>
                      <td>
                        <button onClick={() => handleViewStudent(s._id)}>
                          View
                        </button>
                        {user.role === "admin" && (
                          <>
                            <button
                              onClick={() => {
                                setSelectedStudent(s);
                                setIsModalOpen(true);
                              }}
                            >
                              Edit
                            </button>
                            <button onClick={() => setDeleteId(s._id)}>
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* ===== PAGINATION ===== */}
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
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
