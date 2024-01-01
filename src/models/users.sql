-- Drop the existing "users" table if it exists
DROP TABLE IF EXISTS "users";

-- Create the "users" table with "first_name" and "last_name"
CREATE TABLE "users" (
    "id" INTEGER,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT UNIQUE,
    "password" TEXT,
    PRIMARY KEY("id" AUTOINCREMENT)
);