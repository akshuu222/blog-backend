import express from "express";
import { config } from "dotenv";
config()
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import cloudinary from "cloudinary";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/posts.js";
import connectDb from "./config/db.js";
import errorMiddleWare from "./middleware/errorMiddleware.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

process.on("uncaughtException", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`The Server Is Shutting Down Due To Uncaught Exception`);
  process.exit(1);
});
connectDb();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const PORT = process.env.NODE_PORT;
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors({ origin: ["http://localhost:3000" , "https://myblog-gb42.onrender.com"], credentials: true }));

app.use("/api/users", userRoute);
app.use("/api/post", postRoute);


app.use(errorMiddleWare);
const server = app.listen(PORT, () => {
  console.log(`Server Running on port : ${PORT} `);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`The Server Is Shutting Down Due To Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
