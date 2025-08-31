
import BlogData from "../models/blogSchema.js";

// --------------- blog like process ----------------- //

export const likeBlog = async (req, res) => {
  try {
    const blog = await BlogData.findById(req.params.id);

    blog.dislikes = blog.dislikes.filter(
      (id) => id.toString() !== req.user._id.toString()
    );

    if (blog.likes.includes(req.user._id)) {

      blog.likes = blog.likes.filter(
        (id) => id.toString() !== req.user._id.toString()
      );

    } else {
      blog.likes.push(req.user._id);

    }

    await blog.save();
    res.redirect(`/blogsDetails/${req.params.id}`);

  } catch (error) {
    console.log(error.message);
    
  }
};

// ------------- blog dislike process -------------- //

export const dislikeBlog = async (req, res) => {
  try {
    const blog = await BlogData.findById(req.params.id);

    blog.likes = blog.likes.filter(
      (id) => id.toString() !== req.user._id.toString()
    );

    if (blog.dislikes.includes(req.user._id)) {
      blog.dislikes = blog.dislikes.filter(
        (id) => id.toString() !== req.user._id.toString()
      );
    } else {
      blog.dislikes.push(req.user._id);
    }

    await blog.save();
    res.redirect(`/blogsDetails/${req.params.id}`);

  } catch (error) {
    console.log(error.message);

  }
};
