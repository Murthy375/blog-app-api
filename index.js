const express = require("express");
const app = express();
const PORT = process.env.PORT ?? 8000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "server running successfully!" });
});

app.listen(PORT, () => {
  console.log(`server successfully listening @ http://localhost:${PORT}`);
});
