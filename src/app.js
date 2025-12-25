const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json())


app.post("/signup", async (req, res) => {
  try {
    const userObj = req.body
    // creating a new instance of the userMOdel
    const user = new User(userObj);
    await user.save();

    res.status(201).json({
      message: "User created successfully",
      userId : user._id
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating user",
      error: err.message,
    });
  }
});

const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connection established");
    app.listen(3000, () => {
      console.log("server is successfully listening on server 3000 !!!");
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
};

startServer();
