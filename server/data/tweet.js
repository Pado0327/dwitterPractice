import * as usersRepository from './user.js';
import { getTweets } from '../database/database.js';
import { ObjectId } from 'bson';

function mapOptionalTweet(tweet) {
  return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}

export const getAllTweets = async () => {
  const cursor = getTweets().find({});
  const tweets = await cursor.toArray();

  return tweets.map(mapOptionalTweet);
};

export const getAllTweetsByUserName = async (username) => {
  const tweets = await getAllTweets();

  return tweets.filter((tweet) => tweet.username === username);
};

export const getTweetsById = async (id) => {
  const found = await getTweets().findOne({ _id: new ObjectId(id) });

  if (!found) {
    return null;
  }

  return mapOptionalTweet(found);
};

export const createTweets = async (text, userId) => {
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
  return mapOptionalTweet({ ...tweet, _id: new ObjectId(insertedId) });
};

export const updateTweets = async (id, text) => {
  const filter = { _id: new ObjectId(id) };
  const updateTweet = {
    $set: {
      text,
    },
  };

  const updatedTweet = await getTweets().findOneAndUpdate(filter, updateTweet, {
    returnDocument: 'after',
  });
  console.log(updatedTweet);
  return mapOptionalTweet(updatedTweet.value);
};

export const deleteTweet = async (id) => {
  const query = { _id: new ObjectId(id) };
  await getTweets().deleteOne(query);
};
