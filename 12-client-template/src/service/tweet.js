import axios from 'axios';

export default class TweetService {
  constructor(baseURL, tokenStorage) {
    this.baseURL = baseURL;
    this.tokenStorage = tokenStorage;
    this.instance = axios.create({
      baseURL,
      headers: {
        'Cotent-Type': 'application/json',
      },
    });
  }

  async getTweets(username) {
    const url = username ? `/tweets?username=${username}` : `/tweets`;
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
    const token = this.tokenStorage.getToken();
    const response = await axios.post(`${this.baseURL}/tweets`, newTweet, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

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
