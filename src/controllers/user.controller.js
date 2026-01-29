// db related
import db from "../db/index.js";
import { usersTable } from "../models/user.model.js";
import { eq } from "drizzle-orm";

// logic
export const showUserProfile = async function (req, res) {
  const [userInfo] = await db
    .select({
      email: usersTable.email,
      name: usersTable.name,
      fname: usersTable.fname,
      mname: usersTable.mname,
      lname: usersTable.lname,
      joinedOn: usersTable.joinedOn,
    })
    .from(usersTable)
    .where(eq(usersTable.id, req.user.id));

  if (!userInfo) {
    return res.status(404).json({ error: `user details not found` });
  }

  return res.status(200).json({ data: userInfo });
};

export const deleteUserAccount = async function (req, res) {
  // account deletion with authorization //

  const [deletedUser] = await db
    .delete(usersTable)
    .where(eq(usersTable.id, req.user.id))
    .returning({
      name: usersTable.name,
    });

  if (!deletedUser) {
    return res.status(404).json({ error: "user not found" });
  }

  return res
    .status(200)
    .json({ message: `account deleted successfully`, data: deletedUser.name });
};
