// db related
import db from "../db/index.js";
import { usersTable } from "../models/user.model.js";
import { blogsTable } from "../models/blog.model.js";
import { eq } from "drizzle-orm";

export const showFeedForUser = async function (req, res) {
  // shows feed to anyone who comes into the websiete //

  const feed = await db
    .select({
      createdAt: blogsTable.createdAt,
      title: blogsTable.title,
      tags: blogsTable.tags,
      content: blogsTable.content,
      // author info
      fname: usersTable.fname,
      mname: usersTable.mname,
      lname: usersTable.lname,
      usersName: usersTable.name,
    })
    .from(blogsTable)
    .innerJoin(usersTable, eq(blogsTable.userId, usersTable.id));

  return res.status(200).json({ data: feed });
};
