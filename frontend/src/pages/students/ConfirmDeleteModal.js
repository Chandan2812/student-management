const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="glass-overlay" onClick={onClose}>
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className="confirm-header">
          <div className="danger-icon">!</div>
          <h3>Delete Student</h3>
          <button className="close-x" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="confirm-body">
          <p>
            This action <strong>cannot be undone</strong>.
          </p>
          <p>Are you sure you want to delete this student?</p>
        </div>

        {/* FOOTER */}
        <div className="confirm-actions">
          <button className="btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-danger" onClick={onConfirm}>
            Yes, Delete
          </button>
        </div>

        {/* ===== STYLES ===== */}
        <style>{`
          :root {
            --danger: #dc2626;
            --danger-light: #fee2e2;
            --border: #e5e7eb;
            --text-dark: #1f2937;
            --text-muted: #6b7280;
          }

          .glass-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.55);
            backdrop-filter: blur(6px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.25s ease;
          }

          .confirm-modal {
            width: 100%;
            max-width: 420px;
            background: white;
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 30px 60px rgba(0,0,0,0.35);
            animation: popIn 0.3s cubic-bezier(.25,.8,.25,1);
          }

          /* HEADER */
          .confirm-header {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 18px 20px;
            background: linear-gradient(135deg, #dc2626, #ef4444);
            color: white;
            position: relative;
          }

          .danger-icon {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: rgba(255,255,255,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 18px;
          }

          .confirm-header h3 {
            margin: 0;
            font-size: 18px;
            flex: 1;
          }

          .close-x {
            background: none;
            border: none;
            font-size: 20px;
            color: white;
            cursor: pointer;
          }

          /* BODY */
          .confirm-body {
            padding: 22px;
            text-align: left;
          }

          .confirm-body p {
            margin: 6px 0;
            font-size: 14px;
            color: var(--text-dark);
            line-height: 1.5;
          }

          .confirm-body strong {
            color: var(--danger);
          }

          /* FOOTER */
          .confirm-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            padding: 16px 20px;
            border-top: 1px solid var(--border);
            background: #fafafa;
          }

          .btn-outline {
            padding: 8px 18px;
            border-radius: 999px;
            border: 1px solid var(--border);
            background: transparent;
            cursor: pointer;
            font-size: 14px;
          }

          .btn-danger {
            padding: 8px 18px;
            border-radius: 999px;
            border: none;
            background: var(--danger);
            color: white;
            font-size: 14px;
            cursor: pointer;
          }

          .btn-danger:hover {
            opacity: 0.9;
          }

          /* Animations */
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes popIn {
            from {
              transform: scale(0.9) translateY(10px);
              opacity: 0;
            }
            to {
              transform: scale(1) translateY(0);
              opacity: 1;
            }
          }

          @media (max-width: 480px) {
            .confirm-modal {
              margin: 0 16px;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
