import { Database } from "bun:sqlite";
const db = new Database("mydb.sqlite");

function addUser(user: User) {
  try {
    const query = db.query(`INSERT INTO users 
          (email, password) 
          VALUES ($email, $password);`);
    query.run({
      $email: user.email,
      $password: user.password,
    });
  } catch (error) {
    console.log(error);
  }
}

async function getUser(user: User) {
  try {
    const query = db.query(`SELECT * FROM users WHERE email=$email`);
    const userData: any = query.get({
      $email: user.email,
    });

    if (!userData) {
      throw new Error("User not found");
    }

    const isMatch = await Bun.password.verify(user.password, userData.password);
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

export { addUser, getUser };
