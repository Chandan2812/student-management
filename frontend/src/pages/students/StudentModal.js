import { useEffect, useState } from "react";

const StudentModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    course: "React",
    status: "Active",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        age: initialData.age || "",
        course: initialData.course || "React",
        status: initialData.status || "Active",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        age: "",
        course: "React",
        status: "Active",
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await onSubmit(formData);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="glass-overlay" onClick={onClose}>
      <div className="student-form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{initialData ? "Edit Student" : "Create Student"}</h3>
          <button className="close-x" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="field">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label>Name</label>
          </div>

          <div className="field">
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Email</label>
          </div>

          <div className="field">
            <input
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
            />
            <label>Age</label>
          </div>

          <div className="field">
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
            >
              <option>React</option>
              <option>Node</option>
              <option>Java</option>
              <option>Python</option>
            </select>
            <label>Course</label>
          </div>

          <div className="status-group">
            <span>Status</span>
            <div className="status-toggle">
              <button
                type="button"
                className={formData.status === "Active" ? "active" : ""}
                onClick={() => setFormData({ ...formData, status: "Active" })}
              >
                Active
              </button>
              <button
                type="button"
                className={formData.status === "Inactive" ? "inactive" : ""}
                onClick={() => setFormData({ ...formData, status: "Inactive" })}
              >
                Inactive
              </button>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-outline"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>

            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        :root {
          --primary: #6c63ff;
          --gradient: linear-gradient(135deg, #6c63ff, #8b5cf6);
          --success: #16a34a;
          --danger: #dc2626;
          --border: #e5e7eb;
          --text-dark: #1f2937;
          --text-muted: #6b7280;
        }

        .loader {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}


        /* Overlay */
        .glass-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        /* Modal */
        .student-form-modal {
          width: 100%;
          max-width: 480px;
          background: white;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.35);
          animation: popIn 0.35s cubic-bezier(.25,.8,.25,1);
        }

        /* Header */
        .modal-header {
          background: var(--gradient);
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 18px;
        }

        .close-x {
          background: none;
          border: none;
          font-size: 20px;
          color: white;
          cursor: pointer;
        }

        /* Body */
        .modal-body {
          padding: 22px;
        }

        .field {
          position: relative;
          margin-bottom: 18px;
        }

        .field input,
        .field select {
          width: 100%;
          padding: 12px 12px;
          border-radius: 10px;
          border: 1px solid var(--border);
          font-size: 14px;
        }

        .field label {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: white;
          padding: 0 6px;
          color: var(--text-muted);
          font-size: 13px;
          pointer-events: none;
          transition: 0.2s;
        }

        .field input:focus + label,
        .field input:not(:placeholder-shown) + label,
        .field select:focus + label {
          top: -6px;
          font-size: 12px;
          color: var(--primary);
        }

        /* Status */
        .status-group {
          margin-bottom: 20px;
        }

        .status-group span {
          font-size: 14px;
          color: var(--text-muted);
        }

        .status-toggle {
          display: flex;
          gap: 10px;
          margin-top: 8px;
        }

        .status-toggle button {
          flex: 1;
          padding: 10px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: transparent;
          cursor: pointer;
          font-size: 14px;
        }

        .status-toggle .active {
          background: #dcfce7;
          color: var(--success);
          border-color: var(--success);
        }

        .status-toggle .inactive {
          background: #fee2e2;
          color: var(--danger);
          border-color: var(--danger);
        }

        /* Footer */
        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 10px;
        }

        .btn-primary {
          padding: 10px 18px;
          border-radius: 999px;
          border: none;
          background: var(--primary);
          color: white;
          cursor: pointer;
        }

        .btn-outline {
          padding: 10px 18px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: transparent;
          cursor: pointer;
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes popIn {
          from {
            transform: scale(0.85) translateY(20px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        @media (max-width: 480px) {
          .student-form-modal {
            margin: 0 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default StudentModal;
