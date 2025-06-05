import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";

export const adminLogin = (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.error("Error in adminLogin:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res
      .status(200)
      .json({ success: true, blogs, message: "Blogs fetched successfully" });
  } catch (error) {
    console.error("Error in getAllBlogsAdmin:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("blog", null, "Blog") 
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      comments,
      message: "Comments fetched successfully",
    });
  } catch (error) {
    console.error("Error in getAllComments:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments({});
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });

    const dashboardData = {
      blogs,
      comments,
      drafts,
      recentBlogs,
    };

    res.status(200).json({
      success: true,
      dashboardData,
      message: "Dashboard data fetched successfully",
    });
  } catch (error) {
    console.error("Error in getDashboard:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error in deleteCommentById:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndUpdate(id, { isApproved: true });
    res
      .status(200)
      .json({ success: true, message: "Comment approved successfully" });
  } catch (error) {
    console.error("Error in approveCommentById:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
