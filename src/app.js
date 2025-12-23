const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("middleware 1");
    next();
    //res.send("response 1");
  },
  (req, res, next) => {
    console.log("middleware 2");
    // res.send("response 2");
    next()
  },
  (req, res, next) => {
    console.log("middleware 3");
    next();
    //res.send("response 3");
  },
  (req, res, next) => {
    console.log("middleware 4");
    res.send("response 4");
  }
);

app.listen(3000, () => {
  console.log("server is successfully listening on server 3000");
});
