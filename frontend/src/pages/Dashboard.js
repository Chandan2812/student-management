import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <p>
            Welcome back, <strong>{user.email}</strong>
          </p>
        </div>

        <div className="card-grid">
          <div className="info-card">
            <h4>Email</h4>
            <p>{user.email}</p>
          </div>

          <div className="info-card">
            <h4>Role</h4>
            <span className={`role-badge ${user.role}`}>
              {user.role.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        :root {
          --primary: #6c63ff;
          --bg-light: #f4f6fb;
          --card-bg: #ffffff;
          --text-dark: #1f2937;
          --text-muted: #6b7280;
          --border: #e5e7eb;
        }

        .dashboard-container {
          min-height: calc(100vh - 60px);
          background: var(--bg-light);
          padding: 24px;
        }

        .dashboard-header {
          margin-bottom: 24px;
        }

        .dashboard-header h2 {
          font-size: 26px;
          color: var(--text-dark);
          margin-bottom: 6px;
        }

        .dashboard-header p {
          color: var(--text-muted);
          font-size: 15px;
        }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        .info-card {
          background: var(--card-bg);
          padding: 20px;
          border-radius: 14px;
          border: 1px solid var(--border);
          box-shadow: 0 10px 20px rgba(0,0,0,0.04);
          transition: transform 0.2s ease;
        }

        .info-card:hover {
          transform: translateY(-3px);
        }

        .info-card h4 {
          font-size: 14px;
          color: var(--text-muted);
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .info-card p {
          font-size: 15px;
          color: var(--text-dark);
          word-break: break-all;
        }

        .role-badge {
          display: inline-block;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          margin-top: 6px;
        }

        .role-badge.user {
          background: #eef2ff;
          color: #4338ca;
        }

        .role-badge.admin {
          background: #ffe4e6;
          color: #be123c;
        }

        @media (max-width: 600px) {
          .dashboard-header h2 {
            font-size: 22px;
          }
        }
      `}</style>
    </>
  );
};

export default Dashboard;
