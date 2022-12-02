class User {
  #user;
  constructor() {
    this.#user = [
      {
        id: '1',
        username: 'Test1',
        password: 'Test1234567!',
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
    console.log(this.user);
    console.log(created.id);
    return created.id;
  };

  findByUserId = async (userId) => {
    console.log(userId);
    return await this.#user.find((u) => u.id === userId);
  };
}

const user = new User();
export default user;
