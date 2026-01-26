import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { usersTable } from "./user.model.js";

export const blogsTable = pgTable("blogs", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid()
    .references(() => usersTable.id)
    .notNull(),
  createdAt: timestamp({ withTimezone: true, precision: 6 }).defaultNow(),
  title: varchar({ length: 256 }).notNull(),
  content: text().notNull(),
  tags: text()
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  updatedAt: timestamp({ withTimezone: true, precision: 6 }).defaultNow(),
});
