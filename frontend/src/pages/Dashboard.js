import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h2>Dashboard</h2>

        <p>
          Welcome, <strong>{user.email}</strong>
        </p>

        <p>
          Your role: <strong>{user.role}</strong>
        </p>
      </div>
    </>
  );
};

export default Dashboard;
