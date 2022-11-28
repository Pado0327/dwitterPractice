export default class User {
  #user;
  constructor() {
    this.#user = [
      {
        id: '1',
        username: 'Test1',
        password: 'test2',
        name: 'test1',
        email: 'test1@gmail.com',
      },
    ];
  }

  findByUserName = async (userName) => {
    return await this.#user.find((user) => user.username === userName);
  };

  createUser = async (user) => {
    const created = { ...user, id: Date.now().toString() };
    this.#user.push(created);
    return created.id;
  };
}
