
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

import "./Auth.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      if (response.data.success) {
       navigate(`/verify-otp?email=${encodeURIComponent(email.trim().toLowerCase())}`);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <header className="auth-topbar">
        <Link to="/" className="auth-brand">ENROUTE</Link>
        <Link to="/" className="back-home">← BACK TO HOME</Link>
      </header>

      <section className="auth-layout">
        <div className="auth-visual">
          <div className="visual-content">
            <span className="eyebrow">
              SLOW TRAVEL CURATIONS · HIMACHAL
            </span>

            <h1>Your story<br />starts here.</h1>

            <p>
              Discover hidden roads, unforgettable places
              and experiences worth remembering.
            </p>

            <svg className="journey-line" viewBox="0 0 600 180">
              <path
                d="M5 145 C120 145 130 55 230 90 S390 100 480 30 S550 15 590 5"
                stroke="#E9DFC5"
                strokeWidth="2"
                fill="none"
              />
              <circle cx="590" cy="5" r="4" fill="#F4F0E7" />
            </svg>

            <span className="visual-quote">
              "The Journey is the Destination."
            </span>
          </div>

          <span className="visual-footer">
            HIMACHAL PRADESH · INDIA
          </span>
        </div>

        <div className="auth-form-section">
          <div className="auth-form-wrapper register-wrapper">
            <span className="eyebrow">BECOME A TRAVELLER</span>

            <h2>Begin your journey.</h2>

            <p className="form-description">
              Create an account and make every road count.
            </p>

            <form onSubmit={handleRegister}>
              <label htmlFor="register-name">FULL NAME</label>

              <input
                id="register-name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                minLength={2}
                maxLength={50}
                required
              />

              <label htmlFor="register-email">EMAIL ADDRESS</label>

              <input
                id="register-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />

              <label htmlFor="register-password">PASSWORD</label>

              <div className="password-field">
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  autoComplete="new-password"
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

              <label htmlFor="confirm-password">CONFIRM PASSWORD</label>

              <input
                id="confirm-password"
                type="password"
                placeholder="Enter your password again"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />

              {error && <p className="auth-error">{error}</p>}

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >
                {loading ? "SENDING OTP..." : "CONTINUE →"}
              </button>
            </form>

            <div className="auth-switch">
              Already have an account?
              <Link to="/login"> Sign in</Link>
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

export default Register;
