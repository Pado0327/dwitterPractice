import axios from 'axios';

export default class TweetService {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.instance = axios.create({
      baseURL,
      headers: { 'Cotent-Type': 'application/json' },
    });
  }

  async getTweets(username) {
    const url = username ? `/tweets?username=ss` : `/tweets`;
    const response = await this.instance.get(url);

    if (response.status !== 200) {
      throw new Error(response.message);
    }

    return response.data;
  }

  async postTweet(text) {
    const newTweet = {
      name: 'Ellie',
      username: 'ellie',
      text,
    };
    const response = await axios.post(`${this.baseURL}/tweets`, newTweet);

    if (response.status !== 201) {
      throw new Error(response.message);
    }

    return response.data;
  }

  async deleteTweet(tweetId) {
    const response = await axios.delete(`${this.baseURL}/tweets/${tweetId}`);

    if (response.status !== 204) {
      throw new Error(response.message);
    }
  }

  async updateTweet(tweetId, text) {
    const response = await axios.put(`${this.baseURL}/tweets/${tweetId}`, {
      text,
    });

    if (response.status !== 200) {
      throw new Error(response.message);
    }

    return response.data;
  }
}
