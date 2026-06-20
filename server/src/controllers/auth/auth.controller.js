import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../../models/user.model.js";

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email or Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Registration Successful",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Registration Failed",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exists",
      });
    }

    const checkPass = await bcrypt.compare(password, user.password);

    if (!checkPass) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    return res
      .cookie("token", token, { httpOnly: true, secure: false })
      .status(201)
      .json({
        success: true,
        message: "Login Successful",
        user: {
          email: user.email,
          role: user.role,
          id: user._id,
          username: user.username,
        },
      });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Some Error Occurred : Login",
    });
  }
};

const logoutUser = async (req, res) => {
  return res.clearCookie("token").status(200).json({
    success: true,
    message: "Logout Successful",
  });
};

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized User",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized User",
    });
  }
};

export { registerUser, loginUser, logoutUser, authMiddleware };
