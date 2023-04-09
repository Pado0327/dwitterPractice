import * as usersRepository from './user.js';
import { getTweets } from '../database/database.js';
import { ObjectID } from 'bson';

export default class Data {
  #tweet;
  constructor() {
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
    const cursor = getTweets().find({});
    const tweets = await cursor.toArray();

    return Promise.all(
      tweets.map(async (tweet) => {
        const { username, name, url } = await usersRepository.findByUserId(
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
    const found = await getTweets().findOne({ _id: new ObjectID(id) });

    if (!found) {
      return null;
    }
    const { username, name, url } = await usersRepository.findByUserId(
      found.userId
    );

    return { ...found, username, name, url };
  };

  createTweets = async (text, userId) => {
    const { username, name, url } = await usersRepository.findByUserId(userId);

    const tweet = {
      text,
      createdAt: new Date(),
      userId,
      username,
      name,
      url,
    };

    const { insertedId } = await getTweets().insertOne(tweet);
    return this.getTweetsById(insertedId);
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
