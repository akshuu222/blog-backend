import ErrorHandler from "../utils/errorHandler.js";

const errorMiddleWare = (err, req, res, next) => {

  console.log(err.message);

  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    const message = `Resource Not Found Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code === "jsonWebTokenError") {
    const message = `Json Web Token Is Invalid ,Try Again`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code === "TokenExpiredError") {
    const message = `Json Web Token Is Expired ,Try Again`;
    err = new ErrorHandler(message, 400);
  }

  res
    .status(err.statusCode)
    .json({ success: false, message: err.message, stack: err.stack });
};

export default errorMiddleWare;
