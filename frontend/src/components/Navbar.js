import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <span className="brand">🎓 Student Portal</span>
        </div>

        <div className="nav-center">
          <Link className={isActive("/") ? "active" : ""} to="/">
            Dashboard
          </Link>
          <Link
            className={isActive("/students") ? "active" : ""}
            to="/students"
          >
            Students
          </Link>
        </div>

        <div className="nav-right">
          <span className="user-email">{user?.email}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(true)}>
          ☰
        </div>
      </nav>

      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)}>
          <aside className="sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="sidebar-header">
              <span>🎓 Student Portal</span>
              <button onClick={() => setMenuOpen(false)}>✕</button>
            </div>

            <div className="sidebar-links">
              <Link
                className={isActive("/") ? "active" : ""}
                to="/"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>

              <Link
                className={isActive("/students") ? "active" : ""}
                to="/students"
                onClick={() => setMenuOpen(false)}
              >
                Students
              </Link>
            </div>

            <div className="sidebar-user">
              <p>{user?.email}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </aside>
        </div>
      )}

      <style>{`
        :root {
          --primary: #6c63ff;
          --primary-dark: #5548e0;
          --bg: #ffffff;
          --border: #e5e7eb;
          --text: #1f2937;
          --muted: #6b7280;
        }

        /* ===== NAVBAR ===== */
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .brand {
          font-size: 18px;
          font-weight: 700;
          color: var(--primary);
        }

        .nav-center a {
          margin: 0 14px;
          text-decoration: none;
          color: var(--text);
          font-weight: 500;
          padding-bottom: 4px;
        }

        .nav-center a.active,
        .nav-center a:hover {
          color: var(--primary);
          border-bottom: 2px solid var(--primary);
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .user-email {
          font-size: 14px;
          color: var(--muted);
        }

        .nav-right button {
          padding: 6px 14px;
          border: none;
          border-radius: 6px;
          background: var(--primary);
          color: #fff;
          cursor: pointer;
          font-size: 14px;
        }

        .nav-right button:hover {
          background: var(--primary-dark);
        }

        .hamburger {
          display: none;
          font-size: 22px;
          cursor: pointer;
        }

        /* ===== MOBILE ===== */
        @media (max-width: 768px) {
          .nav-center,
          .nav-right {
            display: none;
          }

          .hamburger {
            display: block;
          }
        }

        /* ===== SIDEBAR ===== */
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          z-index: 200;
          display: flex;
          justify-content: flex-end;
        }

        .sidebar {
          width: 280px;
          background: white;
          height: 100%;
          padding: 20px;
          display: flex;
          flex-direction: column;
          animation: slideIn 0.3s ease;
        }

        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 20px;
        }

        .sidebar-header button {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
        }

        .sidebar-links a {
          display: block;
          padding: 12px 14px;
          border-radius: 8px;
          margin-bottom: 8px;
          text-decoration: none;
          color: var(--text);
          font-size: 15px;
        }

        .sidebar-links a.active,
        .sidebar-links a:hover {
          background: #f3f4ff;
          color: var(--primary);
        }

        .sidebar-user {
          margin-top: auto;
          border-top: 1px solid var(--border);
          padding-top: 15px;
        }

        .sidebar-user p {
          font-size: 14px;
          color: var(--muted);
          margin-bottom: 10px;
        }

        .sidebar-user button {
          width: 100%;
          padding: 8px;
          border: none;
          border-radius: 6px;
          background: var(--primary);
          color: white;
          cursor: pointer;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
