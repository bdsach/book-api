import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { cookie } from "@elysiajs/cookie";
import {
  getAllBook,
  addBook,
  getBookById,
  updateBook,
  deleteBook,
} from "../models/Book";

const bookRoutes = new Elysia();

bookRoutes
  .use(
    jwt({
      name: "jwt",
      secret: String(process.env.JWT_SECRETS),
    })
  )
  .use(cookie())

  /**
   * Get All Books
   */
  .get("/books", async ({ jwt, cookie: { token }, set }) => {
    const profile = await jwt.verify(token);
    if (!profile) {
      console.log("Unauthorized");
      set.status = 401;
      return {
        status: "error",
        message: "Unauthorized",
      };
    }

    return getAllBook();
  })
  .get("/book/:id", async ({ params, jwt, cookie: { token }, set }) => {
    const profile = await jwt.verify(token);
    if (!profile) {
      return {
        status: "error",
        message: "Unauthorized",
      };
    }

    return getBookById(parseInt(params.id));
  })

  /**
   * Add Book
   */
  .post(
    "/books",
    async ({ jwt, cookie: { token }, set, body }) => {
      const profile = await jwt.verify(token);

      if (!profile) {
        set.status = 401;
        return {
          status: "error",
          message: "Unauthorized",
        };
      }

      const bookData = body;
      const response = addBook({
        name: bookData.name,
        author: bookData.author,
        price: bookData.price,
      });

      if (response.status === "error") {
        set.status = 409;
        return { message: "Insertion failed" };
      }

      set.status = 201;
      return { message: "Insertion successful" };
    },
    {
      body: t.Object({
        name: t.String(),
        author: t.String(),
        price: t.Number(),
      }),
    }
  )

  /**
   * Update Book
   */
  .put("/books/:id", ({ params, body, set }) => {
    const bookData: any = body;
    const bookId: number = parseInt(params.id);
    const response = updateBook(bookId, {
      name: bookData.name,
      author: bookData.author,
      price: bookData.price,
    });

    if (response.status === "error") {
      set.status = 409;
      return { message: "Update failed" };
    }

    set.status = 201;
    return { message: "Update successful" };
  })

  /**
   * DELETE BOOK
   */
  .delete("/books/:id", ({ params, set }) => {
    const bookId: number = parseInt(params.id);
    const response = deleteBook(bookId);

    if (response.status === "error") {
      set.status = 409;
    }

    return response;
  });

export default bookRoutes;
