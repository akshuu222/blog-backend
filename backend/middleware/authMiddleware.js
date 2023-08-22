import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/userModels.js";

const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token)
      return next(new ErrorHandler("Please Login To Excess The Resource", 401));
    const decodedid = jwt.verify(token, process.env.JWT_PASS);
    req.user = await User.findById(decodedid._id);
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { isAuth };
