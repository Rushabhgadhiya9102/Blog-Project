import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    reviews: {
      type: String,
      trim: true,
      required: true,
    },

    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogData",
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserData",
      required: true,
    }
  },

  {
    timestamps: true,
  }
  
);

const CommentData = mongoose.model("CommentData", commentSchema);
export default CommentData;