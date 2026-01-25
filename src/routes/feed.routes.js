import express from "express";

// router related
const router = express.Router();

// controllers
import { showFeedForUser } from "../controllers/feed.controller.js";    

// all feed related routers
router.get("/", showFeedForUser);

export default router;
