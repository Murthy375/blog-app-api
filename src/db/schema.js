import { uuid, pgTable, varchar, text, date } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  email: varchar({ length: 256 }).notNull().unique(),
  name: varchar({ length: 256 }).notNull().unique(),
  password: text().notNull(),
  fname: varchar({ length: 256 }).notNull(),
  mname: varchar({ length: 256 }).notNull(),
  lname: varchar({ length: 256 }).notNull(),
  joinedOn: date().notNull(),
  salt: text().notNull(),
});
