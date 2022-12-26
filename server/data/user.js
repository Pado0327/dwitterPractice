import { db } from './db/database.js';

class User {
  #user;
  constructor() {
    this.#user = [
      {
        id: '1',
        username: 'Test1',
        password:
          '$2b$12$TgzEF7.CLGQ8YWDwmuXN7.eNacbCaqUl3zqeRGIAU8M3K7cH9Fw8m',
        name: 'test1',
        email: 'test1@gmail.com',
      },
    ];
  }

  findByUserName = async (userName) => {
    return db
      .execute('SELECT * FROM users WHERE username=?', [userName]) //
      .then((result) => result[0][0]);
  };

  createUser = async (user) => {
    const { username, password, name, email } = user;
    const url = user.url == null ? null : user.url;

    return db
      .execute(
        'INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)',
        [username, password, name, email, url]
      )
      .then((result) => result[0].insertId);
  };

  findByUserId = async (userId) => {
    return db
      .execute('SELECT * FROM users WHERE id=?', [userId]) //
      .then((result) => result[0][0]);
  };
}

const user = new User();
export default user;
