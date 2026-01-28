import express from "express";

// router related
const router = express.Router();

// controllers
import {
  createBlogPost,
  deleteBlogPost,
} from "../controllers/blog.controller.js";

// blog related middleware
import { checkBlogBelongsToUser } from "../middlewares/blog.middleware.js";
router.use(checkBlogBelongsToUser); // checks if blog belongs to user

// all blog related routes
router.post("/", createBlogPost);
router.delete("/", deleteBlogPost);

export default router;
