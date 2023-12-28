import { createClient } from "@libsql/client/web";

const tursoUrl = String(import.meta.env.TURSO_DATABASE_URL);

export const turso = createClient({
  url: tursoUrl,
  authToken: import.meta.env.TURSO_AUTH_TOKEN,
});
