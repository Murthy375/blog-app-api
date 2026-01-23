// express setup
import express from "express";
const app = express();
const PORT = process.env.PORT ?? 8000;

// router related
import feedRouter from "./src/routes/feed.routes.js";


app.get("/", (req, res) => {
  return res.redirect("http://localhost:8000/feed");
});

// feed router
app.use("/feed", feedRouter);

app.listen(PORT, () => {
  console.log(`\nserver successfully listening @ http://localhost:${PORT}`);
});
