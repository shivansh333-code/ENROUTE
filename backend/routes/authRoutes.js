
const express = require("express");
const rateLimit = require("express-rate-limit");

const router = express.Router();

// Authentication controller
const {
  registerUser,
  verifyOTP,
  resendOTP,
  loginUser,
  logoutUser,
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

router.post(
  "/forgot-password",
  passwordResetLimiter,
  requestPasswordReset
);

router.post(
  "/verify-reset-otp",
  passwordResetLimiter,
  verifyPasswordResetOTP
);

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

router.post("/logout", logoutUser);

module.exports = router;
