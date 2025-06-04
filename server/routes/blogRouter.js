import express from "express";
import { addBlog } from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import authMiddleware from "../middleware/auth.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single("image"), authMiddleware, addBlog);

export default blogRouter;