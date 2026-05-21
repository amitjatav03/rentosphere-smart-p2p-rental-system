const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// ============================================
// CREATE TOKEN & SAVE COOKIE
// ============================================

const createTokenAndSaveCookie = (userId, res) => {

  const token = jwt.sign(
    { userid: userId },

    process.env.JWT_SECRET,

    {
      expiresIn: "5d"
    }
  );

  res.cookie("token", token, {
    httpOnly: true,

    secure: process.env.NODE_ENV === "production",

    sameSite: "strict",

    maxAge:
      5 * 24 * 60 * 60 * 1000
  });
};


// ============================================
// SIGNUP
// ============================================

const signup = async (req, res) => {
  try {

    const {
      fullname,
      username,
      email,
      phone,
      role,
      password,
      confirmPassword
    } = req.body;

    // Validation
    if (
      !fullname ||
      !username ||
      !email ||
      !phone ||
      !role ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    // Existing email
    const existingEmail =
      await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    // Existing username
    const existingUsername =
      await User.findOne({ username });

    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already exists"
      });
    }

    // Hash password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Create user
    const newUser =
      await User.create({
        fullname,
        username,
        email,
        phone,
        role,
        password: hashedPassword
      });

    // Create auth cookie
    createTokenAndSaveCookie(
      newUser._id,
      res
    );

    return res.status(201).json({
      success: true,
      message:
        "User registered successfully",

      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role
      }
    });

  } catch (error) {

    console.error(
      "Signup Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


// ============================================
// LOGIN
// ============================================

const login = async (req, res) => {
  try {

    const {
      email,
      username,
      password,
      role
    } = req.body;

    // Validation
    if (
      (!email && !username) ||
      !password ||
      !role
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Find user
    const user =
      await User.findOne({
        $or: [
          { email },
          { username }
        ]
      }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid credentials"
      });
    }

    // Role validation
    if (user.role !== role) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid role selected"
      });
    }

    // Password compare
    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid credentials"
      });
    }

    // Create cookie
    createTokenAndSaveCookie(
      user._id,
      res
    );

    return res.status(200).json({
      success: true,
      message:
        "Login successful",

      user: {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (error) {

    console.error(
      "Login Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


// ============================================
// LOGOUT
// ============================================

const logout = async (req, res) => {
  try {

    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message:
        "Logged out successfully"
    });

  } catch (error) {

    console.error(
      "Logout Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


// ============================================
// GET CURRENT USER
// ============================================

const getUser = async (req, res) => {
  try {

    const userId = req.user._id;

    const user =
      await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      user
    });

  } catch (error) {

    console.error(
      "Get User Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


module.exports = {
  signup,
  login,
  logout,
  getUser
};