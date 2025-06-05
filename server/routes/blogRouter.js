import express from "express";
import {
  addBlog,
  addComment,
  deleteBlogById,
  generateContent,
  getAllBlogs,
  getBlogById,
  getBlogComments,
  togglePublish,
} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import authMiddleware from "../middleware/auth.js";

const blogRouter = express.Router();

blogRouter.get("/all", getAllBlogs);
blogRouter.post("/add", upload.single("image"), authMiddleware, addBlog);
blogRouter.post("/delete", authMiddleware, deleteBlogById);
blogRouter.post("/toggle-publish", authMiddleware, togglePublish);
blogRouter.post("/add-comment", addComment);
blogRouter.post("/comments", getBlogComments);

blogRouter.post("/generate", authMiddleware, generateContent);

blogRouter.get("/comments", (req, res) => {
  res.status(400).json({
    success: false,
    message: "Please use POST method for retrieving comments",
  });
});

blogRouter.get("/:blogId", getBlogById);

export default blogRouter;
