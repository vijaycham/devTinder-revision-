const mongoose = require("mongoose");
const validator = require("validator");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 30,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email format");
        }
      }
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      trim: true,
      validate(value) {
        if(!validator.isStrongPassword(value)){
          throw new Error("Password is not strong enough");
        }
      }
    },
    phoneNumber: {
      type: String,
      minLength: 10,
      trim: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value.toLowerCase())) {
          throw new Error("Gender must be either 'male', 'female' or 'other'");
        }
      },
    },
    photoURL: {
      type: String,
      trim: true,
      default: "",
      validator(value) {
        if(!validator.isURL(value)){
          throw new Error("Invalid URL format");
        }
      }
    },
    bio: {
      type: String,
      maxLength: 250,
      trim: true,
      default: "This is a default bio of the user.",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
