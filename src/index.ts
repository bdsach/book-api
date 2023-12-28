import { Elysia } from "elysia";
import bookRoutes from "./routes/Book";
import userRoute from "./routes/User";

const app = new Elysia();
app.use(bookRoutes).use(userRoute).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
