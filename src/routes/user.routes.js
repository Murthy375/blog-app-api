import express from "express";

// router related
const router = express.Router();

// controllers related
import { showUserProfile } from "../controllers/user.controller.js";

// all user related routes
router.get("/profile", showUserProfile);

export default router