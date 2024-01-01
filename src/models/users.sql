-- Drop the existing "users" table if it exists
DROP TABLE IF EXISTS "users";

-- Create the "users" table with "firstname" and "lastname"
CREATE TABLE "users" (
    "id" INTEGER,
    "firstname" TEXT,
    "lastname" TEXT,
    "email" TEXT UNIQUE,
    "password" TEXT,
    PRIMARY KEY("id" AUTOINCREMENT)
);