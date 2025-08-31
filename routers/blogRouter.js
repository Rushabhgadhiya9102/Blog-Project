import express from "express"
import imageUploads from "../middleware/imageUploads.js"
import { loginPage, loginProcess, registerProcess, registersPage } from "../controllers/authController.js"
import { aboutPage, addBlog, blogDetailsPage, createBlog, deleteBlog, editBlogPage, homepage, myArticlesPage, updateBlog } from "../controllers/blogController.js"
import { addComment, deleteComment, editCommentForm, updateComment } from "../controllers/commentController.js"
import { dislikeBlog, likeBlog } from "../controllers/likeDislikeController.js"
import { editProfilePage, logout, profilePage, updateProfile } from "../controllers/profileController.js"

const blogRouter = express.Router()

// ----------- login and register start ----------- //

blogRouter.get('/', loginPage)
blogRouter.get('/register', registersPage)
blogRouter.get('/login', loginPage) 

blogRouter.post('/register', registerProcess)
blogRouter.post('/login', loginProcess)

// ----------- login and register end ----------- //

// ----------- blog pages start ----------- //

blogRouter.get('/index',homepage)
blogRouter.get('/myArticles', myArticlesPage)
blogRouter.get('/addBlogs', addBlog)
blogRouter.get('/blogsDetails/:id', blogDetailsPage)
blogRouter.get('/about', aboutPage)

// ----------- blog pages end ----------- //

// ----------- blog process start ------------- //

blogRouter.post('/createblog',imageUploads, createBlog)
blogRouter.get('/myArticles/:id/delete', deleteBlog);
blogRouter.get("/myArticles/:id/edit", editBlogPage);
blogRouter.post("/myArticles/:id/edit",imageUploads , updateBlog);

// ----------- blog process end ------------- //

// ----------- comment process start ------------ //

blogRouter.post('/blogsDetails/:id/comments',addComment)
blogRouter.get('/comments/:id/delete', deleteComment)
blogRouter.get("/comments/:id/edit", editCommentForm);
blogRouter.post("/comments/:id/update", updateComment);

// ----------- comment process end ------------ //

// ----------- like and dislike process start ------------ //

blogRouter.post("/blogsDetails/:id/like", likeBlog);
blogRouter.post("/blogsDetails/:id/dislike", dislikeBlog);

// ----------- like and dislike process end ------------ //

// ---------------- profile process start -------------- //

blogRouter.get("/editProfile", profilePage);
blogRouter.get("/profile/edit", editProfilePage);
blogRouter.post("/profile/edit", updateProfile);
blogRouter.get("/logout", logout);

// ---------------- profile process end -------------- //

export default blogRouter