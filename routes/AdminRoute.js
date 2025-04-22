const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

router.get("/login", AdminController.login);
router.get("/admin-details", AuthMiddleware, AdminController.AdminDetails);

module.exports = router;
