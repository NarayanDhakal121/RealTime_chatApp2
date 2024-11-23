import jwt from "jsonwebtoken";

// function to create a jwt token and sending it to the user through cookies
// generate a token called json web token
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // send back to user in cookies to the user and takes them to homepage
  // httpOnly cookies that live for 7 days
  res.cookie("jwt", token, {
    // 7 days in milisecond
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevents XSS attack cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development", // DETERMINES AS IT WAS HTTPS OR HTTP AS WE ARE IN LOCALHOST IT WILL NOT SECURE SINCE FOR SECURE IN PRODUCTION IT WILL BE TRUE || IT WILL BE TRUE IN PRODUCTION
  });
  return token;
};
