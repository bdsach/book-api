import { Database } from "bun:sqlite";
const db = new Database("mydb.sqlite");

function getAllBook(limit: number = 100) {
  try {
    const query = db.query("SELECT * from books LIMIT $limit;");
    return query.all({ $limit: limit });
  } catch (error) {
    console.log(error);
  }
}

function getBookById(id: number) {
  try {
    const query = db.query("SELECT * from books WHERE id=$id;");
    return query.get({
      $id: id,
    });
  } catch (error) {
    console.log(error);
    return {};
  }
}

function addBook(book: Book) {
  try {
    if (!book.name || !book.author || !book.price) {
      throw new Error("All fields are required");
    }

    const query = db.query(`INSERT INTO books 
          (name, author, price) 
          VALUES ($name, $author, $price);`);
    query.run({
      $name: book.name,
      $author: book.author,
      $price: book.price,
    });
    return {
      status: "ok",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
    };
  }
}

function updateBook(id: number, book: Book) {
  if (!book.name || !book.author || !book.price) {
    throw new Error("All fields are required");
  }

  try {
    const query = db.query(`UPDATE books 
          SET name=$name, author=$author, price=$price 
          WHERE id=$id;`);
    query.run({
      $id: id,
      $name: book.name,
      $author: book.author,
      $price: book.price,
    });
    return {
      status: "ok",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
    };
  }
}

function deleteBook(id: number) {
  if (!id) {
    throw new Error("Id is required");
  }

  try {
    const findId = db.query(`SELECT * FROM books WHERE id=$id;`);
    findId.run({
      $id: id,
    });

    if (!findId.get({ $id: id })) {
      return {
        message: "Book not found",
        status: "error",
      };
    }

    const query = db.query(`DELETE FROM books WHERE id=$id;`);
    query.run({
      $id: id,
    });

    return {
      message: `Book with id ${id} deleted`,
      status: "ok",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Something went wrong",
      status: "error",
    };
  }
}

export { getAllBook, getBookById, addBook, updateBook, deleteBook };
