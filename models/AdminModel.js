const mongoose = require("mongoose");
const AdminSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
});
AdminSchema.set("timestamps", true);
const AdminModel = mongoose.model("Admin", AdminSchema);
module.exports = AdminModel;
