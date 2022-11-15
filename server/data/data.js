export default class Data {
  #tweet;
  constructor() {
    this.#tweet = [
      {
        id: '1',
        text: '테스트 용 입니다',
        createdAt: Date.now().toString(),
        name: 'Bob',
        username: 'bob',
        url: 'https://as1.ftcdn.net/v2/jpg/05/16/82/44/1000_F_516824436_Ect7KAWSGlCbTbstkwzyH9ssjDqyRGCD.jpg',
      },
      {
        id: '2',
        text: '테스트 용 입니다2',
        createdAt: Date.now().toString(),
        name: 'Ellie',
        username: 'ellie',
        url: 'https://as1.ftcdn.net/v2/jpg/05/16/82/44/1000_F_516824436_Ect7KAWSGlCbTbstkwzyH9ssjDqyRGCD.jpg',
      },
    ];
  }

  getAllTweets = async () => {
    return this.#tweet;
  };

  getAllTweetsByUserName = async (username) => {
    return this.#tweet.filter((t) => t.username === username);
  };

  getAllTweetsById = async (id) => {
    return this.#tweet.find((t) => t.id === id);
  };

  createTweets = async (text, name, username) => {
    const tweet = {
      id: Date.now().toString(),
      text,
      createdAt: new Date(),
      name,
      username,
    };
    this.#tweet = [tweet, ...this.#tweet];
    return tweet;
  };

  updateTweets = async (id) => {
    return this.#tweet.find((t) => t.id === id);
  };

  deleteTweet = (id) => {
    this.#tweet.filter((t) => t.id !== id);
  };
}
