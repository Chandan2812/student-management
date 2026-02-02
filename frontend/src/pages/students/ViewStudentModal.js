const ViewStudentModal = ({ isOpen, onClose, student }) => {
  if (!isOpen || !student) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Student Details</h3>

        <p>
          <strong>Name:</strong> {student.name}
        </p>
        <p>
          <strong>Email:</strong> {student.email}
        </p>
        <p>
          <strong>Age:</strong> {student.age || "-"}
        </p>
        <p>
          <strong>Course:</strong> {student.course}
        </p>
        <p>
          <strong>Status:</strong> {student.status}
        </p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ViewStudentModal;

// styles
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.3)",
};

const modalStyle = {
  background: "#fff",
  padding: "20px",
  width: "400px",
  margin: "100px auto",
};
