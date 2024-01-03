import { Elysia } from "elysia";
import { logger } from "@grotto/logysia";
import bookRoutes from "./routes/Book";
import userRoute from "./routes/User";

const app = new Elysia();
app
  .use(logger())
  .use(bookRoutes)
  .use(userRoute)
  .get("/test", () => {
    return {
      message: "Hello",
    };
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
