import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await signup(formData.email, formData.password, formData.role);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="signup-card">
          <h2>Create Account</h2>
          <p>Start managing students effortlessly</p>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <label>Password</label>
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff /> : <Eye />}
              </span>
            </div>

            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <button disabled={loading}>
              {loading ? "Creating..." : "Signup"}
            </button>
          </form>

          <div className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>

      {/* ===== CSS IN SAME FILE ===== */}
      <style>{`
        :root {
          --primary: #6c63ff;
          --bg: linear-gradient(135deg, #6c63ff, #8e8bff);
          --text: #2b2b2b;
          --error: #e63946;
        }

        .signup-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg);
        }

        .signup-card {
          width: 100%;
          max-width: 420px;
          background: #fff;
          padding: 30px;
          border-radius: 14px;
          box-shadow: 0 20px 40px rgba(0,0,0,.15);
        }

        h2 {
          text-align: center;
          color: var(--text);
        }

        p {
          text-align: center;
          color: #666;
        }

        label {
          display: block;
          margin-top: 15px;
          font-size: 14px;
        }

        input, select {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ddd;
          margin-top: 5px;
        }

        .password-box {
          position: relative;
        }

        .password-box span {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          color: var(--primary);
          font-size: 13px;
        }

        .error {
          background: #ffe5e5;
          color: var(--error);
          padding: 10px;
          border-radius: 8px;
          margin: 10px 0;
        }

        button {
          width: 100%;
          margin-top: 20px;
          padding: 11px;
          border: none;
          border-radius: 8px;
          background: var(--primary);
          color: white;
          font-size: 15px;
          cursor: pointer;
        }

        button:disabled {
          opacity: .6;
        }

        .login-link {
          text-align: center;
          margin-top: 15px;
        }

        .login-link a {
          color: var(--primary);
          text-decoration: none;
        }
      `}</style>
    </>
  );
};

export default Signup;
