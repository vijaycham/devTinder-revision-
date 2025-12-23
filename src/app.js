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
  try {
    //logic for DB call and login
    throw new Error("Login failed due to server error. contact support team.");
    res.send("User logged in successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
  // If you want to test the error handling middleware, you can uncomment the line below and comment out the try-catch block above.
  // throw new Error("Login failed due to server error");
  // res.send("User logged in successfully");
});

app.post("/user/register", (req, res, next) => {
  res.send("User registered successfully");
});

app.get("/user", userAuth, (req, res, next) => {
  res.send("User data accessed successfully");
});

app.use("/",(err, req, res, next) => {
  if (err) {
    console.error(err);
    res.status(500).send("Something went wrong!");
  }
});

app.listen(3000, () => {
  console.log("server is successfully listening on server 3000 !!!");
});
