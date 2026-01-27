// express setup
import express from "express";
const app = express();
const PORT = process.env.PORT ?? 8000;

// router related
import feedRouter from "./src/routes/feed.routes.js";
import authRouter from "./src/routes/auth.routes.js";
import blogRouter from "./src/routes/blog.routes.js";

// middleware related
import { authUser } from "./src/middlewares/auth.middleware.js";

app.use(express.json()); // parses json request bodies -> js objects
app.use(authUser); // auth middleware

// default route
app.get("/", (req, res) => {
  return res.redirect("/feed");
});

// routes
app.use("/feed", feedRouter);
app.use("/auth", authRouter);
app.use("/blog", blogRouter);

app.listen(PORT, () => {
  console.log(`\nserver successfully listening @ http://localhost:${PORT}`);
});
