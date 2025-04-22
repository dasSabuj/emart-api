require("dotenv").config();
const jwt = require("jsonwebtoken");
const AuthMiddleware = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization.split("Bearer ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
      if (err) {
        res.status(200).json({
          code: 0,
          data: "",
          message: err.message,
        });
      }
      if (result) {
        req["userId"] = result.id;
        next();
      } else {
        res.status(200).json({
          code: 0,
          data: "",
          message: "Invalid token",
        });
      }
    });
  } catch (error) {
    res.status(200).json({
      code: 0,
      data: "",
      message: error.message,
    });
  }
};
module.exports = AuthMiddleware;
