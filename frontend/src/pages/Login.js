import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      await login(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <h2>Welcome Back 👋</h2>
          <p>Please login to continue</p>

          {error && <div className="error-box">{error}</div>}

          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="signup-link">
            Don’t have an account? <Link to="/signup">Signup</Link>
          </div>
        </div>
      </div>

      {/* ===== CSS (SAME FILE) ===== */}
      <style>{`
        :root {
          --primary: #6c63ff;
          --primary-dark: #5548e0;
          --bg-gradient: linear-gradient(135deg, #6c63ff, #8e8bff);
          --text-dark: #2b2b2b;
          --text-light: #666;
          --error: #e63946;
        }

        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-gradient);
          padding: 20px;
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          background: #fff;
          padding: 30px;
          border-radius: 14px;
          box-shadow: 0 20px 40px rgba(0,0,0,.15);
          animation: fadeIn 0.4s ease;
        }

        .login-card h2 {
          text-align: center;
          font-size: 26px;
          color: var(--text-dark);
        }

        .login-card p {
          text-align: center;
          color: var(--text-light);
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-top: 15px;
          font-size: 14px;
          color: var(--text-dark);
        }

        input {
          width: 100%;
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #ddd;
          margin-top: 6px;
          font-size: 14px;
        }

        input:focus {
          outline: none;
          border-color: var(--primary);
        }

        .password-wrapper {
          position: relative;
        }

        .toggle-password {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          color: var(--primary);
          font-size: 13px;
          user-select: none;
        }

        .error-box {
          background: #ffe5e5;
          color: var(--error);
          padding: 10px;
          border-radius: 8px;
          font-size: 14px;
          margin-bottom: 10px;
        }

        button {
          width: 100%;
          margin-top: 22px;
          padding: 11px;
          border: none;
          border-radius: 8px;
          background: var(--primary);
          color: white;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }

        button:hover {
          background: var(--primary-dark);
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .signup-link {
          text-align: center;
          margin-top: 18px;
          font-size: 14px;
        }

        .signup-link a {
          color: var(--primary);
          font-weight: 600;
          text-decoration: none;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Login;
