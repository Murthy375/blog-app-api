// express server setup
import express from "express";
const app = express();
const PORT = process.env.PORT ?? 8000;

// router related
import feedRouter from "./src/routes/feed.routes.js";
import userRouter from "./src/routes/user.routes.js";

// middleware related
app.use(express.json());

app.get("/", (req, res) => {
  return res.redirect("/feed");
});

// feed router
app.use("/feed", feedRouter);

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`\nserver successfully listening @ http://localhost:${PORT}`);
});
