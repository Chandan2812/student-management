import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import StudentModal from "./StudentModal";
import ViewStudentModal from "./ViewStudentModal";

const API_URL = `http://localhost:8000/api/students`;

const StudentList = () => {
  const { user } = useAuth();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);

  const fetchStudents = async () => {
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
  };

  useEffect(() => {
    fetchStudents();
  }, [page, search]);

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

  const handleDeleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?",
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchStudents();
    } catch (error) {
      alert("Failed to delete student");
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
      <div style={{ padding: "20px" }}>
        <h2>Students</h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          style={{ marginBottom: "10px" }}
        />

        {/* Admin only: Create button */}
        {user.role === "admin" && (
          <div style={{ marginBottom: "10px" }}>
            <button
              onClick={() => {
                setSelectedStudent(null);
                setIsModalOpen(true);
              }}
            >
              Create Student
            </button>
          </div>
        )}

        {/* Error */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Table */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table border="1" cellPadding="8" cellSpacing="0">
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
                  <td colSpan="5">No students found</td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.age}</td>
                    <td>{student.course}</td>
                    <td>{student.status}</td>
                    <td>
                      <button onClick={() => handleViewStudent(student._id)}>
                        View
                      </button>

                      {user.role === "admin" && (
                        <>
                          <button
                            onClick={() => {
                              setSelectedStudent(student);
                              setIsModalOpen(true);
                            }}
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDeleteStudent(student._id)}
                          >
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

        {/* Pagination */}
        <div style={{ marginTop: "10px" }}>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>

          <span style={{ margin: "0 10px" }}>
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
    </>
  );
};

export default StudentList;
