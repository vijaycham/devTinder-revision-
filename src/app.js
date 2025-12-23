const express = require("express");

const app = express();



app.get("/user", (req, res) => {
    res.send({"firstName" : "Vijay"})
});

app.post("/user", (req, res) => {
  res.send("Added successfully");
});

app.delete("/user", (req, res) => {
  res.send("deleted successfully");
});

app.use("/user", (req, res) => {
  res.send("Trial");
});

app.listen(3000, () => {
  console.log("server is successfully listening on server 3000");
});
