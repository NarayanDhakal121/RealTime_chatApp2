import jwt from "jsonwebtoken";
import User from "../models/user.modal.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "UnAuthorization Access- No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "UnAuthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "UnAuthorized - Invalid Token" });
    }

    // user is authenticated by the following above steps

    req.user = user;
    // if user is Authenticated add user to the request then call the next function
    next();
  } catch (error) {
    console.log("Error in ProtectedRoute middleware", error.message);
    return res.status(500).json({ message: "internal server error" });
  }
};
