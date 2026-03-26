const {
  signupUser,
  loginUser,
  getCurrentUser,
} = require("../services/authService");

const signup = async (req, res) => {
  try {
    const result = await signupUser(req.body);
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    console.error("SIGNUP ERROR:", error.message);
    return res.status(500).json({
      success: false,
      message: "Signup failed",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error.message);
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

const getCurrentUserController = async (req, res) => {
  try {
    const result = await getCurrentUser(req.user.user_id);
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error("GET USER ERROR:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
  getCurrentUserController,
};