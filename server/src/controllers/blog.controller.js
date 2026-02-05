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
  const [blogInfo] = await db
    .insert(blogsTable)
    .values({
      userId: req.user.id,
      title: title,
      content: content,
      tags: tags,
    })
    .returning({
      id: blogsTable.id,
    });

  if (!blogInfo) {
    return res.status(500).json({ error: "internal server error" });
  }

  return res.status(201).json({ message: `blog post created` });
};

export const deleteBlogPost = async function (req, res) {
  // deletes a specific blog post //

  const [deletedBlog] = await db
    .delete(blogsTable)
    .where(eq(blogsTable.id, req.blog.id))
    .returning({
      title: blogsTable.title,
    });

  return res.status(200).json({ message: `blog deleted` });
};

export const editBlogPost = async function (req, res) {
  // author can edit blog //

  const { title, content, tags, } = req.body;

  if (!title || !content) {
    return res.status(409).json({ error: "invalid data" });
  }

  const [blogPost] = await db
    .update(blogsTable)
    .set({
      title: title,
      content: content,
      tags: tags,
    })
    .where(eq(blogsTable.id, req.blog.id))
    .returning({
      title: blogsTable.title,
      content: blogsTable.content,
      tags: blogsTable.tags,
    });

  return res.status(200).json({ data: blogPost });
};
