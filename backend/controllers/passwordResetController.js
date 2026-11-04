const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = require("../models/User");
const PasswordReset = require("../models/PasswordReset");

const OTP_EXPIRY_MINUTES = 5;
const RESEND_WAIT_SECONDS = 60;
const MAX_OTP_ATTEMPTS = 5;

const normalizeEmail = (email) => email.trim().toLowerCase();

const generateOTP = () =>
  crypto.randomInt(100000, 1000000).toString();

const hashOTP = (otp) =>
  crypto
    .createHmac("sha256", process.env.OTP_SECRET)
    .update(otp)
    .digest("hex");

const createTransporter = () =>
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

const sendResetEmail = async (email, otp) => {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "ENROUTE Password Reset OTP",
    text: `Your ENROUTE password reset OTP is ${otp}. It expires in 5 minutes. If you did not request this, please ignore this email.`,
    html: `
      <div style="font-family:Arial,sans-serif;padding:24px">
        <h2>ENROUTE Password Reset</h2>
        <p>Your password reset verification code is:</p>
        <h1 style="letter-spacing:8px">${otp}</h1>
        <p>This OTP expires in 5 minutes.</p>
        <p>If you did not request a password reset, you can ignore this email.</p>
      </div>
    `,
  });
};

// STEP 1: Request password reset OTP
exports.requestPasswordReset = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email || "");

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const user = await User.findOne({ email });

    // Avoid revealing whether an email is registered.
    if (!user) {
      return res.json({
        success: true,
        message: "If an account exists, a reset OTP has been sent.",
      });
    }

    let reset = await PasswordReset.findOne({ email });

    if (
      reset &&
      Date.now() - reset.lastOtpSentAt.getTime() <
        RESEND_WAIT_SECONDS * 1000
    ) {
      return res.status(429).json({
        success: false,
        message: "Please wait 60 seconds before requesting another OTP.",
      });
    }

    const otp = generateOTP();

    if (!reset) {
      reset = new PasswordReset({ email });
    }

    reset.otpHash = hashOTP(otp);
    reset.otpExpiresAt = new Date(
      Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
    );
    reset.otpAttempts = 0;
    reset.lastOtpSentAt = new Date();
    reset.verifiedAt = null;

    await reset.save();

    try {
      await sendResetEmail(email, otp);
    } catch (emailError) {
      await PasswordReset.deleteOne({ email });

      console.error("Password reset email error:", emailError.message);

      return res.status(500).json({
        success: false,
        message: "Unable to send OTP. Please try again.",
      });
    }

    return res.json({
      success: true,
      message: "Password reset OTP sent to your email.",
    });
  } catch (error) {
    console.error("Request password reset error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

// STEP 2: Verify password reset OTP
exports.verifyPasswordResetOTP = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email || "");
    const otp = String(req.body.otp || "").trim();

    if (!email || !/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid email and 6-digit OTP.",
      });
    }

    const reset = await PasswordReset.findOne({ email });

    if (!reset) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP. Request a new one.",
      });
    }

    if (reset.otpExpiresAt < new Date()) {
      await PasswordReset.deleteOne({ email });

      return res.status(400).json({
        success: false,
        message: "OTP has expired. Request a new one.",
      });
    }

    if (reset.otpAttempts >= MAX_OTP_ATTEMPTS) {
      await PasswordReset.deleteOne({ email });

      return res.status(429).json({
        success: false,
        message: "Too many incorrect attempts. Request a new OTP.",
      });
    }

    if (reset.otpHash !== hashOTP(otp)) {
      reset.otpAttempts += 1;
      await reset.save();

      return res.status(400).json({
        success: false,
        message: "Incorrect OTP.",
      });
    }

    reset.verifiedAt = new Date();
    await reset.save();

    const resetToken = jwt.sign(
      {
        email,
        purpose: "password-reset",
      },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    return res.json({
      success: true,
      message: "OTP verified successfully.",
      resetToken,
    });
  } catch (error) {
    console.error("Verify reset OTP error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

// STEP 3: Save new password
exports.resetPassword = async (req, res) => {
  try {
    const { resetToken, password } = req.body;

    if (!resetToken || !password || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "A valid reset token and password of at least 8 characters are required.",
      });
    }

    let decoded;

    try {
      decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    } catch {
      return res.status(401).json({
        success: false,
        message: "Reset session expired. Please start again.",
      });
    }

    if (decoded.purpose !== "password-reset") {
      return res.status(401).json({
        success: false,
        message: "Invalid reset token.",
      });
    }

    const reset = await PasswordReset.findOne({
      email: decoded.email,
    });

    if (
      !reset ||
      !reset.verifiedAt ||
      Date.now() - reset.verifiedAt.getTime() > 10 * 60 * 1000
    ) {
      return res.status(401).json({
        success: false,
        message: "Please verify your OTP again.",
      });
    }

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Account not found.",
      });
    }

    user.password = await bcrypt.hash(password, 12);
    await user.save();

    await PasswordReset.deleteOne({ email: decoded.email });

    return res.json({
      success: true,
      message: "Password reset successfully. Please log in.",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};