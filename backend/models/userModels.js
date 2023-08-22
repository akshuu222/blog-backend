import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name Cannot Exceed 30 characters"],
      minLength: [4, "Name Should Have More Than 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a Valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      select: false,
      maxLength: [30, "Password Cannot Exceed 30 characters"],
      minLength: [8, "Password Should Have More Than 4 characters"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    next(error);
  }
});

userSchema.methods.checkPass = async function (password, next) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    next(error);
  }
};
userSchema.methods.getToken = async function (next) {
  try {
    return jwt.sign({ _id: this._id.toString() }, process.env.JWT_PASS, {
      expiresIn: process.env.JWT_EXP,
    });
  } catch (error) {
    next(error);
  }
};

const User = mongoose.model("users", userSchema);
export default User;
