const ViewStudentModal = ({ isOpen, onClose, student }) => {
  if (!isOpen || !student) return null;

  const initials = student.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="glass-overlay" onClick={onClose}>
      <div className="student-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top">
          <div className="avatar">{initials}</div>

          <div className="title-box">
            <h3>{student.name}</h3>
            <span
              className={`status-pill ${
                student.status === "Active" ? "active" : "inactive"
              }`}
            >
              {student.status}
            </span>
          </div>

          <button className="close-x" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-content">
          <div className="info-row">
            <span>Email</span>
            <strong>{student.email}</strong>
          </div>

          <div className="info-row">
            <span>Age</span>
            <strong>{student.age || "-"}</strong>
          </div>

          <div className="info-row">
            <span>Course</span>
            <strong>{student.course}</strong>
          </div>
        </div>

        <div className="modal-footer">
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>

      <style>{`
        :root {
          --primary: #6c63ff;
          --gradient: linear-gradient(135deg, #6c63ff, #8b5cf6);
          --success: #16a34a;
          --danger: #dc2626;
          --text-dark: #1f2937;
          --text-muted: #6b7280;
          --border: #e5e7eb;
        }

        /* Glass overlay */
        .glass-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          animation: fadeIn 0.3s ease;
        }

        /* Modal */
        .student-modal {
          width: 100%;
          max-width: 460px;
          background: white;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.35);
          animation: popIn 0.35s cubic-bezier(.25,.8,.25,1);
        }

        /* Header */
        .modal-top {
          background: var(--gradient);
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          position: relative;
        }

        .avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
          flex-shrink: 0;
        }

        .title-box h3 {
          margin: 0;
          color: white;
          font-size: 18px;
        }

        .status-pill {
          display: inline-block;
          margin-top: 4px;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          background: rgba(255,255,255,0.85);
        }

        .status-pill.active {
          color: var(--success);
        }

        .status-pill.inactive {
          color: var(--danger);
        }

        .close-x {
          position: absolute;
          right: 16px;
          top: 16px;
          background: none;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
          opacity: 0.9;
        }

        /* Content */
        .modal-content {
          padding: 22px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid var(--border);
          font-size: 14px;
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .info-row span {
          color: var(--text-muted);
        }

        .info-row strong {
          color: var(--text-dark);
          max-width: 220px;
          text-align: right;
          word-break: break-word;
        }

        /* Footer */
        .modal-footer {
          padding: 16px 22px;
          display: flex;
          justify-content: flex-end;
          background: #fafafa;
        }

        .close-btn {
          padding: 8px 18px;
          border-radius: 999px;
          border: none;
          background: var(--primary);
          color: white;
          font-size: 14px;
          cursor: pointer;
        }

        .close-btn:hover {
          opacity: 0.9;
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
          .student-modal {
            margin: 0 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default ViewStudentModal;
