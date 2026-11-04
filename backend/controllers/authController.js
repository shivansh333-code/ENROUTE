
const User = require("../models/User");
const PendingRegistration = require("../models/PendingRegistration");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const OTP_EXPIRY_MINUTES = 5;
const OTP_RESEND_SECONDS = 60;
const MAX_OTP_ATTEMPTS = 5;

const normalizeEmail = (email) =>
  String(email || "").trim().toLowerCase();

const generateOTP = () =>
  crypto.randomInt(100000, 1000000).toString();

const hashOTP = (otp) => {
  return crypto
    .createHmac("sha256", process.env.OTP_SECRET || process.env.JWT_SECRET)
    .update(otp)
    .digest("hex");
};

const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    throw new Error("Email configuration is missing in backend .env");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
};

const sendOTPEmail = async (email, name, otp) => {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: email,
    subject: "Verify your ENROUTE account",
    text: `Hello ${name},

Your ENROUTE verification OTP is ${otp}.

This OTP expires in 5 minutes. Do not share it with anyone.

If you did not request this, you can ignore this email.

ENROUTE Team`,
    html: `
      <div style="font-family:Arial,sans-serif;background:#f4f0e7;padding:30px">
        <div style="max-width:500px;margin:auto;background:#111a15;color:#f4f0e7;padding:35px;border-radius:12px">
          <h1 style="letter-spacing:5px">ENROUTE</h1>
          <h2>Verify your email</h2>
          <p>Hello ${name},</p>
          <p>Use this six-digit OTP to verify your account:</p>
          <div style="font-size:32px;letter-spacing:10px;font-weight:bold;background:#26372d;padding:18px;text-align:center">
            ${otp}
          </div>
          <p>This OTP expires in 5 minutes.</p>
          <p style="color:#c7bd9d">Never share this code with anyone.</p>
        </div>
      </div>
    `,
  });
};

// REGISTER: create pending registration and send OTP
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const cleanName = String(name).trim();
    const cleanEmail = normalizeEmail(email);

    if (cleanName.length < 2 || cleanName.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 2 and 50 characters",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    if (String(password).length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 8 characters",
      });
    }

    const existingUser = await User.findOne({ email: cleanEmail });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "This email is already registered. Please login.",
      });
    }

    const existingPending = await PendingRegistration.findOne({
      email: cleanEmail,
    });

    if (
      existingPending &&
      Date.now() - existingPending.lastOtpSentAt.getTime() <
        OTP_RESEND_SECONDS * 1000
    ) {
      return res.status(429).json({
        success: false,
        message: "Please wait 60 seconds before requesting another OTP.",
      });
    }

    const otp = generateOTP();
    const otpHash = hashOTP(otp);
    const hashedPassword = await bcrypt.hash(password, 12);

    const expiresAt = new Date(
      Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
    );

    const pendingData = {
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
      otpHash,
      otpExpiresAt: expiresAt,
      otpAttempts: 0,
      lastOtpSentAt: new Date(),
    };

    await PendingRegistration.findOneAndUpdate(
      { email: cleanEmail },
      { $set: pendingData },
      { upsert: true, new: true, runValidators: true }
    );

    try {
      await sendOTPEmail(cleanEmail, cleanName, otp);
    } catch (emailError) {
      await PendingRegistration.deleteOne({ email: cleanEmail });

      console.error("OTP email error:", emailError.message);

      return res.status(503).json({
        success: false,
        message: "Unable to send OTP email. Check email configuration and try again.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully to your email",
      email: cleanEmail,
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
};

// VERIFY OTP: create the actual user only after successful verification
const verifyOTP = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const otp = String(req.body.otp || "").trim();

    if (!email || !/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid six-digit OTP",
      });
    }

    const pending = await PendingRegistration.findOne({ email });

    if (!pending) {
      return res.status(404).json({
        success: false,
        message: "Registration not found. Please register again.",
      });
    }

    if (pending.otpExpiresAt.getTime() <= Date.now()) {
      await PendingRegistration.deleteOne({ email });

      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please register again.",
      });
    }

    if (pending.otpAttempts >= MAX_OTP_ATTEMPTS) {
      await PendingRegistration.deleteOne({ email });

      return res.status(429).json({
        success: false,
        message: "Too many incorrect attempts. Please register again.",
      });
    }

    const submittedHash = hashOTP(otp);

    if (submittedHash !== pending.otpHash) {
      pending.otpAttempts += 1;
      await pending.save();

      return res.status(400).json({
        success: false,
        message: `Incorrect OTP. ${MAX_OTP_ATTEMPTS - pending.otpAttempts} attempts remaining.`,
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      await PendingRegistration.deleteOne({ email });

      return res.status(409).json({
        success: false,
        message: "This email is already registered. Please login.",
      });
    }

    await User.create({
      name: pending.name,
      email: pending.email,
      password: pending.password,
      isVerified: true,
    });

    await PendingRegistration.deleteOne({ email });

    return res.status(200).json({
      success: true,
      message: "Email verified and registration completed. Please login.",
    });
  } catch (error) {
    console.error("OTP verification error:", error);

    return res.status(500).json({
      success: false,
      message: "OTP verification failed. Please try again.",
    });
  }
};

// RESEND OTP
const resendOTP = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const pending = await PendingRegistration.findOne({ email });

    if (!pending) {
      return res.status(404).json({
        success: false,
        message: "Registration not found. Please register again.",
      });
    }

    const secondsSinceLastSend =
      (Date.now() - pending.lastOtpSentAt.getTime()) / 1000;

    if (secondsSinceLastSend < OTP_RESEND_SECONDS) {
      const wait = Math.ceil(OTP_RESEND_SECONDS - secondsSinceLastSend);

      return res.status(429).json({
        success: false,
        message: `Please wait ${wait} seconds before requesting another OTP.`,
      });
    }

    const otp = generateOTP();

    pending.otpHash = hashOTP(otp);
    pending.otpExpiresAt = new Date(
      Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
    );
    pending.otpAttempts = 0;
    pending.lastOtpSentAt = new Date();

    await pending.save();

    try {
      await sendOTPEmail(email, pending.name, otp);
    } catch (emailError) {
      console.error("Resend OTP email error:", emailError.message);

      return res.status(503).json({
        success: false,
        message: "Unable to send OTP email. Please try again later.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "A new OTP has been sent to your email",
    });
  } catch (error) {
    console.error("Resend OTP error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to resend OTP",
    });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: normalizeEmail(email),
    }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  registerUser,
  verifyOTP,
  resendOTP,
  loginUser,
};
