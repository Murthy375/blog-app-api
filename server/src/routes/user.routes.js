import express from "express";

// router related
const router = express.Router();

// controllers related
import {
  showUserProfile,
  deleteUserAccount,
  editUserProfile,
  showUserDashboard,
} from "../controllers/user.controller.js";

// all user related routes
router.get("/profile", showUserProfile);
router.delete("/account", deleteUserAccount);
router.patch("/edit", editUserProfile);
router.get("/dashboard", showUserDashboard);

export default router;
