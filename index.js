// express setup
import express from "express";
const app = express();
const PORT = process.env.PORT ?? 8000;

// router related
import feedRouter from "./src/routes/feed.routes.js";
import authRouter from "./src/routes/auth.routes.js";

// middleware related
app.use(express.json());

app.get("/", (req, res) => {
  return res.redirect("/feed");
});

// routes
app.use("/feed", feedRouter);
app.use("/auth", authRouter);


app.listen(PORT, () => {
  console.log(`\nserver successfully listening @ http://localhost:${PORT}`);
});
