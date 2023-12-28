import { turso } from "../turso";

async function getAllBook(limit: number = 20) {
  try {
    const rs = await turso.execute({
      sql: "SELECT * FROM books LIMIT ?;",
      args: [ limit ],
    });

    return {
      status: "ok",
      data: rs.rows,
    }
  } catch (e) {
    console.error(e);
  }
}

async function getBookById(id: number) {
  try {
    const rs = await turso.execute({
      sql: "SELECT * FROM books WHERE id = ?;",
      args: [ id ],
    });

    if (rs.rows.length === 0) {
      return {
        status: "error",
        message: "Book not found",
      }
    }

    return {
      status: "ok",
      data: rs.rows,
    }

  } catch (error) {
    console.log(error);
    return {};
  }
}

async function addBook(book: Book) {
  try {
    if (!book.name || !book.author || !book.price) {
      throw new Error("All fields are required");
    }

    const rs = await turso.execute({
      sql: "INSERT INTO books (name, author, price) VALUES (?, ?, ?)",
      args: [book.name, book.author, book.price],
    });

    return {
      status: "ok",
      data: rs.rows,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
    };
  }
}

async function updateBook(id: number, book: Book) {
  if (!book.name || !book.author || !book.price) {
    throw new Error("All fields are required");
  }

  try {
    const rs = await turso.execute({
      sql: "UPDATE books SET name = ?, author = ?, price = ? WHERE id = ?",
      args: [book.name, book.author, book.price, id],
    });

    return {
      status: "ok",
      message: `Book with id ${id} updated`,
      data: rs.rows,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
    };
  }
}

async function deleteBook(id: number) {
  if (!id) {
    throw new Error("Id is required");
  }

  try {
    const findId = await turso.execute({
      sql: "SELECT * FROM books WHERE id = ?",
      args: [id],
    });
    
    if (findId.rows.length === 0) {
      return {
        message: "Book not found",
        status: "error",
      };
    }

    const rs = await turso.execute({
      sql: "DELETE FROM books WHERE id = ?",
      args: [id],
    });

    return {
      message: `Book with id ${id} deleted`,
      status: "ok",
      data: rs.rows,
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
