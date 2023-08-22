import Posts from "../models/postModel.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "cloudinary";

const createPost = async (req, res, next) => {
  try {
    const { title, summary, content } = req.body;
    const file = req.file;
    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
      folder: "posts",
    });
    const post2 = await Posts.create({
      title,
      summary,
      content,
      user: req.user._id,
      imageURL: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
    const post = await Posts.findById(post2._id).populate("user");
    res.status(201).json({ message: true, post });
  } catch (error) {
    next(error);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const posts = await Posts.find({}).populate("user");
    res.status(200).json({ message: true, posts });
  } catch (error) {
    next(error);
  }
};
const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id);
    await cloudinary.v2.uploader.destroy(post.imageURL.public_id);
    await Posts.deleteOne({ _id: id });
    res.status(200).json({ message: true });
  } catch (error) {
    next(error);
  }
};
const updatePost = async (req, res, next) => {
  try {
    const { title, summary, content } = req.body;
    const { id } = req.params;
    const post = await Posts.findById(id);
    post.title = title;
    post.summary = summary;
    post.content = content;
    if (req.body.file) {
      await cloudinary.v2.uploader.destroy(post.imageURL.public_id);
      const myCloud = await cloudinary.v2.uploader.upload(req.body.file, {
        folder: "posts",
      });
      post.imageURL.public_id = myCloud.public_id;
      post.imageURL.url = myCloud.secure_url;
    }
    await post.save();
    const newpost = await Posts.findById(id).populate("user");
    res.status(200).json({ message: true, newpost });
  } catch (error) {
    next(error);
  }
};

export { createPost, getPosts, deletePost, updatePost };
