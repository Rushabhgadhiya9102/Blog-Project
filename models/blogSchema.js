import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({

    blogName: {
        type: String,
        require: true
    },
    category: {
        type:String,
        require: true
    },
    blogContent: {
        type: String,
        require: true
    },
    blogImage: {
        type: String,
        require: true
    },

    likes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "UserData" 
    }],

    dislikes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "UserData" 
    }],

    author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserData"
  }
}, 
{
    timestamps: true
})

const BlogData = mongoose.model('BlogData', blogSchema)
export default BlogData