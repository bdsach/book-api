import { turso } from "../turso";

async function addUser(user: User) {
  try {
    const rs = await turso.execute({
      sql: "insert into users (email, password) values (?, ?)",
      args: [ user.email, user.password ],
    });
    return {
      status: "ok",
      data: rs.rows,
      message: "User created",
    }
  } catch (e) {
    console.error(e);
  }
}

async function checkUserLogin(user: User) {
  try {
    const query = await turso.execute({
      sql: "select * from users where email = ?",
      args: [ user.email ],
    });
    const userData = query.rows
  
    if (userData.length === 0) {
      throw new Error("User not found");
    }

    const isMatch = await Bun.password.verify(user.password, String(userData[0].password));
    if (!isMatch) {
      throw new Error("Invalid password");
    }
    return {
      loggedIn: true,
    };
  } catch (error) {
    console.log(error);
    return {
      loggedIn: false,
    };
  }
}

export { addUser, checkUserLogin };