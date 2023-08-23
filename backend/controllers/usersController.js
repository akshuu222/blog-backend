import User from "../models/userModels.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/jwtToken.js";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Register first", 400));
    const isMatch = await user.checkPass(password, next);
    if (!isMatch)
      return next(new ErrorHandler("Incorrect Email or Password", 400));
    sendToken(user, res, 200, "Logined Successfully", next);
  } catch (error) {
    return next(error);
  }
};
const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("Already Registered", 400));
    user = await User.create({ name, email, password });
    sendToken(user, res, 200, "Registered Successfully", next);
  } catch (error) {
    return next(error);
  }
};
const logout = async (req, res, next) => {
  try {
    const options = {
      httpOnly: true,
      sameSite: "none", 
      secure:true,
      expires: new Date(0),
    };
    res.status(200)
    .cookie("token", "", options)
    .json({ success: true });
  } catch (error) {
    return next(error);
  }
};

export { login, register , logout };


