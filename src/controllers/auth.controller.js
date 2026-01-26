// db related
import db from "../db/index.js";
import { usersTable } from "../models/user.model.js";
import { eq } from "drizzle-orm";

// crypto related(for passward)
import { randomBytes, createHmac } from "node:crypto";

// jwt related
import jwt from "jsonwebtoken";

// logic
export const registerUser = async function (req, res) {
  // registers new user //

  const { fname, mname, lname, name, email, password } = req.body;

  if (!fname || !name || !email || !password?.trim()) {
    return res.status(400).json({ error: "bad request: invalid credentials" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "bad request: password must be atleast 6 charecters" });
  }

  // check if user already exists in db(blog-app)
  const [existingUser] = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (existingUser) {
    return res.status(409).json({
      error: `user with id ${existingUser.id} under user name ${existingUser.name} already exists, log-in`,
      redirect: "/user/login",
    });
  }

  // creating the salt for hashing the password
  const salt = randomBytes(256).toString("hex");

  // hashing the user-provieded password
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  // add new user in db
  const [userInfo] = await db
    .insert(usersTable)
    .values({
      fname: fname,
      mname: mname,
      lname: lname,
      name: name,
      email: email,
      password: hashedPassword,
      salt: salt,
    })
    .returning({
      id: usersTable.id,
    });

  return res.status(201).json({ data: userInfo.id });
};

export const loginUser = async function (req, res) {
  // logs-in user //

  const { email, password } = req.body;

  if (!email || !password?.trim()) {
    return res.status(400).json({ error: "bad request: invalid credentials" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "bad request: password must be atleast 6 charecters" });
  }

  const [existingUser] = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      joinedOn: usersTable.joinedOn,
      salt: usersTable.salt,
      password: usersTable.password,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (!existingUser) {
    return res.status(409).json({
      error: `user with email ${existingUser.email} does not exist, register before logging-in`,
      redirect: "/user/login",
    });
  }

  // hash the user-provided password using the salt which is saved in
  const newHashedPassword = createHmac("sha256", existingUser.salt)
    .update(password)
    .digest("hex");

  if (newHashedPassword !== existingUser.password) {
    return res.status(401).json({ error: `incorrect passsword` });
  }

  // payload fof creating a jwt-token
  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    joinedOn: existingUser.joinedOn,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "60m",
  });

  return res
    .status(200)
    .json({ status: "success", message: `log-in successful`, token: token });
};
