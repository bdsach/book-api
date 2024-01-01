-- Drop the existing "books" table if it exists
DROP TABLE IF EXISTS "books";

-- Create the "books" table
CREATE TABLE "books" (
    "id" INTEGER,
    "name" TEXT,
    "author" TEXT,
    "price" INTEGER,
    PRIMARY KEY ("id" AUTOINCREMENT)
);

-- Insert real book records
INSERT INTO "books" ("name", "author", "price") VALUES
    ('The Great Gatsby', 'F. Scott Fitzgerald', 15),
    ('To Kill a Mockingbird', 'Harper Lee', 20),
    ('1984', 'George Orwell', 18),
    ('The Catcher in the Rye', 'J.D. Salinger', 12),
    ('Pride and Prejudice', 'Jane Austen', 25);

