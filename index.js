require("dotenv").config();
const express = require("express");
const connect = require("./DB");
const path = require("path");
const AdminRoute = require("./routes/AdminRoute");

const app = express();
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(express.static(path.join(__dirname, "public")));
const port = process.env.PORT;
app.listen(port, () => {
  console.log("server is running");
  connect();
});

app.use("/api", AdminRoute);
