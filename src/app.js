const express = require("express");

const app = express();

// app.use("/", (req, res) => {
//   res.send("Hello from dashboard");
// });

app.use("/hello", (req, res) => {
  res.send("Hello World!");
});

app.use("/goodbye", (req, res) => {
  res.send("goodbye world");
});
app.listen(3000, () => {
  console.log("server is successfully listening on server 3000");
});
