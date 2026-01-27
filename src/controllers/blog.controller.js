// db related
import db from "../db/index.js";
import { blogsTable } from "../models/blog.model.js";
import { eq } from "drizzle-orm";

// logic
export const createBlogPost = async function (req, res) {
  // creates a blog post //

  const { title, content, tags } = req.body;

  if (!title || !content) {
    // if the client does not send title or content
    return res.status(400).json({ error: `bad request: invalid response` });
  }

  // insert the new blog in db
  await db.insert(blogsTable).values({
    userId: req.user.id,
    title: title,
    content: content,
    tags: tags,
  });

  return res.status(201).json({ message: `blog post created` });
};
