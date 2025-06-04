import express from "express";
import {
  adminLogin,
  approveCommentById,
  deleteCommentById,
  getAllBlogsAdmin,
  getAllComments,
  getDashboard,
} from "../controllers/adminController.js";
import authMiddleware from "../middleware/auth.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/comments", authMiddleware, getAllComments);
adminRouter.get("/blogs", authMiddleware, getAllBlogsAdmin);
adminRouter.post("/delete-comment", authMiddleware, deleteCommentById);
adminRouter.post("/approve-comment", authMiddleware, approveCommentById);
adminRouter.get("/dashboard", authMiddleware, getDashboard);

export default adminRouter;
