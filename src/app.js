const express = require("express");
const connectDB = require("./config/database");
const app = express();


app.use("/", (req,res)=> {
  res.send("Hello World");
})


const startServer = async () => {
  try{
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