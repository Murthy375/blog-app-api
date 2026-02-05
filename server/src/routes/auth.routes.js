import express from "express";

// router related
const router = express.Router();

// controllers
import { registerUser, loginUser } from "../controllers/auth.controller.js";

// all auth related routes
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
