import { useEffect, useState } from "react";

const StudentModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    course: "React",
    status: "Active",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>{initialData ? "Edit Student" : "Create Student"}</h3>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
          />

          <select name="course" value={formData.course} onChange={handleChange}>
            <option>React</option>
            <option>Node</option>
            <option>Java</option>
            <option>Python</option>
          </select>

          <select name="status" value={formData.status} onChange={handleChange}>
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <div style={{ marginTop: "10px" }}>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;

// styles (simple)
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
