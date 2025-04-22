const connect = require("../DB");
const bcrypt = require("bcrypt");
const AdminModel = require("../models/AdminModel");

const AdminSeeder = async () => {
  try {
    await connect();
    const admin = {
      email: "sabuj.131521@gmail.com",
      password: "1235",
      name: "sabuj das",
      phoneNumber: "9002109074",
    };
    const adminCheck = await AdminModel.findOne({
      email: admin.email,
    });
    if (adminCheck === null) {
      bcrypt.hash(admin.password, 10, async (err, result) => {
        if (err) {
          console.error(err.message);
        }
        if (result) {
          await AdminModel.create({
            email: admin.email,
            password: result,
            name: admin.name,
           phoneNumber: admin.phoneNumber,
          });
          console.log("Admin created");
        }
      });
    } else {
      console.log("Admin already exists");
    }
  } catch (error) {
    console.error(error.message);
  }
};
AdminSeeder();
