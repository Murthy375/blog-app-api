import express from "express";

// router related
const router = express.Router();

// controllers related
import {
  showUserProfile,
  deleteUserAccount,
} from "../controllers/user.controller.js";

// all user related routes
router.get("/profile", showUserProfile);
router.delete("/account", deleteUserAccount);

export default router;
