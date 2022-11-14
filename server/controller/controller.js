import Tweets from '../data/data.js';

const tweets = new Tweets();

export const handleGet = (userName) => {
  console.log(tweets.tweet);
  return userName
    ? tweets.tweet.filter((t) => t.username === username)
    : tweets.tweet;
};

export const handleGetWithId = (id) => {
  return tweets.tweet.find((t) => t.id === id);
};

export const handlePost = (text, name, username) => {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  tweets.updateTweet(tweet);
  return tweet;
};

// do I need to do it more here?
export const handlePut = (id) => {
  return tweets.tweet.find((t) => t.id === id);
};

export const handleDelete = (id) => {
  tweets.deleteTweet(id);
  return tweets.tweet;
};
