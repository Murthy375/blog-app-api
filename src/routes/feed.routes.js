import express from "express";

// router related
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({ message: "all blogs on the platform go here" });
});

export default router;
