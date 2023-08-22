import mongoose from "mongoose";
// import cloudinary from "cloudinary"

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Enter Title"],
    },
    summary: {
      type: String,
      required: [true, "Please Enter Summary"],
    },
    imageURL: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    content: {
      type: String,
      required: [true, "Please Enter Content"],
    },
    user:{
      required:true,
      type:mongoose.Types.ObjectId,
      ref:"users"
    }
  },
  {
    timestamps: true,
  }
);

const Posts = mongoose.model("posts", postSchema);
export default Posts;
