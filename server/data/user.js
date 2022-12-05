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
    return await this.#user.find((u) => u.username === userName);
  };

  createUser = async (user) => {
    const created = { ...user, id: Date.now().toString() };
    this.#user.push(created);
    console.log(created);
    return created.id;
  };

  findByUserId = async (userId) => {
    console.log(userId);
    return await this.#user.find((u) => u.id === userId);
  };
}

const user = new User();
export default user;
