import express from "express";
import { createPost, deletePost, getPosts, updatePost } from "../controllers/postController.js";
import { isAuth } from "../middleware/authMiddleware.js";
import singleUpload from "../middleware/multer.js";
const router = express.Router();

router.post("/create",isAuth , singleUpload ,createPost);
router.get("/all", getPosts);
router.delete("/delete/:id", deletePost)
router.put("/update/:id", updatePost)

export default router;
