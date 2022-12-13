import usersRepository from './user.js';

export default class Data {
  #tweet;
  #userReposit;
  constructor() {
    this.#userReposit = usersRepository;
    this.#tweet = [
      {
        id: '1',
        text: '테스트 용 입니다',
        createdAt: new Date().toString(),
        userId: '1',
      },
      {
        id: '2',
        text: '테스트 용 입니다2',
        createdAt: new Date().toString(),
        userId: '1',
      },
    ];
  }

  getAllTweets = async () => {
    return Promise.all(
      this.#tweet.map(async (tweet) => {
        const { username, name, url } = await this.#userReposit.findByUserId(
          tweet.userId
        );
        return { ...tweet, username, name, url };
      })
    );
  };

  getAllTweetsByUserName = async (username) => {
    return this.getAllTweets().then((tweets) =>
      tweets.filter((tweet) => tweet.username === username)
    );
  };

  getTweetsById = async (id) => {
    const found = this.#tweet.find((tweet) => tweet.id === id);
    if (!found) {
      return null;
    }

    const { username, name, url } = await usersRepository.findByUserId(
      found.userId
    );
    return { ...found, username, name, url };
  };

  createTweets = async (text, userId) => {
    const tweet = {
      id: new Date().toString(),
      text,
      createdAt: new Date(),
      userId,
    };
    this.#tweet = [tweet, ...this.#tweet];
    return this.getTweetsById(tweet.id);
  };

  updateTweets = async (id, text) => {
    const tweet = this.#tweet.find((t) => t.id === id);
    if (tweet) {
      tweet.text = text;
    }
    return this.getTweetsById(tweet.id);
  };

  deleteTweet = (id) => {
    this.#tweet.filter((t) => t.id !== id);
  };
}
