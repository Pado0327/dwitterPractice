import axios from 'axios';

export default class TweetService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getTweets(username) {
    const url = username
      ? `${this.baseURL}/tweets?username=${username}`
      : `${this.baseURL}/tweets`;
    const tweets = await axios.get(url);

    if (tweets.status !== 200) {
      throw new Error(tweets.message);
    }

    return tweets.data;
  }

  async postTweet(text) {
    const newTweet = {
      name: 'Ellie',
      username: 'ellie',
      text,
    };
    const tweet = await axios.post('http://localhost:8080/tweets', newTweet);

    if (tweet.status !== 201) {
      throw new Error(tweet.message);
    }

    return tweet.data;
  }

  async deleteTweet(tweetId) {
    const response = await axios.delete(
      `http://localhost:8080/tweets/${tweetId}`
    );

    if (response.status !== 204) {
      throw new Error(response.message);
    }
  }

  async updateTweet(tweetId, text) {
    const tweet = await axios.put(`http://localhost:8080/tweets/${tweetId}`, {
      text,
    });

    if (tweet.status !== 200) {
      throw new Error(tweet.message);
    }
    return tweet.data;
  }
}
