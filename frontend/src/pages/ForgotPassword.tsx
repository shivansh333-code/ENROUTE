import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import "./Auth.css";

type Step = "email" | "otp" | "password";

function ForgotPassword() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleRequestOTP = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await API.post("/auth/forgot-password", {
        email: email.trim().toLowerCase(),
      });

      setMessage(response.data.message);
      setStep("otp");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Unable to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/auth/verify-reset-otp", {
        email: email.trim().toLowerCase(),
        otp,
      });

      setResetToken(response.data.resetToken);
      setMessage("Email verified successfully.");
      setStep("password");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "OTP verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");

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
      const response = await API.post("/auth/reset-password", {
        resetToken,
        password,
      });

      setMessage(response.data.message);
      window.location.href = "/login";
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Unable to reset password."
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
        <Link to="/login" className="back-home">
          ← BACK TO LOGIN
        </Link>
      </header>

      <section className="auth-layout">
        <div className="auth-visual">
          <div className="visual-content">
            <span className="eyebrow">
              YOUR JOURNEY CONTINUES
            </span>

            <h1>
              A fresh start,
              <br />
              a new password.
            </h1>

            <p>
              Secure your account and get back to discovering
              the roads worth remembering.
            </p>
          </div>

          <span className="visual-footer">
            HIMACHAL PRADESH · INDIA
          </span>
        </div>

        <div className="auth-form-section">
          <div className="auth-form-wrapper">
            <span className="eyebrow">ACCOUNT RECOVERY</span>

            <h2>
              {step === "email" && "Forgot password?"}
              {step === "otp" && "Verify your email."}
              {step === "password" && "Create new password."}
            </h2>

            <p className="form-description">
              {step === "email" &&
                "Enter your registered email to receive a verification code."}

              {step === "otp" &&
                `Enter the 6-digit code sent to ${email}.`}

              {step === "password" &&
                "Choose a strong new password for your account."}
            </p>

            {step === "email" && (
              <form onSubmit={handleRequestOTP}>
                <label htmlFor="reset-email">EMAIL ADDRESS</label>

                <input
                  id="reset-email"
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                {error && <p className="auth-error">{error}</p>}
                {message && <p className="auth-success">{message}</p>}

                <button
                  type="submit"
                  className="auth-submit"
                  disabled={loading}
                >
                  {loading ? "SENDING OTP..." : "SEND OTP →"}
                </button>
              </form>
            )}

            {step === "otp" && (
              <form onSubmit={handleVerifyOTP}>
                <label htmlFor="reset-otp">VERIFICATION CODE</label>

                <input
                  id="reset-otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="000000"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  required
                />

                {error && <p className="auth-error">{error}</p>}
                {message && <p className="auth-success">{message}</p>}

                <button
                  type="submit"
                  className="auth-submit"
                  disabled={loading}
                >
                  {loading ? "VERIFYING..." : "VERIFY OTP →"}
                </button>

                <button
                  type="button"
                  className="otp-resend"
                  onClick={() => {
                    setStep("email");
                    setOtp("");
                    setError("");
                    setMessage("");
                  }}
                >
                  Change email / Request another OTP
                </button>
              </form>
            )}

            {step === "password" && (
              <form onSubmit={handleResetPassword}>
                <label htmlFor="new-password">NEW PASSWORD</label>

                <input
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                />

                <label htmlFor="confirm-new-password">
                  CONFIRM NEW PASSWORD
                </label>

                <input
                  id="confirm-new-password"
                  type="password"
                  placeholder="Enter password again"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                {error && <p className="auth-error">{error}</p>}

                <button
                  type="submit"
                  className="auth-submit"
                  disabled={loading}
                >
                  {loading ? "RESETTING PASSWORD..." : "RESET PASSWORD →"}
                </button>
              </form>
            )}

            <div className="auth-switch">
              Remembered your password? <Link to="/login">Sign in</Link>
            </div>

            <div className="form-bottom-quote">
              "Every journey deserves a fresh beginning."
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ForgotPassword;