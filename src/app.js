const express = require("express");

const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");

//Handle Auth Middleware for all the requests
app.use("/admin", adminAuth);

//Admin Routes
app.get("/admin/getAlldata", (req, res, next) => {
  res.send("All data fetched successfully");
});
app.get("/admin/deleteUser", (req, res, next) => {
  res.send("User deleted successfully");
});

//User Routes
app.post("/user/login", (req, res, next) => {
  res.send("User logged in successfully");
});

app.post("/user/register", (req, res, next) => {
  res.send("User registered successfully");
});

app.get("/user", userAuth, (req, res, next) => {
  res.send("User data accessed successfully");
});

app.listen(3000, () => {
  console.log("server is successfully listening on server 3000 !!!");
});
