require("dotenv").config();
const AdminModel = require("../models/AdminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const adminCheck = await AdminModel.findOne({
      email: email,
    });
    if (adminCheck === null) {
      res.status(200).json({
        code: 0,
        data: "",
        message: "Email is not registered",
      });
    }
    bcrypt.compare(password, adminCheck.password, (err, result) => {
      if (err) {
        res.status(200).json({
          code: 0,
          data: "",
          message: err.message,
        });
      }
      if (result === false) {
        res.status(200).json({
          code: 0,
          data: "",
          message: "Password is incorrect",
        });
      }
      if (result === true) {
        jwt.sign(
          {
            id: adminCheck._id,
            email: adminCheck.email,
            name: adminCheck.name,
            phoneNumber: adminCheck.phoneNumber,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "365d",
          },
          (err, result) => {
            if (err) {
              res.status(200).json({
                code: 0,
                data: "",
                message: err.message,
              });
            }
            if (result) {
              res.status(200).json({
                code: 1,
                data: result,
                message: "Logged in successfully",
              });
            }
          }
        );
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
exports.AdminDetails = async (req, res) => {
  try {
    const id = req.userId;
    const admin = await AdminModel.findOne({
      _id: id,
    });
    res.status(200).json({
      code: 1,
      data: admin,
      message: "",
    });
  } catch (error) {
    res.status(200).json({
      code: 0,
      data: "",
      message: error.message,
    });
  }
};
