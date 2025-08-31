// -------------- comment post process start ------------ //

import CommentData from "../models/commentSchema.js";

export const addComment = async (req, res) => {
  try {

    const { reviews } = req.body;
    await CommentData.create({

      reviews,
      blog: req.params.id,  
      author: req.user._id  

    });

    res.redirect(`/blogsDetails/${req.params.id}`);
  } catch (error) {
    console.log(error.message);
   
  }
};

// -------------- comment post process end ------------ //

// -------------- comment delete process start ------------ //

export const deleteComment = async (req, res) => {
  try {
    const comment = await CommentData.findById(req.params.id);

    if (!comment) {
      return console.log("Comment not found");
    }

    
    if (comment.author.toString() !== req.user._id.toString()) {
      return console.log ("Not allowed");
    }

    await CommentData.findByIdAndDelete(req.params.id);
    res.redirect(`/blogDetails/${comment.blog}`);

  } catch (error) {
    console.error("Error deleting comment:", error);

  }
};


// -------------- comment delete process end ------------ //
// -------------- comment edit process start ------------ //

export const editCommentForm = async (req, res) => {
  try {
    const comment = await CommentData.findById(req.params.id).populate("blog");
    if (!comment) return console.log("Comment not found");

    if (comment.author.toString() !== req.user._id.toString()) {
      return console.log("Not allowed");
    }

    const comments = await CommentData.find({ blog: comment.blog._id })
      .populate("author");

    res.render("pages/blogsDetails", {
      page: "blogsDetails",
      blog: comment.blog,
      comments,       
      comment: comment,
      author: req.user
    });
  } catch (error) {
    console.error("Error loading edit form:", error);
    
  }
};

export const updateComment = async (req, res) => {
  try {
    const comment = await CommentData.findById(req.params.id);

    if (!comment) {
      return console.log("Comment not found");
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return console.log("Not allowed");
    }

    await CommentData.findByIdAndUpdate(
      req.params.id,
      { reviews: req.body.reviews },
      { new: true, runValidators: true }
    );

    res.redirect(`/blogsDetails/${comment.blog}`);
  } catch (error) {
    console.error("Error updating comment:", error);

  }
};


// -------------- comment edit process end ------------ //