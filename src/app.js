const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const validateUserUpdate = require("./middlewares/validateUserUpdate");

app.use(express.json());

// Signup API
app.post("/signup", async (req, res) => {
  try {
    const userObj = req.body;
    // creating a new instance of the userMOdel
    const user = new User(userObj);
    await user.save();

    res.status(201).json({
      message: "User created successfully",
      userId: user._id,
    });
  } catch (err) {
    // Duplicate key error
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }
    // other errors
    res.status(500).json({
      message: "Error creating user",
      error: err.message,
    });
  }
});

// Get user by ID
app.get("/users/:id", async (req, res) => {
  try {
    const UserId = req.params.id;
    const user = await User.findById(UserId);
    if (!user) {
      return res.status(404).json({ message: " User not found" });
    } else {
      res.status(200).json({ message: "User Found", user: user });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Error", Error: err.message });
  }
});

// get user by gmail http://localhost:3000/users?emailId=sas@gmail.com
app.get("/users", async (req, res) => {
  try {
    const userEmail = req.query.emailId;
    if (!userEmail) {
      return res.status(400).json({
        message: "emailId is required",
      });
    }
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User found",
      user: user,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// Feed api
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      return res.status(200).json({ message: "No users found", users: [] });
    } else {
      res.status(200).json({ message: "Users Found", users: users });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal error", error: err.message });
  }
});

// Delete user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Error", Error: err.message });
  }
});

// Update user by ID
app.patch("/users/:id", validateUserUpdate, async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Internal Error", Error: err.message });
  }
});

// update user by emailId
app.patch("/users", validateUserUpdate,  async (req, res) => {
  try { 
    const { emailId, ...updateData } = req.body;
    if (!emailId) {
      return res.status(400).json({ message: "emailId is required" });
    }
    const updatedUser = await User.findOneAndUpdate({ emailId }, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Internal Error", Error: err.message });
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
