import getCurrentUser from "../middleware/getCurrentUser.js";
import BlogData from "../models/blogSchema.js";
import CommentData from "../models/commentSchema.js";
import UserData from "../models/userSchema.js";

// -------- render home page --------- //

export const homepage = async (req, res) => {
  const blogs =  await BlogData.find().sort({ createdAt: -1 }).populate('author')
  const users =  await UserData.find()
  return res.render("index", { page: "Home", blogs, users });
};

// -------- render my articles page --------- //

export const myArticlesPage = async (req,res) => {
  const user = await getCurrentUser(req);
  const blogs =  await BlogData.find({author:user._id})
  return res.render('pages/myArticles', {page:"myarticles", blogs})
}

// -------- render form page --------- //

export const addBlog = (req,res) => {
  return res.render('pages/addBlogs', {page:"addBlog", blog:null})
}

// -------- render blog details page ------------ //

export const blogDetailsPage = async (req,res) =>{

  try {
    
    const blog = await BlogData.findById(req.params.id).populate("author")
    const comments = await CommentData.find({blog:blog._id}).populate("author")
    res.render('pages/blogsDetails', {page:"blogDetails", blog, comments, comment: null ,author: req.user || null})

  } catch (error) {
    console.log(error.message);

  }
}

// ---------- render about page --------- //

export const aboutPage = async (req,res)=>{
  const user = await getCurrentUser(req);
  const blogs =  await BlogData.find({author:user._id})
  return res.render('pages/about', {page:"about", blogs, user})
}

// --------- create blog start ---------- //

export const createBlog = async (req, res) =>{

  try {
    const user = await getCurrentUser(req);
    const blog = {
      ...req.body,
      blogImage: req.file ? `/uploads/${req.file.filename}` : null,
      author: user._id
    };

    await BlogData.create(blog)
    console.log('Content Added Successfully');
    res.redirect('/myArticles')

  } catch (error) {
    console.log(error.message);

  }

}

// --------- create blog end ---------- //

// --------- delete blog start ---------- //

export const deleteBlog = async (req, res) => {
  try {
    const user = await getCurrentUser(req);
    const blog = await BlogData.findById(req.params.id);

    if (blog.author.toString() !== user._id.toString()) {
      console.log("not allowed to delete");
      
    }

    await BlogData.findByIdAndDelete(req.params.id);
    res.redirect("/myArticles");

  } catch (error) {
    console.error("Error deleting blog:", error);

  }
};

// --------- delete blog end ---------- //

// --------- edit blog start ---------- //

export const editBlogPage = async (req, res) => {
  const blog = await BlogData.findById(req.params.id);
  res.render("pages/addBlogs", {page:"blogDetails", blog });
};


export const updateBlog = async (req, res) => {
  try {
    const user = await getCurrentUser(req);
    const blog = await BlogData.findById(req.params.id);

    if (!blog) return res.status(404).send("Blog not found");

    if (blog.author.toString() !== user._id.toString()) {
      return res.status(403).send("Not allowed to update this blog");
    }

    blog.blogName = req.body.blogName;
    blog.category = req.body.category;
    blog.blogContent = req.body.blogContent;

    if (req.file) {
      blog.blogImage = "/uploads/" + req.file.filename;
    }

    await blog.save();
    res.redirect("/myArticles");
  } catch (err) {
    console.error("Error updating blog:", err);
  }
};


// --------- edit blog end ---------- //