// db related
import db from "../db/index.js";
import { blogsTable } from "../models/blog.model.js";
import { eq } from "drizzle-orm";

export const checkBlogBelongsToUser = async function (req, res, next) {
  // authorizes user to edit and delete existing blog post //
  try {
    // check if blog is exists + user is the owner of that blog //
    const blogId = req.headers["blogid"];

    if (!blogId) return next(); // if the blog id is not there

    

    // for seeing if blog is there or not
    const [blog] = await db
      .select()
      .from(blogsTable)
      .where(eq(blogsTable.id, blogId));

      if (!blog) {
      // if there is no blog
      return res.status(404).json({ error: "not found: blog not found" });
    }

    if (blog.userId !== req.user.id) {
      // check if the blog blelongs to user
      return res
        .status(401)
        .json({ error: `forbidden: can't access this blog` });
    }

    req.blog = blog;
    
    next();
  } catch (error) {
    next();
  }
};
