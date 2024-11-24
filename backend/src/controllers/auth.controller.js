import { generateToken } from "../lib/utils.js";
import User from "../models/user.modal.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, password, email } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 character" });
    }

    // encrypted the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // if user already existed or not
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already existed" });
    // if not
    // creating a new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      // generate jwt token
      // creating a function to make a code clean in utils.js'
      generateToken(newUser._id, res);
      await newUser.save();
      // suscess message something has been created
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signUp Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //  try to find the user by email
    const user = await User.findOne({ email });
    //  if not found displays the message
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    // 2) compares the password that plain user gives and the encrypted one

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // if everything ok, then generates the token
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login Controller", error.message);
    res.status(500).json({ message: "Internal Server Error:" });
  }
};
export const logout = (req, res) => {
  // just clear out the cookies
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "Logged Out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
