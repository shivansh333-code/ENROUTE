
const express = require("express");
const rateLimit = require("express-rate-limit");

const router = express.Router();

// Existing authentication controller
const {
  registerUser,
  verifyOTP,
  resendOTP,
  loginUser,
} = require("../controllers/authController");

// Password reset controller
const {
  requestPasswordReset,
  verifyPasswordResetOTP,
  resetPassword,
} = require("../controllers/passwordResetController");

const protect = require("../middleware/authMiddleware");

// Registration rate limiter
const registrationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many registration requests. Please try again later.",
  },
});

// Registration OTP rate limiter
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many OTP requests. Please try again later.",
  },
});

// Password reset rate limiter
const passwordResetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many password reset requests. Please try again later.",
  },
});

// ========================================
// REGISTRATION ROUTES
// ========================================

router.post("/register", registrationLimiter, registerUser);

router.post("/verify-otp", otpLimiter, verifyOTP);

router.post("/resend-otp", otpLimiter, resendOTP);

// ========================================
// LOGIN ROUTE
// ========================================

router.post("/login", loginUser);

// ========================================
// FORGOT PASSWORD ROUTES
// ========================================

// Step 1: Request password reset OTP
router.post(
  "/forgot-password",
  passwordResetLimiter,
  requestPasswordReset
);

// Step 2: Verify password reset OTP
router.post(
  "/verify-reset-otp",
  passwordResetLimiter,
  verifyPasswordResetOTP
);

// Step 3: Save new password
router.post(
  "/reset-password",
  passwordResetLimiter,
  resetPassword
);

// ========================================
// GET CURRENTLY LOGGED-IN USER
// ========================================

router.get("/me", protect, (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

// ========================================
// LOGOUT
// ========================================

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

module.exports = router;
