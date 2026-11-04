
import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import API from "../api/axios";

import "./Auth.css";

function VerifyOTP() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [waitSeconds, setWaitSeconds] = useState(60);

  useEffect(() => {
    if (waitSeconds <= 0) return;

    const interval = window.setInterval(() => {
      setWaitSeconds((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [waitSeconds]);

  const handleVerify = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email) {
      setError("Email is missing. Please register again.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid six-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/auth/verify-otp", {
        email,
        otp,
      });

      if (response.data.success) {
        navigate("/login", {
          replace: true,
          state: { verified: true },
        });
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "OTP verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("Email is missing. Please register again.");
      return;
    }

    setResending(true);

    try {
      const response = await API.post("/auth/resend-otp", { email });

      setMessage(response.data.message);
      setOtp("");
      setWaitSeconds(60);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Unable to resend OTP. Please try again."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="auth-page">
      <header className="auth-topbar">
        <Link to="/" className="auth-brand">ENROUTE</Link>
        <Link to="/register" className="back-home">← BACK TO REGISTER</Link>
      </header>

      <section className="auth-layout">
        <div className="auth-visual">
          <div className="visual-content">
            <span className="eyebrow">
              ONE LAST STEP · VERIFY YOUR EMAIL
            </span>

            <h1>Almost<br />there.</h1>

            <p>
              A little confirmation before your next Himalayan journey.
              Check your inbox for your verification code.
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
          <div className="auth-form-wrapper">
            <span className="eyebrow">EMAIL VERIFICATION</span>

            <h2>Check your inbox.</h2>

            <p className="form-description">
              We sent a six-digit verification code to:
              <br />
              <strong>{email || "Your registered email"}</strong>
            </p>

            <form onSubmit={handleVerify}>
              <label htmlFor="verification-otp">
                SIX-DIGIT OTP
              </label>

              <input
                id="verification-otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                maxLength={6}
                required
              />

              {error && <p className="auth-error">{error}</p>}

              {message && <p className="auth-success">{message}</p>}

              <button
                type="submit"
                className="auth-submit"
                disabled={loading || !email}
              >
                {loading ? "VERIFYING..." : "VERIFY EMAIL →"}
              </button>
            </form>

            <div className="auth-switch">
              Didn't receive the code?
              <button
                type="button"
                className="otp-resend"
                onClick={handleResend}
                disabled={resending || waitSeconds > 0 || !email}
              >
                {resending
                  ? "Sending..."
                  : waitSeconds > 0
                    ? ` Resend in ${waitSeconds}s`
                    : " Resend OTP"}
              </button>
            </div>

            <div className="form-bottom-quote">
              OTP expires in 5 minutes. Check your spam folder too.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default VerifyOTP;
