const mongoose = require("mongoose");
require("dotenv").config();

const DB_CLUSTER = process.env.DB_CLUSTER;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_CLUSTER, {});
  } catch (err) {
    console.error("Database connection failed", err);
    throw err;
  }
};

module.exports = connectDB;
