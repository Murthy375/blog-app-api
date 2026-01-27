import express from "express";

// router related
const router = express.Router();

// controllers
import { createBlogPost } from "../controllers/blog.controller.js";

// auth related
import { ensureUserIsAuth } from "../middlewares/auth.middleware.js";

router.use(ensureUserIsAuth); // make sure the user is authenticated

// all blog related routes
router.post("/", createBlogPost);

export default router;
