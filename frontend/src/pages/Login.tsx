
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(email, password);

      // Redirect to the homepage
      navigate("/", { replace: true });

      // Start the homepage at the top
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <header className="auth-topbar">
        <Link to="/" className="auth-brand">
          ENROUTE
        </Link>

        <Link to="/" className="back-home">
          ← BACK TO HOME
        </Link>
      </header>

      <section className="auth-layout">

        {/* Left Visual Section */}
        <div className="auth-visual">
          <div className="visual-content">

            <span className="eyebrow">
              SLOW TRAVEL CURATIONS · HIMACHAL
            </span>

            <h1>
              Every journey
              <br />
              has a beginning.
            </h1>

            <p>
              Find your way back to the mountains,
              the roads and the moments that matter.
            </p>

            <svg className="journey-line" viewBox="0 0 600 180">
              <path
                d="M5 145 C120 145 130 55 230 90 S390 100 480 30 S550 15 590 5"
                stroke="#E9DFC5"
                strokeWidth="2"
                fill="none"
              />

              <circle
                cx="590"
                cy="5"
                r="4"
                fill="#F4F0E7"
              />
            </svg>

            <span className="visual-quote">
              "The Journey is the Destination."
            </span>
          </div>

          <span className="visual-footer">
            HIMACHAL PRADESH · INDIA
          </span>
        </div>

        {/* Right Login Form */}
        <div className="auth-form-section">
          <div className="auth-form-wrapper">

            <span className="eyebrow">
              WELCOME BACK
            </span>

            <h2>Continue the journey.</h2>

            <p className="form-description">
              Sign in to explore the roads less travelled.
            </p>

            <form onSubmit={handleLogin}>

              <label htmlFor="login-email">
                EMAIL ADDRESS
              </label>

              <input
                id="login-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />

              <label htmlFor="login-password">
                PASSWORD
              </label>

              <div className="password-field">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>

              {/* Forgot Password Link */}
              <div className="forgot-password-link">
                <Link to="/forgot-password">
                  Forgot Password?
                </Link>
              </div>

              {error && (
                <p className="auth-error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >
                {loading ? "SIGNING IN..." : "SIGN IN →"}
              </button>

            </form>

            <div className="auth-switch">
              New to ENROUTE?
              <Link to="/register">
                {" "}Create an account
              </Link>
            </div>

            <div className="form-bottom-quote">
              "Mountains have curved roads, but straight people."
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
