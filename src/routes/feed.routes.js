import express from "express";

// router related
const router = express.Router();

// controllers
import { showFeedForUser } from "../controllers/feed.controler.js";

// all feed related routers
router.get("/", showFeedForUser);

export default router;
