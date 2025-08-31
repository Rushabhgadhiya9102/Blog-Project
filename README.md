# MyBlog-project

MyBlog-project is a personal blogging platform built with Node.js, Express, and MongoDB. It allows users to register, log in, create, edit, and delete their blog posts, as well as comment on other users' posts. Users can also like and dislike blog posts and manage their profiles.

## Demo

Experience the application live: [Blog-Project](https://blog-project-9q0l.onrender.com)

## Features

*   **User Authentication:**
    *   User registration with password hashing.
    *   User login and session management using cookies.
    *   Logout functionality.
*   **Blog Management:**
    *   Create new blog posts with a title, category, content, and optional image.
    *   View all blog posts on the homepage, sorted by creation date.
    *   View individual blog post details.
    *   Manage "My Articles" page to view and edit/delete personal posts.
    *   Edit existing blog posts, including updating content and images.
    *   Delete blog posts (only by the author).
*   **Interaction:**
    *   Add comments to blog posts.
    *   Edit and delete comments (only by the comment author).
    *   Like and dislike blog posts.
*   **User Profile:**
    *   View and edit user profile information (username, email, bio).
*   **Database:**
    *   MongoDB for data storage.
    *   Mongoose for MongoDB object modeling.

## Technologies Used

*   **Backend:**
    *   Node.js
    *   Express.js
    *   MongoDB
    *   Mongoose
    *   Bcrypt (for password hashing)
    *   Multer (for handling file uploads)
    *   Cookie-parser (for parsing cookies)
*   **Templating:**
    *   EJS (Embedded JavaScript templates)
*   **Development Tools:**
    *   Nodemon (for automatic server restarts during development)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (LTS version recommended)
*   MongoDB (local installation or a cloud-hosted service like MongoDB Atlas)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/MyBlog-project.git
    cd MyBlog-project
    ```

2.  **Install NPM dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project based on the `.envExample` file.

    ```
    # .envExample content (copy this to your .env file)
    MONGO_URL=your_mongodb_connection_string
    PORT=3000
    ```

    Replace `your_mongodb_connection_string` with your actual MongoDB connection string (e.g., `mongodb://localhost:27017/myblog` for local or your MongoDB Atlas URI).

### Running the Application

1.  **Start the MongoDB server** (if running locally).

2.  **Start the Node.js application:**

    ```bash
    npm start
    ```

    The application will typically run on `http://localhost:3000` (or the `PORT` you specified in your `.env` file).

## Project Structure

```
MyBlog-project/
├── configs/
│   └── database.js             # Database connection setup
├── controllers/
│   ├── authController.js       # User authentication logic (register, login)
│   ├── blogController.js       # Blog post management logic (CRUD, homepage)
│   ├── commentController.js    # Comment management logic (add, edit, delete)
│   ├── likeDislikeController.js# Like/dislike functionality for blogs
│   └── profileController.js    # User profile management
├── middleware/
│   ├── attachUser.js           # Attaches current user to request object
│   ├── getCurrentUser.js       # Retrieves current user from database
│   └── imageUploads.js         # Multer configuration for image uploads
├── models/
│   ├── blogSchema.js           # Mongoose schema for blog posts
│   ├── commentSchema.js        # Mongoose schema for comments
│   └── userSchema.js           # Mongoose schema for users
├── public/                     # Static assets (CSS, JS, images)
├── uploads/                    # Directory for uploaded blog images
├── views/                      # EJS template files
│   ├── layouts/
│   └── pages/
├── .envExample                 # Example environment variables file
├── .gitignore                  # Git ignore rules
├── package.json                # Project dependencies and scripts
├── server.js                   # Main application entry point
└── README.md                   # Project README
```

## API Endpoints (Implicit from Controllers)

While not a formal REST API documentation, the controllers expose the following functionalities:

*   **Authentication:**
    *   `GET /register`
    *   `POST /register`
    *   `GET /login`
    *   `POST /login`
    *   `GET /logout`
*   **Blogs:**
    *   `GET /` (homepage)
    *   `GET /myArticles`
    *   `GET /addBlog`
    *   `POST /addBlog`
    *   `GET /blogsDetails/:id`
    *   `GET /editBlog/:id`
    *   `POST /editBlog/:id`
    *   `GET /deleteBlog/:id`
    *   `GET /like/:id`
    *   `GET /dislike/:id`
*   **Comments:**
    *   `POST /addComment/:id`
    *   `GET /deleteComment/:id`
    *   `GET /editComment/:id`
    *   `POST /editComment/:id`
*   **Profile:**
    *   `GET /about`
    *   `GET /editProfile`
    *   `POST /editProfile`

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## License

This project is open-source and available under the [MIT License](LICENSE).
