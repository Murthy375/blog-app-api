// express setup
import express from "express";
const app = express();
const PORT = process.env.PORT ?? 8000;

// router related
import feedRouter from "./src/routes/feed.routes.js";
import authRouter from "./src/routes/auth.routes.js";
import blogRouter from "./src/routes/blog.routes.js";
import userRouter from "./src/routes/user.routes.js";

// middleware related
import { authUser } from "./src/middlewares/auth.middleware.js";

app.use(express.json()); // parses json request bodies -> js objects

// default route
app.get("/api/", (req, res) => {
  return res.redirect("/api/feed");
});

// routes
// public
app.use("/api/feed", feedRouter);
app.use("api/auth", authRouter);

// protected
app.use("/blog", authUser, blogRouter);
app.use("/user", authUser, userRouter);

app.listen(PORT, () => {
  console.log(`\nserver successfully listening @ http://localhost:${PORT}\n`);
});
