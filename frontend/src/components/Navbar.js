import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <span style={{ marginRight: "20px" }}>
        {user.email} ({user.role})
      </span>

      <Link to="/" style={{ marginRight: "10px" }}>
        Dashboard
      </Link>

      <Link to="/students" style={{ marginRight: "10px" }}>
        Students
      </Link>

      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
